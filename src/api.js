import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import adicionarRotas from './router.js';
import { tratarErros } from './utils/erros.js';


const api = express();

api.use(cors());
api.use(express.json());


api.get('/', (req, resp) => {
    resp.send({ mensagem: 'API de cursos no ar' });
})


adicionarRotas(api);


// rota que não existe
api.use((req, resp) => {
    resp.status(404).send({ erro: 'Rota não encontrada' });
})

// precisa ser o ÚLTIMO: pega os erros lançados pelos services
api.use(tratarErros);


const PORTA = process.env.PORT || 5010;

api.listen(PORTA, () => console.log(`API subiu na porta ${PORTA}`));
