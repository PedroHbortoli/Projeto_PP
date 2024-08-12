document.addEventListener('DOMContentLoaded', async () => { 
    const response = await fetch('http://localhost:3003/API_LogicLift/get/user');
    const results = await response.json();

    document.getElementById("nome").innerHTML = results.data[0].nome;


    
    // if (results) {
    //     results.data.forEach(element => {
    //         const nameUser = document.createElement('p');
    //         nameUser.textContent = element.name;
    //     });
    // }
})