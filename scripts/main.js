// Ponto de entrada: carrega os arquivos compartilhados, componentes e a tela.
const assetVersion = new URL(document.currentScript.src).searchParams.get("v");
const projectRoot = new URL("../", document.currentScript.src);

async function loadScript(path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const url = new URL(path, projectRoot);
    if (assetVersion) url.searchParams.set("v", assetVersion);
    script.src = url.href;
    script.onload = resolve;
    script.onerror = () =>
      reject(new Error(`Não foi possível carregar ${path}.`));
    document.head.append(script);
  });
}

async function start() {
  await loadScript("scripts/global.js");
  window.containersReady = window.loadContainers(projectRoot);
  await window.containersReady;
  // Telas sem esses componentes (ex.: Login) não carregam os scripts deles.
  if (document.querySelector('[data-container="topbar"]'))
    await loadScript("scripts/containers/topbar.js");
  if (document.querySelector('[data-container="sidebar"]'))
    await loadScript("scripts/containers/sidebar.js");

  if (document.querySelector('[data-container="chats"]'))
    await loadScript("scripts/containers/chats.js");

  renderIcons();

  const page = document.body.dataset.page;
  if (page) await loadScript(`scripts/${page}.js`);
}

start().catch((error) => console.error(error));
