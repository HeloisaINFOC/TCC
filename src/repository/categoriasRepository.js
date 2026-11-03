import con from './connection.js';


export async function listarCategorias() {
    const comando = `
        select id,
               nome
          from categorias
         order by nome
    `;

    let resp = await con.query(comando);
    let linhas = resp[0];

    return linhas;
}


export async function buscarCategoriaPorId(id) {
    const comando = `
        select id,
               nome
          from categorias
         where id = ?
    `;

    let resp = await con.query(comando, [id]);
    let linhas = resp[0];

    return linhas[0];
}


export async function inserirCategoria(categoria) {
    const comando = `
        insert into categorias (nome)
        values (?)
    `;

    let resp = await con.query(comando, [categoria.nome]);
    let info = resp[0];

    return info.insertId;
}


export async function alterarCategoria(id, categoria) {
    const comando = `
        update categorias
           set nome = ?
         where id = ?
    `;

    let resp = await con.query(comando, [categoria.nome, id]);
    let info = resp[0];

    return info.affectedRows;
}


export async function removerCategoria(id) {
    const comando = `
        delete from categorias
         where id = ?
    `;

    let resp = await con.query(comando, [id]);
    let info = resp[0];

    return info.affectedRows;
}
