let button = document.getElementById("handleSubmit");

button.onclick = async function () {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // criar objeto com os dados
    let data = { name, email, password };

    console.log(data);

    alert("Cadastro Feito!");

    const response = await fetch("http://localhost:3003/API_LogicLift/store/user", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });
};

