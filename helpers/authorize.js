const passport = require('passport');
module.exports = function authorize(req, res, next) {
  passport.authenticate(
    'jwt-cookiecombo',
    { session: false },
    (error, token) => {
      if (error || !token) {
        next({ name: 'Unauthorized' });
      }
      try {
        req.user = token;
        return next();
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
};
