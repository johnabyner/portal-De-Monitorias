const DIAS = [
    'segunda',
    'terca',
    'quarta',
    'quinta',
    'sexta'
];

export function obterHorarios(formulario) {
    const horarios = [];

    DIAS.forEach((dia) => {
        const inicio = formulario.querySelector(
            `[name="${dia}_inicio"]`
        ).value;

        const fim = formulario.querySelector(
            `[name="${dia}_fim"]`
        ).value;

        // Dia não preenchido
        if (!inicio && !fim) {
            return;
        }

        horarios.push({
            dia_semana: dia,
            hora_inicio: inicio,
            hora_fim: fim
        });
    });

    return horarios;
}