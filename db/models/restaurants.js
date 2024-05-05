"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.food_category, {
        foreignKey: "food_category_id",
      });
      this.belongsTo(models.location, {
        foreignKey: "location_id",
      });
    }
  }
  Restaurant.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },

      address: { type: DataTypes.STRING, allowNull: false },

      phone_number: DataTypes.STRING,

      email: DataTypes.STRING,

      website: DataTypes.STRING,

      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "locations",
          key: "id",
        },
      },

      food_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "food_categories",
          key: "id",
        },
      },

      price_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[1, 2, 3]],
        },
      },

      img_url: DataTypes.STRING,

      business_hours: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "restaurant",
    }
  );
  return Restaurant;
};
