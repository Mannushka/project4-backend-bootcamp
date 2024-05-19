const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(
    model,
    restaurantModel,
    saved_restaurantModel,
    locationModel,
    food_categoryModel,
    reviewModel
  ) {
    super(model);
    this.restaurantModel = restaurantModel;
    this.saved_restaurantModel = saved_restaurantModel;
    this.locationModel = locationModel;
    this.food_categoryModel = food_categoryModel;
    this.reviewModel = reviewModel;
  }

  async postUser(req, res) {
    const { email, first_name, last_name } = req.body;
    try {
      const user = await this.model.create({
        email,
        first_name,
        last_name,
      });
      return res.json(user.id);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
  // async findOrPostUser(req, res) {
  //   const { email, first_name, last_name } = req.body;
  //   try {
  //     let user = await this.model.findOne({ where: { email } });
  //     if (user) {
  //       return res.json(user.id);
  //     }

  //     user = await this.model.create({
  //       email,
  //       first_name,
  //       last_name,
  //     });

  //     return res.json(user.id);
  //   } catch (err) {
  //     console.log(err.message);
  //     return res.status(400).json({ error: true, msg: err.message });
  //   }
  // }

  async getUserByEmail(req, res) {
    const { email } = req.query;
    console.log(email);

    try {
      const user = await this.model.findOne({
        where: { email: email },
      });

      // return res.json(user);
      if (user) {
        // res.status(200).send(`User found in DB`);
        res.json(user.id);
      } else {
        res.json(null);
      }
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async deleteUser(req, res) {
    const { userId } = req.params;

    try {
      await this.model.destroy({
        where: {
          id: userId,
        },
      });

      res.status(200).send(`Successfully deleted user at user id: ${userId}`);
    } catch (error) {
      console.error(error);
      res.status(418).send({ error: true, msg: error.message });
    }
  }

  async createSavedRestaurant(req, res) {
    const { restaurantId } = req.body;
    const { userId } = req.params;
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: "User id is missing or invalid" });
    }
    if (!restaurantId || isNaN(restaurantId)) {
      return res
        .status(400)
        .json({ message: "Restaurant id is missing or invalid" });
    }
    try {
      const user = await this.model.findByPk(userId);
      const restaurant = await this.restaurantModel.findByPk(restaurantId);

      if (!user || !restaurant) {
        return res
          .status(400)
          .json({ message: "User or restaurant not found" });
      }
      const existingSavedRestaurant = await this.saved_restaurantModel.findOne({
        where: { user_id: userId, restaurant_id: restaurantId },
      });

      if (existingSavedRestaurant) {
        return res
          .status(400)
          .json({ message: "Restaurant has already been previosly saved" });
      }
      const savedRestaurant = await this.saved_restaurantModel.create({
        user_id: userId,
        restaurant_id: restaurantId,
      });

      res.status(201).json(savedRestaurant);
    } catch (error) {
      console.error(error);
      // res.status(500).json({ message: "Internal server error" });
      res.status(418).json({ error: true, msg: error.message });
    }
  }

  async getSavedRestaurants(req, res) {
    const { userId } = req.params;
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: "User id is missing or invalid" });
    }

    try {
      // res.status(200).json(savedRestaurants);
      const user = await this.model.findByPk(userId, {
        include: [
          {
            model: this.restaurantModel,
            through: { attributes: [] }, // Exclude join table attributes
            attributes: [
              "id",
              "name",
              "address",
              "phone_number",
              "email",
              "website",
              "location_id",
              "food_category_id",
              "price_category",
              "img_url",
              "business_hours",
            ],
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
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ error: true, message: "User not found" });
      }

      const savedRestaurants = user.restaurants;

      res.status(200).json(savedRestaurants);
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: true, message: "Internal server error" });
      res.status(400).json({ error: true, msg: error.message });
    }
  }

  async deleteSavedRestaurant(req, res) {
    const { userId } = req.params;

    const { restaurantId } = req.query;

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: "User id is missing or invalid" });
    }
    if (!restaurantId || isNaN(restaurantId)) {
      return res
        .status(400)
        .json({ message: "Restaurant id is missing or invalid" });
    }
    try {
      const deletedCount = await this.saved_restaurantModel.destroy({
        where: { user_id: userId, restaurant_id: restaurantId },
      });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Saved restaurant not found" });
      }

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async checkIfRestaurantSaved(req, res) {
    const { userId } = req.params;
    const { restaurantId } = req.query;
    console.log(restaurantId);
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ message: "User id is missing or invalid" });
    }
    if (!restaurantId || isNaN(restaurantId)) {
      return res
        .status(400)
        .json({ message: "Restaurant id is missing or invalid" });
    }
    try {
      const user = await this.model.findByPk(userId);
      const restaurant = await this.restaurantModel.findByPk(restaurantId);

      if (!user || !restaurant) {
        return res
          .status(400)
          .json({ message: "User or restaurant not found" });
      }
      const existingSavedRestaurant = await this.saved_restaurantModel.findOne({
        where: { user_id: userId, restaurant_id: restaurantId },
      });
      const isRestaurantSaved = !!existingSavedRestaurant;

      return res.status(200).json({ isRestaurantSaved });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
module.exports = UsersController;
