const CHAVE_POSTS = "carhub-publicacoes";
let posts = [];
try {
  const saved = JSON.parse(localStorage.getItem(CHAVE_POSTS));
  if (Array.isArray(saved)) posts = saved;
} catch {}
const author = window.currentUser;
document.querySelector("#autor-usuario").textContent = "@" + author.username;
document.querySelector("#autor-avatar").src = author.avatar;
document.querySelector("#autor-avatar").alt =
  "Foto de perfil de " + author.name;

const meses = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

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
  return Date.now() * 1000 + Math.floor(Math.random() * 1000);
}

function trocarAba(mostrarEvento) {
  document.querySelector("#dica-capa-evento").hidden = !mostrarEvento;
  formPost.hidden = mostrarEvento;
  formEvento.hidden = !mostrarEvento;
  abaPost.className = mostrarEvento ? "aba" : "aba ativa";
  abaEvento.className = mostrarEvento ? "aba ativa" : "aba";
}
abaPost.addEventListener("click", () => trocarAba(false));
abaEvento.addEventListener("click", () => trocarAba(true));

const fileInput = document.querySelector("#arquivos-publicacao");
const dropArea = document.querySelector("#area-midia");
const preview = document.querySelector("#midias-previas");
const mediaStatus = document.querySelector("#status-midias");
let selectedFiles = [];
let previewUrls = [];
let postUrls = [];
let renderVersion = 0;
let publishing = false;

function mediaElement(file, urls) {
  const media = document.createElement(
    file.type === "video/mp4" ? "video" : "img",
  );
  const url = URL.createObjectURL(file);
  urls.push(url);
  media.src = url;
  if (media.tagName === "VIDEO") {
    media.controls = true;
    media.preload = "metadata";
    media.playsInline = true;
  } else media.alt = file.name || "Foto da publicação";
  return media;
}
function renderSelectedFiles() {
  previewUrls.forEach((url) => URL.revokeObjectURL(url));
  previewUrls = [];
  preview.replaceChildren();
  selectedFiles.forEach((file, index) => {
    const item = document.createElement("figure");
    const caption = document.createElement("figcaption");
    caption.textContent = file.name;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remover-midia icon-button";
    remove.setAttribute("aria-label", "Remover " + file.name);
    remove.innerHTML = icon("close");
    remove.disabled = publishing;
    remove.addEventListener("click", () => {
      selectedFiles.splice(index, 1);
      renderSelectedFiles();
    });
    item.append(mediaElement(file, previewUrls), caption, remove);
    preview.append(item);
  });
  mediaStatus.textContent = selectedFiles.length
    ? `${selectedFiles.length} de 10 arquivos selecionados. Salvos no navegador ao publicar.`
    : "";
}
function addFiles(files) {
  if (publishing) return;
  const errors = [];
  for (const file of files) {
    if (!["image/png", "image/jpeg", "video/mp4"].includes(file.type)) {
      errors.push(`${file.name}: formato não suportado.`);
      continue;
    }
    if (file.size > 25 * 1024 * 1024) {
      errors.push(`${file.name}: excede 25 MB.`);
      continue;
    }
    if (
      selectedFiles.some(
        (item) =>
          item.name === file.name &&
          item.size === file.size &&
          item.lastModified === file.lastModified,
      )
    )
      continue;
    if (selectedFiles.length >= 10) {
      errors.push("Limite de 10 arquivos atingido.");
      break;
    }
    selectedFiles.push(file);
  }
  renderSelectedFiles();
  if (errors.length) mediaStatus.textContent = errors.join(" ");
}
document
  .querySelector("#btn-arquivo")
  .addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => {
  addFiles(fileInput.files);
  fileInput.value = "";
});
["dragenter", "dragover"].forEach((name) =>
  dropArea.addEventListener(name, (event) => {
    event.preventDefault();
    dropArea.classList.add("arrastando");
  }),
);
dropArea.addEventListener("dragleave", (event) => {
  if (!dropArea.contains(event.relatedTarget))
    dropArea.classList.remove("arrastando");
});
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  dropArea.classList.remove("arrastando");
  addFiles(event.dataTransfer.files);
});

formPost.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (publishing) return;
  const legenda = document.querySelector("#legenda").value.trim();
  if (!legenda) return;
  const post = {
    id: novoId(),
    legenda,
    veiculo: document.querySelector("#veiculo").value.trim(),
    local: document.querySelector("#local").value.trim(),
    marca: document.querySelector("#marca").value.trim(),
    autor: author.username,
    avatar: author.avatar,
    quantidadeMidias: selectedFiles.length,
  };
  publishing = true;
  const submit = formPost.querySelector('[type="submit"]');
  submit.disabled = true;
  submit.textContent = "Salvando publicação...";
  fileInput.disabled = true;
  document.querySelector("#btn-arquivo").disabled = true;
  renderSelectedFiles();
  let mediaSaved = false;
  try {
    if (selectedFiles.length) {
      await mediaRecord("put", { id: post.id, files: selectedFiles });
      mediaSaved = true;
    }
    localStorage.setItem(CHAVE_POSTS, JSON.stringify([...posts, post]));
    posts.push(post);
    selectedFiles = [];
    formPost.reset();
    renderSelectedFiles();
    await mostrarPosts();
    notify("Publicação salva neste navegador!");
  } catch {
    if (mediaSaved) {
      try {
        await mediaRecord("delete", post.id);
      } catch {}
    }
    notify(
      "Não foi possível salvar. Verifique o espaço do navegador ou tente arquivos menores.",
    );
  } finally {
    publishing = false;
    submit.disabled = false;
    submit.textContent = "Publicar agora";
    fileInput.disabled = false;
    document.querySelector("#btn-arquivo").disabled = false;
    renderSelectedFiles();
  }
});

formEvento.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (publishing) return;
  const cover = selectedFiles.find((file) => file.type.startsWith("image/"));
  if (!cover) {
    notify("Adicione uma foto PNG ou JPG para a capa do evento.");
    return;
  }
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
    autor: author.username,
    local: document.querySelector("#ev-local").value,
    cidade: document.querySelector("#ev-cidade").value,
    tipo: tipo,
    vao: 0,
    imagem: "",
    resposta: "",
    criado: true,
  };

  evento.capaId = "evento-" + evento.id;
  publishing = true;
  const button = formEvento.querySelector('[type="submit"]');
  button.disabled = true;
  button.textContent = "Salvando evento...";
  let coverSaved = false;
  try {
    await mediaRecord("put", { id: evento.capaId, files: [cover] });
    coverSaved = true;
    const eventos = carregarEventos();
    salvarEventos([...eventos, evento]);
    formEvento.reset();
    selectedFiles = [];
    renderSelectedFiles();
    notify("Evento criado com foto! Veja em Encontros e no Perfil.");
  } catch {
    if (coverSaved) {
      try {
        await mediaRecord("delete", evento.capaId);
      } catch {}
    }
    notify(
      "Não foi possível salvar o evento. Verifique o espaço do navegador e tente novamente.",
    );
  } finally {
    publishing = false;
    button.disabled = false;
    button.textContent = "Publicar evento";
    renderSelectedFiles();
  }
});

async function mostrarPosts() {
  const version = ++renderVersion;
  postUrls.forEach((url) => URL.revokeObjectURL(url));
  postUrls = [];
  listaPosts.replaceChildren();
  semPosts.hidden = posts.length > 0;
  for (const post of posts) {
    if (version !== renderVersion) return;
    const item = document.createElement("li");
    const content = document.createElement("div");
    content.className = "conteudo-post";
    const title = document.createElement("strong");
    title.textContent = post.legenda;
    const details = document.createElement("span");
    details.textContent = `${post.veiculo || "Sem veículo"} • ${post.local || "Sem local"}`;
    const owner = document.createElement("span");
    owner.textContent =
      "@" + (post.autor === "seu.usuario" ? author.username : post.autor);
    content.append(title, details, owner);
    const buttons = document.createElement("div");
    buttons.className = "botoes-post";
    for (const [label, action] of [
      ["Editar", editarPost],
      ["Excluir", excluirPost],
    ]) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn-escuro";
      button.textContent = label;
      button.addEventListener("click", () => action(post.id));
      buttons.append(button);
    }
    item.append(content, buttons);
    listaPosts.append(item);
    if (!post.quantidadeMidias) continue;
    try {
      const record = await mediaRecord("get", post.id);
      if (version !== renderVersion) return;
      if (!record?.files?.length) throw new Error("Mídias indisponíveis");
      const gallery = document.createElement("div");
      gallery.className = "galeria-post";
      record.files.forEach((file) =>
        gallery.append(mediaElement(file, postUrls)),
      );
      content.append(gallery);
    } catch {
      if (version !== renderVersion) return;
      const warning = document.createElement("span");
      warning.textContent =
        "Os anexos desta publicação não estão disponíveis neste navegador.";
      content.append(warning);
    }
  }
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

async function excluirPost(id) {
  const remaining = posts.filter((post) => post.id !== id);
  try {
    localStorage.setItem(CHAVE_POSTS, JSON.stringify(remaining));
  } catch {
    notify("Não foi possível excluir a publicação.");
    return;
  }
  const post = posts.find((item) => item.id === id);
  posts = remaining;
  await mostrarPosts();
  if (post?.quantidadeMidias) {
    try {
      await mediaRecord("delete", id);
    } catch {}
  }
  notify("Publicação excluída.");
}
window.addEventListener("beforeunload", () =>
  [...previewUrls, ...postUrls].forEach((url) => URL.revokeObjectURL(url)),
);
mostrarPosts();
