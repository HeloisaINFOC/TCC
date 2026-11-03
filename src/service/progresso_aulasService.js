import * as repo from '../repository/progresso_aulasRepository.js';
import * as repoAulas from '../repository/aulasRepository.js';
import * as repoInscricoes from '../repository/inscricoesRepository.js';
import { ErroHttp } from '../utils/erros.js';


export async function getProgresso(id) {
    let progresso = await repo.buscarProgressoPorId(id);
    if (!progresso)
        throw new ErroHttp(404, 'Progresso não encontrado');

    return progresso;
}


export async function listarProgressoDoCurso(idUsuario, idCurso) {
    return await repo.listarProgressoDoCurso(idUsuario, idCurso);
}


export async function calcularPercentual(idUsuario, idCurso) {
    return await repo.calcularPercentual(idUsuario, idCurso);
}


export async function salvarProgresso(progresso) {
    if (!progresso.idAula)
        throw new ErroHttp(400, 'A aula é obrigatória');

    let aula = await repoAulas.buscarAulaPorId(progresso.idAula);
    if (!aula)
        throw new ErroHttp(404, 'Aula não encontrada');

    // só quem está inscrito no curso pode registrar progresso
    let inscricao = await repoInscricoes.buscarInscricaoDoUsuarioNoCurso(progresso.idUsuario, aula.idCurso);
    if (!inscricao)
        throw new ErroHttp(403, 'Inscreva-se no curso para registrar seu progresso');

    // se já existir registro dessa aula, ele é atualizado (não duplica)
    let id = await repo.inserirProgresso(progresso);
    return id;
}


export async function alterarProgresso(id, progresso) {
    if (typeof progresso.concluida !== 'boolean')
        throw new ErroHttp(400, 'O campo concluida deve ser true ou false');

    let linhas = await repo.alterarProgresso(id, progresso);
    if (linhas === 0)
        throw new ErroHttp(404, 'Progresso não encontrado');
}


export async function removerProgresso(id) {
    let linhas = await repo.removerProgresso(id);
    if (linhas === 0)
        throw new ErroHttp(404, 'Progresso não encontrado');
}
