class Auth{
    //USER
    static async  criarUsuario(usuario){
        const url = 'http://localhost:7777/'
        const resposta = await fetch(
            `${url}users/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            }
        );

        const dados = await resposta.json();
        return {
            ok: resposta.ok,
            dados: dados
        };
    }

    static async  autenticarUsuario(usuario){
        const url = 'http://localhost:7777'
        const resposta = await fetch(
            `${url}/auth`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            }
        );

        const dados = await resposta.json();
        return {
            ok: resposta.ok,
            dados: dados
        };
    }
    //SECURETY
    static salvarJWT(dados){
        localStorage.setItem('acessToken', dados.acessToken);
        localStorage.setItem('refreshToken', dados.refreshToken);
    }

    //vai fazer a busca ja enviando os tokens
    //e se o acess estiver expirado ele vai renovar com o refresh
    static async fetchAuth(url, options={}){
        let token = localStorage.getItem('acessToken');

        if(!token){
            return fetch(url, options);
        }

        let resposta = await fetch(url, {
            ...options, headers:{...options.headers, Authorization: `Bearer ${token}`}})

        //caso o acessToken tenha expirado
        if(resposta.status === 401){
            const refreshToken = localStorage.getItem('refreshToken');
            
            const apiUrl = 'http://localhost:7777'
            const refresh = await fetch(`${apiUrl}/auth/refresh`, {method:'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ refreshToken })});

            if(!refresh.ok){
                //se entrou aqui quer dizer q refresh tb expirou
                localStorage.clear();
                window.location.href = '../login/login.html';
                return;
            }

            const dados = await refresh.json();

            //salva o novo acessToken
            localStorage.setItem('acessToken', dados.acessToken);

            //tenta a requisição novamente
            resposta = await fetch(url, {
                ...options, headers:{...options.headers, Authorization: `Bearer ${dados.acessToken}`}})
        }

        return resposta
    }
    
    static verificarCargo(){
        const token = localStorage.getItem('acessToken');

        if(token){
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.role;
        }else{
            return 'visitante'
        }
    }

}

export default Auth;