"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "user_id",
      });
      this.belongsTo(models.restaurant, {
        foreignKey: "restaurant_id",
      });
      this.hasMany(models.review_photo, {
        foreignKey: "review_id",
      });
    }
  }
  Review.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },

      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "restaurants",
          key: "id",
        },
      },

      rating_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[1, 2, 3, 4, 5]],
        },
      },

      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [80],
            msg: "Your review must be at least 80 characters long.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "review",
      underscored: true,
    }
  );
  return Review;
};
