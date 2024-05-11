const BaseController = require("./baseController");

class FoodCategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getOne(req, res) {
    const { categoryId } = req.params;

    try {
      if (categoryId && !isNaN(categoryId)) {
        const category = await this.model.findByPk(categoryId);

        return res.json(category);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = FoodCategoriesController;

// && !isNaN(categoryId)
