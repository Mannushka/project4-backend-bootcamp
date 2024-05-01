const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = 3001;
app.use(cors());
app.use(express.json());
//import controllers
const UsersController = require("./controllers/usersController");
//import routers
const UsersRouter = require("./routers/usersRouter");

//import DB
const db = require("./db/models/index");
const { user } = db;
//initialize controllers
const usersController = new UsersController(user);
//initialize routers
const usersRouter = new UsersRouter(usersController).routes();

app.get("/", (req, res) => res.send("Hello world"));

// enable and use router
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
