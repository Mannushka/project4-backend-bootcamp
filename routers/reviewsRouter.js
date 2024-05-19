const express = require("express");
const router = express.Router();

class ReviewsController {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get(
      "/",
      this.controller.getAllReviewsForRestaurant.bind(this.controller)
    );

    //protect the router!
    router.get(
      "/my-reviews",
      this.controller.getAllReviewsByUser.bind(this.controller)
    );
    router.post("/", this.controller.postOne.bind(this.controller));
    router.delete(
      "/:reviewId",
      this.controller.deleteReview.bind(this.controller)
    );
    return router;
  }
}

module.exports = ReviewsController;
