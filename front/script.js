document.addEventListener('DOMContentLoaded', async () => { 
    const response = await fetch('http://localhost:3003/API_LogicLift/get/user');
    const results = await response.json();

    document.getElementById("nome").innerHTML = results.data[0].nome;
});

const next = document.getElementById("go");

next.onclick = function() {
    window.location.href = "./niveis/niveis.html";
};