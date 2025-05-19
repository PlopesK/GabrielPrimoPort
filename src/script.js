const icons = [
    { name: "HTML", file: "html.svg" },
    { name: "CSS", file: "css.svg" },
    { name: "JavaScript", file: "javascript.svg" },
    { name: "Node", file: "node.svg" },
    { name: "Angular", file: "angular.svg" }
];

// Automaticamente cria um novo <li><img></li> para cada ícone informado no array "icons"
const baseURL = "https://raw.githubusercontent.com/portfolio-projetos-dev/assets/main/images/";
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

// Carrega de maneira dinâmica os projetos dentro do array "projetos" //
function carregarProjetos() {
  const ul = document.getElementById("projeList");

  projetos.forEach((projeto) => {
    const li = document.createElement("li");

    const div = document.createElement("div");
    div.className = "projeConteudo";
    //Para cara um dos items do array, cria um <li><div class="projeConteudo"></div></li>

    const img = new Image();
    img.src = projeto.imagem;
    img.alt = projeto.titulo;
    img.loading = "lazy";

    const h3 = document.createElement("h3");
    h3.textContent = projeto.titulo;

    const p = document.createElement("p");
    p.textContent = projeto.descricao;

    const a = document.createElement("a");
    a.href = projeto.link;
    a.textContent = "Ver repositório";
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(a);
    li.appendChild(div);
    ul.appendChild(li);
  });
}

window.addEventListener("DOMContentLoaded", function () {
    //Quando a página carregar, carrega os ícones e os projetos
    icons.forEach(icon => {
        const li = document.createElement("li");
        const img = document.createElement("img");

        img.src = baseURL + icon.file;
        img.alt = icon.name;

        li.appendChild(img);
        list.appendChild(li);
    });
    carregarProjetos()
})