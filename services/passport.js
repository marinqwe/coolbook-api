var JwtCookieComboStrategy = require("passport-jwt-cookiecombo");
const authConfig = require("../helpers/authConfig");

const passportStrategy = new JwtCookieComboStrategy(
  {
    secretOrPublicKey: authConfig.jwt.secret,
    jwtVerifyOptions: authConfig.jwt.options,
  },
  (payload, done) => {
    if (!payload.email) {
      return done(null, false);
    }
    return done(null, payload.email);
  }
);

module.exports = function (passport) {
  passport.use(passportStrategy);
  return passport;
};
