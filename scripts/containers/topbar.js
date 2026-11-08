window.containersReady.then(() => {
  document.querySelector(".menu-toggle").addEventListener("click", (e) => {
    const collapsed = document.body.classList.toggle("collapsed");
    e.currentTarget.setAttribute("aria-expanded", String(!collapsed));
  });
  document
    .querySelector(".notification")
    .addEventListener("click", () =>
      notify("Você está em dia! Nenhuma nova notificação."),
    );
  document.querySelector(".profile-toggle").addEventListener("click", () => {
    window.location.href = document.querySelector(".account-link").href;
  });
});
