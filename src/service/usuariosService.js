import bcrypt from 'bcrypt';   // se instalou o bcryptjs, troque por: import bcrypt from 'bcryptjs';

import * as repo from '../repository/usuariosRepository.js';
import { ErroHttp } from '../utils/erros.js';


function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? '');
}


export async function login(email, senha) {
    if (!email || !senha)
        throw new ErroHttp(400, 'Informe email e senha');

    let usuario = await repo.buscarUsuarioPorEmail(email);
    if (!usuario)
        return null;

    let senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta)
        return null;

    // nunca devolve a senha (hash) para fora do service
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo
    };
}


export async function cadastrarUsuario(usuario) {
    if (!usuario.nome || !usuario.nome.trim())
        throw new ErroHttp(400, 'O nome é obrigatório');

    if (!validarEmail(usuario.email))
        throw new ErroHttp(400, 'Email inválido');

    if (!usuario.senha || usuario.senha.length < 6)
        throw new ErroHttp(400, 'A senha deve ter pelo menos 6 caracteres');

    let existente = await repo.buscarUsuarioPorEmail(usuario.email);
    if (existente)
        throw new ErroHttp(409, 'Já existe uma conta com esse email');

    let novo = {
        nome: usuario.nome.trim(),
        email: usuario.email,
        senha: await bcrypt.hash(usuario.senha, 10),
        tipo: 'aluno'   // fixo: ninguém vira admin/instrutor pelo cadastro público
    };

    let id = await repo.inserirUsuario(novo);
    return id;
}


export async function getUsuario(id) {
    let usuario = await repo.buscarUsuarioPorId(id);
    if (!usuario)
        throw new ErroHttp(404, 'Usuário não encontrado');

    return usuario;
}


export async function alterarUsuario(id, usuario) {
    if (!usuario.nome || !usuario.nome.trim())
        throw new ErroHttp(400, 'O nome é obrigatório');

    if (!validarEmail(usuario.email))
        throw new ErroHttp(400, 'Email inválido');

    // o email novo não pode ser de outra conta
    let outro = await repo.buscarUsuarioPorEmail(usuario.email);
    if (outro && outro.id != id)
        throw new ErroHttp(409, 'Já existe uma conta com esse email');

    let linhas = await repo.alterarUsuario(id, usuario);
    if (linhas === 0)
        throw new ErroHttp(404, 'Usuário não encontrado');
}


export async function alterarSenha(id, senhaAtual, novaSenha) {
    if (!senhaAtual || !novaSenha)
        throw new ErroHttp(400, 'Informe a senha atual e a nova senha');

    if (novaSenha.length < 6)
        throw new ErroHttp(400, 'A nova senha deve ter pelo menos 6 caracteres');

    let basico = await getUsuario(id);
    let usuario = await repo.buscarUsuarioPorEmail(basico.email);

    let senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaCorreta)
        throw new ErroHttp(401, 'Senha atual incorreta');

    let hash = await bcrypt.hash(novaSenha, 10);
    await repo.alterarSenha(id, hash);
}


export async function removerUsuario(id) {
    let linhas = await repo.removerUsuario(id);
    if (linhas === 0)
        throw new ErroHttp(404, 'Usuário não encontrado');
}
