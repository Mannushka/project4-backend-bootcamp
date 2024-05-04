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
      "locations",
      [
        {
          location_name: "Central",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          location_name: "Sheung Wan",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          location_name: "Wan Chai",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          location_name: "Causeway Bay",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          location_name: "Tsim Sha Tsui",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          location_name: "Mong Kok",
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
    await queryInterface.bulkDelete("locations", null, {});
  },
};
