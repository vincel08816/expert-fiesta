const router = require("express").Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const passport = require("passport");

const expiresIn = 360000;

// @route    POST /users/register
// @desc     Register user
// @access   Public

router.post(
  "/signup",
  check("username", "username is required").notEmpty(),
  check(
    "password",
    "Please enter a password at least 8 character and contain at least one uppercase letter, one lower case letter, and one special character."
  )
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(400).json({ error: errors });
    }

    try {
      const { username, password, why } = req.body;

      console.log(why);

      if (await User.findOne({ username })) {
        console.log("User already exists");
        return res.send(400).send("User already exists");
      }

      const user = new User({ username, password, why });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      await user.save();

      const payload = { id: user.id };
      jwt.sign(payload, secret, { expiresIn }, (err, token) => {
        if (err) throw err;
        // res.cookie("token", token, { httpOnly: true });
        res.json(payload);
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// @route    GET /users/unverified
// @desc     get unverified users
// @access   Admin

router.get(
  "/unverified",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== "admin") return res.sendStatus(401);

      const users = await User.find({ role: "unverified" });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// @route    PUT /users/verify
// @desc     Verify User
// @access   Admin

router.put(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== "admin") return res.sendStatus(401);

      const user = await User.findOne({ _id: req.body.userId });

      console.log(user);
      if (!user) return res.status(404).send("User not found");

      user.role = "user";

      await user.save();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// @route    DELETE /auth/logout
// @desc     Logout user or delete token
// @access   Private

router.delete("/logout", (req, res) => {
  res
    .cookie("token", "none", {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    })
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

module.exports = router;
