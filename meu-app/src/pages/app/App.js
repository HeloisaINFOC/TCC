import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';


/* ===== DADOS ===== */

const CATEGORIAS = [
  { nome: 'Tecnologia', icone: '⌘', cor: 'azul' },
  { nome: 'Marketing e negócios', icone: '↗', cor: 'rosa' },
  { nome: 'Design e criação', icone: '✳', cor: 'laranja' },
  { nome: 'Desenvolvimento pessoal e idiomas', icone: '✦', cor: 'creme' },
];

const PALAVRAS = ['SUCESSO', 'CONHECIMENTO', 'PRÁTICA', 'LIBERDADE', 'FOCO', 'DETERMINAÇÃO', 'EVOLUÇÃO'];

const CURSOS = [
  { titulo: 'Python do Zero ao Avançado', categoria: 'Tecnologia', selo: 'MAIS PROCURADO', cor: 'azul', horas: 80, nivel: 'Iniciante ao avançado', descricao: 'Aprenda programação com Python, dos conceitos básicos às técnicas avançadas, desenvolvendo lógica de programação, automação de tarefas e análise de dados.' },
  { titulo: 'Desenvolvimento Web Completo', categoria: 'Tecnologia', selo: 'COMECE AQUI', cor: 'laranja', horas: 100, nivel: 'Iniciante ao avançado', descricao: 'Aprenda a criar sites e aplicações web com HTML, CSS, JavaScript e React. Desenvolva páginas responsivas, interfaces modernas e projetos para seu portfólio.' },
  { titulo: 'Excel Avançado e Power BI', categoria: 'Tecnologia', selo: 'DADOS', cor: 'rosa', horas: 60, nivel: 'Intermediário ao avançado', descricao: 'Domine fórmulas, planilhas, tabelas dinâmicas e organização de dados no Excel. Crie dashboards interativos e relatórios no Power BI.' },
  { titulo: 'Inteligência Artificial na Prática', categoria: 'Tecnologia', selo: 'EM ALTA', cor: 'azul', horas: 40, nivel: 'Iniciante a intermediário', descricao: 'Use ferramentas de inteligência artificial para aumentar a produtividade, automatizar tarefas e otimizar processos. Aprenda criação de prompts e aplicações práticas.' },
  { titulo: 'Segurança da Informação e Ética Hacker', categoria: 'Tecnologia', selo: 'CIBERSEGURANÇA', cor: 'laranja', horas: 55, nivel: 'Iniciante a intermediário', descricao: 'Aprenda segurança digital, proteção de dados, redes e identificação de vulnerabilidades, além de práticas de hacking ético para proteger sistemas.' },
  { titulo: 'Marketing Digital Completo', categoria: 'Marketing e negócios', selo: 'POPULAR', cor: 'rosa', horas: 50, nivel: 'Iniciante a intermediário', descricao: 'Desenvolva estratégias com SEO, redes sociais, e-mail marketing e conteúdo para atrair clientes, fortalecer marcas e melhorar campanhas digitais.' },
  { titulo: 'Tráfego Pago (Meta Ads e Google Ads)', categoria: 'Marketing e negócios', selo: 'ANÚNCIOS', cor: 'azul', horas: 45, nivel: 'Iniciante a intermediário', descricao: 'Aprenda a criar campanhas, definir públicos, organizar orçamentos e analisar métricas no Meta Ads e Google Ads.' },
  { titulo: 'Empreendedorismo e Gestão de Negócios', categoria: 'Marketing e negócios', selo: 'NEGÓCIOS', cor: 'laranja', horas: 50, nivel: 'Iniciante ao avançado', descricao: 'Tire sua ideia do papel com modelo de negócio, planejamento, finanças, liderança e organização de operações.' },
  { titulo: 'Vendas e Negociação', categoria: 'Marketing e negócios', selo: 'VENDAS', cor: 'rosa', horas: 35, nivel: 'Iniciante a intermediário', descricao: 'Desenvolva técnicas de prospecção, comunicação e negociação para fechar negócios e construir relacionamentos.' },
  { titulo: 'Finanças Pessoais e Investimentos', categoria: 'Marketing e negócios', selo: 'FINANÇAS', cor: 'azul', horas: 30, nivel: 'Iniciante a intermediário', descricao: 'Organize seu orçamento, controle gastos e conheça conceitos de renda fixa, investimentos e planejamento financeiro.' },
  { titulo: 'Design Gráfico (Photoshop, Illustrator e Canva)', categoria: 'Design e criação', selo: 'CRIAÇÃO', cor: 'laranja', horas: 50, nivel: 'Iniciante a intermediário', descricao: 'Crie identidades visuais e peças para redes sociais, aplicando cores, tipografia e composição.' },
  { titulo: 'Edição de Vídeo e Criação de Conteúdo', categoria: 'Design e criação', selo: 'VÍDEO', cor: 'rosa', horas: 40, nivel: 'Iniciante a intermediário', descricao: 'Edite vídeos com Premiere e CapCut: cortes, transições, legendas, áudio e ritmo visual.' },
  { titulo: 'UX/UI Design', categoria: 'Design e criação', selo: 'DESIGN', cor: 'azul', horas: 45, nivel: 'Iniciante a intermediário', descricao: 'Aprenda experiência do usuário e design de interfaces: pesquisa, wireframes e protótipos no Figma.' },
  { titulo: 'Inglês para Carreira e Negócios', categoria: 'Desenvolvimento pessoal e idiomas', selo: 'IDIOMAS', cor: 'laranja', horas: 60, nivel: 'Iniciante a intermediário', descricao: 'Desenvolva inglês profissional com vocabulário de negócios, conversação, e-mails e reuniões.' },
  { titulo: 'Oratória e Comunicação Eficaz', categoria: 'Desenvolvimento pessoal e idiomas', selo: 'COMUNICAÇÃO', cor: 'rosa', horas: 20, nivel: 'Iniciante a intermediário', descricao: 'Comunique-se com clareza e confiança usando técnicas de oratória, expressão corporal e apresentações.' },
];

/* ===== COMPONENTE ===== */

function App() {
  const [filtro, setFiltro] = useState('Todos');
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const cursosFiltrados =
    filtro === 'Todos' ? CURSOS : CURSOS.filter((c) => c.categoria === filtro);

  function enviarEmail(e) {
    e.preventDefault();
    setEnviado(true);
  }

  return (
    <div className="App">
      {/* TOPO */}
      <header className="topo">
        <Link to="/" className="marca">
          <img src="/logo_paleta_v6.png" alt="" className="logo" />
          <span className="logoo">mpulsa</span>
        </Link>

        <nav className="menu">
          <a href="#cursos">Cursos</a>
          <a href="#categorias">Categorias</a>
          <a href="#inicio">Como funciona</a>
        </nav>

        <Link to="/login" className="botao botao-escuro">
          Começar agora →
        </Link>
      </header>

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero-texto">
          <h1>
            O saber<br />
            não custa,<br />
            Só <span className="vermelho">Impulsa.</span>
          </h1>

<div className="linha-amarela" />

<p>
  Aprenda no seu ritmo, descubra novos talentos e possibilidades.
  Sem pagar nadinha por isso.
</p>
          <p>
            Aprenda no seu ritmo, descubra novos talentos e possibilidades.
            Sem pagar nadinha por isso.
          </p>

          <a href="#cursos" className="botao botao-coral">
            Explorar cursos →
          </a>
        </div>

        <div className="hero-visual">
          <img src="/impulsa-ilustracao.png" alt="Ilustração de aprendizagem da Impulsa" />

          <div className="progresso">
            <small>CONTINUE APRENDENDO</small>
            <div className="progresso-linha">
              <b>Criatividade sem bloqueio</b>
              <span>68%</span>
            </div>
            <div className="barra"><div /></div>
          </div>
        </div>
      </section>

      {/* LETREIRO */}
      <div className="letreiro">
        <div className="letreiro-faixa">
          {[...PALAVRAS, ...PALAVRAS, ...PALAVRAS, ...PALAVRAS].map((palavra, i) => (
            <span key={i}>{palavra} <b>✦</b></span>
          ))}
        </div>
      </div>

      {/* CURSOS */}
      <section className="cursos" id="cursos">
        <div className="cursos-topo">
          <div>
            <h2>Cursos pra dar <span className="azul-texto">play</span></h2>
            <p>Conteúdo direto ao ponto, feito por quem entende e ensina sem complicar.</p>
          </div>

          <div className="filtros">
            {['Todos', ...CATEGORIAS.map((c) => c.nome)].map((nome) => (
              <button
                key={nome}
                type="button"
                className={filtro === nome ? 'filtro ativo' : 'filtro'}
                onClick={() => setFiltro(nome)}
              >
                {nome}
              </button>
            ))}
          </div>
        </div>

        <div className="cursos-grade">
          {cursosFiltrados.map((curso) => (
            <article className="curso-card" key={curso.titulo}>
              <div className={`curso-capa ${curso.cor}`}>
                <span className="curso-selo">{curso.selo}</span>
                <span className="curso-icone">
                  {CATEGORIAS.find((c) => c.nome === curso.categoria).icone}
                </span>
              </div>

              <div className="curso-corpo">
                <span className="curso-categoria">{curso.categoria}</span>
                <h3>{curso.titulo}</h3>
                <p>{curso.descricao}</p>

                <div className="curso-rodape">
                  <div className="curso-info">
                    <span>◷ {curso.horas} horas</span>
                    <span>{curso.nivel}</span>
                  </div>
                  <Link to="/login" className="curso-seta">→</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="categorias" id="categorias">
        <div className="cat-texto">
          <span className="selo">Seu próximo passo</span>
          <h2>Escolha uma ideia.<br />Vá até o fim.</h2>
          <p>A gente cuida do caminho para você focar no que importa: descobrir do que é capaz.</p>
          <a href="#cursos" className="botao botao-escuro" onClick={() => setFiltro('Todos')}>
            Encontrar meu curso →
          </a>
        </div>

        <div className="cat-grade">
          {CATEGORIAS.map((cat) => (
            <a
              key={cat.nome}
              href="#cursos"
              className={`cat-box ${cat.cor}`}
              onClick={() => setFiltro(cat.nome)}
            >
              <span className="cat-icone">{cat.icone}</span>
              <div>
                <h3>{cat.nome}</h3>
                <small>
                  {CURSOS.filter((c) => c.categoria === cat.nome).length} cursos →
                </small>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletter-card">
          <div>
            <span className="selo">Uma dose de inspiração</span>
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
                required
              />
              <button type="submit" className="botao botao-escuro">
                Quero receber
              </button>
            </form>
          )}
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="rodape">
        <strong>impulsa</strong>
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