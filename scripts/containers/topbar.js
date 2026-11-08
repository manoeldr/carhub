window.containersReady.then(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebarStateKey = "carhub-sidebar-collapsed";
  try {
    document.body.classList.toggle(
      "collapsed",
      localStorage.getItem(sidebarStateKey) === "true",
    );
  } catch {}
  function updateSidebarButton() {
    const collapsed = document.body.classList.contains("collapsed");
    menuToggle.setAttribute("aria-expanded", String(!collapsed));
    menuToggle.setAttribute(
      "aria-label",
      collapsed ? "Expandir menu" : "Recolher menu",
    );
  }
  updateSidebarButton();
  menuToggle.addEventListener("click", () => {
    const collapsed = document.body.classList.toggle("collapsed");
    updateSidebarButton();
    try {
      localStorage.setItem(sidebarStateKey, String(collapsed));
    } catch {}
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
