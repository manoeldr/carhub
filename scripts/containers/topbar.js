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
  const toggle = document.querySelector(".profile-toggle");
  const menu = document.querySelector("#account-menu");
  const logout = menu.querySelector('[role="menuitem"]');
  function setMenu(open, restoreFocus = false) {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) logout.focus();
    else if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener("click", () => setMenu(menu.hidden));
  toggle.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setMenu(true);
    }
  });
  document.addEventListener("pointerdown", (event) => {
    if (
      !menu.hidden &&
      !menu.contains(event.target) &&
      !toggle.contains(event.target)
    )
      setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      event.preventDefault();
      setMenu(false, true);
    }
  });
  document.querySelector(".account").addEventListener("focusout", (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setMenu(false);
  });
});
