const BaseController = require("./baseController");

class FoodCategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }
  async getAll(req, res) {
    try {
      const categories = await this.model.findAll({
        order: [["category_name", "ASC"]],
      });
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  async getOne(req, res) {
    const { categoryId } = req.params;

    try {
      if (categoryId && !isNaN(categoryId)) {
        const category = await this.model.findByPk(categoryId);

        return res.json(category.category_name);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = FoodCategoriesController;
