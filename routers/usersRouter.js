const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get(
      "/finduser",
      this.controller.getUserByEmail.bind(this.controller)
    );
    router.post("/", this.controller.postUser.bind(this.controller));
    router.delete("/:userId", this.controller.deleteUser.bind(this.controller));

    return router;
  }
}

module.exports = UsersRouter;
