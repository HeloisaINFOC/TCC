import con from './connection.js';


export async function buscarUsuarioPorId(id) {
    // não retorna a senha de propósito
    const comando = `
        select id,
               nome,
               email,
               tipo,
               criado_em as criadoEm
          from usuarios
         where id = ?
    `;

    let resp = await con.query(comando, [id]);
    let linhas = resp[0];

    return linhas[0];
}


export async function buscarUsuarioPorEmail(email) {
    // usado no login: retorna a senha (hash) para o service comparar
    const comando = `
        select id,
               nome,
               email,
               senha,
               tipo
          from usuarios
         where email = ?
    `;

    let resp = await con.query(comando, [email]);
    let linhas = resp[0];

    return linhas[0];
}


export async function inserirUsuario(usuario) {
    const comando = `
        insert into usuarios (nome, email, senha, tipo)
        values (?, ?, ?, ?)
    `;

    let resp = await con.query(comando, [
        usuario.nome,
        usuario.email,
        usuario.senha,
        usuario.tipo ?? 'aluno'
    ]);
    let info = resp[0];

    return info.insertId;
}


export async function alterarUsuario(id, usuario) {
    const comando = `
        update usuarios
           set nome  = ?,
               email = ?
         where id = ?
    `;

    let resp = await con.query(comando, [usuario.nome, usuario.email, id]);
    let info = resp[0];

    return info.affectedRows;
}


export async function alterarSenha(id, senhaHash) {
    const comando = `
        update usuarios
           set senha = ?
         where id = ?
    `;

    let resp = await con.query(comando, [senhaHash, id]);
    let info = resp[0];

    return info.affectedRows;
}


export async function removerUsuario(id) {
    const comando = `
        delete from usuarios
         where id = ?
    `;

    let resp = await con.query(comando, [id]);
    let info = resp[0];

    return info.affectedRows;
}
