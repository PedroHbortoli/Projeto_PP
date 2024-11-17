document.addEventListener('DOMContentLoaded', async () => {
    let perguntasExibidas = [];
    let nivelAtual = parseInt(localStorage.getItem('nivelAtual')) || 1;
    let acertos = 0;
    let erros = 0;
    let timerInterval;

    const perguntasContainer = document.getElementById('perguntas-container');
    const proximoBtn = document.getElementById('proximo');

    async function carregarPergunta() {
        try {
            clearInterval(timerInterval); // Limpa qualquer timer existente
            iniciarTimer(); // Inicia um novo timer

            const response = await fetch('http://localhost:3003/API_LogicLift/getNivel');
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                perguntasContainer.innerHTML = '';

                let perguntasDisponiveis = data.data.filter(pergunta =>
                    !perguntasExibidas.includes(pergunta.id)
                );

                if (perguntasDisponiveis.length === 0) {
                    alert("Não há mais perguntas disponíveis para este nível.");
                    window.location.href = 'niveis.html';
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
                console.error("Erro ao carregar as perguntas:", data.message);
            }
        } catch (error) {
            console.error("Erro ao carregar as perguntas:", error);
        }
    }

    function iniciarTimer() {
        let tempoRestante = 15; // Tempo em segundos
        proximoBtn.textContent = `Próximo (${tempoRestante}s)`;

        timerInterval = setInterval(() => {
            tempoRestante -= 1;
            proximoBtn.textContent = `Próximo (${tempoRestante}s)`;

            if (tempoRestante <= 0) {
                clearInterval(timerInterval);
                alert("Tempo esgotado! Resposta considerada incorreta.");
                erros++;
                verificarProgresso();
            }
        }, 1000);
    }

    function verificarProgresso() {
        if (erros >= 3) {
            alert("Você errou muitas perguntas. Voltando aos níveis.");
            window.location.href = 'niveis.html'; // Redireciona para a página de níveis
            return;
        }

        if (acertos + erros === 5) {
            if (acertos >= 3) {
                alert(`Você completou o nível ${nivelAtual}!`);
                localStorage.setItem(`nivel${nivelAtual}Completado`, 'true');
                localStorage.setItem('nivelAtual', nivelAtual + 1);
                window.location.href = 'niveis.html';
            } else {
                alert("Você não atingiu o mínimo de acertos. Voltando aos níveis.");
                window.location.href = 'niveis.html'; // Redireciona para a página de níveis
            }
        } else {
            carregarPergunta();
        }
    }

    proximoBtn.addEventListener('click', () => {
        const selecionado = document.querySelector('input[name="resposta"]:checked');
        clearInterval(timerInterval); // Para o timer ao selecionar uma resposta

        if (selecionado) {
            const correta = selecionado.value === 'true';
            if (correta) {
                acertos++;
                alert("Você acertou!");
            } else {
                erros++;
                alert("Você errou!");
            }
        } else {
            alert("Por favor, selecione uma resposta.");
            return;
        }

        verificarProgresso(); // Verifica se o usuário pode continuar
    });

    carregarPergunta(); // Carrega a primeira pergunta ao iniciar a página

    document.getElementById('proximo').addEventListener('click', async () => {
        const selecionado = document.querySelector('input[name="resposta"]:checked');
        if (selecionado) {
            const correta = selecionado.value === 'true';
            const dificuldade = "facil";

            if (correta) {

                try {
                    const usuarioId = localStorage.getItem('userId'); // Certifique-se de que é a chave correta
                    if (!usuarioId) {
                        throw new Error("ID do usuário não encontrado no localStorage.");
                    }
                    
                    console.log("Enviando dados para atualização de XP:", { usuarioId, dificuldade });
                    
                    await fetch('http://localhost:3003/API_LogicLift/updateXP', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            usuarioId: usuarioId,
                            dificuldade: dificuldade,
                        }),
                    });
                    console.log("XP atualizado com sucesso.");
                } catch (error) {
                    console.error("Erro ao atualizar XP:", error.message);
                }
            } else {
            }

            perguntasRespondidasIds.push(perguntasExibidas[perguntasExibidas.length - 1]);
            localStorage.setItem('perguntasRespondidas', JSON.stringify(perguntasRespondidasIds));
            
            if (perguntasRespondidasIds.length >= 5 * nivelAtual) {
                alert(`Você completou o nível ${nivelAtual}.`);
                localStorage.setItem(`nivel${nivelAtual}Completado`, 'true');
                if (nivelAtual < 3) {
                    localStorage.setItem('nivelAtual', nivelAtual + 1);
                }
                window.location.href = 'niveis.html';
            } else {
                carregarPergunta();
            }
        } else {
            alert("Por favor, selecione uma resposta.");
        }
    });

    // Função para desbloquear níveis com base no progresso
    function desbloquearNiveis() {
        for (let i = 2; i <= 3; i++) {
            const nivelCompletado = localStorage.getItem(`nivel${i - 1}Completado`) === 'true';
            const nivelBtn = document.getElementById(`lv${i}`);
            
            if (!nivelBtn) {
                console.warn(`Botão do nível ${i} não encontrado.`);
                continue; // Pule para o próximo nível se o botão não existir
            }
    
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
    
    desbloquearNiveis(); // Chama a função para desbloquear níveis
});