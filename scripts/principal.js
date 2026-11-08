window.containersReady.then(() => {
  document.querySelectorAll("main [data-icon]").forEach((element) => {
    element.innerHTML = icon(element.dataset.icon);
  });
  const posts = [];
  // Fotos conferidas visualmente; cada imagem corresponde a uma única publicação.
  const cars = [
    {
      id: "demo-1",
      title: "BMW branco",
      tags: ["BMW", "Sedã"],
      image: "../images/posts/carro-01.jpg",
    },
    {
      id: "demo-2",
      title: "Lamborghini branco",
      tags: ["Lamborghini", "Esportivo"],
      image: "../images/posts/carro-02.jpg",
    },
    {
      id: "demo-3",
      title: "Ferrari vermelha",
      tags: ["Ferrari", "Esportivo"],
      image: "../images/posts/carro-03.jpg",
    },
    {
      id: "demo-4",
      title: "Ford Expedition",
      tags: ["Ford", "SUV"],
      image: "../images/posts/carro-04.jpg",
    },
    {
      id: "demo-5",
      title: "Porsche Panamera",
      tags: ["Porsche", "Panamera"],
      image: "../images/posts/carro-05.jpg",
    },
    {
      id: "demo-6",
      title: "Chevrolet Camaro",
      tags: ["Chevrolet", "Camaro"],
      image: "../images/posts/carro-06.jpg",
    },
    {
      id: "demo-7",
      title: "BMW azul",
      tags: ["BMW", "Cupê"],
      image: "../images/posts/carro-07.jpg",
    },
    {
      id: "demo-8",
      title: "Volkswagen Fusca",
      tags: ["VW", "Fusca"],
      image: "../images/posts/carro-08.jpg",
    },
    {
      id: "demo-9",
      title: "Ford Mustang",
      tags: ["Ford", "Mustang"],
      image: "../images/posts/carro-09.jpg",
    },
    {
      id: "demo-10",
      title: "Fiat 500",
      tags: ["Fiat", "500"],
      image: "../images/posts/carro-10.jpg",
    },
    {
      id: "demo-11",
      title: "Lamborghini amarelo",
      tags: ["Lamborghini", "Esportivo"],
      image: "../images/posts/carro-11.jpg",
    },
    {
      id: "demo-12",
      title: "McLaren branco",
      tags: ["McLaren", "Esportivo"],
      image: "../images/posts/carro-12.jpg",
    },
  ];
  const authors = [
    { user: "gabriel.santos", avatar: 14 },
    { user: "kaue.oliveira", avatar: 12 },
    { user: "luiz.fdz", avatar: 13 },
    { user: "thais.martins", avatar: 47 },
    { user: "pedro.sx", avatar: 11 },
    { user: "carolzinn", avatar: 44 },
    { user: "rafa.garage", avatar: 33 },
    { user: "julia.motor", avatar: 49 },
    { user: "bruno.racing", avatar: 15 },
    { user: "ana.naestrada", avatar: 45 },
  ];
  const captions = [
    "O melhor jeito de terminar o dia. 🔥",
    "Cada detalhe faz a diferença. 🖤",
    "Quem mais sairia para uma volta agora? 🏁",
    "Dia de encontrar a galera e colocar o papo em dia! 🚘",
    "Lavado e pronto para o fim de semana. ✨",
    "Mais um registro para a coleção. 📸",
    "A estrada sempre rende boas histórias. 🛣️",
    "Qual seria o próximo projeto de vocês?",
  ];
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  function shuffle(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index--) {
      const other = randomInt(0, index);
      [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
    }
    return shuffled;
  }
  const demoPosts = shuffle(cars).map((car) => ({
    ...car,
    ...authors[randomInt(0, authors.length - 1)],
    caption: captions[randomInt(0, captions.length - 1)],
    time: `${randomInt(1, 23)}h`,
    likes: randomInt(20, 950),
    comments: randomInt(0, 65),
    unliked: true,
  }));
  const shownImages = new Set();
  function drawBatch(candidates) {
    return shuffle(candidates)
      .filter((post) => !shownImages.has(post.image))
      .slice(0, 6)
      .map((post) => {
        shownImages.add(post.image);
        return { ...post, tags: [...post.tags], replies: [] };
      });
  }
  posts.splice(0, posts.length, ...drawBatch(demoPosts));
  const pagination = document.querySelector("#feed-pagination");
  const loadMoreButton = document.querySelector("#load-more");
  const status = document.querySelector("#feed-status");
  let loading = false;
  let observer;
  const matchesQuery = (post, query) =>
    [post.user, post.title, post.caption, ...post.tags]
      .join(" ")
      .toLocaleLowerCase("pt-BR")
      .includes(query);
  const getQuery = () =>
    document.querySelector("#search").value.trim().toLocaleLowerCase("pt-BR");

  const feed = document.querySelector("#feed");
  const escapeHTML = (text) =>
    String(text).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  function render(startIndex = 0) {
    const query = document
      .querySelector("#search")
      .value.trim()
      .toLocaleLowerCase("pt-BR");
    if (startIndex === 0) feed.innerHTML = "";
    posts.slice(startIndex).forEach((post, offset) => {
      const index = startIndex + offset;
      if (!matchesQuery(post, query)) return;
      const article = document.createElement("article");
      article.className = "post";
      article.dataset.index = index;
      const photo = post.url || post.image || "";
      article.innerHTML = `<header class="post-header"><img class="avatar" src="https://i.pravatar.cc/80?img=${post.avatar}" alt=""><div><p class="post-author">${escapeHTML(post.user)}</p><span class="post-time">${post.time}</span></div><button class="more icon-button" aria-label="Opções da publicação">···</button></header>${photo ? `<img class="post-photo" src="${escapeHTML(photo)}" alt="${escapeHTML(post.title)}" loading="lazy">` : ""}<div class="post-content"><h2>${escapeHTML(post.title)}</h2><p class="post-caption">${escapeHTML(post.caption)}</p><div class="tags">${post.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div><div class="post-actions"><button class="post-action like" aria-label="Curtir publicação" aria-pressed="${!post.unliked}">${icon("heart")}<span>${post.likes}</span></button><button class="post-action comment" aria-label="Comentar publicação">${icon("comment")}<span>${post.comments}</span></button><button class="post-action share" aria-label="Compartilhar publicação">${icon("send")}</button><button class="post-action bookmark" aria-label="Salvar publicação" aria-pressed="${!!post.saved}">${icon("bookmark")}</button></div><div class="comments"></div></div>`;
      feed.append(article);
      (post.replies || []).forEach((text) => addReply(article, text));
    });
    document.querySelector("#empty").hidden = !!feed.children.length;
    const hasMore = demoPosts.some(
      (post) => matchesQuery(post, query) && !shownImages.has(post.image),
    );
    pagination.hidden = !hasMore;
    const endMessage = document.querySelector("#feed-end");
    endMessage.hidden = hasMore || !feed.children.length;
    endMessage.textContent = query
      ? "Você viu todas as publicações encontradas."
      : "Você viu todas as publicações disponíveis por enquanto.";
  }
  function addReply(article, text) {
    const p = document.createElement("p");
    p.className = "comment-text";
    p.textContent = `Você: ${text}`;
    article.querySelector(".comments").append(p);
  }
  feed.addEventListener("click", async (e) => {
    const button = e.target.closest("button");
    if (!button) return;
    const article = button.closest(".post"),
      post = posts[article.dataset.index];
    if (button.classList.contains("like")) {
      post.unliked = !post.unliked;
      post.likes += post.unliked ? -1 : 1;
      button.setAttribute("aria-pressed", String(!post.unliked));
      button.querySelector("span").textContent = post.likes;
    } else if (button.classList.contains("bookmark")) {
      post.saved = !post.saved;
      button.setAttribute("aria-pressed", String(post.saved));
      notify(
        post.saved ? "Publicação salva." : "Publicação removida dos favoritos.",
      );
    } else if (button.classList.contains("comment")) {
      let form = article.querySelector(".comment-form");
      if (!form) {
        form = document.createElement("form");
        form.className = "comment-form";
        form.innerHTML =
          '<input aria-label="Seu comentário" placeholder="Escreva um comentário..." required maxlength="300"><button>Enviar</button>';
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const text = form.querySelector("input").value.trim();
          if (!text) return;
          (post.replies ??= []).push(text);
          post.comments++;
          article.querySelector(".comment span").textContent = post.comments;
          addReply(article, text);
          form.reset();
        });
        article.querySelector(".comments").append(form);
      }
      form.querySelector("input").focus();
    } else if (button.classList.contains("share")) {
      try {
        await navigator.clipboard.writeText(
          location.href.split("#")[0] + "#publicacao-" + article.dataset.index,
        );
        notify("Link copiado!");
      } catch {
        notify("Compartilhe o endereço desta página.");
      }
    } else {
      showInfo(
        post.title,
        "Publicação de " + post.user + " na comunidade CarHub.",
      );
    }
  });
  async function loadMore() {
    if (loading || pagination.hidden) return;
    const query = getQuery();
    const candidates = demoPosts.filter(
      (post) => matchesQuery(post, query) && !shownImages.has(post.image),
    );
    if (!candidates.length) return;
    loading = true;
    loadMoreButton.disabled = true;
    feed.setAttribute("aria-busy", "true");
    status.textContent = "Carregando publicações...";
    try {
      // Dá ao navegador tempo de exibir o estado de carregamento.
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (query !== getQuery()) return;
      const startIndex = posts.length;
      const batch = drawBatch(candidates);
      posts.push(...batch);
      render(startIndex);
      status.textContent = `Mais ${batch.length} publicações carregadas.`;
    } finally {
      loading = false;
      loadMoreButton.disabled = false;
      feed.setAttribute("aria-busy", "false");
      if (observer && !pagination.hidden) {
        observer.unobserve(pagination);
        observer.observe(pagination);
      }
    }
  }

  loadMoreButton.addEventListener("click", loadMore);
  document.querySelector("#search").addEventListener("input", () => {
    status.textContent = "";
    render();
    if (observer && !pagination.hidden) {
      observer.unobserve(pagination);
      observer.observe(pagination);
    }
  });
  const imageInput = document.querySelector("#post-image");
  let attachedImage = "";
  imageInput.addEventListener("change", () => {
    if (attachedImage) URL.revokeObjectURL(attachedImage);
    const file = imageInput.files[0];
    attachedImage = file ? URL.createObjectURL(file) : "";
    const label = document.querySelector("#attachment");
    label.hidden = !file;
    label.textContent = file ? "Imagem anexada: " + file.name : "";
  });
  document.querySelector("#composer").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector("#post-text");
    const text = input.value.trim();
    if (!text) return;
    posts.unshift({
      user: "gbfaraon",
      avatar: 26,
      time: "Agora",
      title: text,
      caption: "",
      tags: [],
      likes: 0,
      comments: 0,
      url: attachedImage || "",
      image: "",
      unliked: true,
    });
    attachedImage = "";
    imageInput.value = "";
    document.querySelector("#attachment").hidden = true;
    input.value = "";
    document.querySelector("#search").value = "";
    render();
    notify("Publicação criada nesta sessão.");
  });
  render();
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMore();
      },
      { rootMargin: "0px 0px 250px 0px" },
    );
    observer.observe(pagination);
  }
});
