const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');   
const app = express();

app.set("port", process.env.PORT || 3003);
app.use(cors())
app.use(express.json());

module.exports = app;