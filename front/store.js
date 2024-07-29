
let respostasCorretas = localStorage.getItem('respostasCorretas') ? parseInt(localStorage.getItem('respostasCorretas'), 10) : 0;

console.log(respostasCorretas);
// Função para incrementar o contador de respostas corretas
function incrementarRespostasCorretas() {
    respostasCorretas++;
    localStorage.setItem('respostasCorretas', respostasCorretas);
    atualizarMensagem(respostasCorretas);
}

// Função para atualizar a mensagem
function atualizarMensagem(contador) {
    const mensagemElement = document.getElementById('mensagem');
    console.log(mensagemElement);
    if (contador <= 2) {
        mensagemElement.innerHTML = "Ferro";
    } else if (contador >= 3) {
        mensagemElement.innerText = "Bronze";
    }
}

// Exibir a mensagem inicial
document.addEventListener('DOMContentLoaded', () => {
    atualizarMensagem(respostasCorretas);
    window.incrementarRespostasCorretas = incrementarRespostasCorretas;
});
    