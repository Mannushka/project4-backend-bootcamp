const BaseController = require("./baseController");
const { Op, Sequelize } = require("sequelize");

class RestaurantsController extends BaseController {
  constructor(model, locationModel, food_categoryModel, reviewModel) {
    super(model);
    this.locationModel = locationModel;
    this.food_categoryModel = food_categoryModel;
    this.reviewModel = reviewModel;
  }

  async getAll(req, res) {
    const {
      page = 1,
      pageSize = 9,
      location = null,
      category = null,
      priceCategory = null,
      name = null,
      sortBy = "highest_rating",
    } = req.query;
    try {
      //filtering
      const filters = {};

      if (location && Array.isArray(location)) {
        filters["$location.location_name$"] = {
          [Op.or]: location.map((location) => ({
            [Op.iLike]: `%${location}%`,
          })),
        };
      } else if (location && typeof location === "string") {
        filters["$location.location_name$"] = {
          [Op.iLike]: `%${location}%`,
        };
      }

      if (category && Array.isArray(category)) {
        filters["$food_category.category_name$"] = {
          [Op.or]: category.map((category) => ({
            [Op.iLike]: `%${category}%`,
          })),
        };
      } else if (category && typeof category === "string") {
        filters["$food_category.category_name$"] = {
          [Op.iLike]: `%${category}%`,
        };
      }

      if (priceCategory) {
        if (Array.isArray(priceCategory)) {
          const isPriceCategoryValid = priceCategory.every((category) =>
            [1, 2, 3].includes(Number(category))
          );
          if (isPriceCategoryValid) {
            filters.price_category = {
              [Op.in]: priceCategory.map(Number),
            };
          }
        } else if (
          !isNaN(priceCategory) &&
          [1, 2, 3].includes(Number(priceCategory))
        ) {
          filters.price_category = Number(priceCategory);
        }
      }

      const modelsToInclude = [
        {
          model: this.reviewModel,
          attributes: ["rating_value"],
        },
        {
          model: this.locationModel,
          attributes: ["location_name"],
          where: filters["$location.location_name$"]
            ? { location_name: filters["$location.location_name$"] }
            : {},
        },
        {
          model: this.food_categoryModel,
          attributes: ["category_name"],
          where: filters["$food_category.category_name$"]
            ? { category_name: filters["$food_category.category_name$"] }
            : {},
        },
      ];

      const priceFilter = filters.price_category
        ? { price_category: filters.price_category }
        : {};

      const nameFilter = name ? { name: { [Op.iLike]: `%${name}%` } } : {};

      //sorting

      const order = [];

      if (sortBy === "highest_rating") {
        order.push([
          Sequelize.literal(
            '(SELECT CASE WHEN COUNT("rating_value") > 0 THEN AVG("rating_value") ELSE 0 END FROM reviews WHERE reviews.restaurant_id = Restaurant.id) DESC'
          ),
        ]);
      } else if (sortBy === "most_reviews") {
        order.push([
          Sequelize.literal(
            "(SELECT COUNT(id) FROM reviews WHERE reviews.restaurant_id = Restaurant.id) DESC"
          ),
        ]);
      } else if (sortBy === "most_recent_review") {
        order.push([
          Sequelize.literal(
            "(CASE WHEN (SELECT COUNT(*) FROM reviews WHERE reviews.restaurant_id = Restaurant.id) > 0 THEN (SELECT MAX(created_at) FROM reviews WHERE reviews.restaurant_id = Restaurant.id) END) DESC NULLS LAST"
          ),
        ]);
      }

      const { count, rows: restaurants } = await this.model.findAndCountAll({
        include: modelsToInclude,
        where: { ...priceFilter, ...nameFilter },
        limit: pageSize,
        offset: (page - 1) * pageSize,
        distinct: true,
        order,
      });

      return res.json({
        restaurants,
        totalCount: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: Number(page),
      });
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
            {
              model: this.reviewModel,
              attributes: ["rating_value"],
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
