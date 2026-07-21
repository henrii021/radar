/* ==========================================================
   RADAR · pipeline de prospecção
   CRUD completo em JavaScript puro, com drag and drop nativo
   e persistência em localStorage.
   ========================================================== */

const CHAVE_STORAGE = "radar.leads.v1";

const ETAPAS = [
  { id: "mapeado", nome: "Mapeado" },
  { id: "abordado", nome: "Abordado" },
  { id: "conversando", nome: "Conversando" },
  { id: "proposta", nome: "Proposta" },
  { id: "fechado", nome: "Fechado" },
  ];

// ---------- Estado ----------

let leads = carregarLeads();
let leadEmEdicao = null; // guarda o id quando o modal está em modo edição

function carregarLeads() {
    try {
          const salvo = localStorage.getItem(CHAVE_STORAGE);
          if (salvo) return JSON.parse(salvo);
    } catch (erro) {
          console.error("Não foi possível ler o localStorage:", erro);
    }
    // Primeiro acesso: dois exemplos para o quadro não nascer vazio
  return [
    {
            id: gerarId(),
            nome: "Barbearia Navalha de Ouro",
            nicho: "Barbearia",
            cidade: "Magé, RJ",
            instagram: "@navalhadeouro",
            ultimoContato: diasAtras(2),
            obs: "Feed bonito, mas sem CTA. Comentei no post do degradê.",
            etapa: "abordado",
    },
    {
            id: gerarId(),
            nome: "Studio Ana Lash",
            nicho: "Clínica estética",
            cidade: "Duque de Caxias, RJ",
            instagram: "@studioanalash",
            ultimoContato: diasAtras(9),
            obs: "Respondeu a primeira DM. Combinei de mandar uma prévia.",
            etapa: "conversando",
    },
      ];
}

function salvarLeads() {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(leads));
}

function gerarId() {
    return "lead_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function diasAtras(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
}

// ---------- Termômetro de follow-up ----------
// Regra simples de negócio: até 3 dias o contato está quente,
// até 7 está morno, acima disso esfriou e precisa de retomada.

function avaliarFollowUp(dataISO) {
    if (!dataISO) return { classe: "t-sem", rotulo: "sem contato", largura: 0 };

  const dias = Math.floor((Date.now() - new Date(dataISO + "T12:00:00")) / 86400000);

  if (dias <= 3) return { classe: "t-quente", rotulo: dias + "d · quente", largura: 100 - dias * 10 };
    if (dias <= 7) return { classe: "t-morno", rotulo: dias + "d · retomar", largura: 70 - dias * 5 };
    return { classe: "t-frio", rotulo: dias + "d · esfriou", largura: 20 };
}

// ---------- Renderização ----------

const quadro = document.getElementById("quadro");

function render() {
    quadro.innerHTML = "";

  ETAPAS.forEach((etapa) => {
        const daEtapa = leads.filter((l) => l.etapa === etapa.id);

                     const coluna = document.createElement("section");
        coluna.className = "coluna";
        coluna.innerHTML = `
              <header class="coluna-cabeca">
                      <h2 class="coluna-nome">${etapa.nome}</h2>
                              <span class="coluna-contador">${String(daEtapa.length).padStart(2, "0")}</span>
                                    </header>
                                        `;

                     const corpo = document.createElement("div");
        corpo.className = "coluna-corpo";
        corpo.dataset.etapa = etapa.id;

                     if (daEtapa.length === 0) {
                             corpo.innerHTML = `<p class="coluna-vazia">— vazio —</p>`;
                     } else {
                             daEtapa.forEach((lead) => corpo.appendChild(criarCard(lead)));
                     }

                     ligarDropZone(corpo);
        coluna.appendChild(corpo);
        quadro.appendChild(coluna);
  });

  atualizarResumo();
    salvarLeads();
}

function criarCard(lead) {
    const card = document.createElement("article");
    card.className = "card";
    card.draggable = true;
    card.dataset.id = lead.id;

  const follow = avaliarFollowUp(lead.ultimoContato);

  card.innerHTML = `
      <h3 class="card-nome">${escapar(lead.nome)}</h3>
          <p class="card-meta">
                <span>${escapar(lead.nicho || "")}</span>
                      ${lead.instagram ? `<span>${escapar(lead.instagram)}</span>` : ""}
                            ${lead.cidade ? `<span>${escapar(lead.cidade)}</span>` : ""}
                                </p>
                                    <div class="termometro ${follow.classe}">
                                          <div class="termometro-trilho">
                                                  <div class="termometro-barra" style="width:${follow.largura}%"></div>
                                                        </div>
                                                              <span class="termometro-rotulo">${follow.rotulo}</span>
                                                                  </div>
                                                                    `;

  // Clique abre a edição; drag move de etapa
  card.addEventListener("click", () => abrirModal(lead.id));
    card.addEventListener("dragstart", (ev) => {
          ev.dataTransfer.setData("text/plain", lead.id);
          card.classList.add("arrastando");
    });
    card.addEventListener("dragend", () => card.classList.remove("arrastando"));

  return card;
}

// Evita injeção de HTML nos campos digitados
function escapar(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

function ligarDropZone(zona) {
    zona.addEventListener("dragover", (ev) => {
          ev.preventDefault();
          zona.classList.add("arrastando-sobre");
    });
    zona.addEventListener("dragleave", () => zona.classList.remove("arrastando-sobre"));
    zona.addEventListener("drop", (ev) => {
          ev.preventDefault();
          zona.classList.remove("arrastando-sobre");
          const id = ev.dataTransfer.getData("text/plain");
          const lead = leads.find((l) => l.id === id);
          if (lead && lead.etapa !== zona.dataset.etapa) {
                  lead.etapa = zona.dataset.etapa;
                  render();
          }
    });
}

function atualizarResumo() {
    const total = leads.length;
    const frios = leads.filter((l) => {
          const f = avaliarFollowUp(l.ultimoContato);
          return f.classe === "t-frio" && l.etapa !== "fechado";
    }).length;

  document.getElementById("resumoDia").textContent =
        `${total} leads no radar · ${frios} esfriando`;
}

// ---------- Modal (criar / editar / excluir) ----------

const modal = document.getElementById("modalLead");
const form = document.getElementById("formLead");
const btnExcluir = document.getElementById("btnExcluir");

document.getElementById("btnNovoLead").addEventListener("click", () => abrirModal(null));
document.getElementById("btnFechar").addEventListener("click", () => modal.close());

function abrirModal(id) {
    leadEmEdicao = id;
    form.reset();

  if (id) {
        const lead = leads.find((l) => l.id === id);
        document.getElementById("modalTitulo").textContent = "Editar lead";
        form.nome.value = lead.nome;
        form.nicho.value = lead.nicho || "Outro";
        form.cidade.value = lead.cidade || "";
        form.instagram.value = lead.instagram || "";
        form.ultimoContato.value = lead.ultimoContato || "";
        form.obs.value = lead.obs || "";
        btnExcluir.hidden = false;
  } else {
        document.getElementById("modalTitulo").textContent = "Novo lead";
        btnExcluir.hidden = true;
  }

  modal.showModal();
}

form.addEventListener("submit", () => {
    const dados = {
          nome: form.nome.value.trim(),
          nicho: form.nicho.value,
          cidade: form.cidade.value.trim(),
          instagram: form.instagram.value.trim(),
          ultimoContato: form.ultimoContato.value,
          obs: form.obs.value.trim(),
    };

                        if (leadEmEdicao) {
                              const lead = leads.find((l) => l.id === leadEmEdicao);
                              Object.assign(lead, dados);
                        } else {
                              leads.push({ id: gerarId(), etapa: "mapeado", ...dados });
                        }

                        render();
});

btnExcluir.addEventListener("click", () => {
    if (confirm("Excluir este lead do radar?")) {
          leads = leads.filter((l) => l.id !== leadEmEdicao);
          modal.close();
          render();
    }
});

// ---------- Início ----------

render();
