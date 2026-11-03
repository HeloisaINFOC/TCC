import * as repo from '../repository/aulasRepository.js';
import * as repoCursos from '../repository/cursosRepository.js';
import { ErroHttp } from '../utils/erros.js';


export async function getAula(id) {
    let aula = await repo.buscarAulaPorId(id);
    if (!aula)
        throw new ErroHttp(404, 'Aula não encontrada');

    return aula;
}


export async function listarAulas(idCurso) {
    return await repo.listarAulasPorCurso(idCurso);
}


export async function salvarAula(aula) {
    if (!aula.titulo || !aula.titulo.trim())
        throw new ErroHttp(400, 'O título da aula é obrigatório');

    if (!aula.idCurso)
        throw new ErroHttp(400, 'O curso da aula é obrigatório');

    let curso = await repoCursos.buscarCursoPorId(aula.idCurso);
    if (!curso)
        throw new ErroHttp(400, 'Curso inexistente');

    // se não informar a ordem, a aula vai para o final do curso
    if (!aula.ordem) {
        let aulas = await repo.listarAulasPorCurso(aula.idCurso);
        aula.ordem = aulas.length + 1;
    }

    let id = await repo.inserirAula(aula);
    return id;
}


export async function alterarAula(id, aula) {
    if (!aula.titulo || !aula.titulo.trim())
        throw new ErroHttp(400, 'O título da aula é obrigatório');

    let linhas = await repo.alterarAula(id, aula);
    if (linhas === 0)
        throw new ErroHttp(404, 'Aula não encontrada');
}


export async function removerAula(id) {
    let linhas = await repo.removerAula(id);
    if (linhas === 0)
        throw new ErroHttp(404, 'Aula não encontrada');
}
