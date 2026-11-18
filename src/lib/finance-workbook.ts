import type { Borders, Cell, Fill, Font, Workbook, Worksheet } from "exceljs";
import { identity, incomeLines, totals } from "./report.ts";

export const FINANCE_FILE_NAME = "Laporan-Laba-Rugi-Acrea-Things-Oktober-2026.xlsx";

const ROSE = "FF8D3D56";
const INK = "FF2C2422";
const MUTED = "FF6D5F59";
const WHITE = "FFFFFFFF";
const BLUSH = "FFFFF0F3";
const LINE = "FFE4D2CB";
const HEADER_LINE = "FF732E44";
const MONEY = '"Rp"#,##0';

type Tone = "item" | "total" | "grand";
type Value = { n: number } | { formula: string; result: number };

const grid: Partial<Borders> = {
  top: { style: "thin", color: { argb: LINE } },
  left: { style: "thin", color: { argb: LINE } },
  bottom: { style: "thin", color: { argb: LINE } },
  right: { style: "thin", color: { argb: LINE } },
};

function solid(argb: string): Fill {
  return { type: "pattern", pattern: "solid", fgColor: { argb } };
}

function fontFor(tone: Tone): Partial<Font> {
  if (tone === "grand") return { name: "Calibri", size: 11, bold: true, color: { argb: WHITE } };
  if (tone === "total") return { name: "Calibri", size: 11, bold: true, color: { argb: ROSE } };
  return { name: "Calibri", size: 11, color: { argb: INK } };
}

type WorkbookCtor = new () => Workbook;

async function createWorkbook() {
  const mod = (await import("exceljs")) as {
    Workbook?: WorkbookCtor;
    default?: { Workbook?: WorkbookCtor };
  };
  const Ctor = mod.Workbook ?? mod.default?.Workbook;
  if (!Ctor) throw new Error("Pustaka Excel tidak dapat dimuat.");
  return new Ctor();
}

function paint(cell: Cell, value: string | Value | null, tone: Tone | "title" | "header" | "note") {
  if (typeof value === "string" || value === null) {
    cell.value = value;
  } else if ("formula" in value) {
    cell.value = { formula: value.formula, result: value.result };
    cell.numFmt = MONEY;
  } else {
    cell.value = value.n;
    cell.numFmt = MONEY;
  }

  if (tone === "title") {
    cell.font = { name: "Calibri", size: 18, bold: true, color: { argb: ROSE } };
    cell.alignment = { vertical: "middle", horizontal: "left" };
    return;
  }
  if (tone === "note") {
    cell.font = { name: "Calibri", size: 12, color: { argb: MUTED } };
    cell.alignment = { vertical: "middle", horizontal: "left" };
    return;
  }
  if (tone === "header") {
    cell.font = { name: "Calibri", size: 11, bold: true, color: { argb: WHITE } };
    cell.fill = solid(ROSE);
    cell.border = {
      top: { style: "thin", color: { argb: HEADER_LINE } },
      left: { style: "thin", color: { argb: HEADER_LINE } },
      bottom: { style: "thin", color: { argb: HEADER_LINE } },
      right: { style: "thin", color: { argb: HEADER_LINE } },
    };
    cell.alignment = { vertical: "middle", horizontal: "left", wrapText: true };
    return;
  }

  cell.font = fontFor(tone);
  cell.border = grid;
  cell.alignment = {
    vertical: "middle",
    horizontal: typeof value === "string" || value === null ? "left" : "right",
    wrapText: true,
  };
  if (tone === "grand") cell.fill = solid(ROSE);
  else if (tone === "total") cell.fill = solid(BLUSH);
}

function lineValue(label: string, amount: number, ref: (name: string) => string): Value {
  switch (label) {
    case "Pendapatan penjualan Batch 1":
    case "Pendapatan penjualan Batch 2":
    case "Beban HPP produk terjual Batch 1":
    case "Beban HPP produk terjual Batch 2":
    case "Biaya administrasi top up GoPay":
      return { n: amount };
    case "Total pendapatan penjualan":
      return {
        formula: `${ref("Pendapatan penjualan Batch 1")}+${ref("Pendapatan penjualan Batch 2")}`,
        result: amount,
      };
    case "Total beban pokok penjualan":
      return {
        formula: `${ref("Beban HPP produk terjual Batch 1")}+${ref("Beban HPP produk terjual Batch 2")}`,
        result: amount,
      };
    case "Laba kotor":
      return {
        formula: `${ref("Total pendapatan penjualan")}-${ref("Total beban pokok penjualan")}`,
        result: amount,
      };
    case "Total beban operasional":
      return { formula: ref("Biaya administrasi top up GoPay"), result: amount };
    case "Laba bersih usaha":
      return { formula: `${ref("Laba kotor")}-${ref("Total beban operasional")}`, result: amount };
    default:
      throw new Error(`Baris laba rugi belum dipetakan: ${label}`);
  }
}

function writeStatement(ws: Worksheet) {
  ws.properties.tabColor = { argb: ROSE };
  ws.columns = [{ width: 46 }, { width: 20 }];
  ws.views = [
    {
      state: "frozen",
      xSplit: 0,
      ySplit: 4,
      topLeftCell: "A5",
      activeCell: "A5",
      showGridLines: false,
      showRuler: false,
      showRowColHeaders: true,
      rightToLeft: false,
      zoomScale: 100,
      zoomScaleNormal: 100,
    },
  ];
  ws.pageSetup = {
    paperSize: 9,
    orientation: "portrait",
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 1,
    horizontalCentered: true,
    showGridLines: false,
    printTitlesRow: "1:4",
    margins: { left: 0.6, right: 0.6, top: 0.6, bottom: 0.6, header: 0.25, footer: 0.25 },
  };
  ws.headerFooter = {
    oddHeader: `&L&B${identity.brand}&CLaporan Laba Rugi&R${identity.period}`,
    oddFooter: `&L${identity.group} · ${identity.campus}&CHalaman &P dari &N&RLaporan laba rugi`,
  };
  ws.pageSetup.printArea = "A1:B14";

  ws.mergeCells("A1:B1");
  paint(ws.getCell("A1"), identity.brand, "title");
  ws.getRow(1).height = 28;

  ws.mergeCells("A2:B2");
  paint(ws.getCell("A2"), "Laporan Laba Rugi", "title");
  ws.getCell("A2").font = { name: "Calibri", size: 16, bold: true, color: { argb: INK } };
  ws.getRow(2).height = 22;

  ws.mergeCells("A3:B3");
  paint(ws.getCell("A3"), `Periode ${identity.period}`, "note");
  ws.getRow(3).height = 18;

  paint(ws.getCell("A4"), "Uraian", "header");
  const jumlah = ws.getCell("B4");
  paint(jumlah, "Jumlah", "header");
  jumlah.alignment = { vertical: "middle", horizontal: "right", wrapText: true };
  ws.getRow(4).height = 22;

  const rows = new Map<string, number>();
  const ref = (name: string) => {
    const row = rows.get(name);
    if (!row) throw new Error(`Baris belum ditulis: ${name}`);
    return `B${row}`;
  };

  let rowNumber = 5;
  for (const line of incomeLines) {
    if (line.amount === undefined) throw new Error(`Jumlah kosong: ${line.label}`);
    const tone: Tone = line.kind === "grand" ? "grand" : line.kind === "total" ? "total" : "item";
    paint(ws.getCell(rowNumber, 1), line.label, tone);
    paint(ws.getCell(rowNumber, 2), lineValue(line.label, line.amount, ref), tone);
    ws.getRow(rowNumber).height = 20;
    rows.set(line.label, rowNumber);
    rowNumber += 1;
  }

  if (rows.get("Laba bersih usaha") !== 14) {
    throw new Error("Tata letak laba rugi berubah, area cetak perlu disesuaikan.");
  }
}

export async function loadFinanceWorkbook(data: ArrayBuffer) {
  const wb = await createWorkbook();
  await wb.xlsx.load(data);
  return wb;
}

export async function buildFinanceWorkbook() {
  if (totals.net !== 334919) throw new Error("Laba bersih di data situs bukan Rp334.919.");
  const wb = await createWorkbook();
  wb.creator = identity.brand;
  wb.lastModifiedBy = identity.brand;
  wb.company = identity.brand;
  wb.title = `Laporan Laba Rugi ${identity.brand}`;
  wb.subject = `Periode ${identity.period}`;
  wb.description = "Laporan laba rugi Acrea Things untuk periode Oktober 2026.";
  wb.calcProperties = { fullCalcOnLoad: true };
  writeStatement(wb.addWorksheet("Laporan Laba Rugi"));
  return wb;
}

export async function downloadFinanceWorkbook() {
  const wb = await buildFinanceWorkbook();
  const buffer = await wb.xlsx.writeBuffer();
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  const blob = new Blob([bytes], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = FINANCE_FILE_NAME;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
