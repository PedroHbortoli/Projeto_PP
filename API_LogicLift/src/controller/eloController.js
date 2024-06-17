const connection = require('../config/db');
const dotenv = require('dotenv').config();
async function storeElo(req, res) {

    const elo = Array(
        req.body.dados
    );

    console.log(elo)

    const query = "INSERT INTO elo_usuarios(elo) VALUES (?)";
};

module.exports = {
    storeElo
};