const BaseController = require("./baseController");
const { sequelize } = require("../index");

class ReviewsController extends BaseController {
  constructor(model, userModel, restaurantModel, review_photoModel) {
    super(model);
    this.userModel = userModel;
    this.restaurantModel = restaurantModel;
    this.review_photoModel = review_photoModel;
  }
  async getUserIdByEmail(userModel, email) {
    try {
      const user = await userModel.findOne({ where: { email: email } });
      const user_id = user.dataValues.id;
      return user_id;
    } catch (err) {
      console.log(err.message);
      throw new Error(`Error retrieving user ID: ${err}`);
    }
  }

  //does not work
  async checkIfUserExists(userId) {
    try {
      const user = await this.userModel.findByPk(userId);
      return user;
    } catch (error) {
      console.log(error.message);
      throw new Error("Error checking if user exists: " + error);
    }
  }

  validateEmail(email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }

  validateNumber(id) {
    return !isNaN(id);
  }

  async getAll(req, res) {
    try {
      const { page = 1, pageSize = 9 } = req.query;

      const { count, rows: reviews } = await this.model.findAndCountAll({
        include: [
          {
            model: this.userModel,
            attributes: ["first_name"],
          },
          {
            model: this.review_photoModel,
            attributes: ["id", "photo"],
          },
          {
            model: this.restaurantModel,
            attributes: ["name"],
          },
        ],

        limit: pageSize,
        offset: (page - 1) * pageSize,
        distinct: true,
        order: [["created_at", "DESC"]],
      });

      return res.json({
        reviews,
        totalCount: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: Number(page),
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  async getAllReviewsForRestaurant(req, res) {
    const { restaurantId } = req.params;
    try {
      if (!restaurantId || !this.validateNumber(restaurantId)) {
        return res
          .status(400)
          .json({ error: true, msg: "Invalid or missing restaurant ID." });
      }

      const reviews = await this.model.findAll({
        where: { restaurant_id: restaurantId },
        include: [
          {
            model: this.userModel,
            attributes: ["first_name"],
          },
          {
            model: this.review_photoModel,
            attributes: ["id", "photo"],
          },
          {
            model: this.restaurantModel,
            attributes: ["name"],
          },
        ],
        order: [["created_at", "DESC"]],
      });

      return res.json(reviews);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllReviewsByUser(req, res) {
    // const { email } = req.query;
    const { userId } = req.query;
    try {
      // if (!email || !this.validateEmail(email)) {
      //   return res
      //     .status(400)
      //     .json({ error: true, msg: "Invalid or missing user email." });
      // }

      // const user = await this.userModel.findOrCreate({
      //   where: { email: email },
      // });

      // const userId = await this.getUserIdByEmail(this.userModel, email);

      if (!userId || !this.validateNumber(userId)) {
        return res
          .status(400)
          .json({ error: true, msg: "Invalid or missing user ID." });
      }

      // const isUserInDb = await checkIfUserExists(this.userModel, userId);
      // if (!isUserInDb) {
      //   return res.status(404).json({ error: true, msg: "User not found." });
      // }
      // console.log(await checkIfUserExists(userId));
      const user = await this.userModel.findByPk(userId);
      if (!user) {
        throw new Error("User does not exist");
      }
      const reviews = await this.model.findAll({
        where: { user_id: userId },
        include: [
          {
            model: this.userModel,
            attributes: ["first_name"],
          },
          {
            model: this.review_photoModel,
            attributes: ["id", "photo"],
          },
          {
            model: this.restaurantModel,
            attributes: ["name"],
          },
        ],
        order: [["created_at", "DESC"]],
      });

      return res.json(reviews);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async postOne(req, res) {
    const { userId, restaurantId, rating_value, text, photoURLs } = req.body;
    try {
      const result = await sequelize.transaction(async (t) => {
        if (!userId || !restaurantId || !rating_value || !text) {
          return res
            .status(400)
            .json({ error: true, msg: "Some values are missing." });
        }

        // if (!this.validateEmail(email)) {
        //   return res
        //     .status(400)
        //     .json({ error: true, msg: "Invalid email format." });
        // }

        if (!this.validateNumber(userId)) {
          return res
            .status(400)
            .json({ error: true, msg: "User ID must be a number." });
        }
        const user = await this.userModel.findByPk(userId);
        if (!user) {
          throw new Error("User does not exist");
        }
        if (!this.validateNumber(rating_value)) {
          return res
            .status(400)
            .json({ error: true, msg: "Rating value must be a number." });
        }

        if (!this.validateNumber(restaurantId)) {
          return res
            .status(400)
            .json({ error: true, msg: "Restaurant ID must be a number." });
        }
        const restaurant = await this.restaurantModel.findByPk(userId);
        if (!restaurant) {
          throw new Error("Restaurant does not exist");
        }

        if (text.length < 80) {
          return res.status(400).json({
            error: true,
            msg: "Review must be at least 80 characters long.",
          });
        }

        const review = await this.model.create(
          {
            user_id: userId,
            restaurant_id: restaurantId,
            rating_value: rating_value,
            text: text,
          },
          { transaction: t }
        );

        if (Array.isArray(photoURLs) && photoURLs.length > 0) {
          const review_id = review.id;
          const reviewPhotos = await this.review_photoModel.bulkCreate(
            photoURLs.map((photoURL) => ({
              review_id,
              photo: photoURL,
            })),
            { transaction: t }
          );
        }

        return review;
      });

      return res.json(result);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async deleteReview(req, res) {
    const { userId } = req.query;
    const { reviewId } = req.params;

    try {
      if (!userId || !this.validateNumber(userId)) {
        return res
          .status(400)
          .json({ error: true, msg: "Invalid or missing user ID." });
      }

      if (!reviewId || !this.validateNumber(reviewId)) {
        return res
          .status(400)
          .json({ error: true, msg: "Invalid or missing review ID." });
      }

      const review = await this.model.findOne({
        where: { id: reviewId, user_id: userId },
      });

      if (!review) {
        return res
          .status(404)
          .json({ error: true, msg: "Review not found for the user." });
      }

      await review.destroy();
      const isReviewDeleted = await this.model.findOne({
        where: { id: reviewId, user_id: userId },
      });
      console.log(isReviewDeleted);
      if (!isReviewDeleted) {
        return res.json({ success: true, msg: "Review deleted successfully." });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

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
