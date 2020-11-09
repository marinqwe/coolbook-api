"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserLikes = sequelize.define(
    "UserLikes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      voteValue: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  UserLikes.associate = function (models) {
    UserLikes.belongsTo(models.Post, {
      as: "post",
    });
    UserLikes.belongsTo(models.User, {
      as: "user",
      onDelete: "CASCADE",
    });
  };
  return UserLikes;
};
