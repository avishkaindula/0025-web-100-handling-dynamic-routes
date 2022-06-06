// This is how we outsource routes to different files.

const express = require("express");
// First of all we need to require express like this in order to outsource routes to different files.

const router = express.Router();
// This router objects works like app
// So we can use router. instead of app.

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/about", function (req, res) {
  res.render("about");
});

module.exports = router;
// We can bring back the the routes to app.js by configuring routes like this
