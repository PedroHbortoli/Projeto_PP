document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.button');

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
            // Salva o ID do usuário no localStorage
            localStorage.setItem('userId', result.data.id); // Presume que o ID do usuário seja retornado como result.data.id
            
            alert('Login bem-sucedido');
            window.location.href = './BemVindo.html'; // Redireciona para a página principal
        } else {
            alert('Credenciais inválidas, tente novamente.');
        }
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage

    if (userId) {
        try {
            const response = await fetch(`http://localhost:3003/API_LogicLift/get/user?id=${userId}`);
            const result = await response.json();

            if (result.success) {
                document.getElementById("nome").innerHTML = result.data.nome; // Exibe o nome do usuário
            } else {
                console.error("Erro ao buscar os dados do usuário:", result.message);
                document.getElementById("nome").innerHTML = "Usuário não identificado";
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            document.getElementById("nome").innerHTML = "Erro ao carregar o nome do usuário";
        }
    } else {
        document.getElementById("nome").innerHTML = "Usuário não logado"; // Mensagem para quando não houver login
    }
});

const next = document.getElementById("next-bemVindo");

next.onclick = function() {
    window.location.href = "./pages/page1.html";
};