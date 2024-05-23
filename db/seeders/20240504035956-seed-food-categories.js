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
    // await queryInterface.bulkDelete("food_categories", null, {});
    await queryInterface.bulkDelete("food_categories", {
      category_name: {
        [Sequelize.Op.in]: [
          "Chinese",
          "Vietnamese",
          "Japanese",
          "Korean",
          "American",
          "Italian",
        ],
      },
    });
  },
};
