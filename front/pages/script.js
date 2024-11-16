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
            console.log('Entrou no case 4.');
            respostasCorretas = localStorage.getItem('respostasCorretas') ? parseInt(localStorage.getItem('respostasCorretas'), 10) : 0;
        
            let answerChecked4 = document.querySelector('input[name="answer"]:checked').value;            
            console.log('Resposta selecionada:', answerChecked4);
        
            if (answerChecked4 === 'B') {
                localStorage.setItem('respostasCorretas', ++respostasCorretas);
                alert('Resposta certa!');
            } else {
                alert('Resposta incorreta');
            }
        
            console.log('Chamando sendTutorialCompletion...');
            sendTutorialCompletion(true); // Envia status ao concluir
            // window.location.href = "./revelacao/revelacao.html";
            break;
    }
}

async function sendTutorialCompletion(completed) {
    const userId = localStorage.getItem('userId'); // Assumindo que o userId está no localStorage
    const tutorialStatus = completed ? 'completed' : 'incomplete';

    try {
        const response = await fetch('http://localhost:3003/API_LogicLift/post/tutorial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                tutorial: tutorialStatus,
            }),
        });

        if (!response.ok) {
            console.error('Erro ao enviar o status do tutorial:', response.statusText);
        } else {
            console.log('Status do tutorial enviado com sucesso.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}