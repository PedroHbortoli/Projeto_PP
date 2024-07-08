// Inicializar o valor do contador como zero
let respostasCorretas = 0;

// Função para incrementar o contador de respostas corretas
function incrementarRespostasCorretas() {
    respostasCorretas++;
    atualizarMensagem(respostasCorretas);
}

// Função para atualizar a mensagem
function atualizarMensagem(contador) {
    const mensagemElement = document.getElementById('mensagem');
    if (contador <= 2) {
        mensagemElement.innerText = "Ferro";
    } else if (contador >= 3) {
        mensagemElement.innerText = "Bronze";
    }
}

// Exibir a mensagem inicial
atualizarMensagem(respostasCorretas);