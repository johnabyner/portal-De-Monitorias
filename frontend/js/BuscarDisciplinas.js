class BuscarDisciplinas{
    static async listarDisciplinas(name=''){
    const url = 'http://localhost:7777';
    try{
        const resposta = await fetch(`${url}/disciplines?name=${name}`);
        if(!resposta.ok)throw new Error(`Erro ao listar disciplinas: ${resposta.status}`);
        const dados = await resposta.json();
        return {ok:resposta.ok, dados};
    }catch(err){
        console.error('Erro em listar disciplinas',err);
    }
    }
}

export default BuscarDisciplinas