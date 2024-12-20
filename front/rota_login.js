document.addEventListener('DOMContentLoaded', async function () {
    const loginButton = document.querySelector('.button');

    // Função para buscar e exibir o nome do usuário
    async function fetchAndDisplayUserName() {
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
                const nomeElement = document.getElementById("nome");
                if (nomeElement) {
                    nomeElement.innerHTML = "Erro ao carregar o nome do usuário";
                }
            }
        } else {
            const nomeElement = document.getElementById("nome");
            if (nomeElement) {
                nomeElement.innerHTML = "Usuário não logado";
            } else {
                console.warn('Elemento com id="nome" não encontrado no DOM.');
            }
        }
    }

    // Função para lidar com o login
    async function handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
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
        } catch (error) {
            console.error("Erro ao processar o login:", error);
            alert('Erro ao processar o login. Tente novamente.');
        }
    }

    // Inicializar nome do usuário na página Bem-Vindo
    await fetchAndDisplayUserName();

    // Adicionar evento ao botão de login
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }
});

