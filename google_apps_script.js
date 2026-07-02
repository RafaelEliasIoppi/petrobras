// ============================================================
// OFERTAS DE CÓRNEAS — Google Apps Script
// ============================================================
//
// Estrutura OFERTAS (linha 2 = cabeçalho, linhas 3-14 = dados):
//   A  : RGCT
//   B  : OFERTA OLHO DIREITO
//   C  : HOSPITAL OD
//   D  : EQUIPE OD       ← dropdown aba EQUIPES
//   E-H: MR-1 a MR-4 OD
//   I  : OFERTA OLHO ESQUERDO
//   J  : HOSPITAL OE
//   K  : EQUIPE OE       ← dropdown aba EQUIPES
//   L-O: MR-1 a MR-4 OE
//   P  : EXPORTAR        ← qualquer valor → exporta

const ABA_OFERTAS    = "OFERTAS";
const ABA_RECUSAS    = "RECUSAS";
const ABA_LISTAS     = "LISTAS";
const ABA_EQUIPES    = "EQUIPES";
const LINHA_INI      = 3;
const LINHA_FIM      = 14;
const COL_EQUIPE_OD  = 4;   // D
const COL_EQUIPE_OE  = 11;  // K
const COL_EXPORTAR   = 16;  // P

const MOTIVOS = [
  "Alteração laboratorial","Alteração morfológica","Alterações no tecido",
  "Antecedentes mórbidos","Cardiopatia - coronariopatia",
  "Cardiopatia - hipertensão arterial","Cardiopatia - miocardiopatia",
  "Cardiopatia - valvulopatia","Condições do Doador","Diabetes",
  "Distância","Droga vasopressora","Falta de cateterismo/eco","Idade",
  "Infecção","Instabilidade hemodinâmica","Lesão do órgão",
  "Má perfusão do órgão","Não ofertado","Preservação inadequada do órgão",
  "Ranking esgotado","SARS-CoV-2 Positivo","Sem equipe para transplante",
  "Sem receptores","Sorologia - Chagas","Sorologia - Hepatite B",
  "Sorologia - Hepatite C","Sorologia - HTLV I/II","Sorologia - Sífilis",
  "Sorologia - Toxoplasmose/Citomegalovirus","Sorologia não realizada",
  "Tamanho ou Peso","Tempo de isquemia fria",
  "Tempo prolongado de intubação/internação","Usuário de droga injetável",
  "Utilizado para pesquisa","Utilizado para transplante de ilhotas",
  "Utilizado para valvas cardíacas","Utilizado parente/cônjuge",
];

// ── Menu ─────────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("⚕ OFERTAS")
    .addItem("📋 Configurar planilha (dropdowns + abas)", "configurarPlanilha")
    .addSeparator()
    .addItem("🔴 Exportar recusas (col P preenchida)", "exportarRecusas")
    .addToUi();
}

// ============================================================
// CONFIGURAR
// ============================================================
function configurarPlanilha() {
  const ss  = SpreadsheetApp.getActiveSpreadsheet();
  const qtd = LINHA_FIM - LINHA_INI + 1;

  // 1. Aba LISTAS com motivos de recusa
  let wsL = ss.getSheetByName(ABA_LISTAS);
  if (!wsL) wsL = ss.insertSheet(ABA_LISTAS);
  wsL.clearContents();
  MOTIVOS.forEach((m, i) => wsL.getRange(i + 1, 1).setValue(m));
  wsL.hideSheet();

  const wsOf = ss.getSheetByName(ABA_OFERTAS);
  if (!wsOf) { SpreadsheetApp.getUi().alert("Aba 'OFERTAS' não encontrada!"); return; }

  // 2. Dropdown EQUIPE — colunas D e K, lê da aba EQUIPES (dados a partir da linha 3)
  const wsEq = ss.getSheetByName(ABA_EQUIPES);
  if (wsEq) {
    const ultimaEq = wsEq.getLastRow();
    if (ultimaEq >= 3) {
      const regraEq = SpreadsheetApp.newDataValidation()
        .requireValueInRange(wsEq.getRange(3, 1, ultimaEq - 2, 1), true)
        .setAllowInvalid(false)
        .build();
      wsOf.getRange(LINHA_INI, COL_EQUIPE_OD, qtd, 1).setDataValidation(regraEq); // D
      wsOf.getRange(LINHA_INI, COL_EQUIPE_OE, qtd, 1).setDataValidation(regraEq); // K
    }
  } else {
    SpreadsheetApp.getUi().alert("Atenção: aba 'EQUIPES' não encontrada. Dropdowns de equipe não configurados.");
  }

  // 3. Dropdowns MR — OD: E-H (5-8), OE: L-O (12-15)
  const regraMotivo = SpreadsheetApp.newDataValidation()
    .requireValueInRange(wsL.getRange(1, 1, MOTIVOS.length, 1), true)
    .setAllowInvalid(false)
    .build();

  wsOf.getRange(LINHA_INI, 5,  qtd, 4).setDataValidation(regraMotivo); // E-H OD
  wsOf.getRange(LINHA_INI, 12, qtd, 4).setDataValidation(regraMotivo); // L-O OE

  // 4. Coluna P — EXPORTAR
  wsOf.getRange(1, COL_EXPORTAR)
      .setValue("→ Preencha para exportar")
      .setFontColor("#C00000").setFontStyle("italic")
      .setFontSize(8).setHorizontalAlignment("center");

  wsOf.getRange(2, COL_EXPORTAR)
      .setValue("EXPORTAR")
      .setBackground("#C00000").setFontColor("#FFFFFF")
      .setFontWeight("bold").setHorizontalAlignment("center");

  wsOf.getRange(LINHA_INI, COL_EXPORTAR, qtd, 1)
      .setBackground("#FFCCCC").setFontColor("#C00000")
      .setFontWeight("bold").setFontSize(12).setHorizontalAlignment("center");

  wsOf.setColumnWidth(COL_EXPORTAR, 100);

  // 5. Aba RECUSAS
  garantirAbaRecusas_(ss);

  SpreadsheetApp.getUi().alert(
    "✔ Configuração concluída!\n\n" +
    "• Dropdown EQUIPE OD em D3:D14\n" +
    "• Dropdown EQUIPE OE em K3:K14\n" +
    "• Dropdowns MR em E-H e L-O (linhas 3-14)\n" +
    "• Coluna P (EXPORTAR) configurada\n" +
    "• Aba RECUSAS pronta\n\n" +
    "Fluxo: selecione EQUIPE → preencha MRs → preencha col P → exporte."
  );
}

// ============================================================
// EXPORTAR
// ============================================================
function exportarRecusas() {
  const ss   = SpreadsheetApp.getActiveSpreadsheet();
  const wsOf = ss.getSheetByName(ABA_OFERTAS);
  if (!wsOf) { SpreadsheetApp.getUi().alert("Aba 'OFERTAS' não encontrada!"); return; }

  const wsRec    = garantirAbaRecusas_(ss);
  let proximaRec = Math.max(wsRec.getLastRow() + 1, 3);
  const agora    = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");
  let exportadas = 0;
  const semEquipe = [];

  for (let linha = LINHA_INI; linha <= LINHA_FIM; linha++) {
    const marcador = String(wsOf.getRange(linha, COL_EXPORTAR).getValue()).trim();
    if (marcador === "") continue;

    // Validar: pelo menos uma equipe preenchida
    const equipeOD = String(wsOf.getRange(linha, COL_EQUIPE_OD).getValue()).trim();
    const equipeOE = String(wsOf.getRange(linha, COL_EQUIPE_OE).getValue()).trim();
    if (equipeOD === "" && equipeOE === "") {
      semEquipe.push(linha);
      continue;
    }

    // Copiar colunas A-O (1-15) para RECUSAS
    const dados = wsOf.getRange(linha, 1, 1, 15).getValues();
    wsRec.getRange(proximaRec, 1, 1, 15).setValues(dados);
    // Data na coluna P (16)
    wsRec.getRange(proximaRec, 16).setValue(agora);
    wsRec.getRange(proximaRec, 1, 1, 16).setBackground("#FFCCCC");

    // Apagar MRs e marcador — mantém A-D e I-K (dados + equipes)
    wsOf.getRange(linha, 5,  1, 4).clearContent(); // E-H MR OD
    wsOf.getRange(linha, 12, 1, 4).clearContent(); // L-O MR OE
    wsOf.getRange(linha, COL_EXPORTAR).clearContent();

    proximaRec++;
    exportadas++;
  }

  let msg = "";
  if (semEquipe.length > 0) {
    msg += `⚠ ${semEquipe.length} linha(s) ignorada(s) por falta de EQUIPE: linhas ${semEquipe.join(", ")}.\n\n`;
  }

  if (exportadas === 0 && semEquipe.length === 0) {
    SpreadsheetApp.getUi().alert("Nenhuma linha marcada na coluna P (linhas 3 a 14).");
  } else if (exportadas === 0) {
    SpreadsheetApp.getUi().alert(msg + "Nenhuma linha exportada. Preencha EQUIPE (col D ou K) antes de exportar.");
  } else {
    SpreadsheetApp.getUi().alert(msg + `✔ ${exportadas} recusa(s) exportada(s) para RECUSAS.\nMRs apagados da OFERTAS.`);
    ss.setActiveSheet(wsRec);
  }
}

// ── Helper: aba RECUSAS com cabeçalho ───────────────────────
function garantirAbaRecusas_(ss) {
  let wsRec = ss.getSheetByName(ABA_RECUSAS);
  if (!wsRec) { wsRec = ss.insertSheet(ABA_RECUSAS); wsRec.setTabColor("#C00000"); }

  if (!wsRec.getRange("A1").getValue()) {
    wsRec.getRange("A1:P1").merge()
         .setValue("RECUSAS EXPORTADAS")
         .setBackground("#C00000").setFontColor("#FFFFFF")
         .setFontWeight("bold").setFontSize(13).setHorizontalAlignment("center");
    wsRec.setRowHeight(1, 30);

    ["RGCT","OFERTA OD","HOSPITAL OD","EQUIPE OD",
     "MR-1 OD","MR-2 OD","MR-3 OD","MR-4 OD",
     "OFERTA OE","HOSPITAL OE","EQUIPE OE",
     "MR-1 OE","MR-2 OE","MR-3 OE","MR-4 OE",
     "DATA EXPORTAÇÃO"]
    .forEach((nome, i) => {
      wsRec.getRange(2, i + 1)
           .setValue(nome)
           .setBackground("#1F4E79").setFontColor("#FFFFFF")
           .setFontWeight("bold").setHorizontalAlignment("center");
    });
    wsRec.setRowHeight(2, 22);
  }
  return wsRec;
}
