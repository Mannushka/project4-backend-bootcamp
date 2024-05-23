"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "food_categories",
      [
        {
          category_name: "Thai",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_name: "Indian",
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          category_name: "French",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_name: "Mexican",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("food_categories", {
      category_name: {
        [Sequelize.Op.in]: ["Thai", "Indian", "French", "Mexican"],
      },
    });
  },
};
