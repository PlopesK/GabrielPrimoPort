const icons = [
    { nome: "HTML", imagem: "./imgs/tecnologias/html.svg" },
    { nome: "CSS", imagem: "./imgs/tecnologias/css.svg" },
    { nome: "JavaScript", imagem: "./imgs/tecnologias/javascript.svg" },
    { nome: "Node", imagem: "./imgs/tecnologias/node.svg" },
    { nome: "Angular", imagem: "./imgs/tecnologias/angular.svg" }
];
const list = document.getElementById("iconList");

const projetos = [
  {
    imagem: "./imgs/sonicr.png",
    titulo: "Sonic R",
    descricao: "Um jogo de Sonic para navegador feito com HTML, CSS e JS",
    link: "https://plopesk.github.io/Sonic-R/"
  },
  {
    imagem: "./imgs/pokedex.png",
    titulo: "PokeDex",
    descricao: "Um site que apresenta detalhes de Pokémons da Primeira Geração.",
    link: "https://plopesk.github.io/Pokedex/"
  },
  {
    imagem: "./imgs/anemo.png",
    titulo: "Anemo System",
    descricao: "Sistema de controle escolar feito para o TCC da ETEC.",
    link: "https://anemosystem.github.io/anemo-system-website/"
  }
];

function escapeHTML(str) { //Evita injeção de código malicioso no site
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

//Função para controle de menus
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

window.addEventListener("DOMContentLoaded", function () {
    //Quando a página carregar, gera os ícones e os projetos
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
})