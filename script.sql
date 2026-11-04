create database bancoimpulsa;
use bancoimpulsa;
drop database bancoimpulsa;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100),
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto VARCHAR(255),
    data_nascimento DATE,
    telefone VARCHAR(20),
    status ENUM('ativo', 'inativo', 'bloqueado')
        NOT NULL DEFAULT 'ativo',
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    imagem VARCHAR(255)
);

CREATE TABLE cursos (
    id_curso INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    imagem_capa VARCHAR(255),
    modalidade ENUM('gratuito')
        NOT NULL DEFAULT 'gratuito',
    carga_horaria INT NOT NULL DEFAULT 0,
    id_categoria INT NOT NULL,
    status ENUM('rascunho', 'publicado', 'arquivado')
        NOT NULL DEFAULT 'rascunho',

    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);


CREATE TABLE aulas (
    id_aula INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    tipo ENUM('video', 'texto', 'arquivo', 'link')
        NOT NULL DEFAULT 'video',
    conteudo TEXT,
    url_video VARCHAR(500),
    arquivo VARCHAR(255),
    duracao_minutos INT DEFAULT 0,
    ordem INT NOT NULL
);


CREATE TABLE inscricoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT NOT NULL,
    id_curso INT NOT NULL,
    data_inscricao DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativa', 'concluida', 'cancelada')
        NOT NULL DEFAULT 'ativa',
    percentual_conclusao DECIMAL(5,2)
        NOT NULL DEFAULT 0.00,

    FOREIGN KEY (id_aluno) REFERENCES usuarios(id),
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso),

    UNIQUE (id_aluno, id_curso)
);

CREATE TABLE progresso_aulas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_inscricao INT NOT NULL,
    id_aula INT NOT NULL,

    concluida BOOLEAN NOT NULL DEFAULT FALSE,

    data_inicio DATETIME,
    data_conclusao DATETIME,

    ultima_posicao_segundos INT NOT NULL DEFAULT 0,

    FOREIGN KEY (id_inscricao)
        REFERENCES inscricoes(id)
        ON DELETE CASCADE,

    FOREIGN KEY (id_aula)
        REFERENCES aulas(id_aula)
        ON DELETE CASCADE,

    UNIQUE (id_inscricao, id_aula)
);

CREATE TABLE certificados (
    id INT PRIMARY KEY AUTO_INCREMENT,

    id_inscricao INT NOT NULL UNIQUE,

    codigo VARCHAR(100) NOT NULL UNIQUE,

    data_emissao DATETIME DEFAULT CURRENT_TIMESTAMP,

    arquivo_pdf VARCHAR(255),

    FOREIGN KEY (id_inscricao)
        REFERENCES inscricoes(id)
        ON DELETE CASCADE
);