module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      as: "user",
    });
    Comment.belongsTo(models.Post, {
      as: "post",
    });
  };
  return Comment;
};
