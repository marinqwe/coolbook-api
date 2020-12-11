const { Comment, User } = require('../db/models');
const { commentValidation } = require('../helpers/validation');

module.exports = {
  async create(req, res, next) {
    const { error, value } = commentValidation({ content: req.body.content });
    if (error) return next(error.details[0].message);
    console.log('VALIDATED: ', value);

    const comment = await Comment.create({
      ...value,
      userId: req.body.userId,
      postId: req.body.postId,
    });
    if (!comment) return next('There was an error, please try again.');

    return res.status(201).send(comment);
  },
  async getAll(req, res) {
    const comments = await Comment.findAll({
      where: {
        postId: req.params.id,
      },
      include: {
        model: User,
        as: 'user',
      },
    });
    return res.status(200).send(comments);
  },
  async delete(req, res, next) {
    const comment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!comment) return next('Comment not found');
    await comment.destroy();
    return res.send(comment);
  },
};
