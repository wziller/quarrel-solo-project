'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_name: {
        type: Sequelize.STRING(100)
      },
      user1_id: {
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      user2_id: {
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      question: {
        type: Sequelize.STRING(150)
      },
      user1_response: {
        type: Sequelize.TEXT
      },
      user2_response: {
        type: Sequelize.TEXT
      },
      user1_upvotes: {
        type: Sequelize.INTEGER
      },
      user2_upvotes: {
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: "Categories" },
      },
      deadline: {
        type: Sequelize.DATE
      },
      complete: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Questions');
  }
};
