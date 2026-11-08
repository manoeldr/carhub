// Ponto de entrada: carrega os arquivos compartilhados, componentes e a tela.
const projectRoot = new URL("../", document.currentScript.src);

async function loadScript(path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = new URL(path, projectRoot).href;
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

  const page = document.body.dataset.page;
  if (page) await loadScript(`scripts/${page}.js`);
}

start().catch((error) => console.error(error));
