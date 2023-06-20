const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Image = require("../models/Image.js");

//route: GET api/posts/getImagePost
//desc: get images of a Post
router.get("/getImages/:id", async (req, res) => {
  try {
    const images = await Image.find({ post: req.params.id });
    return res.json({ success: true, images });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
