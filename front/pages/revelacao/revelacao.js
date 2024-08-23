// Obtém o número de respostas corretas do localStorage
let contador = localStorage.getItem('respostasCorretas', localStorage.getItem('respostasCorretas') ? parseInt(localStorage.getItem('respostasCorretas'), 10) : 0);

// Determina o elo com base no número de respostas corretas
let elo = contador <= 2 ? "Ferro" : "Bronze";
document.getElementById('mensagem').innerText = elo;

// Supomos que o ID do usuário está armazenado no localStorage após o login
const userId = localStorage.getItem('userId');

// Função para enviar o elo e o ID do usuário ao banco de dados
async function handleSubnit(event) {
    event.preventDefault();

    if (!userId) {
        console.error("Usuário não logado. ID não encontrado.");
        alert("Erro: Usuário não logado.");
        return;
    }

    const data = {
        userId: userId, // Envia o ID do usuário logado
        elo: elo // Envia o elo determinado
    };

    const response = await fetch("http://localhost:3003/API_LogicLift/store/elo", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        window.location.href = "../../infoPage.html"; // Redireciona para a página desejada
    } else {
        window.location.href = "../../infoPage.html"; // Redireciona para a página desejada
    }
}

// Adiciona o evento de clique ao botão de envio
const next = document.getElementById("submit_elo");
next.addEventListener('click', handleSubnit);