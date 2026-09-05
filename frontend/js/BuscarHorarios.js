import Auth from "./Auth.js";

class BuscarHorarios{
    static async cadastrarHorario(horario){
        const url = 'http://localhost:7777';
        try{
            const resposta = await Auth.fetchAuth(`${url}/schedules`,{
                method:'POST',
                headers:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify(horario)
            });
            const dados = await resposta.json();
            return {resposta, dados};
        }catch(err){
            console.error('Erro em cadastrar horario',err);
        }
    }

    static async listarHorarios(page=0,name=''){
        const url = 'http://localhost:7777';
        const offset = page*20;
        try{
            const resposta = await fetch(`${url}/schedules?page=${offset}&name=${name}`);
            if(!resposta.ok)throw new Error(`Erro ao listar horarios: ${resposta.status}`);
            const dados = await resposta.json();
            console.log(dados.result)
            return dados.result;
        }catch(err){
            console.error('Erro em listar horarios',err);
        }
    }

    static async editarHorario(horario,id){
        const url = 'http://localhost:7777';
        try{
            const resposta = await Auth.fetchAuth(`${url}/schedules/${id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(horario)
            });

            return resposta;
        }catch(err){
            console.error('Erro em editar horario',err);
        }
    }

    static async deletarHorario(id){
        const url = 'http://localhost:7777';
        try{
            const resposta = await Auth.fetchAuth(`${url}/schedules/${id}`,{method:'DELETE'});
            return resposta;
        }catch(err){
            console.error('Erro em deletar horario',err);
        }
    }

}

export default BuscarHorarios;
