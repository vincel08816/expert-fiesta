const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Message = require("../models/Message");

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
      const messages = await Message.find({ userId: req.user.id }).sort({
        timestamp: -1,
      });

      res.json({ user, messages });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

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
