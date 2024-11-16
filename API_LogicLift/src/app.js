const express = require("express");
const fileUpload = require('express-fileupload');
const dotenv = require("dotenv").config();
const router = require('./routes/logicliftRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

// Configurações
app.set("port", process.env.PORT || 3003);
app.use(express.json());
app.use(fileUpload());
app.use(cors());

// Roteamento principal
app.use("/API_LogicLift", router);

module.exports = app;
