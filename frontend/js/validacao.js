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



campos.forEach(campo => {

    campo.addEventListener("input", () => {

        const valido = validarCampo(campo);

        if(valido){

            campo.classList.remove("invalido");
            campo.classList.add("valido");

        }

    });

});



/*
  Validação no submit
*/
formulario.addEventListener("submit", function(event) {


    let formularioValido = true;


    campos.forEach(campo => {


        const container = campo.closest(".campo");

        const valido = validarCampo(campo);


        if (!valido) {

            event.preventDefault();

            formularioValido = false;

            container.classList.add("erro");

        }

    });



    if (formularioValido) {

        formulario.submit();

    }


});