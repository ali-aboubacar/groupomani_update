const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./User.js")(sequelize, Sequelize);
db.posts = require("./Post.js")(sequelize, Sequelize);
db.likes = require("./Like.js")(sequelize, Sequelize);
db.roles = require("./Role.js")(sequelize, Sequelize);
db.dislikes = require("./Dislike.js")(sequelize, Sequelize);

// db.roles.belongsToMany(db.users, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.users.belongsToMany(db.roles, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

// db.ROLES = ["user", "admin"];
db.roles.belongsTo(db.users);
db.users.hasMany(db.roles);

db.users.hasMany(db.posts, {
  foreignKey: {
    name: "userId",
  },
});

db.users.hasMany(db.likes, {
  foreignKey: {
    name: "userId",
  },
});

db.users.hasMany(db.dislikes, {
  foreignKey: {
    name: "userId",
  },
});

db.posts.hasMany(db.likes, {
  foreignKey: {
    name: "postId",
  },
});

db.posts.hasMany(db.dislikes, {
  foreignKey: {
    name: "postId",
  },
});
module.exports = db;
