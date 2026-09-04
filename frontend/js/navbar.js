import Nome from "./Nome.js";
import Auth from "./Auth.js";

document.addEventListener("DOMContentLoaded", () => { //vai esperar a pagina carregar
    const navbar = document.querySelector("#navbar");

    fetch("../components/navbar.html") //vai buscar o arquivo nav padrao 
        .then(response => response.text()) //transformar a resposta em texto
        .then(data => { //vai carregar a pagina com o arquivo nav
            navbar.innerHTML = data;

            //vai adicionar o nome
            const nome = navbar.querySelector(".nome");
            nome.textContent = Nome.obter();

            const botaoMinhasMonitorias = document.querySelector("#botaoMinhasMonitorias")
            if(Auth.verificarCargo() === "professor" || Auth.verificarCargo() === "monitor" || Auth.verificarCargo() === "administrador"){
                botaoMinhasMonitorias.hidden = false;
            }
        });
});