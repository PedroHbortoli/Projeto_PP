document.getElementById('submitNivel').onclick = async function () {
    let descricao = document.getElementById("descricao").value;
    let qtdeRespostas = document.getElementById("qtde_de_respota").value;
    let respostaCerta = document.getElementById("r_certa").value;

    let respostas = [];
    for (let i = 1; i <= qtdeRespostas; i++) {
        let resposta = document.getElementById(`resposta_${i}`).value;
        respostas.push(resposta);
    }

    let data = { descricao, qtdeRespostas, respostaCerta, respostas };
    
    // Debug: Verificando dados antes do envio
    console.log("Dados enviados: ", data);

    const response = await fetch("http://localhost:3003/API_LogicLift/store/nivel", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert("Nível inserido com sucesso!");
    } else {
        console.error("Erro ao inserir o nível:", response.status);
        alert("Erro ao inserir o nível.");
    }
};


document.getElementById('qtde_de_respota').addEventListener('input', function() {
    const container = document.getElementById('inputs-container');
    container.innerHTML = ''; // Limpa os inputs anteriores

    const qtde = this.value;

    for (let i = 1; i <= qtde; i++) {
        const formGroupDiv = document.createElement('div');
        formGroupDiv.classList.add('form-group'); // Cria a div com a classe form-group

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Resposta ${i}`;
        input.name = `resposta_${i}`;
        input.id = `resposta_${i}`; // Atribui um id único
        input.classList.add('form-control'); // Adiciona a classe form-control ao input

        formGroupDiv.appendChild(input); // Adiciona o input à div form-group
        container.appendChild(formGroupDiv); // Adiciona a div form-group ao container principal
    }
});