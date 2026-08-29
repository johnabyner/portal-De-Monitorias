import Auth from "./Auth.js";

const formulario = document.querySelector("form");
const campos = formulario.querySelectorAll("input:not([type='radio'])");
const mensagemLogin = document.querySelector('#mensagem-login');

function validarCampo(campo) {
    const container = campo.closest(".campo");
    const mensagem = container.querySelector(".mensagem-erro");

    if (!campo.checkValidity()) {
        campo.classList.remove("valido");
        campo.classList.add("invalido");


        if (campo.validity.valueMissing) {
            mensagem.textContent = "Este campo é obrigatório.";
        }
        else if (campo.validity.patternMismatch) {
            mensagem.textContent = "Digite uma matrícula válida.";
        }
        else if (campo.validity.patternMismatch) {
            mensagem.textContent = campo.title;
        }
        else if (campo.validity.tooShort) {
            mensagem.textContent = `Digite pelo menos ${campo.minLength} caracteres.`;
        }

        return false;
    }
    campo.classList.remove("invalido");
    campo.classList.add("valido");

    container.classList.remove("erro");
    mensagem.textContent = "";

    return true;

}
/*
  Validação enquanto digita
*/
campos.forEach(campo => {
    campo.addEventListener("input", () => {
        validarCampo(campo);
    });
});

/*
  Validação + envio para servidor
*/
formulario.addEventListener("submit", async function(event) {

    event.preventDefault();
    let formularioValido = true;

    campos.forEach(campo => {
        const container = campo.closest(".campo");
        const valido = validarCampo(campo);

        if (!valido) {
            formularioValido = false;
            container.classList.add("erro");
        }
    });

    // Se tiver erro, não envia
    if (!formularioValido) {
        return;
    }

    /*
       Montagem dos dados
    */
    const matricula = document.querySelector("#matricula").value;
    const senha = document.querySelector("#senha").value;

    const usuario = {
        matricula,
        senha
    };

//VAI FAZER REQUISIÇÃO PARA O BACKEND
    try {
        //BUSCA ao servidor
        const resposta = await Auth.autenticarUsuario(usuario);
        //vai mostrar a mensagem do servidor
        if(resposta.ok){
            mensagemLogin.classList.add('mensagemServidorSucesso')
        }else{
            mensagemLogin.classList.add('mensagemServidorErro')
        }
        mensagemLogin.textContent = await resposta.dados.message
        setTimeout(() => {
            mensagemLogin.textContent = "";
            mensagemLogin.classList.remove(
                "mensagemServidorSucesso",
                "mensagemServidorErro"
            )

            if (resposta.ok) {
                //window.location.href = "../monitorias/monitorias.html";
            }
        }, 3000);

        formulario.reset();
        campos.forEach(campo => {
            campo.classList.remove("valido");
        });
        
        //salvar tokens
        Auth.salvarJWT(resposta.dados);

    } catch (erro) {
        console.error("Erro no login:", erro);
        mensagemLogin.textContent = "Não foi possível conectar ao servidor.";
    }
});