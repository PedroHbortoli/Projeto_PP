let contador = localStorage.getItem('respostasCorretas', localStorage.getItem('respostasCorretas') ? parseInt(localStorage.getItem('respostasCorretas'), 10) : 0) 


contador <= 2  //condição fi
    ? document.getElementById('mensagem').innerText = "Ferro"   //true
    : document.getElementById('mensagem').innerText = "Bronze"; //false


async function handleSubnit(event) {
    event.preventDefault();

    let dados = document.getElementById('mensagem').innerText;
    console.log(dados)
    const elo = {dados};
console.log(elo);
    const response = await fetch("http://localhost:3003/API_LogicLift/store/elo", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(elo)
    })
}

window.location.href = "";
