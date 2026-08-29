class BuscarMonitorias{
    static async cadastrarMonitoria(){}

    static async listarMonitorias(name='', page=0){
        const url = 'http://localhost:7777'
        const offset = page*20;
        try{
            const resposta = await fetch(`${url}/monitoring?page=${offset}&name=${name}`);

            if(!resposta.ok){throw new Error(`Erro ao listar monitorias: ${resposta.status}`);};
            const dados = await resposta.json();

            console.log(dados);
            //fazer algum modo de nao precisar buscar,salvar no navegador

            return dados.result;
        }catch(err){
            console.error('erro em listar monitorias',err);
        }
    }

    static async editarMonitorias(){}
    static async deletarMonitoria(){}
}
export default BuscarMonitorias