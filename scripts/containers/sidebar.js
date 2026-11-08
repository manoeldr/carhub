window.containersReady.then(() => {
  const page = document.body.dataset.page;
  document.querySelectorAll(".sidebar [data-page-link]").forEach((link) => {
    link.setAttribute(
      "aria-label",
      link.querySelector(".nav-text").textContent.trim(),
    );
    const active = link.dataset.pageLink === page;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
});
