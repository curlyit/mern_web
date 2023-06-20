const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Post = require("../models/Post.js");
const Image = require("../models/Image.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const uniqueFileName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + extension;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

//@route: POST api/posts/post
//@desc: create post
router.post("/post", verifyToken, upload.array("imgList"), async (req, res) => {
  const { tittle, description, price, type } = req.body;
  if (!tittle)
    return res
      .status(400)
      .json({ success: false, message: "Tittle is required!" });
  if (!req.files)
    return res
      .status(400)
      .json({ success: false, message: "You have to insert images!" });

  try {
    const newPost = new Post({
      tittle,
      description,
      price,
      type,
      user: req.userId,
    });
    await newPost.save();
    const idPost = newPost._id;
    const uploadedImages = req.files.map((file) => {
      return {
        originalName: file.originalname,
        fileName: file.filename,
        filePath: file.path,
        post: idPost,
      };
    });

    Image.insertMany(uploadedImages)
      .then(() => {})
      .catch((err) => {
        res.status(500).json({ error: "Error save image!" });
      });

    return res.json({
      success: true,
      message: "Create post successfully!",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//route: GET api/posts/allPosts
//desc: get all the posts of the user
router.get("/allPosts", verifyToken, async (req, res) => {
  try {
    //const posts = await Post.find()
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    return res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//route: GET api/posts/getImagePost
//desc: get images of a Post
router.get("/imagesPost/:id", async (req, res) => {
  try {
    const images = await Image.find({ post: req.params.id });
    return res.json({ success: true, images });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//route: GET api/posts/getImage
//desc: get a image
router.get("/getImage/:fileName", async (req, res) => {
  const fileName = req.params.fileName;
  const imagePath = path.join(__dirname, "../uploads", fileName);

  // Gửi tệp hình ảnh về phía client
  res.sendFile(imagePath);
});

//route: PUT api/posts/update/:id
//desc: update post
router.put("/update/:id", verifyToken, async (req, res) => {
  const { tittle, description, price, type } = req.body;

  if (!tittle)
    return res
      .status(400)
      .json({ success: false, message: "title is required" });

  try {
    let updatePost = {
      tittle,
      description: description || "",
      // validation price?
      price,
      type: type || "Clothes",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });

    if (!updatePost)
      return res
        .status(401)
        .json({ success: false, message: "user do not own this post" });

    return res.json({
      success: true,
      message: "Update successfully",
      post: updatePost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//route: DELETE api/posts/delete:id
//desc: delete post
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const images = await Image.find({ post: req.params.id });
    const deleteImage = images.map((image) => image.delete());

    const deletePostCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.delete(deletePostCondition);

    if (!deletePost || !deleteImage)
      return res.json(401).json({
        success: false,
        message: "You do not have permission to delete it",
      });

    return res.json({
      success: true,
      message: "Deleted Post",
      post: deletePost,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//route: DELETE api/posts/deleteForce:id
//desc: delete force post
router.delete("/deleteForce/:id", verifyToken, async (req, res) => {
  try {
    // const images = await Image.find({ post: req.params.id });
    // const deleteImage = images.map((image) => Image.deleteOne(image));
    const deleteImage = await Image.deleteMany({ post: req.params.id });

    const deletePostCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.deleteOne(deletePostCondition);

    if (!deletePost || !deleteImage)
      return res.json(401).json({
        success: false,
        message: "You do not have permission to delete it",
      });

    return res.json({
      success: true,
      message: "Deleted force Post",
      post: deletePost,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/soft-deleted", verifyToken, async (req, res) => {
  try {
    const posts = await Post.findDeleted({ user: req.userId })
      .where("deleted")
      .equals(true);
    const processedPosts = posts.map((post) => post.toObject());
    const totalNumber = processedPosts.length;

    return res.json({
      success: true,
      message: "All posts were soft deleted! ",
      postsDeleted: processedPosts,
      totalNumber,
    });
  } catch (error) {
    console.error(error);
  }
});

router.patch("/restore/:id", verifyToken, async (req, res) => {
  try {
    await Post.restore({ _id: req.params.id });
    return res.json({
      success: true,
      message: "Restore Product successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error restore Product!" });
  }
});

module.exports = router;
