import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

/* ===== DADOS ===== */
const CATEGORIAS = [
  'Tecnologia',
  'Marketing e negócios',
  'Design e criação',
  'Desenvolvimento pessoal e idiomas',
];

const PALAVRAS = ['SUCESSO', 'CONHECIMENTO', 'PRÁTICA', 'LIBERDADE', 'FOCO', 'DETERMINAÇÃO', 'EVOLUÇÃO'];

// cor: 'azul' | 'laranja' | 'rosa'  |  video: depois você coloca o link do YouTube
const CURSOS = [
  { titulo: 'Python do Zero ao Avançado', categoria: 'Tecnologia', selo: 'MAIS PROCURADO', cor: 'azul', horas: 80, nivel: 'Iniciante ao avançado', descricao: 'Aprenda programação com Python, dos conceitos básicos às técnicas avançadas, com lógica, automação de tarefas e análise de dados.' },
  { titulo: 'Desenvolvimento Web Completo', categoria: 'Tecnologia', selo: 'COMECE AQUI', cor: 'laranja', horas: 100, nivel: 'Iniciante ao avançado', descricao: 'Crie sites e aplicações web com HTML, CSS, JavaScript e React. Páginas responsivas, interfaces modernas e projetos para seu portfólio.' },
  { titulo: 'Excel Avançado e Power BI', categoria: 'Tecnologia', selo: 'DADOS', cor: 'rosa', horas: 60, nivel: 'Intermediário ao avançado', descricao: 'Domine fórmulas, tabelas dinâmicas e organização de dados no Excel. Crie dashboards e relatórios no Power BI.' },
  { titulo: 'Inteligência Artificial na Prática', categoria: 'Tecnologia', selo: 'EM ALTA', cor: 'azul', horas: 40, nivel: 'Iniciante à intermediário', descricao: 'Use ferramentas de IA no trabalho e nos estudos: prompts, automações e projetos reais.' },
  { titulo: 'Segurança da Informação', categoria: 'Tecnologia', selo: 'CIBERSEGURANÇA', cor: 'laranja', horas: 55, nivel: 'Iniciante à intermediário', descricao: 'Fundamentos de proteção de dados, redes e sistemas, e as principais ameaças e formas de defesa.' },
  { titulo: 'Marketing Digital Completo', categoria: 'Marketing e negócios', selo: 'POPULAR', cor: 'rosa', horas: 50, nivel: 'Iniciante à intermediário', descricao: 'Estratégias para redes sociais, SEO, e-mail e conteúdo. Aprenda a planejar, executar e medir campanhas.' },
  { titulo: 'Tráfego Pago (Meta Ads e Google Ads)', categoria: 'Marketing e negócios', selo: 'ANÚNCIOS', cor: 'azul', horas: 45, nivel: 'Iniciante à intermediário', descricao: 'Crie campanhas que convertem: segmentação, orçamento e análise de métricas.' },
  { titulo: 'Empreendedorismo e Gestão de Negócios', categoria: 'Marketing e negócios', selo: 'NEGÓCIOS', cor: 'laranja', horas: 50, nivel: 'Iniciante ao avançado', descricao: 'Tire sua ideia do papel: modelo de negócio, finanças, liderança e operação.' },
  { titulo: 'Vendas e Negociação', categoria: 'Marketing e negócios', selo: 'VENDAS', cor: 'rosa', horas: 35, nivel: 'Iniciante à intermediário', descricao: 'Prospecção, comunicação e negociação para fechar negócios e gerar relacionamento.' },
  { titulo: 'Finanças Pessoais e Investimentos', categoria: 'Marketing e negócios', selo: 'FINANÇAS', cor: 'azul', horas: 30, nivel: 'Iniciante à intermediário', descricao: 'Organize seu orçamento, controle gastos e conheça renda fixa e bolsa de valores.' },
  { titulo: 'Design Gráfico (Photoshop, Illustrator e Canva)', categoria: 'Design e criação', selo: 'CRIAÇÃO', cor: 'laranja', horas: 50, nivel: 'Iniciante à intermediário', descricao: 'Crie identidades visuais e peças para redes sociais, aplicando cores, tipografia e composição.' },
  { titulo: 'Edição de Vídeo e Criação de Conteúdo', categoria: 'Design e criação', selo: 'VÍDEO', cor: 'rosa', horas: 40, nivel: 'Iniciante à intermediário', descricao: 'Edite vídeos com Premiere e CapCut: cortes, transições, legendas e áudio.' },
  { titulo: 'UX/UI Design', categoria: 'Design e criação', selo: 'DESIGN', cor: 'azul', horas: 45, nivel: 'Iniciante à intermediário', descricao: 'Experiência do usuário e design de interfaces: pesquisa, wireframes e protótipos no Figma.' },
  { titulo: 'Inglês para Carreira e Negócios', categoria: 'Desenvolvimento pessoal e idiomas', selo: 'IDIOMAS', cor: 'laranja', horas: 60, nivel: 'Iniciante à intermediário', descricao: 'Inglês profissional: vocabulário de negócios, conversação, e-mails e reuniões.' },
  { titulo: 'Oratória e Comunicação Eficaz', categoria: 'Desenvolvimento pessoal e idiomas', selo: 'COMUNICAÇÃO', cor: 'rosa', horas: 20, nivel: 'Iniciante à intermediário', descricao: 'Comunique-se com clareza e confiança: oratória, expressão corporal e apresentações.' },
];

/* ===== PÁGINA ===== */
function App() {
  const [filtro, setFiltro] = useState('Todos');
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const cursosFiltrados =
    filtro === 'Todos' ? CURSOS : CURSOS.filter((c) => c.categoria === filtro);

  function enviarEmail(e) {
    e.preventDefault();
    if (email.includes('@')) setEnviado(true);
  }

  return (
    <div className="App">
      {/* ===== CABEÇALHO ===== */}
      <header className="header">
        <Link to="/" className="logo">
          {/* <img src="" alt="logo" /> */}
          <span>impulsa</span>
        </Link>

        <nav className="nav">
          <a href="#cursos">Cursos</a>
          <a href="#categorias">Categorias</a>
          <a href="#inicio">Como funciona</a>
        </nav>

        <div className="header-direita">
          <button className="icone-busca">
            {/* <img src="" alt="buscar" /> */}
          </button>
          <Link to="/login" className="btn btn-escuro">Começar agora →</Link>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero" id="inicio">
        <div className="hero-texto">
          <span className="pill">
            {/* <img src="" alt="" /> */}
            APRENDER É O NOVO DIVERTIDO
          </span>

          <h1>
            Cursos grátis.
            <span>Ideias gigantes.</span>
          </h1>

          <p>
            Aprenda no seu ritmo, descubra novos talentos e transforme
            curiosidade em possibilidades. Sem pagar nadinha por isso.
          </p>

          <div className="hero-botoes">
            <a href="#cursos" className="btn btn-rosa">Explorar cursos →</a>
            <a href="#categorias" className="link-como">
              <span className="bolinha">{/* <img src="" alt="" /> */}</span>
              Como funciona
            </a>
          </div>
        </div>

        <div className="hero-imagem">
          {/* coloque a ilustração aqui: <img src="" alt="impulsa" /> */}
          <div className="progresso">
            <small>CONTINUE APRENDENDO</small>
            <div className="progresso-linha">
              <b>Criatividade sem bloqueio</b>
              <span>68%</span>
            </div>
            <div className="barra"><div></div></div>
          </div>
        </div>
      </section>

      {/* ===== FAIXA DE PALAVRAS ===== */}
      <div className="faixa">
        <div className="faixa-texto">
          {[...PALAVRAS, ...PALAVRAS, ...PALAVRAS, ...PALAVRAS].map((p, i) => (
            <span key={i}>{p} ✦</span>
          ))}
        </div>
      </div>

      {/* ===== CURSOS ===== */}
      <section className="cursos" id="cursos">
        <div className="cursos-topo">
          <div>
            <span className="pill">ESCOLHIDOS A DEDO</span>
            <h2>Cursos para dar <em>play</em></h2>
            <p>Conteúdo direto ao ponto, feito por quem entende e ensina sem complicar.</p>
          </div>

          <div className="filtros">
            {['Todos', ...CATEGORIAS].map((nome) => (
              <button
                key={nome}
                className={filtro === nome ? 'filtro ativo' : 'filtro'}
                onClick={() => setFiltro(nome)}
              >
                {nome}
              </button>
            ))}
          </div>
        </div>

        <div className="grade">
          {cursosFiltrados.map((c) => (
            <article className="card" key={c.titulo}>
              <div className={`card-capa ${c.cor}`}>
                <span className="card-selo">{c.selo}</span>
                <div className="card-icone">
                  {/* <img src="" alt="" /> */}
                </div>
              </div>

              <div className="card-corpo">
                <small>{c.categoria}</small>
                <h3>{c.titulo}</h3>
                <p>{c.descricao}</p>
                <div className="card-rodape">
                  <span>{c.horas} horas</span>
                  <span>{c.nivel}</span>
                  <button className="seta">→</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== CATEGORIAS ===== */}
      <section className="categorias" id="categorias">
        <div className="categorias-texto">
          <span className="pill">SEU PRÓXIMO PASSO</span>
          <h2>Escolha uma ideia. Vá até o fim.</h2>
          <p>A gente cuida do caminho para você focar no que importa: descobrir do que é capaz.</p>
          <a href="#cursos" className="btn btn-escuro">Encontrar meu curso →</a>
        </div>

        <div className="categorias-grade">
          {CATEGORIAS.map((nome) => {
            const total = CURSOS.filter((c) => c.categoria === nome).length;
            return (
              <a
                href="#cursos"
                className="categoria"
                key={nome}
                onClick={() => setFiltro(nome)}
              >
                <div className="categoria-icone">
                  {/* <img src="" alt="" /> */}
                </div>
                <h4>{nome}</h4>
                <small>{total} cursos →</small>
              </a>
            );
          })}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="newsletter">
        <div className="newsletter-card">
          <div>
            <span className="pill">UMA DOSE DE INSPIRAÇÃO</span>
            <h2>Ideias novas direto na sua caixa de entrada.</h2>
            <p>Sem spam, só conteúdo que faz a cabeça funcionar.</p>
          </div>

          {enviado ? (
            <strong>Valeu! Você está na lista ✦</strong>
          ) : (
            <form onSubmit={enviarEmail}>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-escuro">Quero receber</button>
            </form>
          )}
        </div>
      </section>

      {/* ===== RODAPÉ ===== */}
      <footer className="rodape">
        <Link to="/" className="logo">
          {/* <img src="" alt="logo" /> */}
          <span>impulsa</span>
        </Link>
        <p>Conhecimento livre muda tudo.</p>
        <div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
