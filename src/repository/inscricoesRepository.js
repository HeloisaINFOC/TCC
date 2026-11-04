import { con } from './connection.js';


export async function saveInscricao(inscricao) {
  const command = `
    insert into inscricoes (id_usuario, id_curso)
      values (?, ?)
  `;

  const [result] = await con.query(command, [
    inscricao.idUsuario,
    inscricao.idCurso
  ]);

  return result.insertId;
}


export async function getInscricaoByUsuarioCurso(idUsuario, idCurso) {
  const command = `
    select id
      from inscricoes
     where id_usuario = ?
       and id_curso = ?
  `;

  const [linhas] = await con.query(command, [idUsuario, idCurso]);
  return linhas[0];
}


export async function listInscricoes(idUsuario) {
  const command = `
    select i.id,
           i.id_curso        as idCurso,
           i.data_inscricao  as dataInscricao,
           c.titulo,
           c.imagem
      from inscricoes i
      join cursos c on c.id = i.id_curso
     where i.id_usuario = ?
     order by i.data_inscricao desc
  `;

  const [linhas] = await con.query(command, [idUsuario]);
  return linhas;
}


export async function deleteInscricao(id, idUsuario) {
  const command = `
    delete from inscricoes
     where id = ?
       and id_usuario = ?
  `;

  await con.query(command, [id, idUsuario]);
}
