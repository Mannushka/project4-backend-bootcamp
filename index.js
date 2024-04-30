const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = 3001;
app.use(cors());
//import controllers

//import routers

//import DB

//initialize controllers

//initialize routers

app.get("/", (req, res) => res.send("Hello world"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
