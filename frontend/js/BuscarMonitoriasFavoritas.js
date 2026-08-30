import Auth from "./Auth.js";

class BuscarMonitoriasFavoritas{
    static async cadastrarMonitoriaFavorita(id){
        const url = 'http://localhost:7777';
        const resposta = await Auth.fetchAuth(`${url}/favorites/${id}`, {method:"POST"});
        console.log(resposta);

        return resposta;
    }

    static async listarMonitoriasFavoritas(offset=0, name=''){
        const url = 'http://localhost:7777';
        const page = offset*20

        const resposta = await Auth.fetchAuth(`${url}/favorites?page=${page}&name=${name}`);
        if (!resposta.ok) {
            throw new Error(
                `Erro ao listar favoritos: ${resposta.status}`
            );
        }

        const dados = await resposta.json()
        console.log(dados);

        return dados.result;
    }

    static async listarIdsFavoritos() {
        const monitorias = await this.listarMonitoriasFavoritas();

        return new Set(
            monitorias.map(monitoria => monitoria.id)
        );
    }

    static async deletarMonitoriaFavorita(id){
        const url = 'http://localhost:7777';
        const resposta = await Auth.fetchAuth(`${url}/favorites/${id}`, {method:"DELETE"});
        console.log(resposta);

        return resposta;
    }
}
export default BuscarMonitoriasFavoritas;

//GET,POST,PUT,DELETE