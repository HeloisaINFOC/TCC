import { con } from './connection.js';


export async function saveCertificado(certificado) {
  const command = `
    insert into certificados (id_usuario, id_curso, codigo)
      values (?, ?, ?)
  `;

  const [result] = await con.query(command, [
    certificado.idUsuario,
    certificado.idCurso,
    certificado.codigo
  ]);

  return result.insertId;
}


export async function getCertificado(id) {
  const command = `
    select ce.id,
           ce.id_usuario    as idUsuario,
           ce.id_curso      as idCurso,
           ce.codigo,
           ce.data_emissao  as dataEmissao,
           u.nome           as aluno,
           c.titulo         as curso
      from certificados ce
      join usuarios u on u.id = ce.id_usuario
      join cursos c   on c.id = ce.id_curso
     where ce.id = ?
  `;

  const [linhas] = await con.query(command, [id]);
  return linhas[0];
}


export async function getCertificadoByCodigo(codigo) {
  const command = `
    select ce.id,
           ce.codigo,
           ce.data_emissao  as dataEmissao,
           u.nome           as aluno,
           c.titulo         as curso
      from certificados ce
      join usuarios u on u.id = ce.id_usuario
      join cursos c   on c.id = ce.id_curso
     where ce.codigo = ?
  `;

  const [linhas] = await con.query(command, [codigo]);
  return linhas[0];
}


export async function getCertificadoByUsuarioCurso(idUsuario, idCurso) {
  const command = `
    select id
      from certificados
     where id_usuario = ?
       and id_curso = ?
  `;

  const [linhas] = await con.query(command, [idUsuario, idCurso]);
  return linhas[0];
}


export async function listCertificados(idUsuario) {
  const command = `
    select ce.id,
           ce.id_curso      as idCurso,
           ce.codigo,
           ce.data_emissao  as dataEmissao,
           c.titulo         as curso
      from certificados ce
      join cursos c on c.id = ce.id_curso
     where ce.id_usuario = ?
     order by ce.data_emissao desc
  `;

  const [linhas] = await con.query(command, [idUsuario]);
  return linhas;
}
