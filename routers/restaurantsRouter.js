const express = require("express");
const router = express.Router();

class RestaurantsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:restaurantId", this.controller.getOne.bind(this.controller));
    return router;
  }
}

module.exports = RestaurantsRouter;
