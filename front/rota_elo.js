let submit_elo = document.getElementById("submit_elo");

submit_elo.addEventListener('click', async function () {

    const elo = document.getElementById('message').textContent.trim().toLowerCase();

    const dados = {
        elo: elo
    };

    const submit = await fetch("http://localhost:3003/API_LogicLift/store/elo", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(dados)
    })
});