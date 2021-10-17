"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      body: {
        type: DataTypes.TEXT,
      },
      question_id: {
        type: DataTypes.INTEGER,
        references: { model: "Questions" },
      },
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: "user_id" });
    Comment.belongsTo(models.Question, { foreignKey: "question_id" });
  };
  return Comment;
};
