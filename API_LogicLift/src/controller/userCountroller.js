const connection = require('../config/db');
const dotenv = require('dotenv').config();
async function storeUser(req, res){

    const params = Array(
        req.body.name,
        req.body.email,
        req.body.senha
    );

    const query = "INSERT INTO usuarios(nome, email, senha) VALUES(?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if(results){
            res
                .status(201)
                .json({
                    sucess: true,
                    message: "Sucess",
                    data: results
                })
        } else {
            res 
                .status(400)
                .json({
                    sucess: false,
                    message: "Error",
                    data: err
                })
        }
    })
}

module.exports = {
    storeUser
}