import con from './connection.js';


export async function buscarInscricaoPorId(id) {
    const comando = `
        select id,
               id_usuario      as idUsuario,
               id_curso        as idCurso,
               data_inscricao  as dataInscricao
          from inscricoes
         where id = ?
    `;

    let resp = await con.query(comando, [id]);
    let linhas = resp[0];

    return linhas[0];
}


export async function listarInscricoesDoUsuario(idUsuario) {
    const comando = `
        select i.id,
               i.id_curso        as idCurso,
               i.data_inscricao  as dataInscricao,
               c.titulo,
               c.imagem
          from inscricoes i
          join cursos c on c.id = i.id_curso
         where i.id_usuario = ?
         order by i.data_inscricao desc
    `;

    let resp = await con.query(comando, [idUsuario]);
    let linhas = resp[0];

    return linhas;
}


export async function listarInscricoesDoCurso(idCurso) {
    const comando = `
        select i.id,
               i.id_usuario      as idUsuario,
               i.data_inscricao  as dataInscricao,
               u.nome,
               u.email
          from inscricoes i
          join usuarios u on u.id = i.id_usuario
         where i.id_curso = ?
         order by i.data_inscricao desc
    `;

    let resp = await con.query(comando, [idCurso]);
    let linhas = resp[0];

    return linhas;
}


export async function buscarInscricaoDoUsuarioNoCurso(idUsuario, idCurso) {
    // serve para saber se o aluno já está inscrito (evita duplicidade)
    const comando = `
        select id,
               id_usuario      as idUsuario,
               id_curso        as idCurso,
               data_inscricao  as dataInscricao
          from inscricoes
         where id_usuario = ?
           and id_curso = ?
    `;

    let resp = await con.query(comando, [idUsuario, idCurso]);
    let linhas = resp[0];

    return linhas[0];
}


export async function inserirInscricao(inscricao) {
    const comando = `
        insert into inscricoes (id_usuario, id_curso)
        values (?, ?)
    `;

    let resp = await con.query(comando, [inscricao.idUsuario, inscricao.idCurso]);
    let info = resp[0];

    return info.insertId;
}


export async function removerInscricao(id) {
    const comando = `
        delete from inscricoes
         where id = ?
    `;

    let resp = await con.query(comando, [id]);
    let info = resp[0];

    return info.affectedRows;
}
