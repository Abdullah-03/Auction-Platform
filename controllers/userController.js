import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    if (await userModel.findOne({ email })) {
      return res
        .status(400)
        .json({ message: "User with that email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error signing up UserModel", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing password or email" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      } else {
        const userObject = user.toObject();
        delete userObject.password; // we'll store userObject as cookie so we need to remove password
        return res.status(200).json({ user });
      }
    } else {
      res.status(404).json({ message: "User with that email does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
