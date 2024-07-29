let respostasCorretas = 0;

function validateAnswer(stepForm) {
    switch(stepForm) {        
        case 1:
            localStorage.setItem('respostasCorretas', 0);

            respostasCorretas = localStorage.getItem('respostasCorretas') ? parseInt(localStorage.getItem('respostasCorretas'), 10) : 0;

            let answerChecked1 = document.querySelector('input[name="answer"]:checked').value;            
            
            if (answerChecked1 === 'E') {
                localStorage.setItem('respostasCorretas', ++respostasCorretas) 
                alert('Resposta certa!');
            } else {
                alert('Resposta incorreta')
            }            
            window.location.href = "./page2.html";
        break;
        case 2:
            respostasCorretas = localStorage.getItem('respostasCorretas') ? parseInt(localStorage.getItem('respostasCorretas'), 10) : 0;

            let answerChecked2 = document.querySelector('input[name="answer"]:checked').value;            
            console.log(respostasCorretas)
            if (answerChecked2 === 'D') {
                localStorage.setItem('respostasCorretas', ++respostasCorretas) 
                alert('Resposta certa!');
            } else {
                alert('Resposta incorreta')
            }            
            window.location.href = "./page3.html";
        break;
        case 3:
            respostasCorretas = localStorage.getItem('respostasCorretas') ? parseInt(localStorage.getItem('respostasCorretas'), 10) : 0;

            let answerChecked3 = document.querySelector('input[name="answer"]:checked').value;            
            console.log()
            if (answerChecked3 === 'B') {
                localStorage.setItem('respostasCorretas', ++respostasCorretas) 
                alert('Resposta certa!');
            } else {
                alert('Resposta incorreta')
            }            
            window.location.href = "./page4.html";
        break;
        case 4:
            respostasCorretas = localStorage.getItem('respostasCorretas') ? parseInt(localStorage.getItem('respostasCorretas'), 10) : 0;

            let answerChecked4 = document.querySelector('input[name="answer"]:checked').value;            
            console.log()
            if (answerChecked4 === 'B') {
                localStorage.setItem('respostasCorretas', ++respostasCorretas) 
                alert('Resposta certa!');
            } else {
                alert('Resposta incorreta')
            }            
            window.location.href = "./revelacao/revelacao.html";
        break;
        default:
            alert("Não entedemos");
            break;
    }
}

