"use strict";

let categoriesTitles = [
  "Automotive",
  "Movies",
  "Television",
  "Sports",
  "Animals",
  "Religion",
  "History",
  "Math",
  "Literature",
  "Video Games",
  "Anime",
  "Technology",
  "Politics",
  "Geography",
  "Food",
  "Random",
];
let categories = []
categoriesTitles.forEach(title => {
  categories.push({
    name:title,
    createdAt: new Date(),
    updatedAt: new Date()
  })
})

module.exports = {
  categories,
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', categories, {});
},

down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
}
};
