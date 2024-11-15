const connection = require('../config/db');
const dotenv = require('dotenv').config();
async function storeUser(req, res) {

    const params = Array(
        req.body.name,
        req.body.email,
        req.body.password
    );

    console.log(req.body)

    const query = "INSERT INTO usuarios(nome, email, senha) VALUES(?, ?, ?)";


    connection.query(query, params, (err, results) => {
        if (results) {
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
    // Logando o parâmetro recebido na requisição
    console.log("Requisição recebida com os parâmetros:", req.query);

    const userId = req.query.id; // Obtém o ID do usuário dos parâmetros de consulta

    if (!userId) {
        console.error("ID do usuário não fornecido");
        return res.status(400).json({
            success: false,
            message: "ID do usuário não fornecido"
        });
    }

    console.log("ID do usuário recebido:", userId);

    const query = `
    SELECT usuarios.id, usuarios.nome, usuarios.email, usuarios.foto_perfil, elo_usuarios.elo 
    FROM usuarios
    LEFT JOIN elo_usuarios ON usuarios.id = elo_usuarios.id
    WHERE usuarios.id = ?`;

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Erro ao executar a consulta:", err);
            return res.status(500).json({
                success: false,
                message: "Erro interno no servidor"
            });
        }

        // Logando os resultados da consulta
        console.log("Resultados da consulta:", results);

        if (results.length > 0) {
            console.log("Usuário encontrado:", results[0]);
            res.status(200).json({
                success: true,
                message: "Sucesso",
                data: results[0] // Retorna o primeiro (e esperado único) resultado
            });
        } else {
            console.warn("Usuário não encontrado com o ID:", userId);
            res.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }
    });
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const query = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    const params = [email, password];

    connection.query(query, params, (err, results) => {
        if (results.length > 0) {
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

async function updateUser(req, res) {
    const { id, nome, foto_perfil, senha } = req.body;

    const updates = [];
    if (nome) updates.push({ column: 'nome', value: nome });
    if (foto_perfil) updates.push({ column: 'foto_perfil', value: foto_perfil });
    if (senha) updates.push({ column: 'senha', value: senha });

    if (updates.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Nenhuma atualização fornecida"
        });
    }

    const query = `
        UPDATE usuarios 
        SET ${updates.map(u => `${u.column} = ?`).join(', ')} 
        WHERE id = ?`;

    const params = [...updates.map(u => u.value), id];

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Erro ao atualizar os dados:", err);
            return res.status(500).json({ success: false, message: "Erro interno no servidor" });
        }
        res.status(200).json({ success: true, message: "Dados atualizados com sucesso" });
    });
}

module.exports = {
    storeUser,
    getUser,
    loginUser,
    updateUser
}