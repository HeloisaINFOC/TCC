import * as service from '../service/progresso_aulasService.js';

import { Router } from "express";
import { getAuthentication } from '../utils/jwt.js';
const endpoints = Router();

let auth = getAuthentication();


endpoints.get('/progresso/:id', auth, async (req, resp) => {
    let id = req.params.id;

    let progresso = await service.getProgresso(id);
    resp.send(progresso);
})


endpoints.get('/curso/:idCurso/progresso', auth, async (req, resp) => {
    let idCurso = req.params.idCurso;
    let idUsuario = req.user.id;

    let progressos = await service.listarProgressoDoCurso(idUsuario, idCurso);
    resp.send(progressos);
})


endpoints.get('/curso/:idCurso/progresso/percentual', auth, async (req, resp) => {
    let idCurso = req.params.idCurso;
    let idUsuario = req.user.id;

    let percentual = await service.calcularPercentual(idUsuario, idCurso);
    resp.send(percentual);
})


endpoints.post('/progresso', auth, async (req, resp) => {
    let progresso = req.body;
    progresso.idUsuario = req.user.id;

    let id = await service.salvarProgresso(progresso);
    resp.send({ id });
})


endpoints.put('/progresso/:id', auth, async (req, resp) => {
    let id = req.params.id;
    let progresso = req.body;

    await service.alterarProgresso(id, progresso);
    resp.send();
})


endpoints.delete('/progresso/:id', auth, async (req, resp) => {
    let id = req.params.id;

    await service.removerProgresso(id);
    resp.send();
})


export default endpoints;
