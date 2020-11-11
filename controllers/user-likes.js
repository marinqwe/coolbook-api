const { UserLikes } = require("../db/models");

module.exports = {
  async userVote(req, res, next) {
    const userVote = await UserLikes.create({ ...req.body });
    if (!userVote) return next("Vote failed.");
    return res.send(userVote);
  },
};
