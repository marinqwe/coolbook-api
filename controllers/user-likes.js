const { UserLikes } = require("../db/models");

module.exports = {
  async getAll(req, res) {
    const likes = await UserLikes.findAll();

    return res.send(likes);
  },
  async userVote(req, res, next) {
    const { userVote, userId, postId } = req.body;
    console.log(req.body);
    //Check if user voted already
    const voted = await UserLikes.findOne({
      where: {
        userId,
        postId,
      },
    });
    if (!voted) {
      const newVote = await UserLikes.create({
        ...req.body,
        voteValue: userVote,
      });
      if (!newVote) return next("Operation failed, please try again.");
      return res.send("Vote submitted.");
    }
    if (voted) {
      if (voted.voteValue === userVote) {
        return res.send("You already voted!");
      } else {
        const newVote = await UserLikes.update(
          {
            ...req.body,
            voteValue: userVote,
          },
          {
            where: { userId, postId },
          }
        );
        if (!newVote) return next("Operation failed, please try again.");
        return res.send("Vote submitted.");
      }
    }
  },
};
