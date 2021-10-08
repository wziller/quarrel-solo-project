'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        unique:true,
        allowNull: false,
        type: Sequelize.VARCHAR(25)
      },
      firstName: {
        allowNull: false,
        type: Sequelize.VARCHAR(20)
      },
      lastname: {
        allowNull: false,
        type: Sequelize.VARCHAR(20)
      },
      email: {
        unique:true,
        allowNull: false,
        type: Sequelize.VARCHAR
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.VARCHAR
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
