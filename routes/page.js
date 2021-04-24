"use strict";

const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { title: "My Info - NodeBird", user: req.user });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", {
    title: "Register - Nodebird",
    user: req.user,
    joinError: req.flash("joinError"),
  });
});

router.get("/", (req, res, next) => {
  res.render("main", {
    title: "Nodebird",
    twits: [],
    user: req.user,
    loginError: req.flash("loginError"),
  });
});

module.exports = router;
