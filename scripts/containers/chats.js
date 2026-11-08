window.containersReady.then(() => {
  const widget = document.querySelector(".chat-widget");
  if (!widget) return;
  const panel = widget.querySelector("#chat-panel");
  const launcher = widget.querySelector("#chat-launcher");
  const inbox = widget.querySelector("#chat-inbox");
  const conversation = widget.querySelector("#chat-conversation");
  const contactsList = widget.querySelector("#chat-contacts");
  const messages = widget.querySelector("#chat-messages");
  const search = widget.querySelector("#chat-search");
  const input = widget.querySelector("#chat-message");
  const back = widget.querySelector("#chat-back");
  const badge = widget.querySelector("#chat-badge");
  const storageKey = "carhub-chats-v1";
  const contacts = [
    {
      id: "thais",
      name: "Thais Martins",
      avatar: 47,
      unread: 1,
      messages: [
        {
          text: "Oi! Vamos combinar as fotos do próximo encontro?",
          sent: false,
          time: "10:30",
        },
      ],
    },
    {
      id: "mariana",
      name: "Mariana Santos",
      avatar: 44,
      unread: 1,
      messages: [
        {
          text: "Você vai ao encontro de carros no fim de semana?",
          sent: false,
          time: "09:45",
        },
      ],
    },
    {
      id: "manoel",
      name: "Manoel Antonio",
      avatar: 14,
      unread: 0,
      messages: [
        {
          text: "Ficaram muito boas as fotos do seu carro!",
          sent: false,
          time: "Ontem",
        },
      ],
    },
  ];
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    contacts.forEach((contact) => {
      // Mantém os históricos locais após a troca dos contatos de demonstração.
      const previousId = { thais: "gabriela", manoel: "gabriel" }[contact.id];
      const stored = saved?.[contact.id] || saved?.[previousId];
      if (!stored || !Array.isArray(stored.messages)) return;
      contact.messages = stored.messages
        .filter(
          (message) =>
            typeof message.text === "string" &&
            typeof message.time === "string" &&
            typeof message.sent === "boolean",
        )
        .slice(-100);
      contact.unread = Number.isInteger(stored.unread)
        ? Math.max(0, stored.unread)
        : 0;
    });
  } catch {}
  let selected = null;
  const save = () => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(
          Object.fromEntries(
            contacts.map((contact) => [
              contact.id,
              {
                messages: contact.messages.slice(-100),
                unread: contact.unread,
              },
            ]),
          ),
        ),
      );
    } catch {
      notify(
        "Mensagem disponível nesta página. Não foi possível salvar no navegador.",
      );
    }
  };
  const updateBadge = () => {
    const count = contacts.reduce((sum, contact) => sum + contact.unread, 0);
    badge.textContent = count;
    badge.hidden = count === 0;
    launcher.setAttribute(
      "aria-label",
      `${panel.hidden ? "Abrir" : "Minimizar"} chats${count ? `, ${count} ${count === 1 ? "conversa não lida" : "conversas não lidas"}` : ""}`,
    );
  };
  function setOpen(open) {
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));
    updateBadge();
    if (open) (selected ? input : search).focus();
    else launcher.focus();
  }
  function renderContacts() {
    contactsList.replaceChildren();
    const query = search.value.trim().toLocaleLowerCase("pt-BR");
    contacts
      .filter((contact) =>
        contact.name.toLocaleLowerCase("pt-BR").includes(query),
      )
      .forEach((contact) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "chat-contact";
        button.setAttribute(
          "aria-label",
          `Conversa com ${contact.name}${contact.unread ? ", não lida" : ""}`,
        );
        button.innerHTML = `<span class="chat-contact-avatar"><img class="avatar" src="https://i.pravatar.cc/80?img=${contact.avatar}" alt=""></span><span class="chat-contact-details"><strong></strong><p></p></span><span class="chat-contact-meta"><time></time><span class="chat-unread" aria-hidden="true" hidden></span></span>`;
        button.querySelector("strong").textContent = contact.name;
        const last = contact.messages.at(-1);
        button.querySelector("p").textContent = last
          ? `${last.sent ? "Você: " : ""}${last.text}`
          : "Inicie uma conversa";
        button.querySelector("time").textContent = last?.time || "";
        const unread = button.querySelector(".chat-unread");
        unread.hidden = !contact.unread;
        unread.textContent = contact.unread;
        button.addEventListener("click", () => openConversation(contact));
        contactsList.append(button);
      });
    widget.querySelector("#chat-empty").hidden =
      contactsList.children.length > 0;
  }
  function appendMessage(message) {
    const bubble = document.createElement("div");
    bubble.className = `chat-message${message.sent ? " sent" : ""}`;
    const text = document.createElement("p");
    text.textContent = message.text;
    const time = document.createElement("time");
    time.textContent = message.time;
    bubble.append(text, time);
    messages.append(bubble);
  }
  function openConversation(contact) {
    selected = contact;
    contact.unread = 0;
    inbox.hidden = true;
    conversation.hidden = false;
    back.hidden = false;
    widget.querySelector("#chat-title").textContent = contact.name;
    widget.querySelector("#chat-subtitle").textContent =
      "Conversa de demonstração";
    messages.setAttribute("aria-label", `Mensagens com ${contact.name}`);
    messages.replaceChildren();
    contact.messages.forEach(appendMessage);
    messages.scrollTop = messages.scrollHeight;
    input.value = "";
    input.focus();
    updateBadge();
    save();
  }
  launcher.addEventListener("click", () => setOpen(panel.hidden));
  ["#chat-close", "#chat-minimize"].forEach((selector) =>
    widget
      .querySelector(selector)
      .addEventListener("click", () => setOpen(false)),
  );
  back.addEventListener("click", () => {
    selected = null;
    conversation.hidden = true;
    inbox.hidden = false;
    back.hidden = true;
    widget.querySelector("#chat-title").textContent = "Chats";
    widget.querySelector("#chat-subtitle").textContent =
      "Sua comunidade, mais perto.";
    renderContacts();
    search.focus();
  });
  search.addEventListener("input", renderContacts);
  widget.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      event.preventDefault();
      setOpen(false);
    }
  });
  widget.querySelector("#chat-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!selected || !text) return;
    const message = {
      text,
      sent: true,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    selected.messages.push(message);
    if (selected.messages.length > 100) {
      selected.messages.shift();
      messages.firstElementChild?.remove();
    }
    appendMessage(message);
    input.value = "";
    messages.scrollTop = messages.scrollHeight;
    input.focus();
    save();
  });
  renderContacts();
  updateBadge();
});
