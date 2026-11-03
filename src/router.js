import usuariosController from './controller/usuariosController.js';
import categoriasController from './controller/categoriasController.js';
import cursosController from './controller/cursosController.js';
import aulasController from './controller/aulasController.js';
import inscricoesController from './controller/inscricoesController.js';
import progressoAulasController from './controller/progresso_aulasController.js';
import certificadosController from './controller/certificadosController.js';


export default function adicionarRotas(api) {
    api.use(usuariosController);
    api.use(categoriasController);
    api.use(cursosController);
    api.use(aulasController);
    api.use(inscricoesController);
    api.use(progressoAulasController);
    api.use(certificadosController);
}
