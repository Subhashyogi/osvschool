import jwt from "jsonwebtoken";
import models from "../models/index.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const secret = process.env.JWT_SECRET || "osvsrSecret123";
    const decoded = jwt.verify(token, secret);

    // Get user from database to ensure they still exist and aren't deleted
    const user = await models.User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
export { authMiddleware as authenticate };
