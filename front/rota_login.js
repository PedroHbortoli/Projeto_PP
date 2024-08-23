let button = document.getElementById("handleSubmit");

button.onclick = async function () {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    // Verifica se todos os campos estão preenchidos
    if (!name || !email || !password) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    let data = { name, email, password };

    const response = await fetch("http://localhost:3003/API_LogicLift/store/user", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert("Cadastro Feito!");
        window.location.href = "./entrar.html"; // Redireciona para a página de login
    } else {
        alert("Erro no cadastro, tente novamente.");
    }
};
