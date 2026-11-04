import { con } from './connection.js';


// se o aluno já tem registro dessa aula, atualiza em vez de duplicar
export async function saveProgresso(progresso) {
  const command = `
    insert into progresso_aulas (id_usuario, id_aula, concluida, data_conclusao)
      values (?, ?, ?, now())
    on duplicate key update
      concluida      = ?,
      data_conclusao = now()
  `;

  await con.query(command, [
    progresso.idUsuario,
    progresso.idAula,
    progresso.concluida,
    progresso.concluida
  ]);
}


export async function listProgresso(idUsuario, idCurso) {
  const command = `
    select p.id,
           p.id_aula         as idAula,
           p.concluida,
           p.data_conclusao  as dataConclusao
      from progresso_aulas p
      join aulas a on a.id = p.id_aula
     where p.id_usuario = ?
       and a.id_curso = ?
  `;

  const [linhas] = await con.query(command, [idUsuario, idCurso]);
  return linhas;
}


export async function getResumoProgresso(idUsuario, idCurso) {
  const command = `
    select count(a.id)  as totalAulas,
           count(p.id)  as aulasConcluidas
      from aulas a
      left join progresso_aulas p
             on p.id_aula = a.id
            and p.id_usuario = ?
            and p.concluida = true
     where a.id_curso = ?
  `;

  const [linhas] = await con.query(command, [idUsuario, idCurso]);
  return linhas[0];
}
