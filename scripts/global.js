// Identidade de demonstração usada enquanto o projeto não possui autenticação.
window.currentUser = Object.freeze({
  name: "Gabriela Faraon",
  username: "gbfaraon",
  avatar: "https://i.pravatar.cc/80?img=26",
});
const paths = {
  logout: "M13 4H4v24h9M19 9l8 7-8 7M11 16h16",
  chats: "M3 4h21v17H12l-7 6v-6H3ZM25 10h4v18h-5l-5-4",
  close: "m8 8 16 16M24 8 8 24",
  minus: "M7 16h18",
  "arrow-left": "m18 6-10 10 10 10M8 16h20",
  pin: "M25 12c0 7-9 18-9 18S7 19 7 12a9 9 0 1 1 18 0ZM19 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  camera: "M3 9h6l3-5h8l3 5h6v20H3ZM23 18a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
  flag: "M5 30V3M5 4c8-6 14 6 23 0v15c-9 6-15-6-23 0M12 3v15M20 6v15M5 11c8-6 14 6 23 0",
  flame:
    "M17 2c2 8-5 9-4 15 2-1 4-3 5-5 5 5 10 9 7 15-4 7-17 5-19-2C3 16 13 12 17 2Z",

  menu: "M4 6h24M4 16h24M4 26h24",
  search: "m22 22 7 7M25 14a11 11 0 1 1-22 0 11 11 0 0 1 22 0",
  home: "m2 14 14-12 14 12h-5v15h-7v-10h-5v10H7V14Z",
  calendar:
    "M7 2v7M25 2v7M3 12h26M6 6h20a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z",
  plus: "M16 9v14M9 16h14M30 16a14 14 0 1 1-28 0 14 14 0 0 1 28 0",
  user: "M22 9a6 6 0 1 1-12 0 6 6 0 0 1 12 0M4 29v-6q12-13 24 0v6Z",
  moon: "M21 3A14 14 0 1 0 29 23 14 14 0 0 1 21 3Z",
  settings:
    "M16 1v4M16 27v4M1 16h4M27 16h4M5 5l3 3M24 24l3 3M5 27l3-3M24 8l3-3M27 16a11 11 0 1 1-22 0 11 11 0 0 1 22 0M21 16a5 5 0 1 1-10 0 5 5 0 0 1 10 0",
  image:
    "M5 3h22a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2M3 25l9-10 6 6 5-5 6 8M24 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  send: "m4 3 25 13L4 29l7-13ZM11 16h18",
  bell: "M6 25h20M9 25V12a7 7 0 0 1 14 0v13M16 2v3M16 25v5",
  chevron: "m7 12 9 9 9-9",
  heart: "M16 28S1 19 2 10C3 2 12 2 16 8c4-6 13-6 14 2 1 9-14 18-14 18Z",
  comment: "M7 25 3 31l2-11M28 14a12 12 0 1 1-24 0 12 12 0 0 1 24 0",
  bookmark: "M6 2h20v28L16 23 6 30Z",
  logo: "M7 2h18a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5M24 16a8 8 0 1 1-16 0 8 8 0 0 1 16 0M20 16a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
};
window.icon = (name) =>
  `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="${paths[name] || paths.plus}"${name === "home" ? ' fill="currentColor"' : ""}/></svg>`;
window.renderIcons = (root = document) => {
  root.querySelectorAll("[data-icon]").forEach((element) => {
    element.innerHTML = icon(element.dataset.icon);
  });
};
const toast = document.querySelector(".toast");
let toastTimer;
window.notify = (text) => {
  toast.textContent = text;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.hidden = true), 3200);
};
const dialog = document.querySelector("#info-dialog");
window.showInfo = (title, text) => {
  dialog.querySelector("h2").textContent = title;
  dialog.querySelector("p").textContent = text;
  dialog.showModal();
};
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
window.loadContainers = (projectRoot) =>
  Promise.all(
    [...document.querySelectorAll("[data-container]")].map(
      async (container) => {
        const name = container.dataset.container;
        const url = new URL(`pages/containers/${name}.html`, projectRoot);
        const response = await fetch(url, { cache: "no-cache" });
        if (!response.ok) throw new Error(`Não foi possível carregar ${name}.`);
        container.innerHTML = await response.text();
        container.querySelectorAll("[data-icon]").forEach((element) => {
          element.innerHTML = icon(element.dataset.icon);
        });
        container
          .querySelectorAll('a[href="principal.html"], a[data-page-link]')
          .forEach((link) => {
            const page = link.dataset.pageLink || "principal";
            link.href = new URL(`pages/${page}.html`, projectRoot).href;
          });
      },
    ),
  ).catch((error) => {
    notify(
      "Não foi possível carregar o menu. Abra o projeto com um servidor local, como Live Server.",
    );
    console.error(error);
    throw error;
  });

// A aparência escolhida vale para todas as telas.
const systemTheme = window.matchMedia("(prefers-color-scheme: light)");
let themePreference = "dark";
try {
  const savedTheme = localStorage.getItem("carhub-theme");
  if (["dark", "light", "system"].includes(savedTheme))
    themePreference = savedTheme;
} catch {}
window.getTheme = () => themePreference;
window.applyTheme = (preference, save = true) => {
  if (!["dark", "light", "system"].includes(preference)) return;
  themePreference = preference;
  const light =
    preference === "light" || (preference === "system" && systemTheme.matches);
  document.body.classList.toggle("light", light);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", light ? "#eef1f2" : "#080e10");
  if (save) {
    try {
      localStorage.setItem("carhub-theme", preference);
    } catch {
      notify(
        "Tema aplicado. Não foi possível salvar a preferência neste navegador.",
      );
    }
  }
};
systemTheme.addEventListener("change", () => {
  if (themePreference === "system") applyTheme("system", false);
});
applyTheme(themePreference, false);
