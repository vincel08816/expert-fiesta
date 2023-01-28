const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const secret = process.env.SECRET;

// @route    GET /auth
// @desc     Get user by token
// @access   Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) =>
    await User.findById(req.user.id)
      .select("-password")
      .then((user) => res.json(user))
      .catch((err) => console.error(err) && res.sendStatus(500))
);

// @route    POST /auth/login
// @desc     Login
// @access   Public

router.post(
  "/login",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.sendStatus(401);

    try {
      const { password } = req.body;
      const email = req.body.email.toLowerCase().replace(" ", "");
      const user = await User.findOne({ lowercaseEmail: email });
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res.sendStatus(401);

      const payload = { id: user.id, email };
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
