document.getElementById("randomPageButton").addEventListener('click', function() {
    // Array com os nomes dos arquivos HTML
    console.log("entrou no evento")

    var pages = [
        'pages/page1.html',
        'pages/page2.html',
        'pages/page3.html',
        'pages/page4.html'
    ];

    var randomIndex = Math.floor(Math.random() * pages.length);
    window.location.href = pages[randomIndex];
    
});