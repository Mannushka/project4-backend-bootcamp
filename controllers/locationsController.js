const BaseController = require("./baseController");

class LocationsController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getAll(req, res) {
    try {
      const locations = await this.model.findAll({
        order: [["location_name", "ASC"]],
      });
      return res.json(locations);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = LocationsController;
