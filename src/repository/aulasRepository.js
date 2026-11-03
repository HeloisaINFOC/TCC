import con from './connection.js';


export async function buscarAulaPorId(id) {
    const comando = `
        select id,
               id_curso   as idCurso,
               titulo,
               descricao,
               video_url  as videoUrl,
               ordem,
               duracao
          from aulas
         where id = ?
    `;

    let resp = await con.query(comando, [id]);
    let linhas = resp[0];

    return linhas[0];
}


export async function listarAulasPorCurso(idCurso) {
    const comando = `
        select id,
               id_curso   as idCurso,
               titulo,
               descricao,
               video_url  as videoUrl,
               ordem,
               duracao
          from aulas
         where id_curso = ?
         order by ordem
    `;

    let resp = await con.query(comando, [idCurso]);
    let linhas = resp[0];

    return linhas;
}


export async function inserirAula(aula) {
    const comando = `
        insert into aulas (id_curso, titulo, descricao, video_url, ordem, duracao)
        values (?, ?, ?, ?, ?, ?)
    `;

    let resp = await con.query(comando, [
        aula.idCurso,
        aula.titulo,
        aula.descricao,
        aula.videoUrl,
        aula.ordem,
        aula.duracao
    ]);
    let info = resp[0];

    return info.insertId;
}


export async function alterarAula(id, aula) {
    const comando = `
        update aulas
           set titulo    = ?,
               descricao = ?,
               video_url = ?,
               ordem     = ?,
               duracao   = ?
         where id = ?
    `;

    let resp = await con.query(comando, [
        aula.titulo,
        aula.descricao,
        aula.videoUrl,
        aula.ordem,
        aula.duracao,
        id
    ]);
    let info = resp[0];

    return info.affectedRows;
}


export async function removerAula(id) {
    const comando = `
        delete from aulas
         where id = ?
    `;

    let resp = await con.query(comando, [id]);
    let info = resp[0];

    return info.affectedRows;
}
