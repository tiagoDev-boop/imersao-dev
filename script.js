let cardContainer = document.querySelector(".card-container");
let dados = [];
let input = document.querySelector("input");

async function carregarDados() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); 
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

function iniciarBusca() {
    let termoBusca = input.value.toLowerCase();
    if (termoBusca.trim() === "") {
        renderizarCards(dados);
        return;
    }
    let resultados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(dadosParaRenderizar) {
    cardContainer.innerHTML = ""; 
    for (let dado of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.data_criacao}</p>
            <p>${dado.descricao}</p>
            <a href=${dado.link} target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

document.addEventListener("DOMContentLoaded", carregarDados);
