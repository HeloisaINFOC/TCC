import 'dotenv/config';
import jwt from 'jsonwebtoken';

const KEY = process.env.SECRET_KEY;
const EXPIRA_EM = process.env.JWT_EXPIRES_IN || '7d';

if (!KEY)
  throw new Error('Defina SECRET_KEY no arquivo .env');


// Só o necessário vai dentro do token (nunca a senha).
export function generateToken(usuario) {
  const payload = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo ?? 'aluno'   // aluno | instrutor | admin
  };

  return jwt.sign(payload, KEY, { expiresIn: EXPIRA_EM });
}


// Aceita "x-access-token: <token>" ou "Authorization: Bearer <token>"
function lerToken(req) {
  let token = req.headers['x-access-token'];

  if (!token) {
    const auth = req.headers['authorization'];
    if (auth && auth.startsWith('Bearer '))
      token = auth.slice(7);
  }

  return token;
}


export function getTokenInfo(req) {
  try {
    return jwt.verify(lerToken(req), KEY, { algorithms: ['HS256'] });
  }
  catch {
    return null;
  }
}


// getAuthentication()                  -> qualquer usuário logado
// getAuthentication(['instrutor'])     -> instrutor (e admin, que sempre passa)
// getAuthentication(['admin'])         -> só admin
// getAuthentication(null, false)       -> não exige login, mas preenche req.user se houver token válido
export function getAuthentication(roles, throw401 = true) {
  return (req, resp, next) => {
    const user = getTokenInfo(req);

    if (!user) {
      if (throw401)
        return resp.status(401).send({ erro: 'Faça login para continuar' });

      return next();
    }

    req.user = user;

    if (roles && roles.length > 0 && user.tipo !== 'admin' && !roles.includes(user.tipo))
      return resp.status(403).send({ erro: 'Você não tem permissão para esta ação' });

    next();
  };
}