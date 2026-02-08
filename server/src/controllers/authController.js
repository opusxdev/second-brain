import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import user from "../models/userModel.js";

export const registeration = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // checking whether user given all the fields or not
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // checking if email already exists
    const checkEmail = await user.findOne({ email });

    if (checkEmail) {
      return res.status(409).json({
        message: "Email already exist"
      });
    }

    // hashing password
    const hashPassword = await bcrypt.hash(password, 5);

    const newUser = new user({
      username,
      email,
      password: hashPassword
    });

    await newUser.save();

    return res.status(201).json({
      message: "User successfully created"
    });
  } catch (err) {
    console.log("Something went wrong while receiving data", err);
    return res.status(500).json({
      message: "Something went wrong while receiving data"
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking whether user given all the fields or not
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // checking whether the email exists or not
    const User = await user.findOne({ email });

    if (!User || !User.password) {
      return res.status(404).json({
        message: "User not found or password is missing"
      });
    }

    const isMatch = await bcrypt.compare(password, User.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // generating token
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY not available");
    }

    const token = jwt.sign(
      { userID: User._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "user logged in successfully",
      token,
      userID: User._id
    });
  } catch (err) {
    console.log("something wrong", err);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

