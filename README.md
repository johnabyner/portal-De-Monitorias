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

##  FOTOS

### Página inicial
<img width="1920" height="1080" alt="Home" src="https://github.com/user-attachments/assets/5276f104-b862-42b8-93a4-7a5816842171" />

### Consulta de monitorias
<img width="1920" height="1080" alt="monitorias" src="https://github.com/user-attachments/assets/164b84fa-b339-452b-948f-fd4ddb8287bc" />

### Cadastro de usuário
<img width="1920" height="1080" alt="cadastro" src="https://github.com/user-attachments/assets/9b57e75d-fa74-4813-a737-2224f37e5081" />

### Login
<img width="1920" height="1080" alt="login" src="https://github.com/user-attachments/assets/700f4e8f-5e56-4231-991a-abdc9e872354" />

### Favoritos
<img width="1920" height="1077" alt="favoritos" src="https://github.com/user-attachments/assets/a266aa92-8e7d-401f-bce5-bf52d4df018a" />

### Criar monitoria
<img width="1918" height="1074" alt="criar" src="https://github.com/user-attachments/assets/3c0b300e-6a6e-48df-8110-1492530b6c52" />
<img width="1920" height="1080" alt="criarMonitoria" src="https://github.com/user-attachments/assets/a4e1402f-18b6-49df-9b20-a09e9ca8c05d" />
<img width="1920" height="1075" alt="criarMonitoria2" src="https://github.com/user-attachments/assets/b011ab0c-7dc9-4aa4-aec9-66f0e62f91ea" />

### Minhas monitorias
<img width="1920" height="1079" alt="minhasMonitorias" src="https://github.com/user-attachments/assets/06585f23-be29-472d-b3e8-a0b914de2c07" />


## Perfis de acesso

A plataforma possui diferentes níveis de acesso, definidos de acordo com o perfil do usuário.

| Funcionalidade | Visitante | Aluno | Monitor | Professor | Administrador |
|---|---|---|---|---|---|
| Consultar monitorias | Sim | Sim | Sim | Sim | Sim |
| Gerenciar favoritos | Não | Sim | Sim | Sim | Sim |
| Criar monitorias | Não | Não | Não | Sim | Sim |
| Gerenciar monitorias | Não | Não | Alguns campos | Sim | Sim |

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
