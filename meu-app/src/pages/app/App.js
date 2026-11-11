import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

/* ===== DADOS ===== */

const CATEGORIAS = [
  'Tecnologia',
  'Marketing e negócios',
  'Design e criação',
  'Desenvolvimento pessoal e idiomas',
];

const PALAVRAS = [
  'SUCESSO',
  'CONHECIMENTO',
  'PRÁTICA',
  'LIBERDADE',
  'FOCO',
  'DETERMINAÇÃO',
  'EVOLUÇÃO',
];

const CURSOS = [
  {
    titulo: 'Python do Zero ao Avançado',
    categoria: 'Tecnologia',
    selo: 'MAIS PROCURADO',
    cor: 'azul',
    horas: 80,
    nivel: 'Iniciante ao avançado',
    descricao: 'Aprenda programação com Python, dos conceitos básicos às técnicas avançadas, desenvolvendo lógica de programação, automação de tarefas e análise de dados.'
  },
  {
    titulo: 'Desenvolvimento Web Completo',
    categoria: 'Tecnologia',
    selo: 'COMECE AQUI',
    cor: 'laranja',
    horas: 100,
    nivel: 'Iniciante ao avançado',
    descricao: 'Aprenda a criar sites e aplicações web com HTML, CSS, JavaScript e React. Desenvolva páginas responsivas, interfaces modernas e projetos para seu portfólio.'
  },
  {
    titulo: 'Excel Avançado e Power BI',
    categoria: 'Tecnologia',
    selo: 'DADOS',
    cor: 'rosa',
    horas: 60,
    nivel: 'Intermediário ao avançado',
    descricao: 'Domine fórmulas, planilhas, tabelas dinâmicas e organização de dados no Excel. Crie dashboards interativos e relatórios no Power BI.'
  },
  {
    titulo: 'Inteligência Artificial na Prática',
    categoria: 'Tecnologia',
    selo: 'EM ALTA',
    cor: 'azul',
    horas: 40,
    nivel: 'Iniciante a intermediário',
    descricao: 'Use ferramentas de inteligência artificial para aumentar a produtividade, automatizar tarefas e otimizar processos. Aprenda criação de prompts e aplicações práticas.'
  },
  {
    titulo: 'Segurança da Informação e Ética Hacker',
    categoria: 'Tecnologia',
    selo: 'CIBERSEGURANÇA',
    cor: 'laranja',
    horas: 55,
    nivel: 'Iniciante a intermediário',
    descricao: 'Aprenda segurança digital, proteção de dados, redes e identificação de vulnerabilidades, além de práticas de hacking ético para proteger sistemas.'
  },
  {
    titulo: 'Marketing Digital Completo',
    categoria: 'Marketing e negócios',
    selo: 'POPULAR',
    cor: 'rosa',
    horas: 50,
    nivel: 'Iniciante a intermediário',
    descricao: 'Desenvolva estratégias com SEO, redes sociais, e-mail marketing e conteúdo para atrair clientes, fortalecer marcas e melhorar campanhas digitais.'
  },
  {
    titulo: 'Tráfego Pago (Meta Ads e Google Ads)',
    categoria: 'Marketing e negócios',
    selo: 'ANÚNCIOS',
    cor: 'azul',
    horas: 45,
    nivel: 'Iniciante a intermediário',
    descricao: 'Aprenda a criar campanhas, definir públicos, organizar orçamentos e analisar métricas no Meta Ads e Google Ads.'
  },
  {
    titulo: 'Empreendedorismo e Gestão de Negócios',
    categoria: 'Marketing e negócios',
    selo: 'NEGÓCIOS',
    cor: 'laranja',
    horas: 50,
    nivel: 'Iniciante ao avançado',
    descricao: 'Tire sua ideia do papel com modelo de negócio, planejamento, finanças, liderança e organização de operações.'
  },
  {
    titulo: 'Vendas e Negociação',
    categoria: 'Marketing e negócios',
    selo: 'VENDAS',
    cor: 'rosa',
    horas: 35,
    nivel: 'Iniciante a intermediário',
    descricao: 'Desenvolva técnicas de prospecção, comunicação e negociação para fechar negócios e construir relacionamentos.'
  },
  {
    titulo: 'Finanças Pessoais e Investimentos',
    categoria: 'Marketing e negócios',
    selo: 'FINANÇAS',
    cor: 'azul',
    horas: 30,
    nivel: 'Iniciante a intermediário',
    descricao: 'Organize seu orçamento, controle gastos e conheça conceitos de renda fixa, investimentos e planejamento financeiro.'
  },
  {
    titulo: 'Design Gráfico (Photoshop, Illustrator e Canva)',
    categoria: 'Design e criação',
    selo: 'CRIAÇÃO',
    cor: 'laranja',
    horas: 50,
    nivel: 'Iniciante a intermediário',
    descricao: 'Crie identidades visuais e peças para redes sociais, aplicando cores, tipografia e composição.'
  },
  {
    titulo: 'Edição de Vídeo e Criação de Conteúdo',
    categoria: 'Design e criação',
    selo: 'VÍDEO',
    cor: 'rosa',
    horas: 40,
    nivel: 'Iniciante a intermediário',
    descricao: 'Edite vídeos com Premiere e CapCut: cortes, transições, legendas, áudio e ritmo visual.'
  },
  {
    titulo: 'UX/UI Design',
    categoria: 'Design e criação',
    selo: 'DESIGN',
    cor: 'azul',
    horas: 45,
    nivel: 'Iniciante a intermediário',
    descricao: 'Aprenda experiência do usuário e design de interfaces: pesquisa, wireframes e protótipos no Figma.'
  },
  {
    titulo: 'Inglês para Carreira e Negócios',
    categoria: 'Desenvolvimento pessoal e idiomas',
    selo: 'IDIOMAS',
    cor: 'laranja',
    horas: 60,
    nivel: 'Iniciante a intermediário',
    descricao: 'Desenvolva inglês profissional com vocabulário de negócios, conversação, e-mails e reuniões.'
  },
  {
    titulo: 'Oratória e Comunicação Eficaz',
    categoria: 'Desenvolvimento pessoal e idiomas',
    selo: 'COMUNICAÇÃO',
    cor: 'rosa',
    horas: 20,
    nivel: 'Iniciante a intermediário',
    descricao: 'Comunique-se com clareza e confiança usando técnicas de oratória, expressão corporal e apresentações.'
  },
];

const ICONE_CATEGORIA = {
  'Tecnologia': '⌘',
  'Marketing e negócios': '↗',
  'Design e criação': '✳',
  'Desenvolvimento pessoal e idiomas': '✦',
};

/* ===== COMPONENTE PRINCIPAL ===== */

function App() {
  const [filtro, setFiltro] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [mostrarBusca, setMostrarBusca] = useState(false);
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const cursosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase('pt-BR');

    return CURSOS.filter((curso) => {
      const combinaCategoria =
        filtro === 'Todos' || curso.categoria === filtro;

      const combinaBusca =
        !termo ||
        curso.titulo.toLocaleLowerCase('pt-BR').includes(termo) ||
        curso.categoria.toLocaleLowerCase('pt-BR').includes(termo) ||
        curso.descricao.toLocaleLowerCase('pt-BR').includes(termo);

      return combinaCategoria && combinaBusca;
    });
  }, [filtro, busca]);

  function enviarEmail(evento) {
    evento.preventDefault();

    if (email.includes('@')) {
      setEnviado(true);
    }
  }

  function selecionarCategoria(nome) {
    setFiltro(nome);

    document
      .getElementById('cursos')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="App">

      {/* ===== TOPO ===== */}

      <header className="topo">

        <Link to="/" className="marca" aria-label="Impulsa - página inicial">
          <img
            src="logo_paleta_v6.png"
            alt=""
            className="logo"
           

          />

          <span className="logoo">mpulsa</span>
        </Link>

        <nav className="perguntas" aria-label="Navegação principal">
          <a href="#cursos">Cursos</a>
          <a href="#categorias">Categorias</a>
          <a href="#inicio">Como funciona</a>
        </nav>

        <div className="topo-direita">

          {mostrarBusca && (
            <input
              className="busca-input"
              type="search"
              placeholder="Buscar curso..."
              aria-label="Buscar curso"
              value={busca}
              onChange={(evento) => {
                setBusca(evento.target.value);
                setFiltro('Todos');
              }}
            />
          )}

          <button
            className="busca-botao"
            type="button"
            aria-label={mostrarBusca ? 'Fechar busca' : 'Abrir busca'}
            onClick={() => setMostrarBusca((aberta) => !aberta)}
          >
            {mostrarBusca ? '×' : '⌕'}
          </button>

          <Link to="/login" className="botao1">
            Começar agora <span aria-hidden="true">→</span>
          </Link>

        </div>
      </header>

      <div className="linha" />

      {/* ===== HERO ===== */}

      <section className="hero" id="inicio">

        <div className="hero-texto">

          <div className="slogan">
            <h1 className="u1">
              O saber<br />
              não custa,<br />
              Só <span className="u2">Impulsa.</span>
            </h1>
          </div>

          <div className="linha2" />

          <p className="slogan3">
            Aprenda no seu ritmo, descubra novos talentos
            <br className="desktop-break" />
            e possibilidades. Sem pagar nadinha por isso.
          </p>

          <a href="#cursos" className="botao3">
            Explorar cursos <span aria-hidden="true">→</span>
          </a>

        </div>

        <div className="hero-visual">

          <img
            src="/impulsa-ilustracao.png"
            alt="Ilustração de aprendizagem da Impulsa"
            className="logo2"
            onError={(evento) => {
              evento.currentTarget.style.display = 'none';
            }}
          />

          <div className="hero-visual-fallback" aria-hidden="true">
            <div className="visual-sol">✦</div>
            <div className="visual-card visual-card-um">
              IDEIAS<br /><strong>gigantes.</strong>
            </div>
            <div className="visual-card visual-card-dois">✎</div>
            <div className="visual-bolinha" />
            <div className="visual-estrela">✳</div>
          </div>

          <div className="progresso">
            <small>CONTINUE APRENDENDO</small>

            <div className="progresso-linha">
              <b>Criatividade sem bloqueio</b>
              <span>68%</span>
            </div>

            <div className="barra">
              <div />
            </div>
          </div>

        </div>
      </section>

      {/* ===== LETREIRO ===== */}

      <div className="letreiro" aria-hidden="true">

        <div className="letreiro-faixa">

          {[0, 1, 2, 3].map((grupo) => (
            <div className="letreiro-grupo" key={grupo}>

              {PALAVRAS.map((palavra) => (
                <span
                  className="letreiro-item"
                  key={`${grupo}-${palavra}`}
                >
                  {palavra}<b>✦</b>
                </span>
              ))}

            </div>
          ))}

        </div>
      </div>

      {/* ===== CURSOS ===== */}

      <section className="cursos" id="cursos">

        <div className="cursos-topo">

          <div className="cursos-titulo">

            <h2 className="text2">
              Cursos pra dar <span className="play1">play</span>
            </h2>

            <p className="text3">
              Conteúdo direto ao ponto, feito por quem entende
              <br className="desktop-break" />
              e ensina sem complicar.
            </p>

          </div>

          <div className="filtros" aria-label="Filtrar cursos por categoria">

            {['Todos', ...CATEGORIAS].map((nome) => (
              <button
                type="button"
                key={nome}
                className={filtro === nome ? 'filtro ativo' : 'filtro'}
                onClick={() => setFiltro(nome)}
                aria-pressed={filtro === nome}
              >
                {nome}
              </button>
            ))}

          </div>
        </div>

        {cursosFiltrados.length > 0 ? (

          <div className="cursos-grade">

            {cursosFiltrados.map((curso) => (

              <article
                className={`curso-card ${curso.cor}`}
                key={curso.titulo}
              >

                <div className="curso-capa">

                  <span className="curso-selo">
                    {curso.selo}
                  </span>

                  <span className="curso-deco-circulo" />
                  <span className="curso-deco-quadrado" />

                  <div className="curso-icone" aria-hidden="true">
                    <span>{ICONE_CATEGORIA[curso.categoria]}</span>
                  </div>

                  <span className="curso-mini" />

                </div>

                <div className="curso-corpo">

                  <span className="curso-categoria">
                    {curso.categoria}
                  </span>

                  <h3 className="curso-titulo">
                    {curso.titulo}
                  </h3>

                  <p className="curso-descricao">
                    {curso.descricao}
                  </p>

                  <div className="curso-rodape">

                    <div className="curso-info">
                      <span className="curso-horas">
                        ◷ {curso.horas} horas
                      </span>

                      <span>{curso.nivel}</span>
                    </div>

                    <Link
                      to="/login"
                      className="curso-seta"
                      aria-label={`Acessar ${curso.titulo}`}
                    >
                      →
                    </Link>

                  </div>
                </div>

              </article>

            ))}

          </div>

        ) : (

          <p className="sem-cursos">
            Não encontramos cursos com esse termo. Tente outra busca.
          </p>

        )}

      </section>

      {/* ===== CATEGORIAS ===== */}

      <section className="categorias" id="categorias">

        <div className="cat-texto">

          <span className="cat-selo">
            Seu próximo passo
          </span>

          <h2>
            Escolha uma ideia.<br />
            Vá até o fim.
          </h2>

          <p>
            A gente cuida do caminho para você focar no que importa:
            descobrir do que é capaz.
          </p>

          <a
            href="#cursos"
            className="caixa6"
            onClick={() => setFiltro('Todos')}
          >
            Encontrar meu curso <span aria-hidden="true">→</span>
          </a>

        </div>

        <div className="cat-grade">

          <div className="cat-col">

            {CATEGORIAS.slice(0, 2).map((nome, indice) => (

              <a
                href="#cursos"
                className={`cat-box ${indice === 0 ? 'azul' : 'rosa'}`}
                key={nome}
                onClick={() => selecionarCategoria(nome)}
              >

                <div className="cat-icone" aria-hidden="true">
                  {ICONE_CATEGORIA[nome]}
                </div>

                <div>
                  <h3>{nome}</h3>

                  <div className="cat-rodape">
                    <span>
                      {CURSOS.filter((curso) => curso.categoria === nome).length} cursos
                    </span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>

              </a>

            ))}

          </div>

          <div className="cat-col">

            {CATEGORIAS.slice(2).map((nome, indice) => (

              <a
                href="#cursos"
                className={`cat-box ${indice === 0 ? 'laranja' : 'creme'}`}
                key={nome}
                onClick={() => selecionarCategoria(nome)}
              >

                <div className="cat-icone" aria-hidden="true">
                  {ICONE_CATEGORIA[nome]}
                </div>

                <div>
                  <h3>{nome}</h3>

                  <div className="cat-rodape">
                    <span>
                      {CURSOS.filter((curso) => curso.categoria === nome).length} cursos
                    </span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>

              </a>

            ))}

          </div>

        </div>

      </section>

      {/* ===== NEWSLETTER ===== */}

      <section
        className="newsletter"
        aria-labelledby="newsletter-titulo"
      >

        <div className="newsletter-card">

          <div>

            <span className="cat-selo">
              Uma dose de inspiração
            </span>

            <h2 id="newsletter-titulo">
              Ideias novas direto na sua caixa de entrada.
            </h2>

            <p>
              Sem spam, só conteúdo que faz a cabeça funcionar.
            </p>

          </div>

          {enviado ? (

            <strong className="newsletter-sucesso">
              Valeu! Você está na lista ✦
            </strong>

          ) : (

            <form onSubmit={enviarEmail}>

              <label
                className="sr-only"
                htmlFor="newsletter-email"
              >
                Seu e-mail
              </label>

              <input
                id="newsletter-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                required
              />

              <button
                type="submit"
                className="newsletter-botao"
              >
                Quero receber
              </button>

            </form>

          )}

        </div>

      </section>

      {/* ===== RODAPÉ ===== */}

      <footer className="caixa7">

        <Link to="/" className="marca marca-rodape">
          <span className="logoo">impulsa</span>
        </Link>

        <p>Conhecimento livre muda tudo.</p>

        <div className="rodape-links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>

          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            YouTube
          </a>

          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>

      </footer>

    </div>
  );
}

export default App;