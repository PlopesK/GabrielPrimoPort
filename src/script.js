// Evita injeção de código malicioso no site ao escapar caracteres especiais
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Controla a exibição dos menus com base no item selecionado //
function controlMenus(selectedMenu) {
  const menus = document.querySelector("main");
  const links = document.querySelectorAll(".opcoes");

  // Remove a classe 'ativo' de todos os links
  links.forEach(link => link.classList.remove("ativo"));

  // Adiciona a classe 'ativo' ao link clicado
  links.forEach(link => {
    if (link.getAttribute("onclick") === `controlMenus('${selectedMenu}')`) {
      link.classList.add("ativo");
    }
  });

  // Exibe apenas o menu selecionado (esconde os demais)
  for (let i = 0; i < menus.children.length; i++) {
    if (menus.children[i].tagName !== "IMG") {
      menus.children[i].style.display = (menus.children[i].id === selectedMenu) ? "flex" : "none";
    }
  }
}

// Gera o HTML dos projetos dinamicamente a partir do array "projetos" //
function carregarProjetos(projetos) {
  return projetos.map(projeto => {
    const titulo = escapeHTML(projeto.titulo);
    const descricao = escapeHTML(projeto.descricao);
    const imagem = escapeHTML(projeto.imagem);
    const link = escapeHTML(projeto.link);

    return `
      <li>
        <div class="projeConteudo">
          <img src="${imagem}" alt="${titulo}" loading="lazy">
          <h3>${titulo}</h3>
          <p>${descricao}</p>
          <a href="${link}" target="_blank" rel="noopener noreferrer">Ver repositório</a>
        </div>
      </li>
    `;
  }).join("");
}

// Insere os projetos na lista HTML
function gerarProjetos() {
  const ul = document.getElementById("projeList");
  ul.innerHTML = carregarProjetos(projetos);
}

// Carrega o conteúdo da aba "Sobre Mim" //
function carregarSobre() {
  const sobre = document.getElementById("sobre");
  const sobreMim = `
    <div class="modal">
      <h3>SOBRE MIM</h3>
      
      <p>Oi! Meu nome é Gabriel Primo, sou estudante de Ciência da Computação pela 
        UNINTER e também tenho formação técnica em Análise e Desenvolvimento de 
        Sistemas pela ETEC. Desde que tive meu primeiro contato com programação, 
        em 2018, venho explorando o mundo da tecnologia com muita curiosidade e 
        vontade de aprender.</p>

        <p>Gosto de trabalhar com desenvolvimento web, tanto no front quanto no 
        back-end. Já usei linguagens como JavaScript, Python, PHP e Java, 
        além de frameworks como Angular, Node.js, Next.js e NestJS. Também tenho 
        experiência com banco de dados SQL, Supabase, e utilizo Git em praticamente 
        todos os meus projetos. Adoro ver ideias ganhando forma através do código, 
        principalmente quando consigo deixar tudo funcional, organizado e agradável 
        de usar.</p>

        <p>Mas nem só de código vive o dev 😄</p>

        <p>No meu tempo livre, sou apaixonado por jogos, principalmente os gêneros 
        Roguelike, Plataforma, Estratégia, RPG e Tower Defense. Meus jogos favoritos 
        são Omori e Balatro, e as franquias que mais marcaram minha vida são 
        Sonic e Dragon Ball.</p>

        <p>Também gosto muito de desenhar. Faço pixel arts e artes digitais, e sempre 
        que possível, trago esse lado criativo pros meus projetos, seja criando 
        interfaces mais amigáveis ou desenvolvendo elementos visuais para jogos.</p>

        <p>Sigo estudando, praticando e buscando novos desafios pra crescer tanto 
        como profissional quanto como pessoa. Se quiser saber mais, fica à vontade 
        pra explorar o portfólio!</p>

    </div>

    <div class="modal">
      <h3>IDIOMAS</h3>
      <p>Português Brasileiro - Nativo</p>
      <p>Inglês - Avançado</p>
    </div>
  `;
  sobre.innerHTML = sobreMim;
}

// Gera a aba de formação separando entre acadêmico e cursos complementares //
function carregarFormacoes(formacoes) {
  const academicos = formacoes.filter(f => f.tipo === "academico");
  const complementares = formacoes.filter(f => f.tipo === "complementar");
  const formaMenu = document.getElementById("formacao");

  // Estrutura inicial do HTML
  const introducao = `
    <div class="modal forma">
      <h3> FORMAÇÃO </h3>
      <span class="secoes">
        <section class="academico">
          <h4> ACADÊMICO </h4>
          <span class="modal"><ul id="diplomas"></ul></span>
        </section>
        <section class="complementar">
          <h4> CURSOS COMPLEMENTARES </h4>
          <span class="modal"><ul id="cursosComplementares"></ul></span>
        </section>
      </span>
    </div>
  `;
  formaMenu.innerHTML = introducao;

  // Função que gera o HTML de cada formação
  const gerarHTML = (lista) => {
    return lista.map(f => `
      <li>
        <div class="formacaoConteudo">
          <img src="${escapeHTML(f.imagem)}" alt="${escapeHTML(f.nome)}" loading="lazy">
          <h3>${escapeHTML(f.titulo)}</h3>
          <p>${escapeHTML(f.nome)}</p>
          <p>${escapeHTML(f.data)}</p>
        </div>
      </li>
    `).join("");
  };

  document.querySelector("#diplomas").innerHTML = gerarHTML(academicos);
  document.querySelector("#cursosComplementares").innerHTML = gerarHTML(complementares);
}

// Gera os cards de projetos da aba "Portfólio" //
function carregarPortfolio(portfolio) {
  const portMenu = document.getElementById("portfolio");

  const introducao = `
    <div class="modal forma">
      <h3> PORTFÓLIO </h3>
      <span class="modal port">
        <ul id="portList"></ul>
      </span>
    </div>
  `;
  portMenu.innerHTML = introducao;

  const gerarHTML = () => {
    return portfolio.map(projeto => {
      const titulo = escapeHTML(projeto.titulo);
      const descricao = escapeHTML(projeto.descricao);
      const imagem = escapeHTML(projeto.imagem);
      const link = escapeHTML(projeto.link);

      return `
        <li>
          <div class="projeConteudo">
            <img src="${imagem}" alt="${titulo}" loading="lazy">
            <h3>${titulo}</h3>
            <p>${descricao}</p>
            <a href="${link}" target="_blank" rel="noopener noreferrer">Ver repositório</a>
          </div>
        </li>
      `;
    }).join("");
  };

  document.querySelector("#portList").innerHTML = gerarHTML();
}

// Gera o conteúdo da aba "Contato", com formulário e informações //
function carregarContato() {
  const contatoMenu = document.getElementById("contato");

  const introducao = `
    <div class="modal info">
      <h3>CONTATO</h3>
      <h4>Tem algo em mente? Me manda uma mensagem!</h4>
      <p>Se você gostou do meu trabalho ou tem alguma ideia em mente, estou 
      aberto a propostas, parcerias ou até um bom papo sobre tecnologia!</p>

      <span class="modal" id="cont">
        <p>Email: gpcomercial04@gmail.com</p>

        <section class="contato">
          <h3>Entre em contato!</h3>
          <form>
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome" placeholder="Digite seu nome" required>

            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required>

            <label for="mensagem">Mensagem</label>
            <textarea id="mensagem" name="mensagem" rows="5" placeholder="Digite sua mensagem" required style="resize: none;"></textarea>

            <button type="submit">Enviar</button>
          </form>
        </section>
      </span>
    </div>
  `;
  contatoMenu.innerHTML = introducao;
}

// Executa quando a página termina de carregar
window.addEventListener("DOMContentLoaded", function () {
  // Gera dinamicamente os ícones da lista de tecnologias
  const list = document.getElementById("iconList");
  icons.forEach(icon => {
    const li = document.createElement("li");
    const img = document.createElement("img");

    img.src = icon.imagem;
    img.alt = icon.nome;

    li.appendChild(img);
    list.appendChild(li);
  });

  // Carrega os conteúdos principais
  gerarProjetos();
  carregarSobre();
  carregarFormacoes(formacoes);
  carregarPortfolio(portfolio);
  carregarContato();
});
