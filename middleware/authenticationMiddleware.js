const jwt = require("jsonwebtoken");

const authenticationMiddleware = (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("invalid token", 400);
  }
  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    request.user = payload;
    // request.refreshToken = payload.refreshToken;
    request.accessToken = token;
    next();
  } catch (e) {
    console.log("--- authMiddleware error");
    console.log(e);
    throw new Error("invalid token", 400);
  }
};

module.exports = authenticationMiddleware;
