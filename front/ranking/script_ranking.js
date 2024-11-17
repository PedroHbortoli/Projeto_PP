document.addEventListener("DOMContentLoaded", () => {
    const hubContent = document.getElementById("hub-content");
    const eloButtons = document.querySelectorAll(".hub-elo");

    async function loadUsers(elo) {
        hubContent.innerHTML = ""; // Limpa o conteúdo anterior

        try {
            const response = await fetch(`http://localhost:3003/API_LogicLift/getUsers?elo=${elo}`);
            const data = await response.json();

            if (data.success) {
                data.users.forEach((user, index) => {
                    const userCard = document.createElement("div");
                    userCard.classList.add("hub-user");

                    userCard.innerHTML = `
                        <div class="hub-user-info">
                            <span class="position">${index + 1}º</span>
                            <img src="http://localhost:3003/API_LogicLift/getImage/${user.id}" alt="${user.nome}">
                            <h4>${user.nome}</h4>
                        </div>
                        <div class="hub-user-xp">
                            ${user.xp_usuario} XP
                        </div>
                    `;

                    hubContent.appendChild(userCard);
                });
            } else {
                console.error("Erro ao carregar usuários:", data.message);
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    }

    eloButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove a classe 'selected' de todos os botões
            eloButtons.forEach(btn => btn.classList.remove("selected"));
            
            // Adiciona a classe 'selected' no botão clicado
            button.classList.add("selected");

            const elo = button.dataset.elo;
            loadUsers(elo);
        });
    });

    // Carrega os usuários do primeiro elo por padrão (ferro) e marca o botão como selecionado
    const defaultButton = document.querySelector('[data-elo="ferro"]');
    if (defaultButton) {
        defaultButton.classList.add("selected");
        loadUsers("ferro");
    }
});
