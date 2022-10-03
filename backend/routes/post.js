const express = require("express");
const router = express.Router();
// on fait appel a nos controlleur
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");
const userCtrl = require("../controllers/user");
//on initialize nos route en faisant appel a nos controlleur
router.post("profile/:id", auth,userCtrl.getOneUser);
router.get("/", auth,postCtrl.getAllPost);
router.post("/", auth,multer, postCtrl.createPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id",auth, postCtrl.deletePost);
// router.post("/:id/like", auth, postCtrl.addLikes); 

module.exports = router;
