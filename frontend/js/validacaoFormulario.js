export function validarCampo(campo) {
    const container = campo.closest('.campo');
    const mensagem = container?.querySelector('.mensagem-erro');

    if (!campo.checkValidity()) {
        campo.classList.remove('valido');
        campo.classList.add('invalido');
        container?.classList.add('erro');

        if (campo.validity.valueMissing) {
            mensagem.textContent = 'Este campo é obrigatório.';
        } else if (campo.validity.tooShort) {
            mensagem.textContent = `Digite pelo menos ${campo.minLength} caracteres.`;
        }

        return false;
    }

    campo.classList.remove('invalido');
    campo.classList.add('valido');
    container?.classList.remove('erro');

    if (mensagem) {
        mensagem.textContent = '';
    }

    return true;
}


export function validarHorarios(formulario) {
    const dias = [
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta'
    ];

    let valido = true;

    dias.forEach((dia) => {
        const inicio = formulario.querySelector(`[name="${dia}_inicio"]`);
        const fim = formulario.querySelector(`[name="${dia}_fim"]`);

        const campo = inicio.closest('.campo');
        const mensagem = campo.querySelector('.mensagem-erro');

        const horaInicio = inicio.value;
        const horaFim = fim.value;

        inicio.classList.remove('invalido', 'valido');
        fim.classList.remove('invalido', 'valido');
        campo.classList.remove('erro');
        mensagem.textContent = '';

        // Dia vazio
        if (!horaInicio && !horaFim) {
            return;
        }

        // Apenas um preenchido
        if (!horaInicio || !horaFim) {
            inicio.classList.add('invalido');
            fim.classList.add('invalido');
            campo.classList.add('erro');

            mensagem.textContent = 'Informe o horário de início e fim.';

            valido = false;
            return;
        }

        // Horário inválido
        if (horaInicio >= horaFim) {
            inicio.classList.add('invalido');
            fim.classList.add('invalido');
            campo.classList.add('erro');

            mensagem.textContent =
                'O horário de início deve ser anterior ao horário de fim.';

            valido = false;
            return;
        }

        inicio.classList.add('valido');
        fim.classList.add('valido');
    });

    return valido;
}


export function validarFormulario(formulario) {
    let formularioValido = true;

    const campos = formulario.querySelectorAll(
        'input:not([type="radio"]), select, textarea'
    );

    campos.forEach((campo) => {
        if (!validarCampo(campo)) {
            formularioValido = false;
        }
    });

    if (!validarHorarios(formulario)) {
        formularioValido = false;
    }

    return formularioValido;
}


export function limparValidacoes(formulario) {
    formulario.querySelectorAll('.valido, .invalido').forEach((campo) => {
        campo.classList.remove('valido', 'invalido');
    });

    formulario.querySelectorAll('.erro').forEach((container) => {
        container.classList.remove('erro');
    });

    formulario.querySelectorAll('.mensagem-erro').forEach((mensagem) => {
        mensagem.textContent = '';
    });
}