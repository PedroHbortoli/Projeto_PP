document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage

    if (userId) {
        try {
            const response = await fetch(`http://localhost:3003/API_LogicLift/get/user?id=${userId}`);
            const result = await response.json();

            if (result.success) {
                // Exibe os dados nos elementos da página
                document.getElementById("userName").innerText = result.data.nome;
                document.getElementById("emailUser").innerText = result.data.email;
                document.getElementById("eloUser").innerText = result.data.elo;
                document.querySelector(".profile").src = result.data.foto_perfil || "../../assets/profile-photo.png";
            } else {
                console.error("Erro ao buscar os dados do usuário:", result.message);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    } else {
        console.warn("Usuário não logado");
    }
});