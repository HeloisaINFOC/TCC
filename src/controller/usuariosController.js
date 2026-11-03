import * as service from '../service/usuariosService.js';

import { Router } from "express";
import { getAuthentication, generateToken } from '../utils/jwt.js';
const endpoints = Router();

let auth = getAuthentication();

function podeAcessar(req, id) {
    return req.user.tipo === 'admin' || req.user.id == id;
}


endpoints.post('/usuario/login', async (req, resp) => {
    let { email, senha } = req.body;

    let usuario = await service.login(email, senha);
    if (!usuario) {
        return resp.status(401).send({ erro: 'Email ou senha incorretos' });
    }

    let token = generateToken(usuario);
    resp.send({ token, usuario });
})


endpoints.post('/usuario', async (req, resp) => {
    let usuario = req.body;

    let id = await service.cadastrarUsuario(usuario);
    resp.send({ id });
})


endpoints.get('/usuario/perfil', auth, async (req, resp) => {
    let id = req.user.id;

    let usuario = await service.getUsuario(id);
    resp.send(usuario);
})


endpoints.get('/usuario/:id', auth, async (req, resp) => {
    let id = req.params.id;
    if (!podeAcessar(req, id))
        return resp.status(403).send({ erro: 'Você não tem permissão para acessar este usuário' });

    let usuario = await service.getUsuario(id);
    resp.send(usuario);
})


endpoints.put('/usuario/senha', auth, async (req, resp) => {
    let { senhaAtual, novaSenha } = req.body;

    await service.alterarSenha(req.user.id, senhaAtual, novaSenha);
    resp.send();
})


endpoints.put('/usuario/:id', auth, async (req, resp) => {
    let id = req.params.id;
    if (!podeAcessar(req, id))
        return resp.status(403).send({ erro: 'Você não tem permissão para acessar este usuário' });
    let usuario = req.body;

    await service.alterarUsuario(id, usuario);
    resp.send();
})


endpoints.delete('/usuario/:id', auth, async (req, resp) => {
    let id = req.params.id;
    if (!podeAcessar(req, id))
        return resp.status(403).send({ erro: 'Você não tem permissão para acessar este usuário' });

    await service.removerUsuario(id);
    resp.send();
})


export default endpoints;
