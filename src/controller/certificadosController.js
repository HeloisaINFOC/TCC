import * as service from '../service/certificadosService.js';


import { Router } from "express";
import { getAuthentication } from '../utils/jwt.js';
const endpoints = Router();

let auth = getAuthentication();


endpoints.get('/certificado/validar/:codigo', async (req, resp) => {
    let codigo = req.params.codigo;

    let certificado = await service.getCertificadoByCodigo(codigo);
    if (!certificado)
        return resp.status(404).send({ erro: 'Certificado inválido' });

    resp.send(certificado);
})


endpoints.get('/conta/certificados', auth, async (req, resp) => {
    let idUsuario = req.user.id;

    let certificados = await service.listCertificados(idUsuario);
    resp.send(certificados);
})


endpoints.get('/certificado/:id', auth, async (req, resp) => {
    let id = req.params.id;

    let certificado = await service.getCertificado(id);
    if (!certificado)
        return resp.status(404).send({ erro: 'Certificado não encontrado' });

    resp.send(certificado);
})


endpoints.post('/certificado', auth, async (req, resp) => {
    let certificado = req.body;
    certificado.idUsuario = req.user.id;

    let resultado = await service.saveCertificado(certificado);
    if (resultado.erro)
        return resp.status(400).send(resultado);

    resp.send(resultado);
})


export default endpoints;
