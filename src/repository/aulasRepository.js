import { con } from './connection.js';


export async function saveAula(aula) {
  const command = `
    insert into aulas (id_curso, titulo, descricao, video_url, ordem, duracao)
      values (?, ?, ?, ?, ?, ?)
  `;

  const [result] = await con.query(command, [
    aula.idCurso,
    aula.titulo,
    aula.descricao,
    aula.videoUrl,
    aula.ordem,
    aula.duracao
  ]);

  return result.insertId;
}


export async function getAula(id) {
  const command = `
    select id,
           id_curso    as idCurso,
           titulo,
           descricao,
           video_url   as videoUrl,
           ordem,
           duracao
      from aulas
     where id = ?
  `;

  const [linhas] = await con.query(command, [id]);
  return linhas[0];
}


export async function listAulas(idCurso) {
  const command = `
    select id,
           id_curso    as idCurso,
           titulo,
           descricao,
           video_url   as videoUrl,
           ordem,
           duracao
      from aulas
     where id_curso = ?
     order by ordem
  `;

  const [linhas] = await con.query(command, [idCurso]);
  return linhas;
}


export async function updateAula(id, aula) {
  const command = `
    update aulas
       set titulo    = ?,
           descricao = ?,
           video_url = ?,
           ordem     = ?,
           duracao   = ?
     where id = ?
  `;

  await con.query(command, [
    aula.titulo,
    aula.descricao,
    aula.videoUrl,
    aula.ordem,
    aula.duracao,
    id
  ]);
}


export async function deleteAula(id) {
  const command = `
    delete from aulas
     where id = ?
  `;

  await con.query(command, [id]);
}
