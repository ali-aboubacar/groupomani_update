module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    lastName: {
      type: Sequelize.STRING,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue:false,
    },
    profileImg:{
      type: Sequelize.STRING,
      defaultValue:'https://www.nicepng.com/maxp/u2y3a9e6t4o0a9w7/',
    }
  });

  return User;
};
