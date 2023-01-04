import Rol from "../models/Rol";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { generatePassword, sendMail } from "../libs/util";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    const generatedPassword = generatePassword();

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(generatedPassword),
    });
    if (roles) {
      const foundRoles = await Rol.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await User.findOne({ name: { $in: "user" } });
      newUser.roles = [role._id];
    }
    const createdUser = await newUser.save();
    const token = jwt.sign({ id: createdUser._id }, config.SECRETAPI_KEY, {
      expiresIn: 86400,
    });
    sendMail()
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.error(err);
  }
};
