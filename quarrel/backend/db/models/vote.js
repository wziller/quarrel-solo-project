'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    user1_vote: DataTypes.BOOLEAN,
    user2_vote: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER
  }, {});
  Vote.associate = function(models) {
    // associations can be defined here
  };
  return Vote;
};