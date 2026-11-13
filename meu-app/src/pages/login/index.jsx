import './index.css';

import { useState } from "react";


export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [termos, setTermos] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!termos) {
      alert("Você precisa aceitar os termos de uso.");
      return;
    }

    console.log({ nome, email, senha });
    // aqui você chama sua API / backend
  }

  return (
    <div className="cont">
      <div className="principal">
        <form className="background" onSubmit={handleSubmit}>
          <div className="boasvindas">
            <p>Boas vindas ao IMPULSA!</p>
          </div>

          <div className="topobackground">
            <h1>Crie sua conta grátis</h1>
            <p>Leva menos de 5 minutos.</p>
          </div>

          <div className="preenchernome">
            <p>Nome completo</p>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="preencheremail">
            <p>Endereço de E-mail</p>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="criarsenha">
            <p>Crie uma senha</p>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <input
              type="checkbox"
              id="termos"
              name="termos"
              checked={termos}
              onChange={(e) => setTermos(e.target.checked)}
            />
            <label htmlFor="termos">Aceito os termos de uso</label>
          </div>

          <div className="botaocriar">
            <button type="submit">Criar minha conta</button>
          </div>
        </form>
      </div>
    </div>
  );
}