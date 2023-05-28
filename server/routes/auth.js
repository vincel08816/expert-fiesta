const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const secret = process.env.SECRET;

// @route    GET /auth
// @desc     Get user by token
// @access   Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      const conversations = await Conversation.find({
        userId: req.user.id,
      }).sort({
        updatedAt: -1,
      });

      res.json({ user, conversations });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// @route    GET /auth/test
// @desc     Testing route to do testing things
// @access   Private

router.post("/test", async (req, res) => {
  try {
    const userId = "63d5e092e698050206974027";

    console.log("auth test");

    res.json({ msg: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route    POST /auth/login
// @desc     Login
// @access   Public

router.post(
  "/login",
  check("username", "Please include a valid username").exists(),
  check("password", "Password is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.sendStatus(401);

    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.error("username not found");
        return res.sendStatus(401);
      }

      const payload = { id: user.id };
      jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.cookie("token", token, { httpOnly: true });
        res.json(payload);
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
