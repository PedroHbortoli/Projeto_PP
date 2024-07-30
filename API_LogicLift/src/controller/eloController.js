const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeElo(req, res) {
    console.log(req.body)
    const params = Array(
        req.body.dados
    );


    const query = "INSERT INTO elo_usuarios(elo) VALUES (?)";

    connection.query(query, params, (err, results) => {
        console.log(err, results)
        if(results){
            res
                .status(201)
                .json({
                    success: true,
                    message: "Sucess",
                    data: results
                })
        } else {
            res 
                .status(400)
                .json({
                    success: false,
                    message: "Error",
                    sql: err
                })
        }
    })
};

module.exports = {
    storeElo
};