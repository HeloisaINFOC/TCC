import * as db from '../repository/categoriasRepository.js';


export async function saveCategoria(categoria) {
  return db.saveCategoria(categoria);
}


export async function getCategoria(id) {
  return db.getCategoria(id);
}


export async function listCategorias() {
  return db.listCategorias();
}


export async function updateCategoria(id, categoria) {
  return db.updateCategoria(id, categoria);
}


export async function deleteCategoria(id) {
  return db.deleteCategoria(id);
}
