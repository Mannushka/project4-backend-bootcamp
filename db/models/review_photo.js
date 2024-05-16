"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review_photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.review, {
        foreignKey: "review_id",
      });
    }
  }
  Review_photo.init(
    {
      review_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "reviews",
          key: "id",
        },
      },
      photo_1: { allowNull: false, type: DataTypes.STRING },
      photo_2: DataTypes.STRING,
      photo_3: DataTypes.STRING,
      photo_4: DataTypes.STRING,
      photo_5: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "review_photo",
      underscored: true,
    }
  );
  return Review_photo;
};
