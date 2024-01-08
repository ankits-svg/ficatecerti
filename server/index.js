const express = require("express");
const { connection } = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const { RankModel } = require("./models/hacker.models");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { Storage } = require("@google-cloud/storage");
const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } =
  process.env;

// CONFIGURE CLOUDINARY
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
const cors = require("cors");

let projectId = process.env.projectId;

let keyFilename = process.env.keyFilename;

const storage = new Storage({
  projectId,
  keyFilename,
});
const bucketName = process.env.bucket; 

port = process.env.port || 2200;
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(cors({ origin: "*" }));

const corsConfig = [
  {
    maxAgeSeconds: 3600,
    method: ["GET", "PATCH"],
    origin: ["*"], 
    responseHeader: ["*"],
  },
];

async function configureBucketCors() {
  await storage.bucket(bucketName).setCorsConfiguration(corsConfig);
  console.log(`Bucket ${bucketName} was updated with CORS configuration`);
}

configureBucketCors().catch(console.error);

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

app.post("/save", async (req, res) => {
  const { name, course, type, linkedin } = req.body;
  try {
    const rank = new RankModel({
      name: name,
      course: course,
      type: type,
      img: "sample.png",
    });
    await rank.save();
    res.status(200).send({ msg: "save data successfully", data: rank });
  } catch (error) {
    res.status(400).send({ msg: "some error occurred" });
  }
});

app.get("/get/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const rank = await RankModel.findById(id);

    if (rank) {
      res.status(200).send({ msg: "Getting data successfully", data: rank });
    } else {
      res.status(404).send({ msg: "Data not found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "Some error occurred in getting data" });
  }
});

app.patch("/update/:id", async (req, res) => {
  const { id } = req.params;

  const { img } = req.body;
  const rank = await RankModel.findById(id);
  
  try {
   
    const options = {
      public_id: `${id}`,
      folder: `${rank.course}`,
      unique_filename: true,
      use_filename: true,
    };
    
    const response = await cloudinary.uploader.upload(img, options);
   
    const uploadedImage = response.url;

    await RankModel.findByIdAndUpdate(id, { img: uploadedImage });
   
    return res.status(200).json({ uploadedImage, response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

});

app.patch("/updates/:id", async (req, res) => {
  const { id } = req.params;
  const { img } = req.body;

  try {
    const response = await uploadImageToGoogleCloudStorage(id, img);
    console.log("response:", response);

    await RankModel.findByIdAndUpdate(id, { img: response.imageUrl });
    return res.status(200).json({ uploadedImage: response.imageUrl, response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function uploadImageToGoogleCloudStorage(id, image) {
  const fileName = `${id}.png`; 
  const filePath = path.join(__dirname, "temp", fileName); 

  await saveImageToFile(image, filePath).catch((error) => {
    throw new Error(`Failed to save image to file: ${error.message}`);
  });

  const bucket = storage.bucket(bucketName);

  const options = {
    destination: `Certificate/${fileName}`,
  };

  await bucket.upload(filePath, options);

  const imageUrl = `https://storage.googleapis.com/${bucketName}/Certificate/${fileName}`;

  return { imageUrl };
}

async function saveImageToFile(image, filePath) {
  return new Promise((resolve, reject) => {
    const base64Image = image.split(";base64,").pop();
    require("fs").writeFile(
      filePath,
      base64Image,
      { encoding: "base64" },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

app.get("/images/:id", async (req, res) => {
  try {
    const image = await RankModel.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json({ imageUrl: image.img });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(
      `Server i.e index.js is connected to database with port ${port}`
    );
  } catch (error) {
    console.log(`Server is not connected to database with port ${port}`);
  }
  console.log(`Server is running at ${port}`);
});
