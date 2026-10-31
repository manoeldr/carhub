window.containersReady.then(() => {
  const options = document.querySelectorAll('input[name="theme"]');
  options.forEach((option) => {
    option.checked = option.value === getTheme();
    option.addEventListener("change", () => {
      if (!option.checked) return;
      applyTheme(option.value);
      const label = option.closest("label").querySelector("strong").textContent;
      document.querySelector("#theme-status").textContent =
        `Tema ${label.toLowerCase()} aplicado. Sua preferência é salva automaticamente neste navegador.`;
    });
  });
});
