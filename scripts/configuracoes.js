const CHAVE_CONFIG = "carhub-config";
const padrao = { curtidas: true, eventos: true, publico: true };

function carregarConfig() {
  const texto = localStorage.getItem(CHAVE_CONFIG);
  return texto ? JSON.parse(texto) : padrao;
}
const config = carregarConfig();

const caixas = {
  curtidas: document.querySelector("#cfg-curtidas"),
  eventos: document.querySelector("#cfg-eventos"),
  publico: document.querySelector("#cfg-publico"),
};

Object.keys(caixas).forEach((chave) => {
  caixas[chave].checked = config[chave];

  caixas[chave].addEventListener("change", () => {
    config[chave] = caixas[chave].checked;
    localStorage.setItem(CHAVE_CONFIG, JSON.stringify(config));
    notify("Configuração salva.");
  });
});

document.querySelector("#btn-senha").addEventListener("click", () => {
  showInfo("Alterar senha", "Um link para alteração de senha foi enviado para o seu email.");
});

document.querySelector("#btn-sair").addEventListener("click", () => {
  showInfo("Sair da conta");
});