const { Post, UserLikes } = require("../db/models");
const { postValidation } = require("../helpers/validation");

module.exports = {
  async create(req, res, next) {
    const { error, value } = postValidation(req.body.post);
    if (error) return next(error.details[0].message);

    const post = await Post.create({
      ...value,
      userId: req.body.userId,
    });
    if (!post) return next("There was an error, please try again.");

    return res.status(201).send(post);
  },
  async getAll(req, res) {
    const posts = await Post.findAll({
      include: {
        model: UserLikes,
        as: "userlikes",
      },
    });
    return res.status(200).send(posts);
  },
  async getPost(req, res, next) {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: UserLikes,
        as: "userlikes",
      },
    });
    if (!post) return next("Post not found");
    return res.send(post);
  },
  async deletePost(req, res, next) {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) return next("Post not found");
    await post.destroy();
    return res.send(post);
  },
  async updatePost(req, res, next) {
    const { error, value } = postValidation(req.body);
    if (error) return next(error.details[0].message);
    const { title, content } = value;
    const id = req.params.id;

    const post = await Post.findOne({
      where: {
        id,
      },
    });
    if (!post) return next("Post not found");
    const updatedPost = await post.update(
      { title, content },
      {
        where: {
          id,
        },
      }
    );
    if (!updatedPost) return next("There was an error, please try again.");
    return res.send(updatedPost);
  },
};
