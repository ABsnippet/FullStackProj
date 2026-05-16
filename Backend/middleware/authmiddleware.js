const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    // GET TOKEN FROM COOKIE
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // STORE USER DATA
    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;