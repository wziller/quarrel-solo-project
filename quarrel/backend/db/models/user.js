"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(25),
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Vote, { foreignKey: "user_id" });
  };
  return User;
};
