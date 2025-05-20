//Evita injeção de código malicioso no site //
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

//Função para controle de menus //
function controlMenus(selectedMenu) {
  const menus = document.querySelector("main");
  const links = document.querySelectorAll(".opcoes");

  // Remover a classe 'ativo' de todos os links
  links.forEach(link => link.classList.remove("ativo"));
  // Comparamos o valor do parâmetro passado com o do link
  links.forEach(link => {
    if (link.getAttribute("onclick") === `controlMenus('${selectedMenu}')`) {
      link.classList.add("ativo");
    }
  });

  // Alterna visibilidade dos menus
  for (let i = 0; i < menus.children.length; i++) {
    if (menus.children[i].tagName !== "IMG") {
      menus.children[i].style.display = (menus.children[i].id === selectedMenu) ? "flex" : "none";
    }
  }
}

// Carrega de maneira dinâmica os projetos dentro do array "projetos" //
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
  }).join(""); //Gera um bloco de HTML que renderiza os projetos dinamicamente presentes dentro do array "projetos"
}

function gerarProjetos() {
  const ul = document.getElementById("projeList");
  ul.innerHTML = carregarProjetos(projetos); //Atualiza a lista de projetos presente no site
}

// Menu "Sobre Mim" //
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
    `;
  sobre.innerHTML = sobreMim;
}

// Menu "Formação" //
function carregarFormacoes(formacoes) {
  const academicos = formacoes.filter(f => f.tipo === "academico");
  const complementares = formacoes.filter(f => f.tipo === "complementar");
  const formaMenu = document.getElementById("formacao");
  const introducao = `
    <div class="modal forma">
        <h3> FORMAÇÃO </h3>

        <span class="secoes">
          <section class="academico">
            <h4> ACADÊMICO </h4>
            <span class="modal">
              <ul id="diplomas"></ul>
            </span>
          </section>

          <section class="complementar">
            <h4> CURSOS COMPLEMENTARES </h4>
            <span class="modal">
              <ul id="cursosComplementares"></ul>
            </span>
          </section>
        </span>
    </div>
  `;
  formaMenu.innerHTML = introducao

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

// Menu "Portfólio" //
function carregarPortfolio(portfolio) {
  const portMenu = document.getElementById("portfolio");
  const introducao = `
    <div class="modal forma">
        <h3> PORTFÓLIO </h3>
        <span class="modal port">
          <ul id="portList">
          </ul>
        </span>
    </div>
  `;
  portMenu.innerHTML = introducao

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
  }

  document.querySelector("#portList").innerHTML = gerarHTML();
}

window.addEventListener("DOMContentLoaded", function () {
  //Quando a página carregar, gera os elementos dinamicamente, mantendo o HTML mais limpo e organizado
  const list = document.getElementById("iconList");
  icons.forEach(icon => {
    const li = document.createElement("li");
    const img = document.createElement("img");

    img.src = icon.imagem;
    img.alt = icon.nome;

    li.appendChild(img);
    list.appendChild(li);
    // Automaticamente cria um novo <li><img></li> para cada ícone informado no array "icons"
  });
  gerarProjetos()
  carregarSobre()
  carregarFormacoes(formacoes)
  carregarPortfolio(portfolio)
})