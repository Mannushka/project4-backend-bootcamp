"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Food_category.init(
    {
      category_name: DataTypes.STRING,
      allowNull: false,
    },
    {
      sequelize,
      modelName: "food_category",
      underscored: true,
    }
  );
  return Food_category;
};
