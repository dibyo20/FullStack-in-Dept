const imageRouter = require("express").Router();
const imageModel = require("../models/image.model.js");
const ImageKit = require("@imagekit/nodejs");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

imageRouter.post("/upload", upload.single("image"), async (req, res) => {
    console.log(req.body, req.file);
});

module.exports = imageRouter;