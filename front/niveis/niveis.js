// Lógica para o botão do nível 1
const nivel1Btn = document.getElementById("lv1");
nivel1Btn.onclick = function() {
    console.log("Nível 1 clicado, redirecionando para base.html");
    window.location.href = "./base.html";
};

// Verifica se os níveis anteriores foram completados para desbloquear os próximos níveis
document.addEventListener('DOMContentLoaded', function() {
    const nivel1Completado = localStorage.getItem('nivel1Completado') === 'true';
    const nivel2Completado = localStorage.getItem('nivel2Completado') === 'true';
    const nivel3Completado = localStorage.getItem('nivel3Completado') === 'true';
    const nivel4Completado = localStorage.getItem('nivel4Completado') === 'true'; // Adicionado para verificar o nível 4

    console.log("Estado de nivel1Completado no localStorage:", nivel1Completado);
    console.log("Estado de nivel2Completado no localStorage:", nivel2Completado);
    console.log("Estado de nivel3Completado no localStorage:", nivel3Completado);
    console.log("Estado de nivel4Completado no localStorage:", nivel4Completado); // Verificação para o nível 4

    const nivel2Btn = document.getElementById('lv2');
    const cadeadoLv2 = nivel2Btn.querySelector('img');
    const nivel3Btn = document.getElementById('lv3');
    const cadeadoLv3 = nivel3Btn.querySelector('img');
    const nivel4Btn = document.getElementById('lv4');
    const cadeadoLv4 = nivel4Btn.querySelector('img');

    // Desbloqueia o Nível 2 permanentemente após completar o nível 1
    if (nivel1Completado && !nivel2Completado && cadeadoLv2) {
        console.log("Desbloqueando Nível 2");
        cadeadoLv2.classList.add('fade-out');
        cadeadoLv2.addEventListener('animationend', () => {
            cadeadoLv2.style.display = 'none';
            nivel2Btn.textContent = '2';
        });

        nivel2Btn.onclick = function() {
            window.location.href = "./base.html"; // Redireciona para a próxima página
        };
    } else if (nivel2Completado) {
        cadeadoLv2.style.display = 'none';
        nivel2Btn.textContent = '2';
        nivel2Btn.onclick = function() {
            window.location.href = "./base.html"; // Redireciona para a próxima página
        };
    } else {
        nivel2Btn.onclick = function() {
            alert('Complete o nível 1 para desbloquear o nível 2.');
        };
    }

    // Desbloqueia o Nível 3 permanentemente após completar o nível 2
    if (nivel2Completado && !nivel3Completado && cadeadoLv3) {
        console.log("Desbloqueando Nível 3");
        cadeadoLv3.classList.add('fade-out');
        cadeadoLv3.addEventListener('animationend', () => {
            cadeadoLv3.style.display = 'none';
            nivel3Btn.textContent = '3';
        });

        nivel3Btn.onclick = function() {
            window.location.href = "./base.html"; // Redireciona para a próxima página
        };
    } else if (nivel3Completado) {
        cadeadoLv3.style.display = 'none';
        nivel3Btn.textContent = '3';
        nivel3Btn.onclick = function() {
            window.location.href = "./base.html"; // Redireciona para a próxima página
        };
    } else {
        nivel3Btn.onclick = function() {
            alert('Complete o nível 2 para desbloquear o nível 3.');
        };
    }

    // Desbloqueia o Nível 4 permanentemente após completar o nível 3
    if (nivel3Completado && !nivel4Completado && cadeadoLv4) {
        console.log("Desbloqueando Nível 4");
        cadeadoLv4.classList.add('fade-out');
        cadeadoLv4.addEventListener('animationend', () => {
            cadeadoLv4.style.display = 'none';
            nivel4Btn.textContent = '4';
        });

        nivel4Btn.onclick = function() {
            window.location.href = "./base.html"; // Redireciona para a próxima página
        };
    } else if (nivel4Completado) {
        cadeadoLv4.style.display = 'none';
        nivel4Btn.textContent = '4';
        nivel4Btn.onclick = function() {
            window.location.href = "./base.html"; // Redireciona para a próxima página
        };
    } else {
        nivel4Btn.onclick = function() {
            alert('Complete o nível 3 para desbloquear o nível 4.');
        };
    }
});

document.getElementById('diarias').addEventListener('click', function() {
    window.location.href = 'tarefaDiaria.html'; // Redireciona para a página da tarefa diária
});

const next = document.getElementById("go");

next.onclick = function() {
    window.location.href = "../profile/profilePage.html";
};