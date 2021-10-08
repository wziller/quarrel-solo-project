'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.VARCHAR,
    firstName: DataTypes.VARCHAR,
    lastname: DataTypes.VARCHAR,
    email: DataTypes.VARCHAR,
    hashedPassword: DataTypes.VARCHAR
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
