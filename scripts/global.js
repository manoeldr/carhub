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
    "M25.86 11.63Q25.98 11.87 26.06 12.12L26.44 13.32Q26.52 13.57 27.02 13.61L29.33 13.77Q29.83 13.81 29.83 14.47L29.83 17.53Q29.83 18.19 29.33 18.23L27.02 18.39Q26.52 18.43 26.44 18.68L26.06 19.88Q25.98 20.13 25.86 20.37L25.28 21.48Q25.16 21.72 25.48 22.1L27 23.85Q27.33 24.23 26.86 24.69L24.69 26.86Q24.23 27.33 23.85 27L22.1 25.48Q21.72 25.16 21.48 25.28L20.37 25.86Q20.13 25.98 19.88 26.06L18.68 26.44Q18.43 26.52 18.39 27.02L18.23 29.33Q18.19 29.83 17.53 29.83L14.47 29.83Q13.81 29.83 13.77 29.33L13.61 27.02Q13.57 26.52 13.32 26.44L12.12 26.06Q11.87 25.98 11.63 25.86L10.52 25.28Q10.28 25.16 9.9 25.48L8.15 27Q7.77 27.33 7.31 26.86L5.14 24.69Q4.67 24.23 5 23.85L6.52 22.1Q6.84 21.72 6.72 21.48L6.14 20.37Q6.02 20.13 5.94 19.88L5.56 18.68Q5.48 18.43 4.98 18.39L2.67 18.23Q2.17 18.19 2.17 17.53L2.17 14.47Q2.17 13.81 2.67 13.77L4.98 13.61Q5.48 13.57 5.56 13.32L5.94 12.12Q6.02 11.87 6.14 11.63L6.72 10.52Q6.84 10.28 6.52 9.9L5 8.15Q4.67 7.77 5.14 7.31L7.31 5.14Q7.77 4.67 8.15 5L9.9 6.52Q10.28 6.84 10.52 6.72L11.63 6.14Q11.87 6.02 12.12 5.94L13.32 5.56Q13.57 5.48 13.61 4.98L13.77 2.67Q13.81 2.17 14.47 2.17L17.53 2.17Q18.19 2.17 18.23 2.67L18.39 4.98Q18.43 5.48 18.68 5.56L19.88 5.94Q20.13 6.02 20.37 6.14L21.48 6.72Q21.72 6.84 22.1 6.52L23.85 5Q24.23 4.67 24.69 5.14L26.86 7.31Q27.33 7.77 27 8.15L25.48 9.9Q25.16 10.28 25.28 10.52L25.86 11.63ZM21 16a5 5 0 1 1-10 0 5 5 0 0 1 10 0",
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
            const pageUrl = new URL(`pages/${page}.html`, projectRoot);
            if (assetVersion) pageUrl.searchParams.set("v", assetVersion);
            link.href = pageUrl.href;
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
