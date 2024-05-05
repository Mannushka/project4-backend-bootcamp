"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("restaurants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "locations",
          key: "id",
        },
      },
      food_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "food_categories",
          key: "id",
        },
      },
      price_category: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          isIn: [[1, 2, 3]],
        },
      },
      img_url: {
        type: Sequelize.STRING,
      },
      business_hours: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("restaurants");
  },
};
