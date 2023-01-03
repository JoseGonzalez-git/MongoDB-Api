import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Rol from "../models/Rol";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
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

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
  }
};
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email: email }).populate("roles");
    if (!userFound) return res.status(404).json({ message: "User not found" });
    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );
    if (!matchPassword)
      return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: userFound._id }, config.SECRETAPI_KEY, {
      expiresIn: 86400,
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(
      res
        .status(500)
        .json({ message: "Error al consultar el usuario en el servidor" })
    );
  }
};
