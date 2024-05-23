"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "locations",
      [
        {
          location_name: "Sai Ying Pun",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          location_name: "Kennedy Town",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          location_name: "Sham Shui Po",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          location_name: "Admiralty",
          created_at: new Date(),
          updated_at: new Date(),
        },
        //  {
        //    location_name: "Tung Chung",
        //    created_at: new Date(),
        //    updated_at: new Date(),
        //  },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("locations", {
      location_name: {
        [Sequelize.Op.in]: [
          "Sai Ying Pun",
          "Kennedy Town",
          "Admiralty",
          "Sham Shui Po",
        ],
      },
    });
  },
};
