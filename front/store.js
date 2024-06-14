document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM totalmente carregado e analisado');

    let elo = 0;

    function loadElo() {
        const storedElo = localStorage.getItem('elo');
        if (storedElo !== null) {
            elo = parseInt(storedElo, 10);
            console.log(`Valor de elo carregado: ${elo}`);
        }
    }

    function saveElo() {
        localStorage.setItem('elo', elo);
        console.log(`Valor de elo salvo: ${elo}`);
    }

    function updateMessage() {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            if (elo <= 1) {
                messageElement.textContent = 'Ferro';
            } else {
                messageElement.textContent = 'Bronze';
            }
            console.log(`Mensagem atualizada: ${messageElement.textContent}`);
        } else {
            console.error('Elemento message não encontrado');
        }
    }

    const addButton = document.getElementById('addButton');
    const subButtons = document.querySelectorAll('.subButton');

    if (addButton && subButtons.length > 0) {
        console.log('Botões encontrados');

        addButton.addEventListener('click', function() {
            elo += 1;
            saveElo();
            updateMessage();
        });

        subButtons.forEach(button => {
            button.addEventListener('click', function() {
                elo -= 1;
                saveElo();
                updateMessage();
            });
        });

        // Carregar o valor de elo ao iniciar a página
        loadElo();
        updateMessage();
    }
});