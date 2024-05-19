"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.review, {
        foreignKey: "user_id",
      });
      this.belongsToMany(models.restaurant, { through: "saved_restaurants" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: { args: true, msg: "Wrong email format!" } },
      },
      first_name: {
        type: DataTypes.STRING,
        validate: {
          validCharacters: function (value) {
            if (!/^[A-Za-z\-]+$/.test(value)) {
              throw new Error(
                "First name can only contain letters and dashes (-)"
              );
            }
          },
        },
      },

      last_name: {
        type: DataTypes.STRING,
        validate: {
          validCharacters: function (value) {
            if (!/^[A-Za-z\-]+$/.test(value)) {
              throw new Error(
                "Last name can only contain letters and dashes (-)"
              );
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
