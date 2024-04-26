let button = document.getElementById("submit");

button.onclick = function() {
    alert(3);
}
// button.onclick = async function(event) {
//     event.preventDefault();
//     alert(23);
//     // recuperando dados do formulario
//     let name     = document.getElementById("name").value;
//     let email    = document.getElementById("email").value;
//     let password = document.getElementById("password").value;

//     // criar objeto com os dados
//     let data = {name, email, password};
//     console.console.log(data);

    // const response = await fetch("http://localhost:3003/api/store/user", {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(data)
    // });
    
    // let Content = await response.json();

    // if(Content.success) {
    //     alert("Sucesso")
    // } else {
    //     alert("Não")
    // }
// }