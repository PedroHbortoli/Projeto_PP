const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeElo(req, res) {
    console.log(req.body);

    const params = [
        req.body.elo,
        req.body.userId
    ];

    const query = "INSERT INTO elo_usuarios(elo, id) VALUES (?, ?)";

    connection.query(query, params, (err, results) => {
        console.log(err, results);
        if (results) {
            res.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Erro",
                sql: err
            });
        }
    });
}

module.exports = {
    storeElo
};