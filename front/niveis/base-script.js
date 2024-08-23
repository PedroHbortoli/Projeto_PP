document.addEventListener('DOMContentLoaded', async () => {
    let perguntasExibidas = [];

    async function carregarPergunta() {
        try {
            const response = await fetch('http://localhost:3003/API_LogicLift/getNivel');
            
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            
            const data = await response.json();

            if (data.success) {
                const perguntasContainer = document.getElementById('perguntas-container');
                perguntasContainer.innerHTML = '';

                let perguntasDisponiveis = data.data.filter(pergunta => !perguntasExibidas.includes(pergunta.id));

                if (perguntasDisponiveis.length === 0) {
                    alert("Todas as perguntas já foram exibidas.");
                    return;
                }

                const perguntaSelecionada = perguntasDisponiveis[Math.floor(Math.random() * perguntasDisponiveis.length)];
                perguntasExibidas.push(perguntaSelecionada.id);

                const perguntaDiv = document.createElement('div');
                perguntaDiv.classList.add('pergunta');

                const descricao = document.createElement('p');
                descricao.classList.add('style-text');
                descricao.textContent = perguntaSelecionada.descricao;
                perguntaDiv.appendChild(descricao);

                perguntaSelecionada.respostas.forEach((resposta, index) => {
                    const respostaDiv = document.createElement('div');
                    respostaDiv.classList.add('custom-radio');

                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = 'resposta';
                    radioInput.value = resposta.correta ? 'true' : 'false'; // Define 'true' se a resposta for correta
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

    carregarPergunta();

    document.getElementById('proximo').addEventListener('click', () => {
        const selecionado = document.querySelector('input[name="resposta"]:checked');
        if (selecionado) {
            const correta = selecionado.value === 'true'; // Verifica se o valor da resposta é 'true'
            if (correta) {
                alert("Você acertou!");
            } else {
                alert("Você errou!");
            }
            carregarPergunta();
        } else {
            alert("Por favor, selecione uma resposta.");
        }
    });
});
