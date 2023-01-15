const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("helo");
  const token = req.headers.authenticate;
  jwt.verify(token, "priyank", (err, decoded) => {
    if (err) {
      res.send({ msg: "login required" });
    } else {
      req.body.userID = decoded._id;
      next();
    }
  });
};

module.exports = { authMiddleware };
