const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //recuperation du token D'authentification
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const roleId = decodedToken.roleId;
    req.auth = {
      userId: userId,
      roleId:roleId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
