const BaseController = require("./baseController");

class RestaurantsController extends BaseController {
  constructor(model, locationModel, food_categoryModel) {
    super(model);
    this.locationModel = locationModel;
    this.food_categoryModel = food_categoryModel;
  }

  async getOne(req, res) {
    const { restaurantId } = req.params;

    try {
      if (!isNaN(restaurantId)) {
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
