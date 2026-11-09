// Fonte única da identidade local, compartilhada por todas as telas.
(() => {
  const key = "carhub-perfil";
  const defaults = {
    name: "Gabriela Faraon",
    username: "gbfaraon",
    avatar: "https://i.pravatar.cc/80?img=26",
    bio: "Fotografia automotiva, encontros e cobertura de trackdays",
  };
  let state = { ...defaults };
  function readProfile() {
    let stored;
    try {
      stored = JSON.parse(localStorage.getItem(key));
    } catch {}
    state = {
      ...defaults,
      ...(typeof stored?.bio === "string"
        ? { bio: stored.bio.slice(0, 240) }
        : {}),
      ...(typeof stored?.avatar === "string" &&
      /^data:image\/(png|jpeg|webp);base64,/.test(stored.avatar)
        ? { avatar: stored.avatar }
        : {}),
    };
  }
  // Getters mantêm as referências já utilizadas pelas telas atualizadas.
  window.currentUser = Object.freeze(
    Object.defineProperties(
      {},
      Object.fromEntries(
        Object.keys(defaults).map((field) => [
          field,
          { enumerable: true, get: () => state[field] },
        ]),
      ),
    ),
  );
  window.syncCurrentUser = () => {
    document.querySelectorAll("[data-user-avatar]").forEach((image) => {
      image.src = state.avatar;
      image.alt = "Foto de perfil de " + state.name;
    });
    document.querySelectorAll("[data-user-bio]").forEach((element) => {
      element.textContent = state.bio;
    });
    document.querySelectorAll("[data-user-name]").forEach((element) => {
      element.textContent = state.name;
    });
    document.querySelectorAll("[data-user-username]").forEach((element) => {
      element.textContent = "@" + state.username;
    });
  };
  window.updateCurrentUser = ({ avatar, bio }) => {
    if (typeof bio !== "string" || bio.length > 240)
      throw new Error("A descrição deve ter até 240 caracteres.");
    if (
      avatar !== defaults.avatar &&
      !/^data:image\/(png|jpeg|webp);base64,/.test(avatar)
    )
      throw new Error("Selecione uma foto PNG, JPG ou WEBP.");
    // Só altera a interface depois que o navegador confirmar o salvamento.
    localStorage.setItem(key, JSON.stringify({ avatar, bio }));
    state = { ...defaults, avatar, bio };
    syncCurrentUser();
    window.dispatchEvent(new Event("profilechange"));
  };
  const refresh = () => {
    readProfile();
    syncCurrentUser();
  };
  window.addEventListener("storage", (event) => {
    if (event.key === key || event.key === null) refresh();
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) refresh();
  });
  readProfile();
})();
