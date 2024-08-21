const connection = require('../config/db');
const dotenv = require('dotenv').config();
async function storeNivel(req, res){

    const params = Array(
        req.body.descricao,
        req.body.imagem,
        req.body.n_resposta,
        req.body.resposta_c
    );

    console.log(req.body)

    const query = "INSERT INTO atividades(descricao, imagem, n_resposta, resposta_certa) VALUES(?, ?, ?, ?)";
    

    connection.query(query, params, (err, results) => {
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
}

module.exports = {
    storeNivel
};