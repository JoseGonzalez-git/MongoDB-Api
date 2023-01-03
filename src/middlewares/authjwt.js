import { extractToken } from "../libs/util";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
export const verifyToken = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) return res.status(403).json({ message: "Invalid token" });
    const decoded = jwt.verify(token, config.SECRETAPI_KEY);
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "User not found" });
    next();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
