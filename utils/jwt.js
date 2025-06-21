const jwt = require("jsonwebtoken");
require("dotenv").config();

function genToken(user, jwt_key) {
  const token = jwt.sign(
    {
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
      },
    },
    jwt_key,
    { expiresIn: "1h" }
  );
  return token;
}

function verifyToken(req, res, next) {
  const header = req.header("Authorization");
  if (!header) {
    return res.status(404).json({ message: "header not found" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "token not found" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.user = decode.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      message: "internal server error token creation failed",
      error: err.name,
    });
  }
}
module.exports = {
  genToken,
  verifyToken,
};
