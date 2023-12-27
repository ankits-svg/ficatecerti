const express = require("express");
const { connection } = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const { RankModel } = require("./models/hacker.models");
const path = require("path");
// const { Buffer } = require('buffer');
const cloudinary = require('cloudinary').v2;

// LOAD ENVIROMENT VARIABLES
const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} = process.env;

// CONFIGURE CLOUDINARY
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
const cors = require("cors");
port = process.env.port || 2200;
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(cors());


app.use(bodyParser.json({limit: "50mb", extended: true}));
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
      linkedin:"ankit-sharma",
      img:"sample.png"
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
  // console.log("Request Session:", req.session);
  const { id } = req.params;
  // const { imageUrl } = req.body;
  const { img } = req.body;
  console.log("img:",img)
  // Older code
  // try {
  //   // Update the database with the imageUrl
  //   await RankModel.findByIdAndUpdate(id, { imageUrl });
  //   res.send({ success: true, message: "Database updated successfully.","data":imageUrl });
  // } catch (error) {
  //   console.error("Error updating database:", error);
  //   res.status(500).json({ success: false, message: "Internal server error." });
  // }

 // Older code

  //New code for cloudinary
  try {
    // DEFINE UPLOAD OPTIONS
    const options = {
      public_id: `${id}`,
      folder: 'Certificates',
      unique_filename: true,
      use_filename: true,
    };
    // UPLOAD IMAGE TO CLOUDINARY
    const response = await cloudinary.uploader.upload(img, options);
    // RETURN UPLOADED IMAGE DATA
    const uploadedImage = response.url; // You can then store the image url in your database
    console.log("uploadedImage:",uploadedImage)
    await RankModel.findByIdAndUpdate(id, { img:uploadedImage })
    // res.send({ success: true, message: "Database updated successfully.","data":img });
    // RETURN COMPLETE RESPONSE
    return res.status(200).json({ uploadedImage, response });
    // CATCH ERROR
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  //New code for cloudinary


});



// Express route to get an image by its ID
app.get('/images/:id', async (req, res) => {
  console.log("req.params.id:",req.params.id)
  try {
    const image = await RankModel.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    console.log("image.img:",image.img)

    // Encode the image data to Base64
    // const encodedImage = Buffer.from(image.img).toString('base64');
    // Return the image URL or other necessary information
    res.json({ imageUrl: image.img });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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
