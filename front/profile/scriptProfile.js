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