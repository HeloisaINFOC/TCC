import aulas from './controller/aulasController.js'
import categorias from './controller/categoriasController.js'
import certificados from './controller/certificadosController.js'
import cursos from './controller/cursosController.js'
import inscricoes from './controller/inscricoesController.js'
import progresso_aulas from './controller/progresso_aulasController.js'
import usuarios from './controller/usuariosController.js'


export function addRoutes(api) {
  api.use(aulas);
  api.use(categorias);
  api.use(certificados);
  api.use(cursos);
  api.use(inscricoes);
  api.use(progresso_aulas);
  api.use(usuarios);
}
