import { con } from './connection.js';


export async function saveUsuario(usuario) {
  const command = `
    insert into usuarios (nome, email, senha)
      values (?, ?, ?)
  `;

  const [result] = await con.query(command, [
    usuario.nome,
    usuario.email,
    usuario.senha
  ]);

  return result.insertId;
}


export async function getUsuario(id) {
  const command = `
    select id,
           nome,
           email,
           tipo
      from usuarios
     where id = ?
  `;

  const [linhas] = await con.query(command, [id]);
  return linhas[0];
}


export async function getUsuarioByEmail(email) {
  const command = `
    select id
      from usuarios
     where email = ?
  `;

  const [linhas] = await con.query(command, [email]);
  return linhas[0];
}


export async function getUsuarioByLogin(email, senha) {
  const command = `
    select id,
           nome,
           email,
           tipo
      from usuarios
     where email = ?
       and senha = ?
  `;

  const [linhas] = await con.query(command, [email, senha]);
  return linhas[0];
}


export async function updateUsuario(id, usuario) {
  const command = `
    update usuarios
       set nome  = ?,
           email = ?
     where id = ?
  `;

  await con.query(command, [
    usuario.nome,
    usuario.email,
    id
  ]);
}


export async function deleteUsuario(id) {
  const command = `
    delete from usuarios
     where id = ?
  `;

  await con.query(command, [id]);
}
