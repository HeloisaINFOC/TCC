import * as repo from '../repository/categoriasRepository.js';
import { ErroHttp } from '../utils/erros.js';


export async function listarCategorias() {
    return await repo.listarCategorias();
}


export async function getCategoria(id) {
    let categoria = await repo.buscarCategoriaPorId(id);
    if (!categoria)
        throw new ErroHttp(404, 'Categoria não encontrada');

    return categoria;
}


export async function salvarCategoria(categoria) {
    if (!categoria.nome || !categoria.nome.trim())
        throw new ErroHttp(400, 'O nome da categoria é obrigatório');

    let id = await repo.inserirCategoria(categoria);
    return id;
}


export async function alterarCategoria(id, categoria) {
    if (!categoria.nome || !categoria.nome.trim())
        throw new ErroHttp(400, 'O nome da categoria é obrigatório');

    let linhas = await repo.alterarCategoria(id, categoria);
    if (linhas === 0)
        throw new ErroHttp(404, 'Categoria não encontrada');
}


export async function removerCategoria(id) {
    try {
        let linhas = await repo.removerCategoria(id);
        if (linhas === 0)
            throw new ErroHttp(404, 'Categoria não encontrada');
    }
    catch (err) {
        // categoria que ainda tem cursos não pode ser apagada
        if (err.code === 'ER_ROW_IS_REFERENCED_2')
            throw new ErroHttp(409, 'Não é possível apagar: existem cursos nessa categoria');
        throw err;
    }
}
