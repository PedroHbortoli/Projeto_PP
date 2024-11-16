document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('.button');

    document.addEventListener('DOMContentLoaded', async () => {
        const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage
    
        if (userId) {
            try {
                const response = await fetch(`http://localhost:3003/API_LogicLift/get/user?id=${userId}`);
                const result = await response.json();
    
                const nomeElement = document.getElementById("nome"); // Verifica se o elemento existe
                if (nomeElement) {
                    if (result.success) {
                        nomeElement.innerHTML = result.data.nome || "Usuário não identificado"; // Exibe o nome do usuário
                    } else {
                        console.error("Erro ao buscar os dados do usuário:", result.message);
                        nomeElement.innerHTML = "Usuário não identificado";
                    }
                } else {
                    console.warn('Elemento com id="nome" não encontrado no DOM.');
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
                const nomeElement = document.getElementById("nome"); // Garantir que só tenta acessar se existir
                if (nomeElement) {
                    nomeElement.innerHTML = "Erro ao carregar o nome do usuário";
                }
            }
        } else {
            const nomeElement = document.getElementById("nome"); // Garantir que só tenta acessar se existir
            if (nomeElement) {
                nomeElement.innerHTML = "Usuário não logado"; // Mensagem para quando não houver login
            } else {
                console.warn('Elemento com id="nome" não encontrado no DOM.');
            }
        }
    });

    loginButton.addEventListener('click', async function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('http://localhost:3003/API_LogicLift/login/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (result.success) {
            localStorage.setItem('userId', result.data.id);

            // Verificar o status do tutorial
            const tutorialResponse = await fetch(`http://localhost:3003/API_LogicLift/check/tutorial?userId=${result.data.id}`);
            const tutorialResult = await tutorialResponse.json();

            if (tutorialResult.success) {
                if (tutorialResult.data === 'completed') {
                    window.location.href = './niveis/niveis.html';
                } else {
                    window.location.href = './BemVindo.html';
                }
            } else {
                console.error('Erro ao verificar status do tutorial:', tutorialResult.message);
            }
        } else {
            alert('Credenciais inválidas, tente novamente.');
        }
    });
});

