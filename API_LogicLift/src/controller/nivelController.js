const connection = require('../config/db');

async function storeNivel(req, res) {
    const { descricao, qtdeRespostas, respostaCerta, respostas } = req.body;

    console.log("Dados recebidos: ", req.body);

    // Insere na tabela 'pergunta'
    const perguntaQuery = "INSERT INTO pergunta (ds_descricao) VALUES (?)";
    connection.query(perguntaQuery, [descricao], (err, result) => {
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

module.exports = {
    storeNivel
};
