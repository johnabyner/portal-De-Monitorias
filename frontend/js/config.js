const botaoExcluirConta = document.querySelector("#excluir-conta");
const confirmacaoExclusao = document.querySelector("#confirmacao-exclusao");
const botaoSairConfirmacao = document.querySelector("#sair-confirmacao");

botaoExcluirConta.addEventListener("click", () => {
    confirmacaoExclusao.showModal();
});

botaoSairConfirmacao.addEventListener("click", () => {
    confirmacaoExclusao.close();
});