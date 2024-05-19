"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Saved_restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Saved_restaurant.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      restaurant_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "restaurants",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "saved_restaurant",
      underscored: true,
    }
  );
  return Saved_restaurant;
};
