import * as service from '../service/aulasService.js';

import { Router } from "express";
import { getAuthentication } from '../utils/jwt.js';
const endpoints = Router();

let auth = getAuthentication();
let authInstrutor = getAuthentication(['instrutor']);


endpoints.get('/aula/:id', auth, async (req, resp) => {
    let id = req.params.id;

    let aula = await service.getAula(id);
    resp.send(aula);
})


endpoints.get('/curso/:idCurso/aulas', auth, async (req, resp) => {
    let idCurso = req.params.idCurso;

    let aulas = await service.listarAulas(idCurso);
    resp.send(aulas);
})


endpoints.post('/aula', authInstrutor, async (req, resp) => {
    let aula = req.body;

    let id = await service.salvarAula(aula);
    resp.send({ id });
})


endpoints.put('/aula/:id', authInstrutor, async (req, resp) => {
    let id = req.params.id;
    let aula = req.body;

    await service.alterarAula(id, aula);
    resp.send();
})


endpoints.delete('/aula/:id', authInstrutor, async (req, resp) => {
    let id = req.params.id;

    await service.removerAula(id);
    resp.send();
})


export default endpoints;
