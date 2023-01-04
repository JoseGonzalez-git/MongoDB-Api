import { extractToken } from "../libs/util";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Rol from "../models/Rol";
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

export const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Rol.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") next();
      return;
    }
    return res.status(403).json({ message: "Require role Moderator" });
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Rol.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") next();
      return;
    }
    return res.status(403).json({ message: "Require role Admin" });
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};
