const express = require("express");
const router = express.Router();

class LocationsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    return router;
  }
}

module.exports = LocationsRouter;
