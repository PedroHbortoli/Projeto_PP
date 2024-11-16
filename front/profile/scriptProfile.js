document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage
    console.log("ID do usuário:", userId); // Log para verificar se o userId existe

    if (userId) {
        try {
            const response = await fetch(`http://localhost:3003/API_LogicLift/get/user?id=${userId}`);
            const result = await response.json(); // Garante que result está definido após o fetch
            console.log("Dados recebidos:", result); // Log para verificar os dados recebidos

            if (result.success) {
                // Exibe os dados nos elementos da página
                document.getElementById("userName").innerText = result.data.nome || "Nome não disponível";
                document.getElementById("emailUser").innerText = result.data.email || "Email não disponível";
                document.getElementById("eloUser").innerText = result.data.elo || "Elo não disponível";

                // Atualiza a imagem de perfil
                const profileImage = document.querySelector(".profile");
                const imageUrl = `http://localhost:3003/API_LogicLift/getImage/${userId}`;
                console.log("URL da imagem de perfil:", imageUrl); // Log do URL da imagem
                profileImage.src = imageUrl;
            } else {
                console.error("Erro ao buscar os dados:", result.message);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    } else {
        console.warn("Usuário não logado");
    }

    document.getElementById('changePhotoButton').addEventListener('click', () => {
        document.getElementById('profilePhotoInput').click();
    });

    // Inicialmente, esconde o botão "Salvar Alterações"
    const saveButton = document.getElementById('saveChanges');
    saveButton.style.display = 'none';

    // Mostra o botão "Salvar Alterações" apenas se alguma alteração for feita
    const inputs = document.querySelectorAll(".sectionThree input, .sectionFour input, .sectionFive input, #profilePhotoInput");
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            saveButton.style.display = 'inline-block'; // Mostra o botão
        });
    });

    saveButton.addEventListener('click', async () => {
        await saveChanges(userId);
        // Após salvar, recarrega a página
        window.location.reload();
    });
});

async function saveChanges(userId) {
    const nome = document.querySelector(".sectionThree input").value;
    const senha = document.querySelector(".sectionFour input").value;
    const photoFile = document.getElementById('profilePhotoInput').files[0];

    const formData = new FormData();
    formData.append('id', userId);
    if (nome) formData.append('nome', nome);
    if (senha) formData.append('senha', senha);
    if (photoFile) formData.append('foto_perfil', photoFile);

    try {
        const response = await fetch(`http://localhost:3003/API_LogicLift/update/user`, {
            method: 'PUT',
            body: formData
        });

        const result = await response.json();
        console.log("Resultado da atualização:", result);

        if (result.success) {
            alert("Dados atualizados com sucesso!");
        } else {
            console.error("Erro ao atualizar os dados:", result.message);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}