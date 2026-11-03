// Erro com status HTTP. Os services dão "throw new ErroHttp(404, 'mensagem')"
// e o middleware tratarErros (registrado no final do api.js) devolve a resposta certa.
export class ErroHttp extends Error {
    constructor(status, mensagem) {
        super(mensagem);
        this.status = status;
    }
}


export function tratarErros(err, req, resp, next) {
    if (err instanceof ErroHttp) {
        return resp.status(err.status).send({ erro: err.message });
    }

    console.error(err);
    resp.status(500).send({ erro: 'Erro interno do servidor' });
}