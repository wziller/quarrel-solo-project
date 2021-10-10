
'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

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
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function (models) {
    User.hasMany(models.Vote, { foreignKey: "user_id" });
  };

  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, firstName, lastName, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };

   User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };

   User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username,firstName, lastName, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };


  return User;
};
