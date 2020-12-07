const { Comment } = require("../db/models");
const { commentValidation } = require("../helpers/validation");

module.exports = {
  async create(req, res, next) {
    const { error, value } = commentValidation(req.body.comment);
    if (error) return next(error.details[0].message);

    const comment = await Comment.create({
      ...value,
      userId: req.body.userId,
      postId: req.body.postId,
    });
    if (!comment) return next("There was an error, please try again.");

    return res.status(201).send(comment);
  },
  async getAll(req, res) {
    const comments = await Comment.findAll();
    return res.status(200).send(comments);
  },
  async get(req, res, next) {
    return res.send("Yo");
  },
};
