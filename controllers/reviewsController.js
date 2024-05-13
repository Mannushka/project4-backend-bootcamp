const BaseController = require("./baseController");

class ReviewsController extends BaseController {
  constructor(model, userModel, restaurantModel) {
    super(model);
    this.userModel = userModel;
    this.restaurantModel = restaurantModel;
  }

  async postOne(req, res) {
    console.log(this.userModel);
    console.log(this.restaurantModel);
    const { email, restaurant_id, rating_value, text } = req.body;
    try {
      if (email && restaurant_id && rating_value && text) {
        const user = await this.userModel.findOrCreate({
          where: { email: email },
        });
        const user_id = user[0].dataValues.id;
        if (user_id) {
          const review = await this.model.create({
            user_id,
            restaurant_id,
            rating_value,
            text,
          });
          return res.json(review);
        }
      }
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = ReviewsController;
