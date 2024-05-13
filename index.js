const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = 3000;
app.use(cors());
app.use(express.json());
//import controllers
const UsersController = require("./controllers/usersController");
const RestaurantsController = require("./controllers/restaurantsController");
const FoodCategoriesController = require("./controllers/foodCategoriesController");
const LocationsController = require("./controllers/locationsController");
const ReviewsControllers = require("./controllers/reviewsController");
//import routers
const UsersRouter = require("./routers/usersRouter");
const RestaurantsRouter = require("./routers/restaurantsRouter");
const FoodCategoriesRouter = require("./routers/foodCategoriesRouter");
const LocationsRouter = require("./routers/locationsRouter");
const ReviewsRouter = require("./routers/reviewsRouter");

//import DB
const db = require("./db/models/index");
const { user, restaurant, location, food_category, review } = db;
//initialize controllers
const usersController = new UsersController(user);
const restaurantsController = new RestaurantsController(
  restaurant,
  location,
  food_category
);
const foodCategoriesController = new FoodCategoriesController(food_category);
const locationsController = new LocationsController(location);
const reviewsController = new ReviewsControllers(review, user, restaurant);

//initialize routers
const usersRouter = new UsersRouter(usersController).routes();
const restaurantsRouter = new RestaurantsRouter(restaurantsController).routes();
const foodCategoriesRouter = new FoodCategoriesRouter(
  foodCategoriesController
).routes();
const locationsRouter = new LocationsRouter(locationsController).routes();
const reviewsRouter = new ReviewsRouter(reviewsController).routes();

app.get("/", (req, res) => res.send("Hello world"));

// enable and use router
app.use("/users", usersRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/categories", foodCategoriesRouter);
app.use("/locations", locationsRouter);
app.use("/reviews", reviewsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
