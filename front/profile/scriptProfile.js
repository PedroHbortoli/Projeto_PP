document.addEventListener("DOMContentLoaded", function() {
    const userId = 'ID_DO_USUARIO';  // Substitua por um meio de obter o ID, ou obtenha de outra parte do código

    fetch(`/get/infoUser?id=${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const userInfo = data.data;
                document.querySelector(".alterName p:nth-child(1)").textContent = userInfo.nome;
                document.querySelector(".alterName p:nth-child(2)").textContent = userInfo.email;
                document.querySelector(".alterName p:nth-child(3)").textContent = userInfo.elo;

                // Verifique se há uma imagem de perfil; caso não, deixe a imagem padrão
                if (userInfo.foto_perfil) {
                    const profileImage = document.querySelector(".profile");
                    profileImage.src = `data:image/png;base64,${userInfo.foto_perfil}`;
                }
            } else {
                console.error("Erro ao obter as informações do usuário:", data.message);
            }
        })
        .catch(error => console.error("Erro na requisição:", error));
});