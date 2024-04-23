let button = document.querySelector("Submit");

button.onclick = async function() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let data = {name, email, password}

    const response = await fetch("http://localhost:3003/API_LogicLift/store/user", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    
    let Content = await response.json();

    if(Content.success) {
        alert("Sucesso")
    } else {
        alert("Não")
    }
}