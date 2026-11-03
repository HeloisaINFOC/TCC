import con from './connection.js';


export async function buscarCertificadoPorId(id) {
    const comando = `
        select ce.id,
               ce.id_usuario    as idUsuario,
               ce.id_curso      as idCurso,
               ce.codigo,
               ce.data_emissao  as dataEmissao,
               u.nome           as aluno,
               c.titulo         as curso
          from certificados ce
          join usuarios u on u.id = ce.id_usuario
          join cursos c   on c.id = ce.id_curso
         where ce.id = ?
    `;

    let resp = await con.query(comando, [id]);
    let linhas = resp[0];

    return linhas[0];
}


export async function buscarCertificadoPorCodigo(codigo) {
    // usado na validação pública do certificado
    const comando = `
        select ce.id,
               ce.codigo,
               ce.data_emissao  as dataEmissao,
               u.nome           as aluno,
               c.titulo         as curso
          from certificados ce
          join usuarios u on u.id = ce.id_usuario
          join cursos c   on c.id = ce.id_curso
         where ce.codigo = ?
    `;

    let resp = await con.query(comando, [codigo]);
    let linhas = resp[0];

    return linhas[0];
}


export async function listarCertificadosDoUsuario(idUsuario) {
    const comando = `
        select ce.id,
               ce.id_curso      as idCurso,
               ce.codigo,
               ce.data_emissao  as dataEmissao,
               c.titulo         as curso
          from certificados ce
          join cursos c on c.id = ce.id_curso
         where ce.id_usuario = ?
         order by ce.data_emissao desc
    `;

    let resp = await con.query(comando, [idUsuario]);
    let linhas = resp[0];

    return linhas;
}


export async function buscarCertificadoDoUsuarioNoCurso(idUsuario, idCurso) {
    const comando = `
        select id,
               codigo,
               data_emissao as dataEmissao
          from certificados
         where id_usuario = ?
           and id_curso = ?
    `;

    let resp = await con.query(comando, [idUsuario, idCurso]);
    let linhas = resp[0];

    return linhas[0];
}


export async function inserirCertificado(certificado) {
    // o código único (ex: crypto.randomUUID()) é gerado no service
    const comando = `
        insert into certificados (id_usuario, id_curso, codigo)
        values (?, ?, ?)
    `;

    let resp = await con.query(comando, [
        certificado.idUsuario,
        certificado.idCurso,
        certificado.codigo
    ]);
    let info = resp[0];

    return info.insertId;
}


export async function removerCertificado(id) {
    const comando = `
        delete from certificados
         where id = ?
    `;

    let resp = await con.query(comando, [id]);
    let info = resp[0];

    return info.affectedRows;
}
