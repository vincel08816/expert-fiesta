const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/User");

const options = {
  jwtFromRequest: (req) => (req && req.cookies ? req.cookies["token"] : null),
  secretOrKey: process.env.SECRET,
};

const callback = async (payload, done) => {
  try {
    const user = await User.findById(payload.id);

    if (user?.role === "admin" || user?.role === "user") {
      done(null, { id: user.id, role: user.role });
    } else {
      done(null, false);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = (passport) => passport.use(new JwtStrategy(options, callback));
