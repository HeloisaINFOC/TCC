import { con } from './connection.js';


export async function saveCategoria(categoria) {
  const command = `
    insert into categorias (nome)
      values (?)
  `;

  const [result] = await con.query(command, [
    categoria.nome
  ]);

  return result.insertId;
}


export async function getCategoria(id) {
  const command = `
    select id,
           nome
      from categorias
     where id = ?
  `;

  const [linhas] = await con.query(command, [id]);
  return linhas[0];
}


export async function listCategorias() {
  const command = `
    select id,
           nome
      from categorias
     order by nome
  `;

  const [linhas] = await con.query(command);
  return linhas;
}


export async function updateCategoria(id, categoria) {
  const command = `
    update categorias
       set nome = ?
     where id = ?
  `;

  await con.query(command, [categoria.nome, id]);
}


export async function deleteCategoria(id) {
  const command = `
    delete from categorias
     where id = ?
  `;

  await con.query(command, [id]);
}
