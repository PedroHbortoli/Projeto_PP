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


async function updateXP(req, res) {
    const { usuarioId, dificuldade } = req.body;

    if (!usuarioId || !dificuldade) {
        console.warn("Parâmetros inválidos:", { usuarioId, dificuldade });
        return res.status(400).json({ success: false, message: "Parâmetros inválidos." });
    }

    // Determinar quanto XP será adicionado
    let xpAdicional = 0;
    if (dificuldade === 'facil') xpAdicional = 10;
    else if (dificuldade === 'medio') xpAdicional = 20;
    else if (dificuldade === 'dificil') xpAdicional = 30;

    const queryXP = `
        UPDATE elo_usuarios
        SET xp_usuario = COALESCE(xp_usuario, 0) + ?
        WHERE id = ?;
    `;

    connection.query(queryXP, [xpAdicional, usuarioId], (err, results) => {
        if (err) {
            console.error("Erro ao atualizar XP:", err);
            return res.status(500).json({ success: false, message: "Erro ao atualizar XP." });
        }

        // Atualizar o elo com base no novo XP
        const queryElo = `
            UPDATE elo_usuarios
            SET elo = 
                CASE 
                    WHEN xp_usuario >= 1200 THEN 'esmeralda'
                    WHEN xp_usuario >= 800 THEN 'diamante'
                    WHEN xp_usuario >= 400 THEN 'platina'
                    WHEN xp_usuario >= 200 THEN 'ouro'
                    WHEN xp_usuario >= 100 THEN 'prata'
                    WHEN xp_usuario >= 50 THEN 'bronze'
                    ELSE 'ferro'
                END
            WHERE id = ?;
        `;

        connection.query(queryElo, [usuarioId], (err, results) => {
            if (err) {
                console.error("Erro ao atualizar elo:", err);
                return res.status(500).json({ success: false, message: "Erro ao atualizar elo." });
            }

            res.status(200).json({ success: true, message: "XP e elo atualizados com sucesso." });
        });
    });
}

async function getAllUsers(req, res) {
    const elo = req.query.elo || "ferro";

    const query = `
        SELECT u.id, u.nome, e.xp_usuario, e.elo
        FROM usuarios u
        JOIN elo_usuarios e ON u.id = e.id
        WHERE e.elo = ?
        ORDER BY e.xp_usuario DESC;
    `;

    connection.query(query, [elo], (err, results) => {
        if (err) {
            console.error("Erro ao buscar usuários:", err);
            return res.status(500).json({ success: false, message: "Erro ao buscar usuários." });
        }

        res.status(200).json({ success: true, users: results });
    });
}

module.exports = {
    storeElo,
    updateXP,
    getAllUsers
};