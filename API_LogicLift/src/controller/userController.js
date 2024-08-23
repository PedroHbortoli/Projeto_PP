const connection = require('../config/db');
const dotenv = require('dotenv').config();
async function storeUser(req, res){

    const params = Array(
        req.body.name,
        req.body.email,
        req.body.password
    );

    console.log(req.body)

    const query = "INSERT INTO usuarios(nome, email, senha) VALUES(?, ?, ?)";
    

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

async function getUser(req, res) {
    const userId = req.query.id;  // Obtém o ID do usuário dos parâmetros de consulta

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "ID do usuário não fornecido"
        });
    }

    const query = "SELECT nome FROM usuarios WHERE id = ?";
    
    connection.query(query, [userId], (err, results) => {
        if (results.length > 0) {
            res.status(200).json({
                success: true,
                message: "Sucesso",
                data: results[0]  // Retorna o primeiro (e esperado único) resultado
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }
    });
}

async function loginUser(req, res){
    const { email, password } = req.body;

    const query = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    const params = [email, password];

    connection.query(query, params, (err, results) => {
        if(results.length > 0){
            res.status(200).json({
                success: true,
                message: "Login bem-sucedido",
                data: results[0] // Retorna o usuário encontrado
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Credenciais inválidas"
            });
        }
    });
}

module.exports = {
    storeUser,
    getUser,
    loginUser
}