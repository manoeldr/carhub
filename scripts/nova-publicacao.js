const CHAVE_POSTS = "carhub-publicacoes";
let posts = JSON.parse(localStorage.getItem(CHAVE_POSTS)) || [];

const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

const abaPost = document.querySelector("#aba-post");
const abaEvento = document.querySelector("#aba-evento");
const formPost = document.querySelector("#form-post");
const formEvento = document.querySelector("#form-evento");
const listaPosts = document.querySelector("#lista-posts");
const semPosts = document.querySelector("#sem-posts");

function salvarPosts() {
  localStorage.setItem(CHAVE_POSTS, JSON.stringify(posts));
}

function novoId() {
  return Math.floor(Math.random() * 1000000000);
}

function trocarAba(mostrarEvento) {
  formPost.hidden = mostrarEvento;
  formEvento.hidden = !mostrarEvento;
  abaPost.className = mostrarEvento ? "aba" : "aba ativa";
  abaEvento.className = mostrarEvento ? "aba ativa" : "aba";
}
abaPost.addEventListener("click", () => trocarAba(false));
abaEvento.addEventListener("click", () => trocarAba(true));

document.querySelector("#btn-arquivo").addEventListener("click", () => {
  notify("O envio de arquivos fica para uma próxima versão.");
});

formPost.addEventListener("submit", (e) => {
  e.preventDefault();
  const post = {
    id: novoId(),
    legenda: document.querySelector("#legenda").value,
    veiculo: document.querySelector("#veiculo").value,
    local: document.querySelector("#local").value,
    marca: document.querySelector("#marca").value,
    autor: "seu.usuario",
  };
  posts.push(post);
  salvarPosts();
  formPost.reset();
  mostrarPosts();
  notify("Publicação criada!");
});

formEvento.addEventListener("submit", (e) => {
  e.preventDefault();

  const partes = document.querySelector("#ev-data").value.split("-");
  let tipo = "";
  document.querySelectorAll('input[name="tipo"]').forEach((r) => {
    if (r.checked) tipo = r.value;
  });

  const evento = {
    id: novoId(),
    titulo: document.querySelector("#ev-titulo").value,
    dia: partes[2],
    mes: meses[Number(partes[1]) - 1],
    autor: "seu.usuario",
    local: document.querySelector("#ev-local").value,
    cidade: document.querySelector("#ev-cidade").value,
    tipo: tipo,
    vao: 0,
    imagem: "",
    resposta: "",
    criado: true,
  };

  const eventos = carregarEventos();
  eventos.push(evento);
  salvarEventos(eventos);
  formEvento.reset();
  notify("Evento criado! Veja na tela Encontros.");
});

function mostrarPosts() {
  const itens = posts.map((p) => `
    <li>
      <div>
        <strong>${p.legenda}</strong>
        <span>${p.veiculo || "Sem veículo"} • ${p.local || "Sem local"}</span>
      </div>
      <div class="botoes-post">
        <button type="button" class="btn-escuro" data-acao="editar" data-id="${p.id}">Editar</button>
        <button type="button" class="btn-escuro" data-acao="excluir" data-id="${p.id}">Excluir</button>
      </div>
    </li>
  `);
  listaPosts.innerHTML = itens.join("");
  semPosts.hidden = posts.length > 0;

  listaPosts.querySelectorAll("button").forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = Number(botao.dataset.id);
      if (botao.dataset.acao === "editar") editarPost(id);
      else excluirPost(id);
    });
  });
}

function editarPost(id) {
  const post = posts.filter((p) => p.id === id)[0];
  const nova = prompt("Nova legenda:", post.legenda);
  if (nova) {
    post.legenda = nova;
    salvarPosts();
    mostrarPosts();
  }
}

function excluirPost(id) {
  posts = posts.filter((p) => p.id !== id);
  salvarPosts();
  mostrarPosts();
  notify("Publicação excluída.");
}

mostrarPosts();