document.addEventListener('DOMContentLoaded', async () => {
    let perguntasExibidas = []; // Array para armazenar as perguntas já exibidas

    async function carregarPergunta() {
        try {
            console.log("Iniciando a requisição para obter níveis...");
            const response = await fetch('http://localhost:3003/API_LogicLift/getNivel');
            
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Resposta recebida:", data);

            if (data.success) {
                const perguntasContainer = document.getElementById('perguntas-container');
                perguntasContainer.innerHTML = '';

                let perguntasDisponiveis = data.data.filter(pergunta => !perguntasExibidas.includes(pergunta.id));

                if (perguntasDisponiveis.length === 0) {
                    console.log("Todas as perguntas já foram exibidas.");
                    return; // Você pode mostrar uma mensagem de fim ou reiniciar as perguntas.
                }

                // Seleciona uma pergunta aleatória das disponíveis
                const perguntaSelecionada = perguntasDisponiveis[Math.floor(Math.random() * perguntasDisponiveis.length)];
                perguntasExibidas.push(perguntaSelecionada.id); // Adiciona ao array de perguntas exibidas

                const perguntaDiv = document.createElement('div');
                perguntaDiv.classList.add('pergunta');

                // Exibe a descrição da pergunta com a classe correta
                const descricao = document.createElement('p');
                descricao.classList.add('style-text');
                descricao.textContent = perguntaSelecionada.descricao;
                perguntaDiv.appendChild(descricao);

                // Exibe as respostas
                perguntaSelecionada.respostas.forEach((resposta, index) => {
                    const respostaDiv = document.createElement('div');
                    respostaDiv.classList.add('custom-radio');

                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = 'resposta';
                    radioInput.value = resposta.texto;
                    radioInput.id = `resposta${index}`;

                    const label = document.createElement('label');
                    label.setAttribute('for', `resposta${index}`);
                    label.textContent = resposta.texto;

                    respostaDiv.appendChild(radioInput);
                    respostaDiv.appendChild(label);

                    perguntaDiv.appendChild(respostaDiv);
                });

                perguntasContainer.appendChild(perguntaDiv);
            } else {
                console.error("Erro ao recuperar os níveis:", data.message);
            }
        } catch (error) {
            console.error("Erro ao carregar os níveis:", error);
        }
    }

    // Carrega a primeira pergunta ao carregar a página
    carregarPergunta();

    // Evento para carregar a próxima pergunta quando o botão for clicado
    document.getElementById('proximo').addEventListener('click', () => {
        const respostaSelecionada = document.querySelector('input[name="resposta"]:checked');
        if (respostaSelecionada) {
            carregarPergunta();
        } else {
            alert("Por favor, selecione uma resposta antes de continuar.");
        }
    });
});