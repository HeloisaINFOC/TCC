import * as db from '../repository/cursosRepository.js';


export async function saveCurso(curso) {
  return db.saveCurso(curso);
}


export async function getCurso(id) {
  return db.getCurso(id);
}


export async function listCursos() {
  return db.listCursos();
}


export async function listCursosByCategoria(idCategoria) {
  return db.listCursosByCategoria(idCategoria);
}


export async function updateCurso(id, curso) {
  return db.updateCurso(id, curso);
}


export async function deleteCurso(id) {
  return db.deleteCurso(id);
}
