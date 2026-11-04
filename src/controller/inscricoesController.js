import * as service from '../service/inscricoesService.js';

import { Router } from "express";
import { getAuthentication } from '../utils/jwt.js';
const endpoints = Router();

let auth = getAuthentication();


endpoints.get('/conta/inscricoes', auth, async (req, resp) => {
    let idUsuario = req.user.id;

    let inscricoes = await service.listInscricoes(idUsuario);
    resp.send(inscricoes);
})


endpoints.get('/curso/:idCurso/inscrito', auth, async (req, resp) => {
    let idCurso = req.params.idCurso;
    let idUsuario = req.user.id;

    let resposta = await service.isInscrito(idUsuario, idCurso);
    resp.send(resposta);
})


endpoints.post('/inscricao', auth, async (req, resp) => {
    let inscricao = req.body;
    inscricao.idUsuario = req.user.id;

    let resultado = await service.saveInscricao(inscricao);
    if (resultado.erro)
        return resp.status(400).send(resultado);

    resp.send(resultado);
})


endpoints.delete('/inscricao/:id', auth, async (req, resp) => {
    let id = req.params.id;
    let idUsuario = req.user.id;

    await service.deleteInscricao(id, idUsuario);
    resp.send();
})


export default endpoints;
