const BaseController = require("./baseController");
const { Op } = require("sequelize");

class RestaurantsController extends BaseController {
  constructor(model, locationModel, food_categoryModel) {
    super(model);
    this.locationModel = locationModel;
    this.food_categoryModel = food_categoryModel;
  }
  async getAll(req, res) {
    try {
      let restaurants = await this.model.findAll({
        include: [
          {
            model: this.locationModel,
            attributes: ["location_name"],
          },
          {
            model: this.food_categoryModel,
            attributes: ["category_name"],
          },
        ],
      });

      const { location, category, priceCategory } = req.query;

      const filters = {};

      if (location && typeof location === "string") {
        filters["$location.location_name$"] = {
          [Op.iLike]: `%${location}%`,
        };
      }

      if (category && typeof category === "string") {
        filters["$food_category.category_name$"] = {
          [Op.iLike]: `%${category}%`,
        };
      }

      if (priceCategory) {
        filters.price_category = Number(priceCategory);
      }

      if (Object.keys(filters).length > 0) {
        restaurants = await this.model.findAll({
          include: [
            {
              model: this.locationModel,
              attributes: ["location_name"],
            },
            {
              model: this.food_categoryModel,
              attributes: ["category_name"],
            },
          ],
          where: filters,
        });
      }

      return res.json(restaurants);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getOne(req, res) {
    const { restaurantId } = req.params;

    try {
      if (restaurantId) {
        const restaurant = await this.model.findByPk(restaurantId, {
          include: [
            {
              model: this.locationModel,
              attributes: ["location_name"],
            },
            {
              model: this.food_categoryModel,
              attributes: ["category_name"],
            },
          ],
        });

        return res.json(restaurant);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}
module.exports = RestaurantsController;
