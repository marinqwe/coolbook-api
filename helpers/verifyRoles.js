module.exports = function (roles) {
  return function (req, res, next) {
    const checkRoles = new Promise((resolve, reject) => {
      roles.forEach(() => {
        if (roles.includes(req.user.role)) {
          resolve();
        }
      });
      reject("Unauthorized");
    });

    return checkRoles.then(() => next()).catch((err) => next(err));
  };
};
