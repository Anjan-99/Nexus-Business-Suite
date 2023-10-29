const express = require('express');
const { upload } = require('./upload.js');
const { postImage } = require('./controller.js');

const router = express.Router();

router.post("/upimg", upload.single("image"), postImage);

module.exports =  router ;