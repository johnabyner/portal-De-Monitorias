-- ============================================
-- TABELA: users
-- ============================================

CREATE TABLE users (
    matricula TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    sexo TEXT NOT NULL,
    role TEXT NOT NULL,
    refreshtoken TEXT
);


-- ============================================
-- TABELA: disciplinas
-- ============================================

CREATE TABLE disciplinas (
    id SERIAL PRIMARY KEY,
    curso TEXT NOT NULL,
    descricao TEXT NOT NULL,
    professor_matricula TEXT,

    CONSTRAINT disciplinas_professor_matricula_fkey
        FOREIGN KEY (professor_matricula)
        REFERENCES users(matricula)
);


-- ============================================
-- TABELA: monitorias
-- ============================================

CREATE TABLE monitorias (
    id SERIAL PRIMARY KEY,

    disciplina_id INTEGER NOT NULL,
    monitor_matricula TEXT,
    professor_matricula TEXT NOT NULL,

    local VARCHAR(100),
    descricao TEXT,
    status VARCHAR(20) DEFAULT 'ATIVA',
    nome TEXT NOT NULL,

    CONSTRAINT monitorias_disciplina_id_fkey
        FOREIGN KEY (disciplina_id)
        REFERENCES disciplinas(id),

    CONSTRAINT monitorias_monitor_matricula_fkey
        FOREIGN KEY (monitor_matricula)
        REFERENCES users(matricula),

    CONSTRAINT monitorias_professor_matricula_fkey
        FOREIGN KEY (professor_matricula)
        REFERENCES users(matricula)
);


-- ============================================
-- TABELA: horarios
-- ============================================

CREATE TABLE horarios (
    id SERIAL PRIMARY KEY,

    monitoria_id INTEGER NOT NULL,
    dia_semana VARCHAR(20) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,

    CONSTRAINT horarios_monitoria_id_fkey
        FOREIGN KEY (monitoria_id)
        REFERENCES monitorias(id)
);


-- ============================================
-- TABELA: favoritos
-- ============================================

CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,

    user_matricula TEXT NOT NULL,
    monitoria_id INTEGER NOT NULL,

    CONSTRAINT favoritos_user_matricula_fkey
        FOREIGN KEY (user_matricula)
        REFERENCES users(matricula),

    CONSTRAINT favoritos_monitoria_id_fkey
        FOREIGN KEY (monitoria_id)
        REFERENCES monitorias(id),

    CONSTRAINT favoritos_user_matricula_monitoria_id_key
        UNIQUE (user_matricula, monitoria_id)
);

-- CREATE TABLE users (
--     matricula TEXT PRIMARY KEY,
--     nome TEXT NOT NULL,
--     email TEXT UNIQUE NOT NULL,
--     senha TEXT NOT NULL,
--     sexo TEXT NOT NULL,
--     role TEXT NOT NULL,
--     refreshtoken TEXT
-- );

-- CREATE TABLE disciplinas (
--     id SERIAL PRIMARY KEY,
--     professor_matricula TEXT ,
--     curso TEXT NOT NULL,
--     descricao TEXT NOT NULL,
--     FOREIGN KEY (professor_matricula) REFERENCES users(matricula)
-- );

-- CREATE TABLE monitorias (
--     id SERIAL PRIMARY KEY,

--     disciplina_id INTEGER NOT NULL,
--     monitor_matricula TEXT NOT NULL,
--     professor_matricula TEXT NOT NULL,

--     local VARCHAR(100),
--     descricao TEXT,

--     status VARCHAR(20) DEFAULT 'ATIVA',

--     FOREIGN KEY (disciplina_id)
--         REFERENCES disciplinas(id),

--     FOREIGN KEY (monitor_matricula)
--         REFERENCES users(matricula),

--     FOREIGN KEY (professor_matricula)
--         REFERENCES users(matricula)
-- );

-- CREATE TABLE horarios (
--     id SERIAL PRIMARY KEY,

--     monitoria_id INTEGER NOT NULL,

--     dia_semana VARCHAR(20) NOT NULL,

--     hora_inicio TIME NOT NULL,
--     hora_fim TIME NOT NULL,

--     FOREIGN KEY (monitoria_id) REFERENCES monitorias(id)
-- );