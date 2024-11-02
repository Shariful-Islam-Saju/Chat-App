import bcrypt from "bcrypt";
import People from "../model/people.js";

export function getUser(req, res, next) {
  res.render("users");
}

export async function addUser(req, res, next) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 15);
    const user = { ...req.body, password: hashedPassword };

    // Check for uploaded files and assign the avatar
    if (req.files?.length > 0) {
      user.avatar = req.files[0].filename;
      console.log(req.files)
    }
      console.log(req.files);

    // Create and save a new user
    const newUser = new People(user);
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the user",
      error: error.message,
    });
  }
}
