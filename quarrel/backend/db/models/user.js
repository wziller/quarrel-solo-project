"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        unique: true,
        allowNull: false,
        type: DataTypes.VARCHAR(25),
      },
      firstName: {
        allowNull: false,
        type: DataTypes.VARCHAR(20),
      },
      lastname: {
        allowNull: false,
        type: DataTypes.VARCHAR(20),
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.VARCHAR,
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.VARCHAR,
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
