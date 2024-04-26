const express = require("express");
const multer = require("multer");
const { cloudinary } = require("./config/cloudinary");
require("dotenv").config();
const cors = require("cors");

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json(), cors());

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileStr = req.file.buffer.toString("base64");
    const uploadedResponse = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${fileStr}`
    );
    res.json({ secure_url: uploadedResponse.secure_url });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Failed to upload file");
  }
});

app.listen(3000, () => {
  console.log(`Server running on port 3000}`);
});
