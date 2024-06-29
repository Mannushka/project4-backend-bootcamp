const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller, checkJwt) {
    this.controller = controller;
    this.checkJwt = checkJwt;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get(
      "/find-user",
      this.checkJwt,
      this.controller.getUserByEmail.bind(this.controller)
    );
    router.post("/", this.controller.postUser.bind(this.controller));
    router.delete("/:userId", this.controller.deleteUser.bind(this.controller));
    router.post(
      "/:userId/my-restaurants",
      this.checkJwt,
      this.controller.createSavedRestaurant.bind(this.controller)
    );
    router.get(
      "/:userId/my-restaurants",
      this.checkJwt,
      this.controller.getSavedRestaurants.bind(this.controller)
    );
    router.delete(
      "/:userId/my-restaurants",
      this.checkJwt,
      this.controller.deleteSavedRestaurant.bind(this.controller)
    );

    router.get(
      "/:userId/check-saved-restaurant",
      this.checkJwt,
      this.controller.checkIfRestaurantSaved.bind(this.controller)
    );
    return router;
  }
}

module.exports = UsersRouter;
