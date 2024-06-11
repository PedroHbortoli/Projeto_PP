let button = document.getElementById("handleSubmit");

button.onclick = async function () {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // criar objeto com os dados
    let data = { name, email, password };

    console.log(data);

    const response = await fetch("http://localhost:3003/API_LogicLift/store/user", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let Content = await response.json();

    if (Content.success) {
        alert("Sucesso")
    } else {
        alert("Não")
        console.log(Content.sql)
    }

};

document.addEventListener('DOMContentLoaded', function() {
    // Array com os nomes dos arquivos HTML
    var pages = [
        'pages/page1.html',
        'pages/page2.html',
        'pages/page3.html',
        'pages/page4.html'
    ];

    // Função para selecionar uma página HTML aleatória do array
    function getRandomPage() {
        var randomIndex = Math.floor(Math.random() * pages.length);
        return pages[randomIndex];
    }

    console.log(randomIndex)
    // Função para redirecionar para uma página HTML aleatória
    function loadRandomPage() {
        var randomPage = getRandomPage();
        window.location.href = randomPage;
    }

    // Adicionar evento de clique ao botão para carregar uma nova página
    var randomPageButton = document.getElementById('randomPageButton');
    randomPageButton.addEventListener('click', loadRandomPage);
});