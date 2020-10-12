const passportJWT = require("passport-jwt");
const passport = require("passport");
const { User } = require("../db/models");

const { Strategy: JWTStrategy, ExtractJwt: ExtractJWT } = passportJWT;

const options = {};
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

const passportJWTStrategy = new JWTStrategy(options, async function (
  jwtPayload,
  done
) {
  try {
    const { email } = jwtPayload;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

passport.serializeUser(function (user, done) {
  if (!user) {
    return done(message.AUTH.serialize_failed);
  }
  return done(null, user);
});
passport.deserializeUser(async function (id, done) {
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  if (!user) {
    return done(message.AUTH.deserialize_failed);
  }
  return done(null, user);
});

module.exports = function (passport) {
  passport.use(passportJWTStrategy);
  return passport;
};
