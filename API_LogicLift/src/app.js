const express = require("express");
const dotenv = require("dotenv").config();
const router = require('./routes/logicliftRoutes');
const cors = require('cors');
const app = express();


app.set("port", process.env.PORT || 3003);
app.use(express.json());
app.use(cors());
app.use("./API_LogicLift/src", router);

module.exports = app;