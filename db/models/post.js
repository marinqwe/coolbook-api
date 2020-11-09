"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      as: "user",
    });
    Post.hasMany(models.UserLikes, {
      foreignKey: "id",
      as: "userlikes",
    });
  };
  return Post;
};
