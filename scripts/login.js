// Login: validação do formulário. Ainda não há backend; ao validar, vai para o feed.
window.containersReady.then(() => {
  document.querySelectorAll("[data-icon]").forEach((element) => {
    element.innerHTML = icon(element.dataset.icon);
  });

  const form = document.querySelector("#login-form");
  const submit = form.querySelector(".submit");
  const fields = [
    { input: form.elements.user, check: validateUser },
    { input: form.elements.password, check: validatePassword },
  ];

  function validateUser(value) {
    if (!value) return "Informe seu e-mail ou nome de usuário.";
    if (value.includes("@") && !value.startsWith("@")) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Digite um e-mail válido, como nome@exemplo.com.";
    }
    return /^[\w.]{3,30}$/.test(value.replace(/^@/, ""))
      ? ""
      : "Use de 3 a 30 letras, números, pontos ou _ no nome de usuário.";
  }
  function validatePassword(value) {
    if (!value) return "Informe sua senha.";
    return value.length >= 6 ? "" : "A senha precisa ter pelo menos 6 caracteres.";
  }

  function validate({ input, check }) {
    const value =
      input === form.elements.user ? input.value.trim() : input.value;
    const message = check(value);
    const error = document.querySelector(`#${input.id}-error`);
    error.textContent = message;
    error.hidden = !message;
    input.setAttribute("aria-invalid", String(!!message));
    return !message;
  }

  // Depois de mostrar um erro, revalida enquanto a pessoa digita.
  fields.forEach((field) =>
    field.input.addEventListener("input", () => {
      if (field.input.getAttribute("aria-invalid") === "true") validate(field);
    }),
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalid = fields.filter((field) => !validate(field));
    if (invalid.length) {
      invalid[0].input.focus();
      return;
    }
    submit.disabled = true;
    submit.textContent = "Entrando…";
    setTimeout(() => (window.location.href = "principal.html"), 500);
  });

  // Ao voltar pelo navegador, o botão não pode ficar travado.
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    submit.disabled = false;
    submit.textContent = "Entrar";
  });

  document
    .querySelector("#forgot")
    .addEventListener("click", () =>
      showInfo("Recuperar senha", "Esta tela ainda está em desenvolvimento."),
    );
  document
    .querySelector("#signup")
    .addEventListener("click", () =>
      showInfo("Criar conta", "Esta tela ainda está em desenvolvimento."),
    );
});
