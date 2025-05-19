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

window.addEventListener("DOMContentLoaded", function () {
    icons.forEach(icon => {
        const li = document.createElement("li");
        const img = document.createElement("img");

        img.src = baseURL + icon.file;
        img.alt = icon.name;

        li.appendChild(img);
        list.appendChild(li);
    });
})