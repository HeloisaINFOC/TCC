import crypto from 'crypto';
import * as db from '../repository/certificadosRepository.js';
import * as dbInscricoes from '../repository/inscricoesRepository.js';
import * as progressoService from './progresso_aulasService.js';


export async function saveCertificado(certificado) {
  if (!certificado.idCurso)
    return { erro: 'Informe o curso' };

  let inscricao = await dbInscricoes.getInscricaoByUsuarioCurso(certificado.idUsuario, certificado.idCurso);
  if (!inscricao)
    return { erro: 'Você não está inscrito neste curso' };

  let existe = await db.getCertificadoByUsuarioCurso(certificado.idUsuario, certificado.idCurso);
  if (existe)
    return { erro: 'Certificado já emitido para este curso' };

  // só emite se concluiu todas as aulas
  let progresso = await progressoService.getPercentual(certificado.idUsuario, certificado.idCurso);
  if (progresso.percentual < 100)
    return { erro: 'Conclua todas as aulas para emitir o certificado' };

  certificado.codigo = crypto.randomUUID().toUpperCase();

  let id = await db.saveCertificado(certificado);
  return { id };
}


export async function getCertificado(id) {
  return db.getCertificado(id);
}


export async function getCertificadoByCodigo(codigo) {
  return db.getCertificadoByCodigo(codigo);
}


export async function listCertificados(idUsuario) {
  return db.listCertificados(idUsuario);
}
