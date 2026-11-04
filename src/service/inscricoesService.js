import * as db from '../repository/inscricoesRepository.js';


export async function saveInscricao(inscricao) {
  if (!inscricao.idCurso)
    return { erro: 'Informe o curso' };

  let jaInscrito = await db.getInscricaoByUsuarioCurso(inscricao.idUsuario, inscricao.idCurso);
  if (jaInscrito)
    return { erro: 'Você já está inscrito neste curso' };

  let id = await db.saveInscricao(inscricao);
  return { id };
}


export async function isInscrito(idUsuario, idCurso) {
  let inscricao = await db.getInscricaoByUsuarioCurso(idUsuario, idCurso);
  return { inscrito: !!inscricao };
}


export async function listInscricoes(idUsuario) {
  return db.listInscricoes(idUsuario);
}


export async function deleteInscricao(id, idUsuario) {
  return db.deleteInscricao(id, idUsuario);
}
