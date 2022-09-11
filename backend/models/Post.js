module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
    likesNum: {
      type: Sequelize.INTEGER,
    },
    dislikesNum: {
      type: Sequelize.INTEGER,
    },
  });
  return Post;
};
