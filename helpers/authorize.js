const passport = require("passport");
module.exports = function (req, res, next) {
  passport.authenticate(
    "jwt-cookiecombo",
    { session: false },
    async (error, token) => {
      if (error || !token) {
        next({ name: "Unauthorized" });
      }
      try {
        req.user = token;
      } catch (error) {
        next(error);
      }
      next();
    }
  )(req, res, next);
};
