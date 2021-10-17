"use strict";
const bcrypt = require("bcryptjs");
const faker = require("faker");

const fakeUsers = [
  {
    username: "Demo_User",
    firstName: "Demo",
    lastName: "User",
    email: "Demo_User@Quarrel.com",
    hashedPassword: bcrypt.hashSync("password"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

for (let i = 1; i <= 50; i++) {
  let newuser = {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync(`sadPassword&${i}`, 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  fakeUsers.push(newuser);
}

module.exports = {
  fakeUsers,
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", fakeUsers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
