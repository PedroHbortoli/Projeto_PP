document.addEventListener('DOMContentLoaded', async () => {
    let perguntasExibidas = [];
    let perguntasRespondidasIds = JSON.parse(localStorage.getItem('perguntasRespondidas')) || [];
    let nivelAtual = parseInt(localStorage.getItem('nivelAtual')) || 1; // Define o nível atual com base no localStorage

    const perguntasContainer = document.getElementById('perguntas-container');

    async function carregarPergunta() {
        try {
            const response = await fetch('http://localhost:3003/API_LogicLift/getNivel');
            
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            
            const data = await response.json();

            if (data.success) {
                perguntasContainer.innerHTML = '';

                // Filtra as perguntas que já foram respondidas
                let perguntasDisponiveis = data.data.filter(pergunta => 
                    !perguntasExibidas.includes(pergunta.id) && 
                    !perguntasRespondidasIds.includes(pergunta.id)
                );

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
                    radioInput.value = resposta.correta ? 'true' : 'false';
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
            const correta = selecionado.value === 'true';
            if (correta) {
                alert("Você acertou!");
            } else {
                alert("Você errou!");
            }
            
            perguntasRespondidasIds.push(perguntasExibidas[perguntasExibidas.length - 1]);
            localStorage.setItem('perguntasRespondidas', JSON.stringify(perguntasRespondidasIds)); // Salva os IDs no localStorage

            if (perguntasRespondidasIds.length >= 5 * nivelAtual) { // 5 perguntas por nível, ajustável
                alert(`Você completou o nível ${nivelAtual}.`);
                localStorage.setItem(`nivel${nivelAtual}Completado`, 'true'); // Marca o nível atual como concluído
                if (nivelAtual < 3) {
                    localStorage.setItem('nivelAtual', nivelAtual + 1); // Avança para o próximo nível
                }
                window.location.href = 'niveis.html'; // Redireciona para a página dos níveis
            } else {
                carregarPergunta();
            }
        } else {
            alert("Por favor, selecione uma resposta.");
        }
    });

    // Desbloqueia os níveis conforme o progresso
    function desbloquearNiveis() {
        for (let i = 2; i <= 3; i++) {
            const nivelCompletado = localStorage.getItem(`nivel${i - 1}Completado`) === 'true';
            const nivelBtn = document.getElementById(`lv${i}`);
            const cadeado = nivelBtn.querySelector('img');

            if (nivelCompletado && cadeado) {
                cadeado.classList.add('fade-out');
                cadeado.addEventListener('animationend', () => {
                    cadeado.style.display = 'none';
                    nivelBtn.textContent = `${i}`; // Exibe o número do nível no botão
                });

                nivelBtn.onclick = function() {
                    window.location.href = "./base.html"; // Redireciona para a próxima página do nível
                };
            } else if (!nivelCompletado) {
                nivelBtn.onclick = function() {
                    alert(`Complete o nível ${i - 1} para desbloquear este nível.`);
                };
            }
        }
    }

    desbloquearNiveis(); // Chama a função para desbloquear níveis na página dos níveis
});
