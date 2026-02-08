import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      typeof req.headers.token === "string"
        ? req.headers.token
        : undefined;

    console.log("token..", token);

    if (!token) {
      return res.status(400).json({
        message: "Bad token Request"
      });
    }

    if (!process.env.SECRET_KEY) {
      return res.status(500).json({
        message: "server internal problem"
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.userID = decoded.userID;
    next();
  } catch (err) {
    return res.status(401).json({
      message: `invalid or expired token ${err}`
    });
  }
}
