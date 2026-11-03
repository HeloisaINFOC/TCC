import { randomUUID } from 'crypto';

import * as repo from '../repository/certificadosRepository.js';
import * as repoCursos from '../repository/cursosRepository.js';
import * as repoInscricoes from '../repository/inscricoesRepository.js';
import * as repoProgresso from '../repository/progresso_aulasRepository.js';
import { ErroHttp } from '../utils/erros.js';


export async function getCertificado(id) {
    let certificado = await repo.buscarCertificadoPorId(id);
    if (!certificado)
        throw new ErroHttp(404, 'Certificado não encontrado');

    return certificado;
}


export async function listarCertificados(idUsuario) {
    return await repo.listarCertificadosDoUsuario(idUsuario);
}


export async function validarCertificado(codigo) {
    let certificado = await repo.buscarCertificadoPorCodigo(codigo);
    if (!certificado)
        throw new ErroHttp(404, 'Certificado inválido ou inexistente');

    return certificado;
}


export async function emitirCertificado(certificado) {
    if (!certificado.idCurso)
        throw new ErroHttp(400, 'O curso é obrigatório');

    let curso = await repoCursos.buscarCursoPorId(certificado.idCurso);
    if (!curso)
        throw new ErroHttp(404, 'Curso não encontrado');

    let inscricao = await repoInscricoes.buscarInscricaoDoUsuarioNoCurso(certificado.idUsuario, certificado.idCurso);
    if (!inscricao)
        throw new ErroHttp(403, 'Você não está inscrito neste curso');

    let existente = await repo.buscarCertificadoDoUsuarioNoCurso(certificado.idUsuario, certificado.idCurso);
    if (existente)
        throw new ErroHttp(409, 'Certificado já emitido para este curso');

    // só emite se concluiu 100% das aulas
    let progresso = await repoProgresso.calcularPercentual(certificado.idUsuario, certificado.idCurso);
    if (progresso.totalAulas === 0 || progresso.percentual < 100)
        throw new ErroHttp(400, 'Conclua todas as aulas para emitir o certificado');

    certificado.codigo = randomUUID().toUpperCase();

    let id = await repo.inserirCertificado(certificado);
    return id;
}


export async function removerCertificado(id) {
    let linhas = await repo.removerCertificado(id);
    if (linhas === 0)
        throw new ErroHttp(404, 'Certificado não encontrado');
}
