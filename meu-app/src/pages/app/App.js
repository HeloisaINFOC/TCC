import { useEffect, useRef, useState } from 'react';
import './App.css';

/* ========== ÍCONES ========== */
const ICONS = {
  code: <svg viewBox="0 0 24 24"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" /></svg>,
  sparkle: <svg viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8L19 17Z" /></svg>,
  chair: <svg viewBox="0 0 24 24"><path d="M7 4h10v7H7zM5 11h14v4H5zM7 15v5M17 15v5" /></svg>,
  users: <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.4" /><path d="M17 14c2.2 0 4 1.8 4 4" /></svg>,
  palette: <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 1.6-2.2-.4-1.2.2-2.3 1.6-2.3H17a4 4 0 0 0 4-4c0-5-4-9.5-9-9.5Z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7.5" r="1" /><circle cx="15" cy="7.5" r="1" /></svg>,
  play: <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5Z" /></svg>,
};

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);

/* ========== DADOS ========== */
const CATEGORIES = {
  tech: 'Tecnologia',
  mkt: 'Marketing e negócios',
  design: 'Design e criação',
  dev: 'Desenvolvimento pessoal e idiomas',
};
const CAT_ICONS = { tech: 'code', mkt: 'chair', design: 'palette', dev: 'users' };
const TICKER_WORDS = ['SUCESSO', 'CONHECIMENTO', 'PRÁTICA', 'LIBERDADE', 'FOCO', 'DETERMINAÇÃO', 'EVOLUÇÃO'];

const COURSES = [
  { cat: 'tech', badge: 'MAIS PROCURADO', color: 'blue', icon: 'code', title: 'Python do Zero ao Avançado', desc: 'Aprenda programação com Python, dos conceitos básicos às técnicas avançadas, desenvolvendo lógica de programação, automação de tarefas e análise de dados.', hours: 80, level: 'Iniciante ao avançado' },
  { cat: 'tech', badge: 'COMECE AQUI', color: 'tan', icon: 'code', title: 'Desenvolvimento Web Completo', desc: 'Aprenda a criar sites e aplicações web com HTML, CSS, JavaScript e React. Desenvolva páginas responsivas, interfaces modernas e projetos para seu portfólio.', hours: 100, level: 'Iniciante ao avançado' },
  { cat: 'tech', badge: 'DADOS', color: 'pink', icon: 'code', title: 'Excel Avançado e Power BI', desc: 'Domine fórmulas, planilhas, tabelas dinâmicas e organização de dados no Excel. Crie dashboards interativos e relatórios no Power BI.', hours: 60, level: 'Intermediário ao avançado' },
  { cat: 'tech', badge: 'EM ALTA', color: 'blue', icon: 'sparkle', title: 'Inteligência Artificial na Prática', desc: 'Entenda como usar ferramentas de IA no trabalho e nos estudos: prompts, automações e projetos reais com as principais plataformas.', hours: 40, level: 'Iniciante à intermediário' },
  { cat: 'tech', badge: 'CIBERSEGURANÇA', color: 'tan', icon: 'code', title: 'Segurança da Informação e Ethical Hacking', desc: 'Aprenda os fundamentos de proteção de dados, redes e sistemas, e conheça as principais ameaças e formas de defesa.', hours: 55, level: 'Iniciante à intermediário' },
  { cat: 'mkt', badge: 'POPULAR', color: 'pink', icon: 'chair', title: 'Marketing Digital Completo', desc: 'Estratégias de marketing para redes sociais, SEO, e-mail e conteúdo. Aprenda a planejar, executar e medir campanhas.', hours: 50, level: 'Iniciante à intermediário' },
  { cat: 'mkt', badge: 'ANÚNCIOS', color: 'blue', icon: 'chair', title: 'Tráfego Pago (Meta Ads e Google Ads)', desc: 'Crie campanhas de anúncios que convertem. Aprenda a segmentar públicos, definir orçamentos e analisar métricas.', hours: 45, level: 'Iniciante à intermediário' },
  { cat: 'mkt', badge: 'NEGÓCIOS', color: 'tan', icon: 'users', title: 'Empreendedorismo e Gestão de Negócios', desc: 'Tire sua ideia do papel: modelo de negócio, finanças, liderança e operação. Aprenda a gerir e crescer o seu projeto.', hours: 50, level: 'Iniciante ao avançado' },
  { cat: 'mkt', badge: 'VENDAS', color: 'pink', icon: 'users', title: 'Vendas e Negociação', desc: 'Desenvolva prospecção, comunicação, decisão e negociação. Aprenda a fazer um atendimento que gera relacionamento e fecha negócios.', hours: 35, level: 'Iniciante à intermediário' },
  { cat: 'mkt', badge: 'FINANÇAS', color: 'blue', icon: 'chair', title: 'Finanças Pessoais e Investimentos', desc: 'Organize seu orçamento, controle gastos e planeje objetivos. Conheça renda fixa, bolsa de valores e fundamentos para investir com consciência.', hours: 30, level: 'Iniciante à intermediário' },
  { cat: 'design', badge: 'CRIAÇÃO', color: 'tan', icon: 'palette', title: 'Design Gráfico (Photoshop, Illustrator e Canva)', desc: 'Crie identidades visuais, materiais publicitários e peças para redes sociais com Photoshop, Illustrator e Canva, aplicando cores, tipografia e composição.', hours: 50, level: 'Iniciante à intermediário' },
  { cat: 'design', badge: 'VÍDEO', color: 'pink', icon: 'play', title: 'Edição de Vídeo e Criação de Conteúdo', desc: 'Edite vídeos com Adobe Premiere e CapCut. Aprenda cortes, transições, legendas, áudio e montagem para YouTube, Instagram Reels e outras plataformas.', hours: 40, level: 'Iniciante à intermediário' },
  { cat: 'design', badge: 'DESIGN', color: 'blue', icon: 'palette', title: 'UX/UI Design', desc: 'Aprenda experiência do usuário e design de interfaces, com pesquisa, wireframes, protótipos e testes de usabilidade no Figma.', hours: 45, level: 'Iniciante à intermediário' },
  { cat: 'dev', badge: 'IDIOMAS', color: 'tan', icon: 'users', title: 'Inglês para Carreira e Negócios', desc: 'Desenvolva inglês profissional com vocabulário de negócios, conversação, e-mails e reuniões. Prepare-se para entrevistas e comunicação internacional.', hours: 60, level: 'Iniciante à intermediário' },
  { cat: 'dev', badge: 'COMUNICAÇÃO', color: 'pink', icon: 'users', title: 'Oratória e Comunicação Eficaz', desc: 'Comunique-se com clareza e confiança. Desenvolva oratória, expressão corporal, apresentações, argumentação e comunicação assertiva.', hours: 20, level: 'Iniciante à intermediário' },
];

/* ========== ANIMAÇÃO DE ENTRADA ========== */
function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`${className} reveal ${visible ? 'visible' : ''}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ========== COMPONENTES ========== */
function Logo({ light }) {
  return (
    <a href="#" className={`logo ${light ? 'logo-light' : ''}`} aria-label="impulsa">
      <svg viewBox="0 0 64 64" width={light ? 52 : 46} height={light ? 52 : 46} aria-hidden="true">
        <path d="M32 6 4 20l28 14 28-14L32 6Z" fill={light ? '#fff' : '#12235c'} />
        <path d="M16 28v10c0 4 7 8 16 8s16-4 16-8V28L32 36 16 28Z" fill={light ? '#fff' : '#12235c'} />
        {!light && <path d="M58 22v14" stroke="#e8a93c" strokeWidth="3" strokeLinecap="round" />}
        <circle cx="32" cy="50" r="9" fill="#f4c64f" />
        {!light && <rect x="27" y="58" width="10" height="3" rx="1.5" fill="#12235c" />}
      </svg>
      <span>impulsa</span>
    </a>
  );
}

function Header() {
  return (
    <header className="header">
      <Logo />
      <nav className="nav">
        <a href="#cursos">Cursos</a>
        <a href="#categorias">Categorias</a>
        <a href="#como-funciona">Como funciona</a>
      </nav>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Buscar">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
        </button>
        <a href="#cursos" className="btn btn-dark">Começar agora <span>→</span></a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <Reveal as="section" className="hero" id="como-funciona">
      <div className="deco-circle deco-circle-left" />
      <div className="hero-text">
        <span className="pill">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z" /></svg>
          APRENDER É O NOVO DIVERTIDO
        </span>
        <h1>
          <span className="h1-dark">O saber<br />não custa,</span>
          <span className="h1-pink">só<br />Impulsa.</span>
        </h1>
        <div className="hero-underline" />
        <p>Aprenda no seu ritmo, descubra novos talentos e transforme curiosidade em possibilidades. Sem pagar nadinha por isso.</p>
        <div className="hero-buttons">
          <a href="#cursos" className="btn btn-pink">Explorar cursos <span>→</span></a>
          <a href="#categorias" className="link-play">
            <span className="play-dot">
              <svg viewBox="0 0 10 10" width="8" height="8"><path d="M2 1l7 4-7 4V1Z" fill="#fff" /></svg>
            </span>
            Como funciona
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="shape shape-orange" />
        <div className="shape shape-blue" />
        <div className="hero-card">
          <div className="book-wrap">
            <div className="book-back" />
            <div className="scroll">
              <div className="scroll-roll" />
              <div className="scroll-page">
                <strong>impulsa</strong>
                <small>aprenda no seu ritmo</small>
                <i />
              </div>
              <div className="bookmark" />
            </div>
          </div>
          <div className="progress-card">
            <div className="progress-icon">▶</div>
            <div className="progress-info">
              <small>CONTINUE APRENDENDO</small>
              <div className="progress-row"><b>Criatividade sem bloqueio</b><em>68%</em></div>
              <div className="progress-bar"><span /></div>
            </div>
          </div>
        </div>
        <div className="red-square" />
      </div>
    </Reveal>
  );
}

function Ticker() {
  const words = [...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS, ...TICKER_WORDS];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {words.map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  );
}

function CourseCard({ course, index }) {
  return (
    <article className="card" style={{ animationDelay: `${index * 50}ms` }}>
      <div className={`card-cover cover-${course.color}`}>
        <span className="card-badge">{course.badge}</span>
        <div className="card-icon">{ICONS[course.icon]}</div>
        <span className="card-check" />
      </div>
      <div className="card-body">
        <span className="card-cat">{CATEGORIES[course.cat]}</span>
        <h3>{course.title}</h3>
        <p>{course.desc}</p>
        <div className="card-foot">
          <span className="time"><ClockIcon /> {course.hours} horas</span>
          <span>{course.level}</span>
          <button className="go" aria-label={`Abrir curso ${course.title}`}>→</button>
        </div>
      </div>
    </article>
  );
}

function Courses({ filter, setFilter }) {
  const filters = [['all', 'Todos'], ...Object.entries(CATEGORIES)];
  const list = filter === 'all' ? COURSES : COURSES.filter((c) => c.cat === filter);

  return (
    <section className="courses" id="cursos">
      <Reveal className="courses-head">
        <div>
          <span className="pill pill-outline">ESCOLHIDOS A DEDO</span>
          <h2>Cursos para dar <span className="play">play</span></h2>
          <p>Conteúdo direto ao ponto, feito por quem entende e ensina sem complicar.</p>
        </div>
        <div className="filters">
          {filters.map(([key, label]) => (
            <button
              key={key}
              className={`filter ${filter === key ? 'active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* key={filter} reinicia a animação de entrada dos cards ao trocar o filtro */}
      <div className="grid" key={filter}>
        {list.map((c, i) => <CourseCard key={c.title} course={c} index={i} />)}
      </div>
    </section>
  );
}

function Categories({ setFilter }) {
  return (
    <section className="categories" id="categorias">
      <Reveal className="cat-text">
        <span className="pill pill-outline">SEU PRÓXIMO PASSO</span>
        <h2>Escolha uma ideia.<br />Vá até o fim.</h2>
        <p>A gente cuida do caminho para você focar no que importa: descobrir do que é capaz.</p>
        <a href="#cursos" className="btn btn-dark">Encontrar meu curso <span>→</span></a>
      </Reveal>

      <div className="cat-grid">
        {Object.entries(CATEGORIES).map(([key, label]) => {
          const n = COURSES.filter((c) => c.cat === key).length;
          return (
            <Reveal as="a" href="#cursos" className="cat-card" key={key} onClick={() => setFilter(key)}>
              <span className="cat-ico">{ICONS[CAT_ICONS[key]]}</span>
              <h4>{label}</h4>
              <small><span>{n} {n === 1 ? 'curso' : 'cursos'}</span><span>→</span></small>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setError(!ok);
    if (ok) setSent(true);
  };

  return (
    <section className="newsletter">
      <Reveal className="news-card">
        <div className="news-ring" />
        <div className="news-text">
          <span className="pill pill-outline">UMA DOSE DE INSPIRAÇÃO</span>
          <h2>Ideias novas direto na sua caixa de entrada.</h2>
          <p>Sem spam, só conteúdo que faz a cabeça funcionar.</p>
        </div>

        {sent ? (
          <strong style={{ fontSize: 14 }}>Valeu! Você está na lista ✦</strong>
        ) : (
          <form className="news-form" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              placeholder="seu@email.com"
              aria-label="Seu e-mail"
              className={error ? 'error' : ''}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(false); }}
            />
            <button type="submit" className="btn btn-dark">Quero receber</button>
          </form>
        )}
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Logo light />
      <p>Conhecimento livre muda tudo.</p>
      <div className="footer-links">
        <a href="#">Instagram</a>
        <a href="#">YouTube</a>
        <a href="#">LinkedIn</a>
      </div>
    </footer>
  );
}

/* ========== APP ========== */
function App() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="App">
      <Header />
      <Hero />
      <Ticker />
      <Courses filter={filter} setFilter={setFilter} />
      <Categories setFilter={setFilter} />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;