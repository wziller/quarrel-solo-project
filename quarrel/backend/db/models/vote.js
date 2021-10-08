"use strict";
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define(
    "Vote",
    {
      user1_vote: {
        type: DataTypes.BOOLEAN,
      },
      user2_vote: {
        type: DataTypes.BOOLEAN,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      question_id: {
        type: DataTypes.INTEGER,
        references: { model: "Questions" },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );
  Vote.associate = function (models) {
    Vote.belongsTo(models.User, { foreignKey: "user_id" });
    Vote.belongsTo(models.Question, { foreignKey: "question_id" });
  };
  return Vote;
};
