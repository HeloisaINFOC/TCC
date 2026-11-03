import * as repo from '../repository/cursosRepository.js';
import * as repoCategorias from '../repository/categoriasRepository.js';
import { ErroHttp } from '../utils/erros.js';


export async function listarCursos(busca) {
    if (busca && busca.trim())
        return await repo.buscarCursosPorNome(busca.trim());

    return await repo.listarCursos();
}


export async function getCurso(id) {
    let curso = await repo.buscarCursoPorId(id);
    if (!curso)
        throw new ErroHttp(404, 'Curso não encontrado');

    return curso;
}


export async function listarCursosPorCategoria(idCategoria) {
    return await repo.listarCursosPorCategoria(idCategoria);
}


async function validarCurso(curso) {
    if (!curso.titulo || !curso.titulo.trim())
        throw new ErroHttp(400, 'O título do curso é obrigatório');

    if (!curso.idCategoria)
        throw new ErroHttp(400, 'A categoria do curso é obrigatória');

    let categoria = await repoCategorias.buscarCategoriaPorId(curso.idCategoria);
    if (!categoria)
        throw new ErroHttp(400, 'Categoria inexistente');
}


export async function salvarCurso(curso) {
    await validarCurso(curso);

    let id = await repo.inserirCurso(curso);
    return id;
}


export async function alterarCurso(id, curso) {
    await validarCurso(curso);

    let linhas = await repo.alterarCurso(id, curso);
    if (linhas === 0)
        throw new ErroHttp(404, 'Curso não encontrado');
}


export async function removerCurso(id) {
    let linhas = await repo.removerCurso(id);
    if (linhas === 0)
        throw new ErroHttp(404, 'Curso não encontrado');
}
