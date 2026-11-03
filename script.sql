create database cursosDB;
use cursosDB;

create table usuarios (
  id          int primary key auto_increment,
  nome        varchar(100) not null,
  email       varchar(100) not null unique,
  senha       varchar(255) not null,
  tipo        varchar(20) not null default 'aluno',
  criado_em   datetime not null default current_timestamp
);

create table categorias (
  id    int primary key auto_increment,
  nome  varchar(100) not null unique
);

create table cursos (
  id            int primary key auto_increment,
  titulo        varchar(150) not null,
  descricao     text,
  imagem        varchar(500),
  id_categoria  int not null,
  id_instrutor  int not null,
  criado_em     datetime not null default current_timestamp,
  foreign key (id_categoria) references categorias(id),
  foreign key (id_instrutor) references usuarios(id) on delete cascade
);

create table aulas (
  id         int primary key auto_increment,
  id_curso   int not null,
  titulo     varchar(150) not null,
  descricao  text,
  video_url  varchar(500),
  ordem      int not null default 1,
  duracao    int,
  foreign key (id_curso) references cursos(id) on delete cascade
);

create table inscricoes (
  id              int primary key auto_increment,
  id_usuario      int not null,
  id_curso        int not null,
  data_inscricao  datetime not null default current_timestamp,
  unique (id_usuario, id_curso),
  foreign key (id_usuario) references usuarios(id) on delete cascade,
  foreign key (id_curso) references cursos(id) on delete cascade
);

create table progresso_aulas (
  id              int primary key auto_increment,
  id_usuario      int not null,
  id_aula         int not null,
  concluida       boolean not null default true,
  data_conclusao  datetime,
  unique (id_usuario, id_aula),
  foreign key (id_usuario) references usuarios(id) on delete cascade,
  foreign key (id_aula) references aulas(id) on delete cascade
);

create table certificados (
  id            int primary key auto_increment,
  id_usuario    int not null,
  id_curso      int not null,
  codigo        varchar(50) not null unique,
  data_emissao  datetime not null default current_timestamp,
  unique (id_usuario, id_curso),
  foreign key (id_usuario) references usuarios(id) on delete cascade,
  foreign key (id_curso) references cursos(id) on delete cascade
);

insert into categorias (nome) values
  ('Programação'),
  ('Design'),
  ('Marketing'),
  ('Idiomas'),
  ('Negócios');

-- para criar um admin ou instrutor: cadastre a conta pelo site e depois rode
-- update usuarios set tipo = 'admin' where email = 'seu@email.com';
-- update usuarios set tipo = 'instrutor' where email = 'outro@email.com';