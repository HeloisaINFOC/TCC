import * as db from '../repository/aulasRepository.js';


export async function saveAula(aula) {
  return db.saveAula(aula);
}


export async function getAula(id) {
  return db.getAula(id);
}


export async function listAulas(idCurso) {
  return db.listAulas(idCurso);
}


export async function updateAula(id, aula) {
  return db.updateAula(id, aula);
}


export async function deleteAula(id) {
  return db.deleteAula(id);
}
