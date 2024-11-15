document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage

    if (userId) {
        try {
            const response = await fetch(`http://localhost:3003/API_LogicLift/get/user?id=${userId}`);
            const result = await response.json();

            if (result.success) {
                // Preenche os campos com os dados do usuário
                document.querySelector(".sectionThree input").value = result.data.nome;
                document.querySelector(".sectionFour input").value = ""; // Limpa o campo de senha
                document.querySelector(".sectionFive input").value = ""; // Limpa o campo de confirmação de senha
                document.querySelector(".profile").src = result.data.foto_perfil || "../../assets/profile-photo.png";

                // Atualiza os spans de exibição
                document.getElementById("userName").innerText = result.data.nome;
                document.getElementById("emailUser").innerText = result.data.email;
                document.getElementById("eloUser").innerText = result.data.elo;
            } else {
                console.error("Erro ao buscar os dados do usuário:", result.message);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    } else {
        console.warn("Usuário não logado");
    }

    // Adiciona o evento ao botão de salvar alterações
    document.getElementById('saveChanges').addEventListener('click', () => {
        saveChanges(userId);
    });
});

async function saveChanges(userId) {
    const nome = document.querySelector(".sectionThree input").value;
    const senha = document.querySelector(".sectionFour input").value;
    const confirmarSenha = document.querySelector(".sectionFive input").value;

    if (senha && senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const updates = { id: userId };
    if (nome) updates.nome = nome;
    if (senha) updates.senha = senha;

    try {
        const response = await fetch(`http://localhost:3003/API_LogicLift/update/user`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });

        const result = await response.json();

        if (result.success) {
            alert("Dados atualizados com sucesso!");
            location.reload(); // Recarrega a página para exibir os dados atualizados
        } else {
            console.error("Erro ao atualizar os dados:", result.message);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}
 