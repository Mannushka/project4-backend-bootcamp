const BaseController = require("./baseController");

class ReviewPhotosController extends BaseController {
  constructor(model, reviewModel) {
    super(model);
    this.reviewModel = reviewModel;
  }
}
module.exports = ReviewPhotosController;
