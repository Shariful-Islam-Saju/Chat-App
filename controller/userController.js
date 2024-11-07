import bcrypt from "bcrypt";
import path, { dirname } from "path"; // Import path utilities
import { fileURLToPath } from "url";
import { unlink } from "fs";

import People from "../model/people.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getUser(req, res, next) {
  const users = await People.find();

  res.render("users", {
    users,
  });
}

export async function addUser(req, res, next) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 15);
    const user = { ...req.body, password: hashedPassword };

    // Check for uploaded files and assign the avatar
    if (req.files?.length > 0) {
      user.avatar = req.files[0].filename;
    }

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

// delete user

export async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    const user = await People.findByIdAndDelete({ _id: id });
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }

    res.status(200).json({
      message: "Remove User Successfully",
    });
  } catch (error) {
    console.log(error);
  }
}
