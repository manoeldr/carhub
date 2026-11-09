const CHAVE_EVENTOS = "carhub-eventos";

const eventosIniciais = [
  {
    id: 1,
    titulo: "Classic Muscle Meeting",
    dia: "25",
    mes: "OUT",
    autor: "mariwelisa",
    local: "Parque do Imigrante, Caxias do Sul",
    cidade: "Caxias do Sul",
    tipo: "Exposição",
    vao: 120,
    imagem: "../images/eventos/evento1.png",
    resposta: "",
    criado: false,
  },
  {
    id: 2,
    titulo: "Night Meet – Edição Drift",
    dia: "31",
    mes: "OUT",
    autor: "mariwelisa",
    local: "Kartódromo Internacional",
    cidade: "Guaporé",
    tipo: "Drift",
    vao: 210,
    imagem: "../images/eventos/evento2.png",
    resposta: "",
    criado: false,
  },
];

function carregarEventos() {
  const texto = localStorage.getItem(CHAVE_EVENTOS);
  return texto ? JSON.parse(texto) : eventosIniciais;
}

function salvarEventos(lista) {
  localStorage.setItem(CHAVE_EVENTOS, JSON.stringify(lista));
}
