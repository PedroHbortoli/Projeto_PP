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
    // console.log("Requisição recebida com os parâmetros:", req.query);

    const userId = req.query.id; // Obtém o ID do usuário dos parâmetros de consulta

    if (!userId) {
        console.error("ID do usuário não fornecido");
        return res.status(400).json({
            success: false,
            message: "ID do usuário não fornecido"
        });
    }

    // console.log("ID do usuário recebido:", userId);

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
        // console.log("Resultados da consulta:", results);

        if (results.length > 0) {
            // console.log("Usuário encontrado:", results[0]);
            res.status(200).json({
                success: true,
                message: "Sucesso",
                data: results[0] // Retorna o primeiro (e esperado único) resultado
            });
        } else {
            // console.warn("Usuário não encontrado com o ID:", userId);
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

const path = require('path');
const fs = require('fs');

async function updateUser(req, res) {
    const { id, nome, senha } = req.body;
    const file = req.files && req.files.foto_perfil;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID do usuário não fornecido"
        });
    }

    const updates = [];
    if (nome) updates.push({ column: 'nome', value: nome });
    if (senha) updates.push({ column: 'senha', value: senha });

    let fileData = null;

    // Processar o arquivo se houver
    if (file) {
        console.log("Processando o arquivo de upload...");

        try {
            // Para armazenar como caminho da imagem:
            // const fileName = `profile_${id}_${Date.now()}${path.extname(file.name)}`;
            // const uploadPath = path.join(__dirname, 'uploads', fileName);
            // await file.mv(uploadPath);
            // fileData = `/uploads/${fileName}`;

            // Para armazenar como BLOB:
            fileData = file.data; // Dados binários da imagem
            updates.push({ column: 'foto_perfil', value: fileData });
            console.log("Imagem processada com sucesso.");
        } catch (err) {
            console.error("Erro ao processar a imagem:", err);
            return res.status(500).json({
                success: false,
                message: "Erro ao salvar a imagem"
            });
        }
    }

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
            console.error("Erro ao atualizar os dados no banco:", err);
            return res.status(500).json({ success: false, message: "Erro ao atualizar os dados no banco" });
        }

        res.status(200).json({
            success: true,
            message: "Dados atualizados com sucesso"
        });
    });
}


const getImage = (req, res) => {
    const { id } = req.params;

    const query = "SELECT foto_perfil FROM usuarios WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Erro ao buscar a imagem:", err);
            return res.status(500).json({ message: "Erro interno ao buscar a imagem" });
        }

        if (results.length === 0 || !results[0].foto_perfil) {
            return res.status(404).json({ message: "Imagem não encontrada" });
        }

        const imageBuffer = results[0].foto_perfil;

        // Verifica o tipo do arquivo dinamicamente (assumindo que você está armazenando o tipo)
        const fileType = "image/jpeg"; // Altere para o tipo armazenado no banco, se aplicável
        res.setHeader('Content-Type', fileType);
        res.send(imageBuffer);
    });
};

async function updateTutorial(req, res) {
    const { userId, tutorial } = req.body;

    const query = "UPDATE usuarios SET tutorial = ? WHERE id = ?";
    const params = [tutorial, userId];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: "Erro ao atualizar status do tutorial",
                sql: err,
            });
        }

        res.status(200).json({
            success: true,
            message: "Status do tutorial atualizado com sucesso",
        });
    });
}

async function checkTutorial(req, res) {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "ID do usuário não fornecido",
        });
    }

    const query = "SELECT tutorial FROM usuarios WHERE id = ?";
    connection.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao buscar status do tutorial",
                sql: err,
            });
        }

        if (results.length > 0) {
            res.status(200).json({
                success: true,
                message: "Status do tutorial recuperado com sucesso",
                data: results[0].tutorial,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Usuário não encontrado",
            });
        }
    });
}


module.exports = {
    storeUser,
    getUser,
    loginUser,
    updateUser,
    getImage,
    updateTutorial,
    checkTutorial
}