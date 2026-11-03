import con from './connection.js';


export async function listarCursos() {
    const comando = `
        select c.id,
               c.titulo,
               c.descricao,
               c.imagem,
               c.id_categoria   as idCategoria,
               cat.nome         as categoria,
               c.id_instrutor   as idInstrutor,
               u.nome           as instrutor
          from cursos c
          join categorias cat on cat.id = c.id_categoria
          join usuarios u     on u.id = c.id_instrutor
         order by c.id desc
    `;

    let resp = await con.query(comando);
    let linhas = resp[0];

    return linhas;
}


export async function buscarCursoPorId(id) {
    const comando = `
        select c.id,
               c.titulo,
               c.descricao,
               c.imagem,
               c.id_categoria   as idCategoria,
               cat.nome         as categoria,
               c.id_instrutor   as idInstrutor,
               u.nome           as instrutor
          from cursos c
          join categorias cat on cat.id = c.id_categoria
          join usuarios u     on u.id = c.id_instrutor
         where c.id = ?
    `;

    let resp = await con.query(comando, [id]);
    let linhas = resp[0];

    return linhas[0];
}


export async function listarCursosPorCategoria(idCategoria) {
    const comando = `
        select c.id,
               c.titulo,
               c.descricao,
               c.imagem,
               c.id_categoria   as idCategoria,
               u.nome           as instrutor
          from cursos c
          join usuarios u on u.id = c.id_instrutor
         where c.id_categoria = ?
         order by c.id desc
    `;

    let resp = await con.query(comando, [idCategoria]);
    let linhas = resp[0];

    return linhas;
}


export async function buscarCursosPorNome(busca) {
    const comando = `
        select c.id,
               c.titulo,
               c.descricao,
               c.imagem,
               c.id_categoria   as idCategoria,
               u.nome           as instrutor
          from cursos c
          join usuarios u on u.id = c.id_instrutor
         where c.titulo like ?
         order by c.titulo
    `;

    let resp = await con.query(comando, ['%' + busca + '%']);
    let linhas = resp[0];

    return linhas;
}


export async function inserirCurso(curso) {
    const comando = `
        insert into cursos (titulo, descricao, imagem, id_categoria, id_instrutor)
        values (?, ?, ?, ?, ?)
    `;

    let resp = await con.query(comando, [
        curso.titulo,
        curso.descricao,
        curso.imagem,
        curso.idCategoria,
        curso.idInstrutor
    ]);
    let info = resp[0];

    return info.insertId;
}


export async function alterarCurso(id, curso) {
    const comando = `
        update cursos
           set titulo       = ?,
               descricao    = ?,
               imagem       = ?,
               id_categoria = ?
         where id = ?
    `;

    let resp = await con.query(comando, [
        curso.titulo,
        curso.descricao,
        curso.imagem,
        curso.idCategoria,
        id
    ]);
    let info = resp[0];

    return info.affectedRows;
}


export async function removerCurso(id) {
    const comando = `
        delete from cursos
         where id = ?
    `;

    let resp = await con.query(comando, [id]);
    let info = resp[0];

    return info.affectedRows;
}
