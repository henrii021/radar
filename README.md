/* ==========================================================
   RADAR · pipeline de prospecção
   Identidade: painel de operação. Cinza azulado de escritório,
   tinta quase preta e amarelo táxi como única cor de ação.
   ========================================================== */

:root {
  --fundo: #E9EDF0;
  --papel: #FFFFFF;
  --tinta: #16232B;
  --tinta-fraca: #5C6B75;
  --linha: #C9D2D8;
  --acao: #F7B500;       /* amarelo táxi */
  --acao-tinta: #1A1400;
  --quente: #1E7A4C;     /* contato fresco */
  --morno: #B07C10;      /* precisa retomar */
  --frio: #C43A2F;       /* esfriou */
  --sombra: 0 2px 0 rgba(22, 35, 43, 0.14);
  --raio: 4px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: var(--fundo);
  color: var(--tinta);
  font-family: "Archivo", sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ---------- Topo ---------- */

.topo {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 28px 32px 20px;
  border-bottom: 2px solid var(--tinta);
}

.topo-marca { display: flex; align-items: baseline; gap: 12px; }

.marca-pulso {
  width: 12px; height: 12px;
  background: var(--acao);
  border: 2px solid var(--tinta);
  border-radius: 50%;
  align-self: center;
  animation: pulso 2.4s ease-in-out infinite;
}

@keyframes pulso {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.35); }
}

@media (prefers-reduced-motion: reduce) {
  .marca-pulso { animation: none; }
}

.topo h1 {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 900;
  font-stretch: 118%;
  letter-spacing: 0.04em;
}

.topo-sub {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.78rem;
  color: var(--tinta-fraca);
}

.topo-acoes { display: flex; align-items: center; gap: 18px; }

.resumo-dia {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.78rem;
  color: var(--tinta-fraca);
}

/* ---------- Botões ---------- */

.btn-primario {
  font-family: "Archivo", sans-serif;
  font-weight: 800;
  font-size: 0.9rem;
  background: var(--acao);
  color: var(--acao-tinta);
  border: 2px solid var(--tinta);
  border-radius: var(--raio);
  padding: 10px 18px;
  cursor: pointer;
  box-shadow: var(--sombra);
  transition: transform 0.08s ease, box-shadow 0.08s ease;
}

.btn-primario:hover { transform: translateY(-1px); }
.btn-primario:active { transform: translateY(1px); box-shadow: none; }

.btn-perigo {
  font-family: "Archivo", sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  background: transparent;
  color: var(--frio);
  border: 2px solid var(--frio);
  border-radius: var(--raio);
  padding: 9px 14px;
  cursor: pointer;
}

.btn-fechar {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  color: var(--tinta-fraca);
}

:focus-visible { outline: 3px solid var(--acao); outline-offset: 2px; }

/* ---------- Quadro ---------- */

.quadro {
  flex: 1;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(250px, 1fr);
  gap: 16px;
  padding: 24px 32px 32px;
  overflow-x: auto;
}

.coluna {
  background: transparent;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.coluna-cabeca {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 2px 10px;
  border-bottom: 2px solid var(--tinta);
  margin-bottom: 12px;
}

.coluna-nome {
  font-weight: 800;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.coluna-contador {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--tinta);
  color: var(--fundo);
  padding: 2px 8px;
  border-radius: var(--raio);
}

.coluna-corpo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 120px;
  padding-bottom: 24px;
}

.coluna-corpo.arrastando-sobre {
  outline: 2px dashed var(--acao);
  outline-offset: 4px;
  border-radius: var(--raio);
}

.coluna-vazia {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.72rem;
  color: var(--tinta-fraca);
  padding: 14px 6px;
}

/* ---------- Cards ---------- */

.card {
  background: var(--papel);
  border: 2px solid var(--tinta);
  border-radius: var(--raio);
  box-shadow: var(--sombra);
  padding: 12px 12px 10px;
  cursor: grab;
}

.card:active { cursor: grabbing; }
.card.arrastando { opacity: 0.45; }

.card-nome { font-weight: 800; font-size: 0.95rem; margin-bottom: 2px; }

.card-meta {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.7rem;
  color: var(--tinta-fraca);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

/* Assinatura do projeto: termômetro de follow-up.
   A barra encolhe e muda de cor conforme os dias sem contato. */
.termometro {
  display: flex;
  align-items: center;
  gap: 8px;
}

.termometro-trilho {
  flex: 1;
  height: 6px;
  background: var(--fundo);
  border: 1px solid var(--linha);
  border-radius: 3px;
  overflow: hidden;
}

.termometro-barra { height: 100%; transition: width 0.3s ease; }

.termometro-rotulo {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.68rem;
  font-weight: 600;
  white-space: nowrap;
}

.t-quente .termometro-barra { background: var(--quente); }
.t-quente .termometro-rotulo { color: var(--quente); }
.t-morno .termometro-barra { background: var(--morno); }
.t-morno .termometro-rotulo { color: var(--morno); }
.t-frio .termometro-barra { background: var(--frio); }
.t-frio .termometro-rotulo { color: var(--frio); }
.t-sem .termometro-rotulo { color: var(--tinta-fraca); }

/* ---------- Modal ---------- */

.modal {
  border: 2px solid var(--tinta);
  border-radius: var(--raio);
  box-shadow: 6px 6px 0 rgba(22, 35, 43, 0.2);
  padding: 0;
  width: min(480px, calc(100vw - 32px));
}

.modal::backdrop { background: rgba(22, 35, 43, 0.45); }

.modal form { padding: 20px 22px 22px; display: flex; flex-direction: column; gap: 14px; }

.modal-cabeca {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--tinta);
  padding-bottom: 10px;
}

.modal-cabeca h2 { font-size: 1.1rem; font-weight: 900; }

.modal label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 700;
  font-size: 0.8rem;
}

.modal input,
.modal select,
.modal textarea {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.85rem;
  padding: 9px 10px;
  border: 2px solid var(--linha);
  border-radius: var(--raio);
  background: var(--papel);
  color: var(--tinta);
}

.modal input:focus,
.modal select:focus,
.modal textarea:focus { border-color: var(--tinta); outline: none; }

.linha-dupla { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

.modal-rodape {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 4px;
}

/* ---------- Rodapé ---------- */

.rodape {
  padding: 14px 32px;
  border-top: 1px solid var(--linha);
}

.rodape p {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.7rem;
  color: var(--tinta-fraca);
}

/* ---------- Responsivo ---------- */

@media (max-width: 720px) {
  .topo { padding: 20px 16px 14px; }
  .quadro {
    grid-auto-flow: row;
    grid-auto-columns: unset;
    grid-template-columns: 1fr;
    padding: 16px;
  }
  .linha-dupla { grid-template-columns: 1fr; }
  .rodape { padding: 12px 16px; }
}
