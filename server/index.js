const express = require("express");
const { connection } = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const { RankModel } = require("./models/hacker.models");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { Storage } = require("@google-cloud/storage");
// LOAD ENVIROMENT VARIABLES
const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } =
  process.env;

// CONFIGURE CLOUDINARY
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
const cors = require("cors");

let projectId = process.env.projectId; // Get this from Google Cloud
// let keyFilename = "C:UsershpDownloadsaxial-engine-410216-0df0ce8f2e41.json";
let keyFilename =
  process.env.keyFilename;

// Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucketName = process.env.bucket; // Replace with your actual bucket name
// console.log("bucketname:",bucketName)  // 1

port = process.env.port || 2200;
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(cors());

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
  // console.log("iasdadad:",img)
  const rank = await RankModel.findById(id);
  // console.log(rank)
  //New code for cloudinary
  try {
    // DEFINE UPLOAD OPTIONS
    const options = {
      public_id: `${id}`,
      folder: `${rank.course}`,
      unique_filename: true,
      use_filename: true,
    };
    // console.log("options:",options)
    // UPLOAD IMAGE TO CLOUDINARY
    const response = await cloudinary.uploader.upload(img, options);
    // console.log("response:",response)
    // RETURN UPLOADED IMAGE DATA
    const uploadedImage = response.url;

    await RankModel.findByIdAndUpdate(id, { img: uploadedImage });
    // console.log("rankss:",rankss)

    // console.log("uploadedImage:",uploadedImage)
    // RETURN COMPLETE RESPONSE
    return res.status(200).json({ uploadedImage, response });

    // return res.send({"msg":"cloudinary data","data":rankss})
    // CATCH ERROR
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  //New code for cloudinary
});

// Google cloud storage route
app.patch("/updates/:id", async (req, res) => {
  const { id } = req.params;
  const { img } = req.body;

  try {
    const response = await uploadImageToGoogleCloudStorage(id, img);
    console.log("response:", response);

    // Update the database with the new image URL
    await RankModel.findByIdAndUpdate(id, { img: response.imageUrl });
    // await RankModel.findByIdAndUpdate(id, { img: originalLink });

    return res.status(200).json({ uploadedImage: response.imageUrl, response });
    // return res.status(200).json({ uploadedImage: newLink, response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function uploadImageToGoogleCloudStorage(id, image) {
  const fileName = `${id}.png`; // Adjust the file name as needed   //1
  const filePath = path.join(__dirname, "temp", fileName); //1

  // Save the image to a temporary file
  await saveImageToFile(image, filePath).catch((error) => {
    throw new Error(`Failed to save image to file: ${error.message}`);
  });

  // Upload the image to Google Cloud Storage
  const bucket = storage.bucket(bucketName);
  // console.log("bucket:",bucket) //1
  const options = {
    destination: `Certificate/${fileName}`,
  };

  // console.log("option:", options); //1

  //Code is breaking here

  await bucket.upload(filePath, options);

  // // Get the public URL of the uploaded image
  const imageUrl = `https://storage.googleapis.com/${bucketName}/Certificate/${fileName}`;

  // Return the image URL
  return { imageUrl };
}

async function saveImageToFile(image, filePath) {
  return new Promise((resolve, reject) => {
    const base64Image = image.split(";base64,").pop();
    // console.log("base64Image:",base64Image)
    require("fs").writeFile(
      filePath,
      base64Image,
      { encoding: "base64" },
      (err) => {
        if (err) {
          // console.log("errin fs:", err);
          reject(err);
        } else {
          // console.log("resolve");
          resolve();
        }
      }
    );
  });
}

// Express route to get an image by its ID
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
