import * as db from '../repository/progresso_aulasRepository.js';


export async function saveProgresso(progresso) {
  if (!progresso.idAula)
    return { erro: 'Informe a aula' };

  // se não mandar "concluida", considera que o aluno concluiu a aula
  if (progresso.concluida === undefined)
    progresso.concluida = true;

  await db.saveProgresso(progresso);
  return {};
}


export async function listProgresso(idUsuario, idCurso) {
  return db.listProgresso(idUsuario, idCurso);
}


export async function getPercentual(idUsuario, idCurso) {
  let resumo = await db.getResumoProgresso(idUsuario, idCurso);

  let percentual = 0;
  if (resumo.totalAulas > 0)
    percentual = Math.round((resumo.aulasConcluidas / resumo.totalAulas) * 100);

  return {
    totalAulas: resumo.totalAulas,
    aulasConcluidas: resumo.aulasConcluidas,
    percentual
  };
}
