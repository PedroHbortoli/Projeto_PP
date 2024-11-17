document.addEventListener('DOMContentLoaded', async () => {
    const perguntasContainer = document.getElementById('perguntas-container');
    const proximoBtn = document.getElementById('proximo');
    let tarefaDiariaFeita = localStorage.getItem('tarefaDiariaFeita') === 'true';
    let timerInterval;

    if (tarefaDiariaFeita) {
        alert("Você já completou a tarefa diária de hoje.");
        window.location.href = 'niveis.html'; // Redireciona de volta para a página de níveis
        return;
    }

    async function carregarTarefaDiaria() {
        try {
            clearInterval(timerInterval); // Limpa qualquer timer ativo
            iniciarTimer(); // Inicia o timer para a pergunta

            const response = await fetch('http://localhost:3003/API_LogicLift/getNivel');
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            
            const data = await response.json();
            if (data.success && data.data && data.data.length > 0) {
                perguntasContainer.innerHTML = '';

                const pergunta = data.data[0]; // Assume que a tarefa diária seja sempre a primeira pergunta do array

                const perguntaDiv = document.createElement('div');
                perguntaDiv.classList.add('pergunta');

                const descricao = document.createElement('p');
                descricao.classList.add('style-text');
                descricao.textContent = pergunta.descricao;
                perguntaDiv.appendChild(descricao);

                pergunta.respostas.forEach((resposta, index) => {
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
                console.error("Erro ao recuperar a tarefa diária:", data.message);
                alert("Erro ao carregar a tarefa diária. Tente novamente mais tarde.");
            }
        } catch (error) {
            console.error("Erro ao carregar a tarefa diária:", error);
            alert("Erro ao carregar a tarefa diária. Tente novamente mais tarde.");
        }
    }

    function iniciarTimer() {
        let tempoRestante = 15; // Tempo em segundos
        proximoBtn.textContent = `Responder (${tempoRestante}s)`;

        timerInterval = setInterval(() => {
            tempoRestante -= 1;
            proximoBtn.textContent = `Responder (${tempoRestante}s)`;

            if (tempoRestante <= 0) {
                clearInterval(timerInterval);
                alert("Tempo esgotado! Resposta considerada incorreta.");
                finalizarTarefa(false); // Considera a resposta como incorreta
            }
        }, 1000);
    }

    async function finalizarTarefa(correta) {
        if (correta) {
            alert("Você acertou! XP adicionado!");

            try {
                const usuarioId = localStorage.getItem('userId');
                if (!usuarioId) {
                    throw new Error("ID do usuário não encontrado no localStorage.");
                }

                await fetch('http://localhost:3003/API_LogicLift/updateXP', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        usuarioId: usuarioId,
                        dificuldade: "facil",
                    }),
                });
                console.log("XP atualizado com sucesso.");
            } catch (error) {
                console.error("Erro ao atualizar XP:", error.message);
            }
        } else {
            alert("Você errou! Tente novamente amanhã.");
        }

        localStorage.setItem('tarefaDiariaFeita', 'true'); // Marca a tarefa diária como feita
        window.location.href = 'niveis.html'; // Redireciona para a página de níveis após a conclusão
    }

    proximoBtn.addEventListener('click', () => {
        const selecionado = document.querySelector('input[name="resposta"]:checked');
        clearInterval(timerInterval); // Para o timer ao clicar no botão

        if (selecionado) {
            const correta = selecionado.value === 'true';
            finalizarTarefa(correta);
        } else {
            alert("Por favor, selecione uma resposta.");
        }
    });

    carregarTarefaDiaria(); // Carrega a tarefa diária ao carregar a página
});