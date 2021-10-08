"use strict";
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      question_name: {
        type: DataTypes.VARCHAR(100),
      },
      user1_id: {
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      user2_id: {
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      question: {
        type: DataTypes.VARCHAR(150),
      },
      user1_response: {
        type: DataTypes.TEXT,
      },
      user2_response: {
        type: DataTypes.TEXT,
      },
      user1_upvotes: {
        type: DataTypes.INTEGER,
      },
      user2_upvotes: {
        type: DataTypes.INTEGER,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: { model: "Categories" },
      },
      deadline: {
        type: DataTypes.DATE,
      },
      complete: {
        type: DataTypes.BOOLEAN,
      },
    },
    {}
  );
  Question.associate = function (models) {
    Question.belongsTo(models.User, { foreignKey: "user1_id" });
    Question.belongsTo(models.User, { foreignKey: "user2_id" });
    Question.belongsTo(models.Category, { foreignKey: "category_id" });
  };
  return Question;
};
