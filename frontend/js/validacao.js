const formulario = document.querySelector("form");

const campos = formulario.querySelectorAll("input:not([type='radio'])");


function validarCampo(campo) {

    const container = campo.closest(".campo");
    const mensagem = container.querySelector(".mensagem-erro");


    if (!campo.checkValidity()) {

        campo.classList.remove("valido");

        campo.classList.add("invalido");


        if (campo.validity.valueMissing) {
            mensagem.textContent = "Este campo é obrigatório.";
        }

        else if (campo.validity.typeMismatch) {
            mensagem.textContent = "Digite um e-mail válido.";
        }

        else if (campo.validity.patternMismatch) {
            mensagem.textContent = campo.title;
        }

        else if (campo.validity.tooShort) {
            mensagem.textContent =
                `Digite pelo menos ${campo.minLength} caracteres.`;
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

    const nome = document.querySelector("#nomeCompleto").value;

    const email = document.querySelector("#email").value;

    const sexoSelecionado = document.querySelector(
        'input[name="sexo"]:checked'
    );


    const senha = document.querySelector("#senha").value;



    const usuario = {

        matricula,

        nome,

        email,

        sexo: sexoSelecionado ? sexoSelecionado.value : null,

        senha

    };



    try {


        const resposta = await fetch(
            "http://localhost:3000/users/signup",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },


                body: JSON.stringify(usuario)

            }
        );



        const dados = await resposta.json();



        if (!resposta.ok) {

            throw new Error(
                dados.message || "Erro ao cadastrar usuário"
            );

        }



        console.log("Usuário cadastrado:", dados);


        formulario.reset();


        campos.forEach(campo => {

            campo.classList.remove("valido");

        });



    } catch (erro) {


        console.error(
            "Erro no cadastro:",
            erro
        );


    }


});