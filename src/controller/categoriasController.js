import * as service from '../service/categoriasService.js';

import { Router } from "express";
import { getAuthentication } from '../utils/jwt.js';
const endpoints = Router();

let auth = getAuthentication();
let authAdmin = getAuthentication(['admin']);


endpoints.get('/categorias', async (req, resp) => {
    let categorias = await service.listarCategorias();
    resp.send(categorias);
})


endpoints.get('/categoria/:id', async (req, resp) => {
    let id = req.params.id;

    let categoria = await service.getCategoria(id);
    resp.send(categoria);
})


endpoints.post('/categoria', authAdmin, async (req, resp) => {
    let categoria = req.body;

    let id = await service.salvarCategoria(categoria);
    resp.send({ id });
})


endpoints.put('/categoria/:id', authAdmin, async (req, resp) => {
    let id = req.params.id;
    let categoria = req.body;

    await service.alterarCategoria(id, categoria);
    resp.send();
})


endpoints.delete('/categoria/:id', authAdmin, async (req, resp) => {
    let id = req.params.id;

    await service.removerCategoria(id);
    resp.send();
})


export default endpoints;
