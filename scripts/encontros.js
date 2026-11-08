const CHAVE = "carhub-eventos";

const eventosIniciais = [
  {
    id: 1,
    titulo: "Classic Muscle Meeting",
    dia: "25",
    mes: "OUT",
    autor: "mariwelisa",
    local: "Parque do Imigrante, Caxias do Sul",
    cidade: "Caxias do Sul",
    tipo: "Exposição",
    vao: 120,
    imagem: "../images/eventos/evento1.png",
    resposta: "",
    criado: false,
  },
  {
    id: 2,
    titulo: "Night Meet – Edição Drift",
    dia: "31",
    mes: "OUT",
    autor: "mariwelisa",
    local: "Kartódromo Internacional",
    cidade: "Guaporé",
    tipo: "Drift",
    vao: 210,
    imagem: "../images/eventos/evento2.png",
    resposta: "",
    criado: false,
  },
];

const lista = document.querySelector("#lista-eventos");
const aviso = document.querySelector("#sem-eventos");
const chips = document.querySelectorAll(".chip");

function carregar() {
  const texto = localStorage.getItem(CHAVE);
  return texto ? JSON.parse(texto) : eventosIniciais;
}

function salvar() {
  localStorage.setItem(CHAVE, JSON.stringify(eventos));
}

let eventos = carregar();
let filtro = null;

function mostrar() {
  const visiveis = eventos.filter((e) => !filtro || e[filtro.campo] === filtro.valor);

  const cartoes = visiveis.map((e) => `
    <article class="card-evento">
      <div class="capa">
        ${e.imagem ? `<img src="${e.imagem}" alt="Foto do evento ${e.titulo}">` : ""}
        <div class="data"><strong>${e.dia}</strong><span>${e.mes}</span></div>
      </div>
      <h2>${e.titulo}</h2>
      <div class="linha-info">
        <span>👤 ${e.autor} • 📍 ${e.local}</span>
        <span class="vao">🔥 ${e.vao} vão!</span>
      </div>
      <div class="acoes">
        <button class="btn ${e.resposta === "vou" ? "ativo" : ""}" data-acao="vou" data-id="${e.id}">Vou</button>
        <button class="btn ${e.resposta === "naovou" ? "ativo" : ""}" data-acao="naovou" data-id="${e.id}">Não Vou</button>
        <button class="btn" data-acao="compartilhar" data-id="${e.id}">Compartilhar</button>
        ${e.criado ? `<button class="btn" data-acao="excluir" data-id="${e.id}">Excluir</button>` : ""}
      </div>
    </article>
  `);

  lista.innerHTML = cartoes.join("");
  aviso.hidden = visiveis.length > 0;
  ligarBotoes();
}

function ligarBotoes() {
  lista.querySelectorAll("[data-acao]").forEach((botao) => {
    botao.addEventListener("click", () => {
      agir(botao.dataset.acao, Number(botao.dataset.id));
    });
  });
}

function agir(acao, id) {
  const evento = eventos.filter((e) => e.id === id)[0];
  if (!evento) return;

  if (acao === "vou" || acao === "naovou") {
    responder(evento, acao);
  } else if (acao === "compartilhar") {
    notify(`Link do evento "${evento.titulo}" copiado pra sua área de transferência.`);
  } else if (acao === "excluir") {
    excluir(id);
  }
}

function responder(evento, nova) {
  if (evento.resposta === "vou") evento.vao--;
  if (evento.resposta === nova) {
    evento.resposta = "";
  } else {
    evento.resposta = nova;
    if (nova === "vou") evento.vao++;
  }
  salvar();
  mostrar();
}

function excluir(id) {
  eventos = eventos.filter((e) => e.id !== id);
  salvar();
  mostrar();
  notify("Evento excluído.");
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const mesmo = filtro && filtro.valor === chip.dataset.valor;
    filtro = mesmo ? null : { campo: chip.dataset.campo, valor: chip.dataset.valor };
    chips.forEach((c) => {
      c.className = filtro && c.dataset.valor === filtro.valor ? "chip ativo" : "chip";
    });
    mostrar();
  });
});

mostrar();