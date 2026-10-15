# Portal de Monitorias

Plataforma web para centralizar a divulgação e a consulta de monitorias acadêmicas, facilitando o acesso dos estudantes a oportunidades de apoio educacional, especialmente durante os períodos de avaliação.

## Sobre o projeto

A divulgação informal de monitorias pode dificultar o acesso a informações sobre disciplinas, horários, locais e monitores disponíveis.

O **Portal de Monitorias** busca solucionar esse problema reunindo essas informações em uma única plataforma, tornando a divulgação mais organizada e facilitando a conexão entre estudantes e monitores.

## Funcionalidades

- Consulta de monitorias cadastradas.
- Cadastro de usuários e autenticação.
- Gerenciamento de acesso conforme o perfil do usuário.
- Cadastro e gerenciamento de monitorias por usuários autorizados.
- Adição e remoção de monitorias dos favoritos.
- Visualização de informações detalhadas sobre cada monitoria.
- Ativação e desativação de monitorias.
- Documentação da API com Swagger.

## Tecnologias utilizadas

### Front-end
- HTML5
- CSS3
- JavaScript

### Back-end
- Node.js
- NestJS
- TypeScript
- PostgreSQL

### DevOps
- Docker
- Docker Compose

## Perfis de acesso

A plataforma possui diferentes níveis de acesso, definidos de acordo com o perfil do usuário.

| Funcionalidade | Visitante | Aluno | Monitor | Professor | Administrador |
|---|---|---|---|---|---|
| Consultar monitorias | Sim | Sim | Sim | Sim | Sim |
| Gerenciar favoritos | Não | Sim | Sim | Sim | Sim |
| Criar monitorias | Não | Não | Conforme permissões | Conforme permissões | Conforme permissões |
| Gerenciar monitorias | Não | Não | Conforme permissões | Conforme permissões | Conforme permissões |

As permissões são controladas pela aplicação de acordo com as regras de acesso definidas para cada perfil.

## Instalação e execução

### Pré-requisitos

- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-docker/)
- Docker Compose

### 1. Clone o repositório

```bash
git clone https://github.com/johnabyner/portal-De-Monitorias.git
cd portal-De-Monitorias
```

### 2. Configure as variáveis de ambiente

Crie o arquivo `.env` a partir do modelo disponibilizado no repositório:

```bash
cp .env.example .env
```

Configure as variáveis de acordo com o ambiente de execução:

```dotenv
# Backend
DATABASE_URL=
FRONTEND_URL="http://127.0.0.1:5500"
BACKEND_PORT=7777
FRONTEND_PORT=8080

# JWT
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

# Docker Compose / PostgreSQL
DOCKER_USER=
DOCKER_PASSWORD=
DOCKER_DB=
```

**Importante:** preencha todas as variáveis exigidas pela aplicação e pelo Docker Compose. Utilize segredos fortes para as chaves JWT e não compartilhe o arquivo `.env`.

### 3. Inicie os containers

Na raiz do projeto, execute:

```bash
docker compose up -d --build
```

Esse comando constrói as imagens necessárias e inicia os serviços em segundo plano.

Para verificar o estado dos containers:

```bash
docker compose ps
```

Para acompanhar os logs:

```bash
docker compose logs -f
```

### 4. Acesse a aplicação

Após a inicialização dos serviços, acesse os seguintes endereços:

| Serviço | Endereço |
|---|---|
| Aplicação web | http://localhost:5500/home/index.html |
| API REST | http://localhost:7777 |
| Documentação Swagger | http://localhost:7777/api |

Os endereços dependem das portas configuradas no Docker Compose.

## Estrutura do projeto

O projeto está organizado em duas partes principais:

- **Front-end:** responsável pela interface, navegação e interação com os usuários.
- **Back-end:** responsável pelas regras de negócio, autenticação, autorização, persistência e disponibilização dos endpoints da API.

O PostgreSQL é utilizado para armazenar os dados da aplicação, enquanto o Docker Compose facilita a execução dos serviços em um ambiente conteinerizado.

## Objetivo

O Portal de Monitorias tem como objetivo tornar a divulgação de monitorias acadêmicas mais organizada e acessível, reduzindo a dependência de comunicações informais e facilitando o acesso dos estudantes ao apoio educacional.

## Autor

**John Abyner**

- GitHub: [@johnabyner](https://github.com/johnabyner)
- Repositório: [portal-De-Monitorias](https://github.com/johnabyner/portal-De-Monitorias)
