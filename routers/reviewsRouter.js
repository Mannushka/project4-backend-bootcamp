const express = require("express");
const router = express.Router();

class ReviewsController {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/", this.controller.postOne.bind(this.controller));
    return router;
  }
}

module.exports = ReviewsController;
