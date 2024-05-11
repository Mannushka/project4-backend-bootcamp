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
//import routers
const UsersRouter = require("./routers/usersRouter");
const RestaurantsRouter = require("./routers/restaurantsRouter");
const FoodCategoriesRouter = require("./routers/foodCategoriesRouter");

//import DB
const db = require("./db/models/index");
const { user, restaurant, location, food_category } = db;
//initialize controllers
const usersController = new UsersController(user);
const restaurantsController = new RestaurantsController(
  restaurant,
  location,
  food_category
);
const foodCategoriesController = new FoodCategoriesController(food_category);

//initialize routers
const usersRouter = new UsersRouter(usersController).routes();
const restaurantsRouter = new RestaurantsRouter(restaurantsController).routes();
const foodCategoriesRouter = new FoodCategoriesRouter(
  foodCategoriesController
).routes();

app.get("/", (req, res) => res.send("Hello world"));

// enable and use router
app.use("/users", usersRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/categories", foodCategoriesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
