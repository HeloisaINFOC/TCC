export function generateToken(usuario) {
  const payload = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo ?? 'aluno'
  };

  return jwt.sign(payload, KEY, { expiresIn: EXPIRA_EM });
}