class Nome{
    static definir(nome){
        localStorage.setItem("nome",nome);
    }

    static obter(){
        const nome = localStorage.getItem("nome");
        if(!nome)return 'visitante'
        return nome;
    }

    static limpar(){
        localStorage.removeItem("nome");
    }
}

export default Nome