const express = require("express");
const { connection } = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const { RankModel } = require("./models/hacker.models");
const path = require("path");
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
  
  const { id } = req.params;
  
  const { img } = req.body;

  const rank = await RankModel.findById(id);
  console.log(rank)
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
    // RETURN UPLOADED IMAGE DATA
    const uploadedImage = response.url; 
    
    await RankModel.findByIdAndUpdate(id, { img:uploadedImage })
    
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
  try {
    const image = await RankModel.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json({ imageUrl: image.img });
  } catch (error) {
    
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
