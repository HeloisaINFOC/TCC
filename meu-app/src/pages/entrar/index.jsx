import "./index.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Entrar() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    console.log({ email, senha, lembrar });
    // aqui você chama sua API para autenticar
  }

  return (
    <div className="entrar-page">
      {/* TOPO */}
      <header className="entrar-topo">
    
        <img src="/logo_paleta_v6.png" alt="Impulsa" className="entrar-logo" />

        <button
          type="button"
          className="entrar-btn-acesso"
          onClick={() => navigate("/login")}
        >
          Página de acesso
        </button>
      </header>

      {/* MOLDURA */}
      <main className="entrar-moldura">
        <span className="entrar-pill entrar-pill-topo">
          Boas-vindas à Impulsa
        </span>

        {/* CARD BRANCO */}
        <form className="entrar-card" onSubmit={handleSubmit}>
          <span className="entrar-pill">Já faço parte</span>

          <h1>Entrar na minha conta</h1>
          <p className="entrar-sub">Continue de onde você parou.</p>

          <div className="entrar-campo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="entrar-campo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="entrar-opcoes">
            <label className="entrar-lembrar" htmlFor="lembrar">
              <input
                id="lembrar"
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
              />
              Lembrar de mim
            </label>

            <button
              type="button"
              className="entrar-esqueci"
              onClick={() => alert("Em breve: recuperação de senha")}
            >
              Esqueci a senha
            </button>
          </div>

          <button type="submit" className="entrar-btn-principal">
            Entrar <span>→</span>
          </button>

          <p className="entrar-rodape">Conhecimento livre, sempre.</p>
        </form>
      </main>
    </div>
  );
}