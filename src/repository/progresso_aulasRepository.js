import con from './connection.js';


export async function buscarProgressoPorId(id) {
    const comando = `
        select id,
               id_usuario      as idUsuario,
               id_aula         as idAula,
               concluida,
               data_conclusao  as dataConclusao
          from progresso_aulas
         where id = ?
    `;

    let resp = await con.query(comando, [id]);
    let linhas = resp[0];

    return linhas[0];
}


export async function listarProgressoDoCurso(idUsuario, idCurso) {
    const comando = `
        select p.id,
               p.id_aula         as idAula,
               p.concluida,
               p.data_conclusao  as dataConclusao
          from progresso_aulas p
          join aulas a on a.id = p.id_aula
         where p.id_usuario = ?
           and a.id_curso = ?
    `;

    let resp = await con.query(comando, [idUsuario, idCurso]);
    let linhas = resp[0];

    return linhas;
}


export async function calcularPercentual(idUsuario, idCurso) {
    const comando = `
        select count(a.id)  as totalAulas,
               count(p.id)  as aulasConcluidas
          from aulas a
          left join progresso_aulas p
                 on p.id_aula = a.id
                and p.id_usuario = ?
                and p.concluida = true
         where a.id_curso = ?
    `;

    let resp = await con.query(comando, [idUsuario, idCurso]);
    let dados = resp[0][0];

    let percentual = dados.totalAulas === 0
        ? 0
        : Math.round((dados.aulasConcluidas / dados.totalAulas) * 100);

    return {
        totalAulas: dados.totalAulas,
        aulasConcluidas: dados.aulasConcluidas,
        percentual
    };
}


export async function inserirProgresso(progresso) {
    // precisa de UNIQUE (id_usuario, id_aula) na tabela
    const comando = `
        insert into progresso_aulas (id_usuario, id_aula, concluida, data_conclusao)
        values (?, ?, ?, now())
        on duplicate key update
               concluida = values(concluida),
               data_conclusao = values(data_conclusao)
    `;

    let resp = await con.query(comando, [
        progresso.idUsuario,
        progresso.idAula,
        progresso.concluida ?? true
    ]);
    let info = resp[0];

    return info.insertId;
}


export async function alterarProgresso(id, progresso) {
    const comando = `
        update progresso_aulas
           set concluida      = ?,
               data_conclusao = now()
         where id = ?
    `;

    let resp = await con.query(comando, [progresso.concluida, id]);
    let info = resp[0];

    return info.affectedRows;
}


export async function removerProgresso(id) {
    const comando = `
        delete from progresso_aulas
         where id = ?
    `;

    let resp = await con.query(comando, [id]);
    let info = resp[0];

    return info.affectedRows;
}
