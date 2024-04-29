const express = require("express");
const router = express.Router();
const upload = require("../controller/multer");
const User = require("../controller/user");

router.get("/", User.getUsers);

router.get("/add", (req, res) => {
  res.render("add_users", { title: "Add Users" });
});

// user add

router.post("/add", upload.single("image"), User.createUser);

// update user
router.get("/update/:userId", User.getUserbyId);

router.post("/update/:userId", upload.single("image"), User.updateUser);

// user delete

router.delete("/delete/:userId", User.deleteUser);


module.exports = router;
