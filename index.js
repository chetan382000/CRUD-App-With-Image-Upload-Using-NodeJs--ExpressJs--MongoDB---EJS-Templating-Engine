const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./server/router/index");
const app = express();
const port = process.env.PORT || 3000;
const db_url = process.env.DB_URL;
const path =require('path')

// app.use("/", userRoute);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static('public/uploads'));
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: "lfdkdsjfksfsfs",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.set("view engine", "ejs");

app.use("/", userRoute);

mongoose.connect(db_url).then(() => {
  console.log("mongoose connect");
});

app.listen(port, () => {
  // Start the server with HTTP
  console.log(`listening on port ${port}`);
});

module.exports = app;
