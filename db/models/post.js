"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      upvotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      downvotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {}
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignkey: "postId",
      onDelete: "CASCADE",
    });
  };
  return Post;
};
