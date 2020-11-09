const { UserLikes } = require("../db/models");

module.exports = {
  async test(req, res) {
    const stuff = await UserLikes.findAll({
      where: {
        postId: 2,
      },
    });
    res.send(stuff);
  },
  async userVote(req, res, next) {
    const userVote = await UserLikes.create({ ...req.body });
    if (!userVote) return next("Vote failed.");
    return res.send(userVote);
  },
};
