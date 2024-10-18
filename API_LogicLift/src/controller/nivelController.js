const connection = require('../config/db');

async function storeNivel(req, res) {
    const { descricao, qtdeRespostas, respostaCerta, dificuldade, respostas } = req.body; // Inclui dificuldade

    console.log("Dados recebidos: ", req.body);

    // Insere na tabela 'pergunta' com o campo dificuldade
    const perguntaQuery = "INSERT INTO pergunta (ds_descricao, ds_dificuldade) VALUES (?, ?)"; // Ajusta query
    connection.query(perguntaQuery, [descricao, dificuldade], (err, result) => {
        if (err) {
            console.error("Erro ao inserir pergunta:", err);
            return res.status(400).json({ success: false, message: "Erro ao inserir pergunta", error: err });
        }

        const idPergunta = result.insertId;

        // Insere as respostas na tabela 'resposta' com 'V' ou 'F' para 'ds_certo'
        let respostasQuery = "INSERT INTO resposta (id_pergunta, ds_resposta, ds_certo) VALUES ";
        const respostasValues = respostas.map((resposta, index) => {
            let dsCerto = (index + 1) == parseInt(respostaCerta) ? 'V' : 'F';   
            return `(${idPergunta}, "${resposta}", "${dsCerto}")`;
        }).join(", ");
        respostasQuery += respostasValues;

        console.log("Comando SQL para Respostas:", respostasQuery);

        connection.query(respostasQuery, (err, result) => {
            if (err) {
                console.error("Erro ao inserir respostas:", err);
                return res.status(400).json({ success: false, message: "Erro ao inserir respostas", error: err });
            }
            res.status(201).json({ success: true, message: "Nível inserido com sucesso!" });
        });
    });
}

async function getNivel(req, res) {
    const query = `
        SELECT 
            pergunta.id_perguntas AS id, 
            pergunta.ds_descricao AS descricao,
            resposta.ds_resposta AS texto,
            CASE WHEN resposta.ds_certo = 'V' THEN true ELSE false END AS correta
        FROM 
            pergunta
        JOIN 
            resposta 
        ON 
            resposta.id_pergunta = pergunta.id_perguntas
        ORDER BY 
            pergunta.id_perguntas ASC, 
            resposta.id_respostas ASC;
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao recuperar níveis:', err);
            return res.status(400).json({
                success: false,
                message: "Erro ao recuperar níveis!",
                sql: err
            });
        }

        // Reestruturar os dados para o formato necessário
        const data = results.reduce((acc, row) => {
            const existingQuestion = acc.find(q => q.id === row.id);
            const resposta = { texto: row.texto, correta: row.correta };

            if (existingQuestion) {
                existingQuestion.respostas.push(resposta);
            } else {
                acc.push({
                    id: row.id,
                    descricao: row.descricao,
                    respostas: [resposta]
                });
            }

            return acc;
        }, []);

        res.status(200).json({
            success: true,
            message: "Níveis recuperados com sucesso!",
            data: data
        });
    });
}

module.exports = {
    storeNivel,
    getNivel
};
