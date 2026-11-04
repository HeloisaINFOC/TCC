import * as service from '../service/progresso_aulasService.js';

import { Router } from "express";
import { getAuthentication } from '../utils/jwt.js';
const endpoints = Router();

let auth = getAuthentication();


endpoints.get('/curso/:idCurso/progresso', auth, async (req, resp) => {
    let idCurso = req.params.idCurso;
    let idUsuario = req.user.id;

    let progressos = await service.listProgresso(idUsuario, idCurso);
    resp.send(progressos);
})


endpoints.get('/curso/:idCurso/progresso/percentual', auth, async (req, resp) => {
    let idCurso = req.params.idCurso;
    let idUsuario = req.user.id;

    let percentual = await service.getPercentual(idUsuario, idCurso);
    resp.send(percentual);
})


endpoints.post('/progresso', auth, async (req, resp) => {
    let progresso = req.body;
    progresso.idUsuario = req.user.id;

    let resultado = await service.saveProgresso(progresso);
    if (resultado.erro)
        return resp.status(400).send(resultado);

    resp.send();
})


export default endpoints;
