const express = require("express");
const router = express.Router();
// on fait appel a nos controlleur
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");
//on initialize nos route en faisant appel a nos controlleur
router.get("/", postCtrl.getAllPost);
router.post("/", multer, postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.put("/:id", multer, postCtrl.modifyPost);
router.delete("/:id", postCtrl.deletePost);
// router.post("/:id/like", auth, postCtrl.addLikes);

module.exports = router;
