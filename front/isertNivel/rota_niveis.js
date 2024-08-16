let button = document.getElementById("submitNivel");

button.onclick = async function () {

    let descricao = document.getElementById("descricao").value;
    let imagem = document.getElementById("imagem").value;
    let n_resposta = document.getElementById("n_resposta").value;
    let n_resposta_c = document.getElementById("n_resposta_c").value;

    // criar objeto com os dados
    let data = { descricao, imagem, n_resposta, n_resposta_c};

    console.log(data);

    alert("Nivel Inserido!");

    const response = await fetch("http://localhost:3003/API_LogicLift/store/nivel", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });
};