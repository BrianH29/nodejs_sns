"use strict";

const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => {
  res.render("profile", { title: "My Info - NodeBird", user: null });
});

router.get("/join", (req, res) => {
  res.render("join", {
    title: "Register - Nodebird",
    user: null,
    joinError: req.flash("joinError"),
  });
});

router.get("/", (req, res, next) => {
  res.render("main", {
    title: "Nodebird",
    twits: [],
    user: null,
    loginError: req.flash("loginError"),
  });
});

module.exports = router;
