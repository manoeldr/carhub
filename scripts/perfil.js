// Perfil: dados de demonstração (sem backend), estatísticas e abas.
window.containersReady.then(() => {
  document.querySelectorAll("main [data-icon]").forEach((element) => {
    element.innerHTML = icon(element.dataset.icon);
  });

  const profile = { followers: 1420, following: 380 };
  const photos = [
    {
      title: "BMW branco",
      caption: "Detalhes que fazem a diferença.",
      image: "../images/posts/carro-01.jpg",
      likes: 245,
      comments: 12,
    },
    {
      title: "Lamborghini branco",
      caption: "Linhas que param qualquer rua.",
      image: "../images/posts/carro-02.jpg",
      likes: 312,
      comments: 28,
    },
    {
      title: "Ferrari vermelha",
      caption: "Vermelho que ninguém ignora.",
      image: "../images/posts/carro-03.jpg",
      likes: 198,
      comments: 15,
    },
    {
      title: "Ford Expedition",
      caption: "Espaço e presença na estrada.",
      image: "../images/posts/carro-04.jpg",
      likes: 421,
      comments: 19,
    },
    {
      title: "Porsche Panamera",
      caption: "Conforto e esportividade juntos.",
      image: "../images/posts/carro-05.jpg",
      likes: 167,
      comments: 8,
    },
    {
      title: "Chevrolet Camaro",
      caption: "Clássico americano em ação.",
      image: "../images/posts/carro-06.jpg",
      likes: 389,
      comments: 31,
    },
    {
      title: "BMW azul",
      caption: "Azul que combina com a luz da tarde.",
      image: "../images/posts/carro-07.jpg",
      likes: 276,
      comments: 14,
    },
    {
      title: "Volkswagen Fusca",
      caption: "Nostalgia que nunca sai de moda.",
      image: "../images/posts/carro-08.jpg",
      likes: 534,
      comments: 42,
    },
    {
      title: "Ford Mustang",
      caption: "Mais um registro para a coleção.",
      image: "../images/posts/carro-09.jpg",
      likes: 352,
      comments: 23,
    },
    {
      title: "Fiat 500",
      caption: "Pequeno, simpático e cheio de estilo.",
      image: "../images/posts/carro-10.jpg",
      likes: 143,
      comments: 6,
    },
    {
      title: "Lamborghini amarelo",
      caption: "Amarelo para chamar atenção.",
      image: "../images/posts/carro-11.jpg",
      likes: 468,
      comments: 36,
    },
    {
      title: "McLaren branco",
      caption: "Aerodinâmica que dá gosto de ver.",
      image: "../images/posts/carro-12.jpg",
      likes: 291,
      comments: 17,
    },
  ];
  let localPosts = [];
  let events = [];
  let mediaUrls = [];
  let renderVersion = 0;
  const format = (number) => number.toLocaleString("pt-BR");
  const readArray = (key) => {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  };
  const isOwner = (item) =>
    item.autor === currentUser.username || item.autor === "seu.usuario";
  function refreshData() {
    localPosts = readArray("carhub-publicacoes").filter(isOwner).reverse();
    events = readArray("carhub-eventos")
      .filter((event) => event.criado && isOwner(event))
      .reverse();
    const stats = {
      posts: photos.length + localPosts.length,
      events: events.length,
      ...profile,
    };
    Object.entries(stats).forEach(([key, value]) => {
      document.querySelector(`[data-stat="${key}"]`).textContent =
        format(value);
    });
    document.querySelector('[data-count="photos"]').textContent = stats.posts;
    document.querySelector('[data-count="events"]').textContent = events.length;
  }
  function releaseMedia() {
    mediaUrls.forEach((url) => URL.revokeObjectURL(url));
    mediaUrls = [];
  }
  const panel = document.querySelector("#tab-panel");
  const tabs = [...document.querySelectorAll('[role="tab"]')];

  const empty = (title, text) =>
    `<div class="panel-empty"><strong>${title}</strong>${text}</div>`;

  async function renderPhotos() {
    const version = renderVersion;
    panel.innerHTML = `<div class="photo-grid"></div>`;
    const grid = panel.firstElementChild;
    const pendingMedia = [];
    localPosts.forEach((post) => {
      const card = document.createElement("article");
      card.className = "profile-post";
      const gallery = document.createElement("div");
      gallery.className = "profile-post-media";
      const heading = document.createElement("h2");
      heading.textContent = post.veiculo || "Publicação de " + currentUser.name;
      const caption = document.createElement("p");
      caption.textContent = post.legenda;
      const location = document.createElement("p");
      location.className = "profile-post-location";
      if (post.local) {
        location.innerHTML = icon("pin");
        location.append(document.createTextNode(post.local));
      }
      card.append(gallery, heading, caption, location);
      grid.append(card);
      if (post.quantidadeMidias) pendingMedia.push({ post, gallery });
      else {
        gallery.innerHTML = icon("image");
        gallery.classList.add("no-media");
      }
    });
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
    for (const { post, gallery } of pendingMedia) {
      try {
        const record = await mediaRecord("get", post.id);
        if (version !== renderVersion) return;
        if (!record?.files?.length) throw new Error("Sem anexos");
        record.files.forEach((file) => {
          const video = file.type === "video/mp4";
          const media = document.createElement(video ? "video" : "img");
          const url = URL.createObjectURL(file);
          mediaUrls.push(url);
          media.src = url;
          if (video) {
            media.controls = true;
            media.preload = "metadata";
            media.playsInline = true;
          } else {
            media.alt = file.name || post.legenda;
            media.loading = "lazy";
          }
          gallery.append(media);
        });
      } catch {
        if (version !== renderVersion) return;
        gallery.textContent = "Anexos indisponíveis neste navegador.";
        gallery.classList.add("no-media");
      }
    }
  }

  const renderers = {
    photos: renderPhotos,
    events: () => {
      if (!events.length) {
        panel.innerHTML = empty(
          "Nenhum evento por enquanto",
          "Os eventos que você criar aparecem aqui.",
        );
        return;
      }
      const grid = document.createElement("div");
      grid.className = "profile-event-grid";
      events.forEach((event) => {
        const card = document.createElement("article");
        card.className = "profile-event";
        const date = document.createElement("p");
        date.className = "profile-event-date";
        date.innerHTML = icon("calendar");
        date.append(document.createTextNode(`${event.dia} ${event.mes}`));
        const title = document.createElement("h2");
        title.textContent = event.titulo;
        const location = document.createElement("p");
        location.className = "profile-post-location";
        location.innerHTML = icon("pin");
        location.append(document.createTextNode(event.local));
        const type = document.createElement("p");
        type.textContent = event.tipo;
        const attendance = document.createElement("p");
        attendance.textContent = `${event.vao || 0} participantes confirmados`;
        const link = document.createElement("a");
        link.className = "button button-secondary";
        link.href = "encontros.html";
        link.textContent = "Ver encontros";
        card.append(date, title, location, type, attendance, link);
        grid.append(card);
      });
      panel.replaceChildren(grid);
    },
    saved: () => {
      panel.innerHTML = empty(
        "Você ainda não salvou nenhuma publicação",
        "Use o ícone de marcador no feed para guardar as que mais gostar.",
      );
    },
  };

  function selectTab(tab, focus = false) {
    ++renderVersion;
    releaseMedia();
    refreshData();
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
    .addEventListener(
      "click",
      () => (window.location.href = "nova-publicacao.html"),
    );

  const refresh = () =>
    selectTab(
      tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ||
        tabs[0],
    );
  window.addEventListener("storage", (event) => {
    if (["carhub-publicacoes", "carhub-eventos", null].includes(event.key))
      refresh();
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) refresh();
  });
  window.addEventListener("beforeunload", releaseMedia);
  selectTab(tabs[0]);
});
