// Perfil: dados de demonstração (sem backend), estatísticas e abas.
window.containersReady.then(() => {
  document.querySelectorAll("main [data-icon]").forEach((element) => {
    element.innerHTML = icon(element.dataset.icon);
  });

  const profile = { followers: 1420, following: 380 };
  const photos = [
    { title: "BMW branco", caption: "Detalhes que fazem a diferença. 🖤", image: "../images/posts/carro-01.jpg", likes: 245, comments: 12 },
    { title: "Lamborghini branco", caption: "Linhas que param qualquer rua. 🏁", image: "../images/posts/carro-02.jpg", likes: 312, comments: 28 },
    { title: "Ferrari vermelha", caption: "Vermelho que ninguém ignora. 🔥", image: "../images/posts/carro-03.jpg", likes: 198, comments: 15 },
    { title: "Ford Expedition", caption: "Espaço e presença na estrada. 🛣️", image: "../images/posts/carro-04.jpg", likes: 421, comments: 19 },
    { title: "Porsche Panamera", caption: "Conforto e esportividade juntos. ✨", image: "../images/posts/carro-05.jpg", likes: 167, comments: 8 },
    { title: "Chevrolet Camaro", caption: "Clássico americano em ação. 🚘", image: "../images/posts/carro-06.jpg", likes: 389, comments: 31 },
    { title: "BMW azul", caption: "Azul que combina com a luz da tarde. 📸", image: "../images/posts/carro-07.jpg", likes: 276, comments: 14 },
    { title: "Volkswagen Fusca", caption: "Nostalgia que nunca sai de moda. 💛", image: "../images/posts/carro-08.jpg", likes: 534, comments: 42 },
    { title: "Ford Mustang", caption: "Mais um registro para a coleção. 📸", image: "../images/posts/carro-09.jpg", likes: 352, comments: 23 },
    { title: "Fiat 500", caption: "Pequeno, simpático e cheio de estilo. 😍", image: "../images/posts/carro-10.jpg", likes: 143, comments: 6 },
    { title: "Lamborghini amarelo", caption: "Amarelo para chamar atenção. ⚡", image: "../images/posts/carro-11.jpg", likes: 468, comments: 36 },
    { title: "McLaren branco", caption: "Aerodinâmica que dá gosto de ver. 🏎️", image: "../images/posts/carro-12.jpg", likes: 291, comments: 17 },
  ];
  const events = [];
  const saved = [];

  const format = (number) => number.toLocaleString("pt-BR");
  const stats = {
    posts: photos.length,
    events: events.length,
    followers: profile.followers,
    following: profile.following,
  };
  Object.entries(stats).forEach(([key, value]) => {
    document.querySelector(`[data-stat="${key}"]`).textContent = format(value);
  });
  document.querySelector('[data-count="photos"]').textContent = photos.length;
  document.querySelector('[data-count="events"]').textContent = events.length;

  const panel = document.querySelector("#tab-panel");
  const tabs = [...document.querySelectorAll('[role="tab"]')];

  const empty = (title, text) =>
    `<div class="panel-empty"><strong>${title}</strong>${text}</div>`;

  function renderPhotos() {
    panel.innerHTML = `<div class="photo-grid"></div>`;
    const grid = panel.firstElementChild;
    photos.forEach((photo, index) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "photo-tile";
      tile.dataset.index = index;
      tile.setAttribute(
        "aria-label",
        `${photo.title}, ${photo.likes} curtidas, ${photo.comments} comentários`,
      );
      tile.innerHTML = `<img src="${photo.image}" alt="" loading="lazy"><span class="photo-stats"><span>${icon("heart")}${format(photo.likes)}</span><span>${icon("comment")}${format(photo.comments)}</span></span>`;
      grid.append(tile);
    });
  }

  const renderers = {
    photos: renderPhotos,
    events: () => {
      panel.innerHTML = empty(
        "Nenhum evento por enquanto",
        "Os encontros em que você participar aparecem aqui.",
      );
    },
    saved: () => {
      panel.innerHTML = empty(
        "Você ainda não salvou nenhuma publicação",
        "Use o ícone de marcador no feed para guardar as que mais gostar.",
      );
    },
  };

  function selectTab(tab, focus = false) {
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tab.id);
    renderers[tab.dataset.tab]();
    if (focus) tab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      const last = tabs.length - 1;
      const target = {
        ArrowRight: tabs[index === last ? 0 : index + 1],
        ArrowLeft: tabs[index === 0 ? last : index - 1],
        Home: tabs[0],
        End: tabs[last],
      }[event.key];
      if (!target) return;
      event.preventDefault();
      selectTab(target, true);
    });
  });

  panel.addEventListener("click", (event) => {
    const tile = event.target.closest(".photo-tile");
    if (!tile) return;
    const photo = photos[tile.dataset.index];
    showInfo(photo.title, photo.caption);
  });

  document
    .querySelector("#edit-profile")
    .addEventListener("click", () =>
      showInfo("Editar perfil", "Esta tela ainda está em desenvolvimento."),
    );
  document
    .querySelector("#new-photo")
    .addEventListener("click", () =>
      showInfo("Nova foto", "A criação de publicação ainda está em desenvolvimento."),
    );

  selectTab(tabs[0]);
});
