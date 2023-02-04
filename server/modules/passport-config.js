const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/User");

const options = {
  jwtFromRequest: (req) => (req && req.cookies ? req.cookies["token"] : null),
  secretOrKey: process.env.SECRET,
};

const callback = async (payload, done) => {
  try {
    const user = await User.findById(payload.id);

    console.log(user);
    if (!user) {
      done(null, false);
    } else {
      done(null, { id: user.id, role: user.role });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = (passport) => passport.use(new JwtStrategy(options, callback));
