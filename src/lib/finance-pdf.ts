import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { identity, incomeLines, rp, totals, type StatementLine } from "./report.ts";

export const FINANCE_PDF_NAME = "Laporan-Laba-Rugi-Acrea-Things-Oktober-2026.pdf";

const ROSE: [number, number, number] = [141, 61, 86];
const INK: [number, number, number] = [44, 36, 34];
const MUTED: [number, number, number] = [109, 95, 89];
const BLUSH: [number, number, number] = [255, 240, 243];
const WHITE: [number, number, number] = [255, 255, 255];
const LINE: [number, number, number] = [228, 210, 203];

export type StatementRow = StatementLine & { amount: number; text: string };

/** Same rows, order, and amounts as the Excel income statement. */
export function statementRows(): StatementRow[] {
  return incomeLines.map((line) => {
    if (line.amount === undefined) throw new Error(`Jumlah kosong: ${line.label}`);
    return { ...line, amount: line.amount, text: rp(line.amount) };
  });
}

function assertStatement() {
  const rows = statementRows();
  if (rows.at(-1)?.label !== "Laba bersih usaha") {
    throw new Error("Baris terakhir laporan laba rugi berubah.");
  }
  if (totals.revenue !== totals.revenue1 + totals.revenue2) {
    throw new Error("Total pendapatan tidak sesuai jumlah dua batch.");
  }
  if (totals.hpp !== totals.hpp1 + totals.hpp2) {
    throw new Error("Total beban pokok tidak sesuai jumlah dua batch.");
  }
  if (totals.gross !== totals.revenue - totals.hpp) {
    throw new Error("Laba kotor tidak sesuai pendapatan dikurangi beban pokok.");
  }
  if (totals.net !== totals.gross - totals.opex || totals.net !== 334919) {
    throw new Error("Laba bersih di data situs bukan Rp334.919.");
  }
  for (const row of rows) {
    if (row.label === "Total pendapatan penjualan" && row.amount !== totals.revenue) {
      throw new Error("Pendapatan pada tabel tidak sama dengan data situs.");
    }
    if (row.label === "Total beban pokok penjualan" && row.amount !== totals.hpp) {
      throw new Error("Beban pokok pada tabel tidak sama dengan data situs.");
    }
    if (row.label === "Laba kotor" && row.amount !== totals.gross) {
      throw new Error("Laba kotor pada tabel tidak sama dengan data situs.");
    }
    if (row.label === "Laba bersih usaha" && row.amount !== totals.net) {
      throw new Error("Laba bersih pada tabel tidak sama dengan data situs.");
    }
  }
  return rows;
}

function paintSummary(doc: jsPDF, margin: number, y: number) {
  const cards = [
    { label: "Pendapatan", value: rp(totals.revenue), tone: "blush" as const },
    { label: "Beban pokok", value: rp(totals.hpp), tone: "blush" as const },
    { label: "Laba bersih", value: rp(totals.net), tone: "rose" as const },
  ];
  const gap = 4;
  const width = (doc.internal.pageSize.getWidth() - margin * 2 - gap * 2) / 3;
  const height = 22;
  for (const [index, card] of cards.entries()) {
    const x = margin + index * (width + gap);
    const rose = card.tone === "rose";
    doc.setFillColor(...(rose ? ROSE : BLUSH));
    doc.setDrawColor(...(rose ? ROSE : LINE));
    doc.roundedRect(x, y, width, height, 1.6, 1.6, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...(rose ? WHITE : ROSE));
    doc.text(card.label.toUpperCase(), x + 4, y + 8);
    doc.setFontSize(12);
    doc.setTextColor(...(rose ? WHITE : INK));
    doc.text(card.value, x + 4, y + 16);
  }
  return y + height;
}

export function buildFinancePdf(options?: { compress?: boolean }) {
  const rows = assertStatement();
  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
    orientation: "portrait",
    compress: options?.compress ?? true,
  });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;

  doc.setFillColor(...ROSE);
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setTextColor(...WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(identity.brand.toUpperCase(), margin, 14);
  doc.setFontSize(22);
  doc.text("Laporan Laba Rugi", margin, 26);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Periode ${identity.period}`, margin, 34);

  doc.setTextColor(...MUTED);
  doc.setFontSize(10);
  doc.text(
    `${identity.group} · ${identity.program} · ${identity.faculty} · ${identity.campus}`,
    margin,
    50,
  );

  const summaryBottom = paintSummary(doc, margin, 56);

  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Rincian laba rugi", margin, summaryBottom + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text("Satuan dalam Rupiah. Angka sama dengan berkas Excel.", margin, summaryBottom + 17);

  autoTable(doc, {
    startY: summaryBottom + 22,
    margin: { left: margin, right: margin },
    head: [["Uraian", "Jumlah"]],
    body: rows.map((row) => [row.label, row.text]),
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: { top: 2.6, right: 3, bottom: 2.6, left: 3 },
      textColor: INK,
      lineColor: LINE,
      lineWidth: 0.2,
      valign: "middle",
    },
    headStyles: {
      fillColor: ROSE,
      textColor: WHITE,
      fontStyle: "bold",
      fontSize: 10,
    },
    columnStyles: {
      0: { cellWidth: 118 },
      1: { cellWidth: 60, halign: "right" },
    },
    didParseCell: (data) => {
      if (data.section === "head" && data.column.index === 1) {
        data.cell.styles.halign = "right";
      }
      if (data.section !== "body") return;
      const row = rows[data.row.index];
      if (!row) return;
      if (row.kind === "grand") {
        data.cell.styles.fillColor = ROSE;
        data.cell.styles.textColor = WHITE;
        data.cell.styles.fontStyle = "bold";
      } else if (row.kind === "total") {
        data.cell.styles.fillColor = BLUSH;
        data.cell.styles.textColor = ROSE;
        data.cell.styles.fontStyle = "bold";
      } else {
        data.cell.styles.fillColor = WHITE;
      }
    },
  });

  const finalY = (doc as jsPDF & { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY;
  if (finalY === undefined) throw new Error("Tabel laba rugi tidak tergambar.");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  const note = doc.splitTextToSize(
    `Laba bersih usaha ${rp(totals.net)} adalah laba kotor ${rp(totals.gross)} dikurangi beban operasional ${rp(totals.opex)}. Margin laba bersih ${totals.netMargin} dari pendapatan ${rp(totals.revenue)}.`,
    pageWidth - margin * 2,
  );
  doc.text(note, margin, finalY + 10);

  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(`${identity.group} · ${identity.campus}`, margin, pageHeight - 11);
  doc.text("Halaman 1 dari 1", pageWidth - margin, pageHeight - 11, { align: "right" });

  const pageCount = doc.getNumberOfPages();
  if (pageCount !== 1) throw new Error("Laporan laba rugi harus muat di satu halaman A4.");

  doc.setProperties({
    title: `Laporan Laba Rugi ${identity.brand}`,
    subject: `Periode ${identity.period}`,
    author: identity.brand,
    creator: identity.brand,
    keywords: "laba rugi, pendapatan, beban, laba bersih",
  });

  return doc;
}

export function financePdfBytes(options?: { compress?: boolean }) {
  const output = buildFinancePdf(options).output("arraybuffer");
  return output instanceof Uint8Array ? output : new Uint8Array(output);
}

export function downloadFinancePdf() {
  const bytes = financePdfBytes();
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = FINANCE_PDF_NAME;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
