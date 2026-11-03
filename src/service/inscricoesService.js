import * as repo from '../repository/inscricoesRepository.js';
import * as repoCursos from '../repository/cursosRepository.js';
import { ErroHttp } from '../utils/erros.js';


export async function getInscricao(id) {
    let inscricao = await repo.buscarInscricaoPorId(id);
    if (!inscricao)
        throw new ErroHttp(404, 'Inscrição não encontrada');

    return inscricao;
}


export async function listarInscricoesDoUsuario(idUsuario) {
    return await repo.listarInscricoesDoUsuario(idUsuario);
}


export async function listarInscricoesDoCurso(idCurso) {
    return await repo.listarInscricoesDoCurso(idCurso);
}


export async function verificarInscricao(idUsuario, idCurso) {
    let inscricao = await repo.buscarInscricaoDoUsuarioNoCurso(idUsuario, idCurso);

    return { inscrito: !!inscricao };
}


export async function salvarInscricao(inscricao) {
    if (!inscricao.idCurso)
        throw new ErroHttp(400, 'O curso é obrigatório');

    let curso = await repoCursos.buscarCursoPorId(inscricao.idCurso);
    if (!curso)
        throw new ErroHttp(404, 'Curso não encontrado');

    let jaInscrito = await repo.buscarInscricaoDoUsuarioNoCurso(inscricao.idUsuario, inscricao.idCurso);
    if (jaInscrito)
        throw new ErroHttp(409, 'Você já está inscrito neste curso');

    let id = await repo.inserirInscricao(inscricao);
    return id;
}


export async function removerInscricao(id) {
    let linhas = await repo.removerInscricao(id);
    if (linhas === 0)
        throw new ErroHttp(404, 'Inscrição não encontrada');
}
