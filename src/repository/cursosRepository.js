import { con } from './connection.js';


export async function saveCurso(curso) {
  const command = `
    insert into cursos (titulo, descricao, imagem, id_categoria, id_instrutor)
      values (?, ?, ?, ?, ?)
  `;

  const [result] = await con.query(command, [
    curso.titulo,
    curso.descricao,
    curso.imagem,
    curso.idCategoria,
    curso.idInstrutor
  ]);

  return result.insertId;
}


export async function getCurso(id) {
  const command = `
    select c.id,
           c.titulo,
           c.descricao,
           c.imagem,
           c.id_categoria   as idCategoria,
           cat.nome         as categoria,
           c.id_instrutor   as idInstrutor,
           u.nome           as instrutor
      from cursos c
      join categorias cat on cat.id = c.id_categoria
      join usuarios u     on u.id = c.id_instrutor
     where c.id = ?
  `;

  const [linhas] = await con.query(command, [id]);
  return linhas[0];
}


export async function listCursos() {
  const command = `
    select c.id,
           c.titulo,
           c.descricao,
           c.imagem,
           c.id_categoria   as idCategoria,
           cat.nome         as categoria,
           u.nome           as instrutor
      from cursos c
      join categorias cat on cat.id = c.id_categoria
      join usuarios u     on u.id = c.id_instrutor
     order by c.id desc
  `;

  const [linhas] = await con.query(command);
  return linhas;
}


export async function listCursosByCategoria(idCategoria) {
  const command = `
    select c.id,
           c.titulo,
           c.descricao,
           c.imagem,
           c.id_categoria   as idCategoria,
           cat.nome         as categoria,
           u.nome           as instrutor
      from cursos c
      join categorias cat on cat.id = c.id_categoria
      join usuarios u     on u.id = c.id_instrutor
     where c.id_categoria = ?
     order by c.id desc
  `;

  const [linhas] = await con.query(command, [idCategoria]);
  return linhas;
}


export async function updateCurso(id, curso) {
  const command = `
    update cursos
       set titulo       = ?,
           descricao    = ?,
           imagem       = ?,
           id_categoria = ?
     where id = ?
  `;

  await con.query(command, [
    curso.titulo,
    curso.descricao,
    curso.imagem,
    curso.idCategoria,
    id
  ]);
}


export async function deleteCurso(id) {
  const command = `
    delete from cursos
     where id = ?
  `;

  await con.query(command, [id]);
}
