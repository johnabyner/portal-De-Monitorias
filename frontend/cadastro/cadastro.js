const formulario = document.querySelector(".formulario-cadastro");

formulario.addEventListener("submit", mandarInformacoes); //quando mandar o formulario vai mandar as informaçoes para o servidor

async function mandarInformacoes(event) {
    event.preventDefault(); //prevenir de recarregar a pagina

    const matricula = document.querySelector("#matricula").value;
    const nome = document.querySelector("#nomeCompleto").value;
    const email = document.querySelector("#email").value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const senha = document.querySelector("#senha").value;

    const usuario = {
        matricula,
        nome,
        email,
        sexo,
        senha
    };


    try {
        const resposta = await fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(usuario)
        });
        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.message || "Erro ao cadastrar usuário");
        }

        formulario.reset();

    } catch (erro) {
        console.error("Erro no cadastro:", erro);
    }
}

//se tiver errado vai receber isso
// {
//   "message": [
//     {
//       "field": "email",
//       "messages": [
//         "email must be an email"
//       ]
//     }
//   ],
//   "error": "Bad Request",
//   "statusCode": 400
// }