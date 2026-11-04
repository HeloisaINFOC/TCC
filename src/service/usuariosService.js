import crypto from 'crypto';
import * as db from '../repository/usuariosRepository.js';


// a senha nunca é guardada pura no banco
function criptografar(senha) {
  return crypto.createHash('sha256').update(senha).digest('hex');
}


export async function saveUsuario(usuario) {
  if (!usuario.nome || !usuario.email || !usuario.senha)
    return { erro: 'Preencha nome, email e senha' };

  let existe = await db.getUsuarioByEmail(usuario.email);
  if (existe)
    return { erro: 'Já existe uma conta com esse email' };

  usuario.senha = criptografar(usuario.senha);

  let id = await db.saveUsuario(usuario);
  return { id };
}


export async function loginUsuario(email, senha) {
  if (!email || !senha)
    return null;

  return db.getUsuarioByLogin(email, criptografar(senha));
}


export async function getUsuario(id) {
  return db.getUsuario(id);
}


export async function updateUsuario(id, usuario) {
  return db.updateUsuario(id, usuario);
}


export async function deleteUsuario(id) {
  return db.deleteUsuario(id);
}
