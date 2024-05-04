"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "food_categories",
      [
        {
          category_name: "Chinese",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_name: "Vietnamese",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_name: "Japanese",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_name: "Korean",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_name: "American",
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          category_name: "Italian",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("food_categories", null, {});
  },
};
