import * as service from '../service/usuariosService.js';

import { Router } from "express";
import { getAuthentication, generateToken } from '../utils/jwt.js';
const endpoints = Router();

let auth = getAuthentication();


endpoints.post('/usuario/login', async (req, resp) => {
    let { email, senha } = req.body;

    let usuario = await service.loginUsuario(email, senha);
    if (!usuario)
        return resp.status(401).send({ erro: 'Email ou senha incorretos' });

    let token = generateToken(usuario);
    resp.send({ token, usuario });
})


endpoints.post('/usuario', async (req, resp) => {
    let usuario = req.body;

    let resultado = await service.saveUsuario(usuario);
    if (resultado.erro)
        return resp.status(400).send(resultado);

    resp.send(resultado);
})


endpoints.get('/usuario/perfil', auth, async (req, resp) => {
    let id = req.user.id;

    let usuario = await service.getUsuario(id);
    resp.send(usuario);
})


endpoints.put('/usuario', auth, async (req, resp) => {
    let id = req.user.id;
    let usuario = req.body;

    await service.updateUsuario(id, usuario);
    resp.send();
})


endpoints.delete('/usuario', auth, async (req, resp) => {
    let id = req.user.id;

    await service.deleteUsuario(id);
    resp.send();
})


export default endpoints;
