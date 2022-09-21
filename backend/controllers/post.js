//const User = require("../models/User");
const db = require("./../models");
const Post = db.posts;
const Op = db.Sequelize.Op;
const fs = require("fs");
//cree une sauce
exports.createPost = (req, res, next) => {
  // delete postObject._id;
  // delete postObject._userId;
  console.log('#######',req.file);
  const post = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Post.create(post)
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    // .catch((error) => {
    //   res.status(400).json({ error });
    // });
};
//recupere une seul sauce
exports.getOnePost = (req, res, next) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Post with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id,
      });
    });
};
//modifier une sauce
exports.modifyPost = (req, res, next) => {
  //verifier si
  const postObject = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  // delete postObject._userId;
  Post.findByPk(req.params.id)
    .then((post) => {
      if (!post) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        if(post.imageUrl){
          const Filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${Filename}`, () => {
            Post.update({ ...postObject }, { where: { id: req.params.id } })
              .then(() => res.status(200).json({ message: "Objet modifié!" }))
              .catch((error) => res.status(401).json({ error }));
          });
      }else{
        Post.update({ ...postObject }, { where: { id: req.params.id } })
              .then(() => res.status(200).json({ message: "Objet modifié!" }))
              .catch((error) => res.status(401).json({ error }));
      }

      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
//ajouter les likes
exports.addLikes = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const userId = req.auth.userId;
    const usersLiked = sauce.usersLiked;
    const usersDisliked = sauce.usersDisliked;
    const likeStatus = req.body.like;
    switch (likeStatus) {
      case 1:
        //si userId n'existe pas dans le array usersLiked ajouter un like
        if (usersLiked.indexOf(userId) === -1) {
          Sauce.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { likes: 1 }, $push: { usersLiked: userId } }
          )
            .then(() => res.status(200).json({ message: "like Ajouter" }))
            .catch((error) => res.status(401).json({ error }));
        } else {
          res.status(403).json({ error: " vous ne pouvez pas like" });
        }
        break;
      case 0:
        //si userId existe dans l'array usersLiked suprimer le like
        if (usersLiked.indexOf(userId) > -1) {
          Sauce.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { likes: -1 }, $pull: { usersLiked: userId } }
          )
            .then(() => res.status(200).json({ message: "like suprimer" }))
            .catch((error) => res.status(401).json({ error }));
        }
        //si userId existe dans l'array usersDisliked suprimer le dislike
        else if (usersDisliked.indexOf(userId) > -1) {
          Sauce.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } }
          )
            .then(() => res.status(200).json({ message: "disLike suprimer" }))
            .catch((error) => res.status(401).json({ error }));
        }
        //si tout ces cas ne sont pas verifier retourner un erreur 403
        else {
          res.status(403).json({ error: "erreur inconue " });
        }
        break;
      case -1:
        //si userId n'existe pas dans l'array usersDisliked ajouter un dislike
        if (usersDisliked.indexOf(userId) === -1) {
          Sauce.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } }
          )
            .then(() => res.status(200).json({ message: "dislike Ajouter" }))
            .catch((error) => res.status(401).json({ error }));
        } else {
          res.status(403).json({ error: " vous ne pouvez pas dislike" });
        }
        break;
    }
  });
};
//suprimer une sauce
exports.deletePost = (req, res, next) => {
  Post.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = user.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { id: req.params.id } })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
//recuperer toute les sauces

exports.getAllPost = (req, res, next) => {
  Post.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the Posts.",
      });
    });
};
