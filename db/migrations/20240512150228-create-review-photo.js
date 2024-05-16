"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("review_photos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      review_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "reviews",
          key: "id",
        },
      },
      photo_1: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      photo_2: {
        type: Sequelize.STRING,
      },
      photo_3: {
        type: Sequelize.STRING,
      },
      photo_4: {
        type: Sequelize.STRING,
      },
      photo_5: {
        type: Sequelize.STRING,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("review_photos");
  },
};
