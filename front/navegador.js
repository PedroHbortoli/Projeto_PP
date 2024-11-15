document.addEventListener('DOMContentLoaded', function () {
    function saveCurrentUrl() {
        try {
            if (typeof localStorage !== 'undefined') {
                // Recuperar a pilha de histórico ou criar uma nova
                let historyStack = JSON.parse(localStorage.getItem('historyStack')) || [];
                const currentUrl = window.location.href;

                // Adicionar a URL atual na pilha
                historyStack.push(currentUrl);
                localStorage.setItem('historyStack', JSON.stringify(historyStack));
            }
        } catch (e) {
            console.error('Erro ao salvar histórico no localStorage:', e);
        }
    }

    var links = document.querySelectorAll('a');
    links.forEach(function (link) {
        link.addEventListener('click', saveCurrentUrl);
    });

    var backButton = document.getElementById('back');
    if (backButton) {
        backButton.addEventListener('click', function () {
            try {
                if (typeof localStorage !== 'undefined') {
                    // Recuperar a pilha de histórico
                    let historyStack = JSON.parse(localStorage.getItem('historyStack')) || [];

                    // Remover a última página (URL atual)
                    historyStack.pop();

                    if (historyStack.length > 0) {
                        // Redirecionar para a última página da pilha
                        const lastUrl = historyStack.pop();
                        localStorage.setItem('historyStack', JSON.stringify(historyStack));
                        window.location.href = lastUrl;
                    } else {
                        // Voltar no histórico do navegador, se a pilha estiver vazia
                        window.history.back();
                    }
                } else {
                    window.history.back();
                }
            } catch (e) {
                console.error('Erro ao acessar o histórico no localStorage ou redirecionar:', e);
                window.history.back();
            }
        });
    }

    const next = document.getElementById("go");
    if (next) {
        next.onclick = function () {
            saveCurrentUrl();
            window.location.href = "./niveis/niveis.html";
        };
    }
});
