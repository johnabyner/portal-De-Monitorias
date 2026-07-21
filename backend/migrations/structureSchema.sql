
CREATE TABLE users (
    matricula TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    sexo TEXT NOT NULL,
    role TEXT NOT NULL,
    refreshtoken TEXT
);

CREATE TABLE disciplinas (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    curso TEXT NOT NULL,
    descricao TEXT NOT NULL
);

CREATE TABLE monitorias (
    id SERIAL PRIMARY KEY,

    disciplina_id INTEGER NOT NULL,
    monitor_matricula TEXT NOT NULL,
    professor_matricula TEXT NOT NULL,

    local VARCHAR(100),
    descricao TEXT,

    status VARCHAR(20) DEFAULT 'ATIVA',

    FOREIGN KEY (disciplina_id)
        REFERENCES disciplinas(id),

    FOREIGN KEY (monitor_matricula)
        REFERENCES users(matricula),

    FOREIGN KEY (professor_matricula)
        REFERENCES users(matricula)
);

CREATE TABLE horarios (
    id SERIAL PRIMARY KEY,

    monitoria_id INTEGER NOT NULL,

    dia_semana VARCHAR(20) NOT NULL,

    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,

    FOREIGN KEY (monitoria_id) REFERENCES monitorias(id)
);