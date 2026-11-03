import * as service from '../service/inscricoesService.js';

import { Router } from "express";
import { getAuthentication } from '../utils/jwt.js';
const endpoints = Router();

let auth = getAuthentication();
let authInstrutor = getAuthentication(['instrutor']);


endpoints.get('/inscricao/:id', auth, async (req, resp) => {
    let id = req.params.id;

    let inscricao = await service.getInscricao(id);
    resp.send(inscricao);
})


endpoints.get('/conta/inscricoes', auth, async (req, resp) => {
    let idUsuario = req.user.id;

    let inscricoes = await service.listarInscricoesDoUsuario(idUsuario);
    resp.send(inscricoes);
})


endpoints.get('/curso/:idCurso/inscricoes', authInstrutor, async (req, resp) => {
    let idCurso = req.params.idCurso;

    let inscricoes = await service.listarInscricoesDoCurso(idCurso);
    resp.send(inscricoes);
})


endpoints.get('/curso/:idCurso/inscrito', auth, async (req, resp) => {
    let idCurso = req.params.idCurso;
    let idUsuario = req.user.id;

    let resposta = await service.verificarInscricao(idUsuario, idCurso);
    resp.send(resposta);
})


endpoints.post('/inscricao', auth, async (req, resp) => {
    let inscricao = req.body;
    inscricao.idUsuario = req.user.id;

    let id = await service.salvarInscricao(inscricao);
    resp.send({ id });
})


endpoints.delete('/inscricao/:id', auth, async (req, resp) => {
    let id = req.params.id;

    await service.removerInscricao(id);
    resp.send();
})


export default endpoints;
