import * as service from '../service/cursosService.js';

import { Router } from "express";
import { getAuthentication } from '../utils/jwt.js';
const endpoints = Router();

let auth = getAuthentication();
let authInstrutor = getAuthentication(['instrutor']);


endpoints.get('/cursos', async (req, resp) => {
    let busca = req.query.busca;

    let cursos = await service.listarCursos(busca);
    resp.send(cursos);
})


endpoints.get('/curso/:id', async (req, resp) => {
    let id = req.params.id;

    let curso = await service.getCurso(id);
    resp.send(curso);
})


endpoints.get('/categoria/:idCategoria/cursos', async (req, resp) => {
    let idCategoria = req.params.idCategoria;

    let cursos = await service.listarCursosPorCategoria(idCategoria);
    resp.send(cursos);
})


endpoints.post('/curso', authInstrutor, async (req, resp) => {
    let curso = req.body;
    curso.idInstrutor = req.user.id;

    let id = await service.salvarCurso(curso);
    resp.send({ id });
})


endpoints.put('/curso/:id', authInstrutor, async (req, resp) => {
    let id = req.params.id;
    let curso = req.body;

    await service.alterarCurso(id, curso);
    resp.send();
})


endpoints.delete('/curso/:id', authInstrutor, async (req, resp) => {
    let id = req.params.id;

    await service.removerCurso(id);
    resp.send();
})


export default endpoints;
