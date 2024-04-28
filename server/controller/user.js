const User = require("../model/user.model");
const path = require("path");
const fs = require("fs");
//user register

const createUser = async (req, res) => {
  try {
    let { name, email, phone } = req.body;
    let image = req.file.filename;

    // Check if user already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    await User.create({
      name,
      image,
      email,
      phone,
    });

    req.session.message = {
      type: "success",
      message: "User added successfully",
    };

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.find({});

    res.render("index", {
      title: "Home Page",
      users: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// update in 2 api get and post
const getUserbyId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    // Render the update form with user data
    res.render("edit_users", { title: "Edit User", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, phone } = req.body;
    const user = await User.findById(userId);
    const updateObj = {
      name,
      email,
      phone,
    };
    if (req.file) {
      const image = req.file.path;

      const prevProfilePhoto = user.image;

      if (prevProfilePhoto) {
        fs.unlink("public/uploads/" + prevProfilePhoto, (err) => {
          if (err) {
            console.error("Could not delete the file.", err);
          }
        });
      }

      updateObj.image = path.basename(image);
    }
    // Update the user
    await User.findByIdAndUpdate(userId, updateObj);

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserbyId,
  updateUser,
};
