const express = require("express");
const router = express.Router();

class FoodCategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:categoryId", this.controller.getOne.bind(this.controller));
    return router;
  }
}

module.exports = FoodCategoriesRouter;
