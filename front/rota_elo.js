let to_send = document.getElementById("submit_elo");

to_send.onclick = async function () {

    let dados = document.getElementById('message').value;

    const response = await fetch("http://localhost:3003/API_LogicLift/store/elo", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(dados)
    })

    let Content = await response.json();

    if(Content.success) {
        alert("Elo stored successfully");
    } else {
        alert("Error storing Elo");
        console.log(Content.sql);
    }
};