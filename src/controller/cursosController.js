import * as service from '../service/cursosService.js';

import { Router } from "express";
import { getAuthentication } from '../utils/jwt.js';
const endpoints = Router();

let authInstrutor = getAuthentication(['instrutor']);


endpoints.get('/cursos', async (req, resp) => {
    let cursos = await service.listCursos();
    resp.send(cursos);
})


endpoints.get('/curso/:id', async (req, resp) => {
    let id = req.params.id;

    let curso = await service.getCurso(id);
    if (!curso)
        return resp.status(404).send({ erro: 'Curso não encontrado' });

    resp.send(curso);
})


endpoints.get('/categoria/:idCategoria/cursos', async (req, resp) => {
    let idCategoria = req.params.idCategoria;

    let cursos = await service.listCursosByCategoria(idCategoria);
    resp.send(cursos);
})


endpoints.post('/curso', authInstrutor, async (req, resp) => {
    let curso = req.body;
    curso.idInstrutor = req.user.id;

    let id = await service.saveCurso(curso);
    resp.send({ id });
})


endpoints.put('/curso/:id', authInstrutor, async (req, resp) => {
    let id = req.params.id;
    let curso = req.body;

    await service.updateCurso(id, curso);
    resp.send();
})


endpoints.delete('/curso/:id', authInstrutor, async (req, resp) => {
    let id = req.params.id;

    await service.deleteCurso(id);
    resp.send();
})


export default endpoints;
