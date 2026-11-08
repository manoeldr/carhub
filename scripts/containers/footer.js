window.containersReady.then(() => {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;
  footer.querySelector("#footer-year").textContent = new Date().getFullYear();
  const information = {
    about: {
      title: "Sobre o CarHub",
      text: "Uma comunidade para apaixonados por carros, fotos e encontros automotivos. Projeto da cadeira de Programação e Modelagem para Web, desenvolvido por Gabriela Faraon, Manoel Rodrigues e Mariana Santos.",
    },
    terms: {
      title: "Termos de uso",
      text: "O CarHub é um protótipo acadêmico em desenvolvimento. Os termos de uso da versão definitiva ainda estão em preparação.",
    },
    privacy: {
      title: "Política de privacidade",
      text: "Nesta demonstração, preferências, conversas e outros dados criados nas telas são armazenados neste navegador. Fotos de perfil e fontes são carregadas de serviços externos. A política de privacidade da versão definitiva ainda está em preparação.",
    },
  };
  footer.querySelectorAll("[data-footer-info]").forEach((button) => {
    button.addEventListener("click", () => {
      const info = information[button.dataset.footerInfo];
      showInfo(info.title, info.text);
    });
  });
});
