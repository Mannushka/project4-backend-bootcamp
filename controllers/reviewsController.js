const BaseController = require("./baseController");

class ReviewsController extends BaseController {
  constructor(model, userModel, restaurantModel) {
    super(model);
    this.userModel = userModel;
    this.restaurantModel = restaurantModel;
  }
  async getUserIdByEmail(userModel, email) {
    try {
      const user = await userModel.findOrCreate({ where: { email: email } });
      const user_id = user[0].dataValues.id;
      return user_id;
    } catch (err) {
      throw new Error(`Error retrieving user ID: ${err}`);
    }
  }

  validateEmail(email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }

  validateNumber(id) {
    return !isNaN(id);
  }

  async getAllReviewsForRestaurant(req, res) {
    const { restaurant_id } = req.query;
    try {
      if (!restaurant_id || !this.validateNumber(restaurant_id)) {
        return res
          .status(400)
          .json({ error: true, msg: "Invalid or missing restaurant ID." });
      }

      const reviews = await this.model.findAll({
        where: { restaurant_id: restaurant_id },
        include: [
          {
            model: this.userModel,
            attributes: ["first_name"],
          },
        ],
      });

      return res.json(reviews);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllReviewsByUser(req, res) {
    const { email } = req.query;
    try {
      if (!email || !this.validateEmail(email)) {
        return res
          .status(400)
          .json({ error: true, msg: "Invalid or missing user email." });
      }

      const user = await this.userModel.findOrCreate({
        where: { email: email },
      });

      const user_id = await this.getUserIdByEmail(this.userModel, email);

      if (!user_id || !this.validateNumber(user_id)) {
        return res
          .status(400)
          .json({ error: true, msg: "Invalid or missing user ID." });
      }

      const reviews = await this.model.findAll({
        where: { user_id: user_id },
      });

      return res.json(reviews);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async postOne(req, res) {
    const { email, restaurant_id, rating_value, text } = req.body;
    try {
      if (!email || !restaurant_id || !rating_value || !text) {
        return res
          .status(400)
          .json({ error: true, msg: "Some values are missing." });
      }

      if (!this.validateEmail(email)) {
        return res
          .status(400)
          .json({ error: true, msg: "Invalid email format." });
      }

      if (!this.validateNumber(rating_value)) {
        return res
          .status(400)
          .json({ error: true, msg: "Rating value must be a number." });
      }

      if (!this.validateNumber(restaurant_id)) {
        return res
          .status(400)
          .json({ error: true, msg: "Restaurant ID must be a number." });
      }

      if (text.length < 80) {
        return res.status(400).json({
          error: true,
          msg: "Review must be at least 80 characters long.",
        });
      }

      const user_id = await this.getUserIdByEmail(this.userModel, email);

      if (!user_id || !this.validateNumber(user_id)) {
        return res
          .status(400)
          .json({ error: true, msg: "Invalid or missing user ID." });
      }

      const review = await this.model.create({
        user_id,
        restaurant_id,
        rating_value,
        text,
      });

      return res.json(review);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // async getAllReviewsForRestaurant(req, res) {
  //   const { restaurant_id } = req.query;
  //   try {
  //     if (!restaurant_id) {
  //       return res
  //         .status(400)
  //         .json({ error: true, msg: "Restaurant ID is required." });
  //     }
  //     if (isNaN(restaurant_id)) {
  //       return res
  //         .status(400)
  //         .json({ error: true, msg: "Restaurant ID must be a number." });
  //     }

  //     const reviews = await this.model.findAll({
  //       where: { restaurant_id: restaurant_id },
  //     });
  //     return res.json(reviews);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }

  // async getAllReviewsByUser(req, res) {
  //   const { email } = req.query;
  //   try {
  //     if (!email) {
  //       return res
  //         .status(400)
  //         .json({ error: true, msg: "User email is required." });
  //     }
  //     const emailRegex = /^\S+@\S+\.\S+$/;
  //     if (!emailRegex.test(email)) {
  //       return res
  //         .status(400)
  //         .json({ error: true, msg: "Invalid email format." });
  //     }
  //     const user = await this.userModel.findOrCreate({
  //       where: { email: email },
  //     });

  //     const user_id = user[0].dataValues.id;
  //     if (!user_id) {
  //       return res
  //         .status(400)
  //         .json({ error: true, msg: "User ID is required." });
  //     }

  //     if (isNaN(user_id)) {
  //       return res
  //         .status(400)
  //         .json({ error: true, msg: "User ID must be a number." });
  //     }

  //     const reviews = await this.model.findAll({
  //       where: { user_id: user_id },
  //     });
  //     return res.json(reviews);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }

  // async postOne(req, res) {
  //   const { email, restaurant_id, rating_value, text } = req.body;
  //   try {
  //     if (!email || !restaurant_id || !rating_value || !text) {
  //       return res
  //         .status(400)
  //         .json({ error: true, msg: "Some values are missing." });
  //     }
  //     const emailRegex = /^\S+@\S+\.\S+$/;
  //     if (!emailRegex.test(email)) {
  //       return res
  //         .status(400)
  //         .json({ error: true, msg: "Invalid email format." });
  //     }
  //     if (isNaN(rating_value)) {
  //       return res
  //         .status(400)
  //         .json({ error: true, msg: "Rating value must be a number." });
  //     }
  //     if (isNaN(restaurant_id)) {
  //       return res
  //         .status(400)
  //         .json({ error: true, msg: "Restaurant ID must be a number." });
  //     }
  //     if (text.length < 80) {
  //       return res.status(400).json({
  //         error: true,
  //         msg: "Review must be at least 80 characters long.",
  //       });
  //     }
  //     const user = await this.userModel.findOrCreate({
  //       where: { email: email },
  //     });

  //     const user_id = user[0].dataValues.id;
  //     if (!user_id) {
  //       return res
  //         .status(400)
  //         .json({ error: true, msg: "User ID is required." });
  //     }

  //     if (isNaN(user_id)) {
  //       return res
  //         .status(400)
  //         .json({ error: true, msg: "User ID must be a number." });
  //     }
  //     const review = await this.model.create({
  //       user_id,
  //       restaurant_id,
  //       rating_value,
  //       text,
  //     });
  //     return res.json(review);
  //   } catch (err) {
  //     console.log(err.message);
  //     return res.status(400).json({ error: true, msg: err.message });
  //   }
  // }
}

module.exports = ReviewsController;
