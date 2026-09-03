import Auth from "./Auth.js";

class BuscarMonitorias{
    static async cadastrarMonitoria(monitoria){
        const url = 'http://localhost:7777'

        try{
            const resposta = await Auth.fetchAuth(`${url}/monitoring`, {
                method:'POST',
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(monitoria)
            })
            const dados = await resposta.json()

            return {ok:resposta, dados};
        }catch(err){
            console.error('Erro em cadastrar monitoria', err)
        }
    }

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

    static async minhasMonitorias(page=0){
        const url = 'http://localhost:7777';
        const offset = page*20;

        try{
            const resposta = await Auth.fetchAuth(`${url}/monitoring/me?page{offset}`);

            if(!resposta.ok){
                throw new Error(`Erro ao listar monitorias: ${resposta.status}`);
            }

            return resposta;
        }catch(err){
            console.error('Erro em listar minhas monitorias', err)
        }
    }

    static async editarMonitorias(monitoria, id){
        const url = 'http://localhost:7777'

        try{
            const resposta = await Auth.fetchAuth(`${url}/monitoring/${id}`,{
                method:"PATCH",
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(monitoria)
            })

            return resposta;
        }catch(err){
            console.error('Erro em editar monitoria', err);
        }
    }
    static async deletarMonitoria(id){
        const url = 'http://localhost:7777'
        try{
            const resposta = await Auth.fetchAuth(`${url}/monitoring/{id}`, {method:'DELETE'})
            return resposta;
        }catch(err){
            console.error('Erro em deletar monitoria', err)
        }
    }
}
export default BuscarMonitorias

 