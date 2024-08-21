const connection = require('../config/db');

async function storeNivel(req, res) {
    const { descricao, qtdeRespostas, respostaCerta, respostas } = req.body;

    // Debug: Verificando dados recebidos no backend
    console.log("Dados recebidos: ", req.body);

    const perguntaQuery = "INSERT INTO pergunta (ds_descricao) VALUES (?)";
    connection.query(perguntaQuery, [descricao], (err, result) => {
        if (err) {
            console.error("Erro ao inserir pergunta:", err);
            return res.status(400).json({ success: false, message: "Erro ao inserir pergunta", error: err });
        }

        const idPergunta = result.insertId;

        let respostasQuery = "INSERT INTO resposta (id_pergunta, ds_resposta) VALUES ";
        const respostasValues = respostas.map(resposta => `(${idPergunta}, "${resposta}")`).join(", ");
        respostasQuery += respostasValues;

        connection.query(respostasQuery, (err, result) => {
            if (err) {
                console.error("Erro ao inserir respostas:", err);
                return res.status(400).json({ success: false, message: "Erro ao inserir respostas", error: err });
            }
            res.status(201).json({ success: true, message: "Nível inserido com sucesso!" });
        });
    });
}

module.exports = {
    storeNivel
};
