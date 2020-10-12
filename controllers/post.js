const { Post } = require("../db/models");

module.exports = {
  async create(req, res) {
    const post = await Post.create({ ...req.body });
    return res.status(201).send(post);
  },
};
