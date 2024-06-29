const express = require("express");
const router = express.Router();

class ReviewsController {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get(
      "/restaurant/:restaurantId",
      this.controller.getAllReviewsForRestaurant.bind(this.controller)
    );

    //protect the router!
    router.get(
      "/my-reviews",
      this.checkJwt,
      this.controller.getAllReviewsByUser.bind(this.controller)
    );
    router.post(
      "/",
      this.checkJwt,
      this.controller.postOne.bind(this.controller)
    );
    router.delete(
      "/:reviewId",
      this.checkJwt,
      this.controller.deleteReview.bind(this.controller)
    );
    return router;
  }
}

module.exports = ReviewsController;
