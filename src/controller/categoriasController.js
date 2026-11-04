import * as service from '../service/categoriasService.js';

import { Router } from "express";
import { getAuthentication } from '../utils/jwt.js';
const endpoints = Router();

let authAdmin = getAuthentication(['admin']);


endpoints.get('/categorias', async (req, resp) => {
    let categorias = await service.listCategorias();
    resp.send(categorias);
})


endpoints.get('/categoria/:id', async (req, resp) => {
    let id = req.params.id;

    let categoria = await service.getCategoria(id);
    if (!categoria)
        return resp.status(404).send({ erro: 'Categoria não encontrada' });

    resp.send(categoria);
})


endpoints.post('/categoria', authAdmin, async (req, resp) => {
    let categoria = req.body;

    let id = await service.saveCategoria(categoria);
    resp.send({ id });
})


endpoints.put('/categoria/:id', authAdmin, async (req, resp) => {
    let id = req.params.id;
    let categoria = req.body;

    await service.updateCategoria(id, categoria);
    resp.send();
})


endpoints.delete('/categoria/:id', authAdmin, async (req, resp) => {
    let id = req.params.id;

    await service.deleteCategoria(id);
    resp.send();
})


export default endpoints;
