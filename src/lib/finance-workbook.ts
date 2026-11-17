import type { Borders, Cell, Fill, Font, Workbook, Worksheet } from "exceljs";
import {
  assumptions,
  cashLines,
  hppBatch1,
  hppBatch2,
  identity,
  incomeLines,
  prices,
  salesBatch1,
  salesBatch2,
  soldBatch1,
  soldBatch2,
  totals,
  type CostVariant,
  type SaleRow,
  type SoldRow,
} from "./report.ts";

export const FINANCE_FILE_NAME = "Laporan-Keuangan-Acrea-Things-Oktober-2026.xlsx";

const SHEET = {
  ringkasan: "Ringkasan",
  laba: "Laba Rugi",
  penjualan: "Rincian Penjualan",
  hpp: "HPP per Varian",
  komponen: "Biaya Komponen",
  terjual: "HPP Terjual",
  beban: "Beban Operasional",
  kas: "Modal dan Arus Kas",
  harga: "Daftar Harga",
  catatan: "Catatan",
} as const;

const CASH_INSIDE_HPP = [
  "Biaya cetak foto Batch 1",
  "Biaya cetak foto Batch 2",
  "Biaya print resi Batch 1",
  "Biaya print resi Batch 2",
] as const;

const ROSE = "FF8D3D56";
const INK = "FF2C2422";
const MUTED = "FF6D5F59";
const WHITE = "FFFFFFFF";
const BLUSH = "FFFFF0F3";
const CANVAS = "FFFFF8F4";
const LINE = "FFE4D2CB";
const HEADER_LINE = "FF732E44";
const MONEY = '"Rp"#,##0;[Red]-"Rp"#,##0';
const QTY = "#,##0";
const PCT0 = "0%";
const PCT1 = "0.0%";
const PCT2 = "0.00%";

type Fmt = "text" | "money" | "qty" | "pct0" | "pct1" | "pct2";
type Tone = "item" | "alt" | "total" | "grand";
type Formula = { formula: string; result: number; fmt?: Fmt };
type Value = string | null | { n: number; fmt?: Fmt } | Formula;
type Col = { header: string; width: number; fmt: Fmt; align?: "left" | "right" };

const HPP_NAME: Record<string, string> = {
  "Basic Ballchain": "Basic Ballchain",
  "Basic Lobster": "Basic Lobster",
  "Basic Carabiner": "Basic Carabiner",
  "Combo Huruf": "Combo Huruf",
  "Combo Foto": "Combo Frame",
  Complete: "Complete",
};

const loc = new Map<string, string>();

function invariant(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

function sumBy<T>(rows: T[], pick: (row: T) => number) {
  return rows.reduce((total, row) => total + pick(row), 0);
}

function columnName(index: number) {
  let n = index;
  let name = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

function cashAmount(label: string) {
  const line = cashLines.find((item) => item.label === label);
  if (line?.amount === undefined) throw new Error(`Baris kas tidak ada: ${label}`);
  return line.amount;
}

function catalogSell(salesName: string) {
  const hppName = HPP_NAME[salesName];
  const first = hppBatch1.find((item) => item.name === hppName);
  const second = hppBatch2.find((item) => item.name === hppName);
  if (!first || !second) throw new Error(`Varian tidak dikenal: ${salesName}`);
  invariant(first.sell === second.sell, `Harga jual ${salesName} berbeda antar batch`);
  return first.sell;
}

function qtyNamed(name: string) {
  return sumBy(
    [...salesBatch1, ...salesBatch2].filter((row) => row.name === name),
    (row) => row.qty,
  );
}

function soldNote(name: string) {
  if (name === "Packing paket") return "Polymailer, bubble wrap, dan cetak resi per paket";
  if (name.startsWith("Add on")) return "Tambahan di luar paket";
  return "HPP satuan varian pada batch ini";
}

function num(n: number, fmt?: Fmt): Value {
  return { n, fmt };
}

function formula(expression: string, result: number, fmt?: Fmt): Formula {
  return { formula: expression, result, fmt };
}

function checkInvariants() {
  invariant(sumBy(salesBatch1, (row) => row.qty) === totals.units1, "Unit Batch 1 tidak cocok");
  invariant(sumBy(salesBatch2, (row) => row.qty) === totals.units2, "Unit Batch 2 tidak cocok");
  invariant(
    sumBy(salesBatch1, (row) => row.total) === totals.revenue1,
    "Omzet Batch 1 tidak cocok",
  );
  invariant(
    sumBy(salesBatch2, (row) => row.total) === totals.revenue2,
    "Omzet Batch 2 tidak cocok",
  );
  invariant(totals.units1 + totals.units2 === totals.units, "Total unit tidak cocok");
  invariant(totals.revenue1 + totals.revenue2 === totals.revenue, "Total omzet tidak cocok");
  invariant(sumBy(soldBatch1, (row) => row.total) === totals.hpp1, "HPP Batch 1 tidak cocok");
  invariant(sumBy(soldBatch2, (row) => row.total) === totals.hpp2, "HPP Batch 2 tidak cocok");
  invariant(totals.hpp1 + totals.hpp2 === totals.hpp, "Total HPP tidak cocok");
  for (const row of [...soldBatch1, ...soldBatch2]) {
    invariant(row.qty * row.unit === row.total, `HPP ${row.name} bukan kuantitas × satuan`);
  }
  for (const variant of [...hppBatch1, ...hppBatch2]) {
    invariant(
      sumBy(variant.lines, (line) => line.amount) === variant.total,
      `Komponen ${variant.name} tidak sama dengan total HPP`,
    );
  }
  invariant(totals.revenue - totals.hpp === totals.gross, "Laba kotor tidak cocok");
  invariant(totals.revenue1 - totals.hpp1 === totals.gross1, "Laba kotor Batch 1 tidak cocok");
  invariant(totals.revenue2 - totals.hpp2 === totals.gross2, "Laba kotor Batch 2 tidak cocok");
  invariant(totals.gross - totals.opex === totals.net, "Laba bersih tidak cocok");
  invariant(totals.capital1 + totals.restock === totals.capital, "Modal bahan tidak cocok");
  invariant(cashAmount("Transfer uji coba QRIS") === totals.qrisTest, "QRIS tidak cocok");
  invariant(totals.revenue + totals.qrisTest === totals.cashInOps, "Penerimaan kas tidak cocok");
  invariant(
    CASH_INSIDE_HPP.reduce((total, label) => total + cashAmount(label), 0) + totals.opex ===
      totals.cashOutOps,
    "Pengeluaran kas tidak cocok",
  );
  invariant(totals.cashInOps - totals.cashOutOps === totals.cashOps, "Arus operasi tidak cocok");
  invariant(
    totals.cashOps - totals.capital + totals.capital1 === totals.cashEnd,
    "Saldo kas tidak cocok",
  );
  invariant(
    Math.round(totals.revenue / totals.units) === totals.avgPrice,
    "Harga rata-rata tidak cocok",
  );
  invariant(
    Math.round(totals.capital / totals.avgPrice) === totals.bepUnits,
    "Titik impas tidak cocok",
  );
  invariant(
    qtyNamed("Basic Ballchain") + qtyNamed("Basic Lobster") + qtyNamed("Basic Carabiner") ===
      totals.basic,
    "Unit Basic tidak cocok",
  );
  invariant(qtyNamed("Combo Huruf") === totals.comboLetter, "Unit Combo Huruf tidak cocok");
  invariant(qtyNamed("Combo Foto") === totals.comboPhoto, "Unit Combo Foto tidak cocok");
  invariant(qtyNamed("Complete") === totals.complete, "Unit Complete tidak cocok");
  invariant(
    totals.comboLetter + totals.comboPhoto + totals.complete === totals.customUnits,
    "Unit custom tidak cocok",
  );
  invariant(totals.comboPhoto + totals.complete === totals.photoFrames, "Frame foto tidak cocok");
  for (const row of [...salesBatch1, ...salesBatch2]) catalogSell(row.name);
}

function pin(key: string, sheet: string, row: number, col: number) {
  loc.set(key, `'${sheet}'!${columnName(col)}${row}`);
}

function at(key: string) {
  const value = loc.get(key);
  if (!value) throw new Error(`Sel belum ditulis: ${key}`);
  return value;
}

function formatCode(fmt: Fmt) {
  if (fmt === "money") return MONEY;
  if (fmt === "qty") return QTY;
  if (fmt === "pct0") return PCT0;
  if (fmt === "pct1") return PCT1;
  if (fmt === "pct2") return PCT2;
  return undefined;
}

function solid(argb: string): Fill {
  return { type: "pattern", pattern: "solid", fgColor: { argb } };
}

const grid: Partial<Borders> = {
  top: { style: "thin", color: { argb: LINE } },
  left: { style: "thin", color: { argb: LINE } },
  bottom: { style: "thin", color: { argb: LINE } },
  right: { style: "thin", color: { argb: LINE } },
};

const headerGrid: Partial<Borders> = {
  top: { style: "thin", color: { argb: HEADER_LINE } },
  left: { style: "thin", color: { argb: HEADER_LINE } },
  bottom: { style: "thin", color: { argb: HEADER_LINE } },
  right: { style: "thin", color: { argb: HEADER_LINE } },
};

function fontFor(tone: Tone): Partial<Font> {
  if (tone === "grand") return { name: "Calibri", size: 11, bold: true, color: { argb: WHITE } };
  if (tone === "total") return { name: "Calibri", size: 11, bold: true, color: { argb: ROSE } };
  return { name: "Calibri", size: 11, color: { argb: INK } };
}

class Sheet {
  next = 5;
  ws: Worksheet;
  cols: Col[];

  constructor(ws: Worksheet, cols: Col[], title: string, note: string) {
    this.ws = ws;
    this.cols = cols;
    ws.properties.tabColor = { argb: ROSE };
    ws.properties.defaultRowHeight = 18;
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
      orientation: "landscape",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 20,
      horizontalCentered: true,
      showGridLines: false,
      printTitlesRow: "1:4",
      margins: { left: 0.5, right: 0.5, top: 0.7, bottom: 0.6, header: 0.28, footer: 0.28 },
    };
    ws.headerFooter = {
      oddHeader: `&L&B${identity.brand}&C&A&R${identity.period}`,
      oddFooter: `&L${identity.group} · ${identity.campus}&CHalaman &P dari &N&RLaporan keuangan`,
    };
    cols.forEach((col, index) => {
      ws.getColumn(index + 1).width = col.width;
    });
    const width = cols.length;
    ws.mergeCells(1, 1, 1, width);
    const titleCell = ws.getCell(1, 1);
    titleCell.value = title;
    titleCell.font = { name: "Calibri", size: 18, bold: true, color: { argb: ROSE } };
    titleCell.alignment = { vertical: "middle", wrapText: true };
    ws.getRow(1).height = 28;

    ws.mergeCells(2, 1, 2, width);
    const subtitle = ws.getCell(2, 1);
    subtitle.value = `${identity.brand} · Periode ${identity.period} · ${identity.group} · ${identity.campus}`;
    subtitle.font = { name: "Calibri", size: 11, color: { argb: MUTED } };
    subtitle.alignment = { vertical: "middle", wrapText: true };
    ws.getRow(2).height = 18;

    ws.mergeCells(3, 1, 3, width);
    const noteCell = ws.getCell(3, 1);
    noteCell.value = note;
    noteCell.font = { name: "Calibri", size: 10, italic: true, color: { argb: MUTED } };
    noteCell.alignment = { vertical: "middle", wrapText: true };
    ws.getRow(3).height = note.length > 110 ? 34 : 22;

    const header = ws.getRow(4);
    header.height = 22;
    cols.forEach((col, index) => {
      const cell = header.getCell(index + 1);
      cell.value = col.header;
      cell.font = { name: "Calibri", size: 11, bold: true, color: { argb: WHITE } };
      cell.fill = solid(ROSE);
      cell.alignment = {
        vertical: "middle",
        horizontal: col.align ?? (col.fmt === "text" ? "left" : "right"),
        wrapText: true,
      };
      cell.border = headerGrid;
    });
  }

  blank() {
    this.ws.getRow(this.next++).height = 8;
  }

  section(text: string) {
    const rowNumber = this.next++;
    this.ws.mergeCells(rowNumber, 1, rowNumber, this.cols.length);
    const cell = this.ws.getCell(rowNumber, 1);
    cell.value = text;
    cell.font = { name: "Calibri", size: 12, bold: true, color: { argb: ROSE } };
    cell.fill = solid(BLUSH);
    cell.alignment = { vertical: "middle", wrapText: true };
    cell.border = { bottom: { style: "thin", color: { argb: ROSE } } };
    this.ws.getRow(rowNumber).height = 22;
  }

  row(values: Value[], tone: Tone = "item") {
    const rowNumber = this.next++;
    const excelRow = this.ws.getRow(rowNumber);
    const longest = values.reduce((max, value) => {
      return Math.max(max, typeof value === "string" ? value.length : 0);
    }, 0);
    excelRow.height = longest > 150 ? 48 : longest > 90 ? 34 : 20;
    this.cols.forEach((col, index) => {
      this.write(excelRow.getCell(index + 1), values[index] ?? null, col, tone);
    });
    return rowNumber;
  }

  private write(cell: Cell, value: Value, col: Col, tone: Tone) {
    const fmt =
      value && typeof value === "object" && "fmt" in value && value.fmt ? value.fmt : col.fmt;
    if (typeof value === "string") {
      cell.value = value;
    } else if (value && typeof value === "object" && "formula" in value) {
      cell.value = { formula: value.formula, result: value.result };
      const code = formatCode(fmt);
      if (code) cell.numFmt = code;
    } else if (value && typeof value === "object" && "n" in value) {
      cell.value = value.n;
      const code = formatCode(fmt);
      if (code) cell.numFmt = code;
    } else {
      cell.value = null;
    }
    cell.font = fontFor(tone);
    const numeric = value !== null && typeof value !== "string";
    cell.alignment = {
      vertical: "middle",
      horizontal: col.align ?? (numeric && col.fmt !== "text" ? "right" : "left"),
      wrapText: true,
    };
    cell.border = grid;
    if (tone === "grand") cell.fill = solid(ROSE);
    else if (tone === "total") cell.fill = solid(BLUSH);
    else if (tone === "alt") cell.fill = solid(CANVAS);
  }

  finish() {
    const lastCol = columnName(this.cols.length);
    const lastRow = Math.max(4, this.next - 1);
    this.ws.pageSetup.printArea = `A1:${lastCol}${lastRow}`;
  }
}

function fillPenjualan(sheet: Sheet) {
  const blocks: { batch: string; rows: SaleRow[]; key: "b1" | "b2"; label: string }[] = [
    { batch: "Batch 1", rows: salesBatch1, key: "b1", label: "Total Batch 1" },
    { batch: "Batch 2", rows: salesBatch2, key: "b2", label: "Total Batch 2" },
  ];
  const bodyStart = sheet.next;
  const totalsRows: number[] = [];
  for (const block of blocks) {
    const start = sheet.next;
    block.rows.forEach((row, index) => {
      const price = catalogSell(row.name);
      const rowNumber = sheet.next;
      const catalog = row.qty * price;
      sheet.row(
        [
          block.batch,
          row.name,
          num(row.qty),
          num(price),
          formula(`C${rowNumber}*D${rowNumber}`, catalog),
          num(row.total),
          formula(`F${rowNumber}-E${rowNumber}`, row.total - catalog),
        ],
        index % 2 ? "alt" : "item",
      );
    });
    const end = sheet.next - 1;
    const qty = sumBy(block.rows, (row) => row.qty);
    const recorded = sumBy(block.rows, (row) => row.total);
    const catalog = sumBy(block.rows, (row) => row.qty * catalogSell(row.name));
    const totalRow = sheet.row(
      [
        block.label,
        "",
        formula(`SUM(C${start}:C${end})`, qty),
        "",
        formula(`SUM(E${start}:E${end})`, catalog),
        formula(`SUM(F${start}:F${end})`, recorded),
        formula(`SUM(G${start}:G${end})`, recorded - catalog),
      ],
      "total",
    );
    pin(`sales.${block.key}.qty`, SHEET.penjualan, totalRow, 3);
    pin(`sales.${block.key}.rp`, SHEET.penjualan, totalRow, 6);
    totalsRows.push(totalRow);
  }
  const bodyEnd = totalsRows[1] - 1;
  const grand = sheet.row(
    [
      "Total dua batch",
      "",
      formula(`C${totalsRows[0]}+C${totalsRows[1]}`, totals.units),
      "",
      formula(
        `E${totalsRows[0]}+E${totalsRows[1]}`,
        sumBy([...salesBatch1, ...salesBatch2], (row) => row.qty * catalogSell(row.name)),
      ),
      formula(`F${totalsRows[0]}+F${totalsRows[1]}`, totals.revenue),
      formula(
        `G${totalsRows[0]}+G${totalsRows[1]}`,
        totals.revenue -
          sumBy([...salesBatch1, ...salesBatch2], (row) => row.qty * catalogSell(row.name)),
      ),
    ],
    "grand",
  );
  pin("sales.qty", SHEET.penjualan, grand, 3);
  pin("sales.rp", SHEET.penjualan, grand, 6);
  return { start: bodyStart, end: bodyEnd };
}

function fillKomponen(sheet: Sheet) {
  const start = sheet.next;
  let index = 0;
  for (const [batch, variants] of [
    ["Batch 1", hppBatch1],
    ["Batch 2", hppBatch2],
  ] as const) {
    for (const variant of variants) {
      for (const line of variant.lines) {
        sheet.row([batch, variant.name, line.name, num(line.amount)], index % 2 ? "alt" : "item");
        index += 1;
      }
    }
  }
  return { start, end: sheet.next - 1 };
}

function fillHpp(sheet: Sheet, range: { start: number; end: number }) {
  const biaya = `'${SHEET.komponen}'!$D$${range.start}:$D$${range.end}`;
  const batches = `'${SHEET.komponen}'!$A$${range.start}:$A$${range.end}`;
  const names = `'${SHEET.komponen}'!$B$${range.start}:$B$${range.end}`;
  let index = 0;
  for (const [batch, variants] of [
    ["Batch 1", hppBatch1],
    ["Batch 2", hppBatch2],
  ] as const) {
    for (const variant of variants) {
      writeVariant(sheet, batch, variant, biaya, batches, names, index % 2 ? "alt" : "item");
      index += 1;
    }
  }
}

function writeVariant(
  sheet: Sheet,
  batch: string,
  variant: CostVariant,
  biaya: string,
  batches: string,
  names: string,
  tone: Tone,
) {
  const rowNumber = sheet.next;
  const margin = variant.sell === 0 ? 0 : (variant.sell - variant.total) / variant.sell;
  sheet.row(
    [
      batch,
      variant.name,
      formula(`SUMIFS(${biaya},${batches},A${rowNumber},${names},B${rowNumber})`, variant.total),
      num(variant.sell),
      formula(`D${rowNumber}-C${rowNumber}`, variant.sell - variant.total),
      formula(`IF(D${rowNumber}=0,0,E${rowNumber}/D${rowNumber})`, margin, "pct0"),
      variant.margin,
    ],
    tone,
  );
}

function fillTerjual(sheet: Sheet) {
  const blocks: {
    batch: string;
    rows: SoldRow[];
    key: "b1" | "b2";
    label: string;
    total: number;
  }[] = [
    {
      batch: "Batch 1",
      rows: soldBatch1,
      key: "b1",
      label: "Total HPP Batch 1",
      total: totals.hpp1,
    },
    {
      batch: "Batch 2",
      rows: soldBatch2,
      key: "b2",
      label: "Total HPP Batch 2",
      total: totals.hpp2,
    },
  ];
  const totalRows: number[] = [];
  for (const block of blocks) {
    const start = sheet.next;
    block.rows.forEach((row, index) => {
      const rowNumber = sheet.next;
      sheet.row(
        [
          block.batch,
          row.name,
          num(row.qty),
          num(row.unit),
          formula(`C${rowNumber}*D${rowNumber}`, row.total),
          soldNote(row.name),
        ],
        index % 2 ? "alt" : "item",
      );
    });
    const end = sheet.next - 1;
    const totalRow = sheet.row(
      [
        block.label,
        "",
        formula(
          `SUM(C${start}:C${end})`,
          sumBy(block.rows, (row) => row.qty),
        ),
        "",
        formula(`SUM(E${start}:E${end})`, block.total),
        "",
      ],
      "total",
    );
    pin(`hpp.${block.key}`, SHEET.terjual, totalRow, 5);
    totalRows.push(totalRow);
  }
  const grand = sheet.row(
    [
      "Total HPP produk terjual",
      "",
      formula(
        `C${totalRows[0]}+C${totalRows[1]}`,
        sumBy([...soldBatch1, ...soldBatch2], (row) => row.qty),
      ),
      "",
      formula(`E${totalRows[0]}+E${totalRows[1]}`, totals.hpp),
      "",
    ],
    "grand",
  );
  pin("hpp.total", SHEET.terjual, grand, 5);
}

function fillBeban(sheet: Sheet) {
  sheet.section("Masuk laporan laba rugi");
  const opexRow = sheet.row(
    ["Biaya administrasi top up GoPay", num(totals.opex), "Satu-satunya beban operasional"],
    "item",
  );
  pin("beban.opex", SHEET.beban, opexRow, 2);
  const totalRow = sheet.row(
    ["Total beban operasional", formula(`B${opexRow}`, totals.opex), "Dipakai di laba rugi"],
    "grand",
  );
  pin("beban.total", SHEET.beban, totalRow, 2);
  sheet.blank();
  sheet.section("Pengeluaran kas yang sudah berada di dalam HPP");
  CASH_INSIDE_HPP.forEach((label, index) => {
    const rowNumber = sheet.row(
      [label, num(cashAmount(label)), "Tidak ditambahkan lagi ke beban operasional"],
      index % 2 ? "alt" : "item",
    );
    pin(`beban.${label}`, SHEET.beban, rowNumber, 2);
  });
}

function fillKas(sheet: Sheet) {
  const written = new Map<string, number>();
  const ref = (label: string) => {
    const row = written.get(label);
    if (!row) throw new Error(`Baris kas belum ditulis: ${label}`);
    return `B${row}`;
  };
  let itemIndex = 0;
  for (const line of cashLines) {
    const rowNumber = sheet.next;
    let value: Value = num(line.amount ?? 0);
    let note = "";
    switch (line.label) {
      case "Penerimaan penjualan Batch 1":
        value = formula(at("sales.b1.rp"), totals.revenue1);
        note = "Dari rincian penjualan";
        break;
      case "Penerimaan penjualan Batch 2":
        value = formula(at("sales.b2.rp"), totals.revenue2);
        note = "Dari rincian penjualan";
        break;
      case "Transfer uji coba QRIS":
        value = num(totals.qrisTest);
        note = "Bukan penjualan";
        break;
      case "Total penerimaan operasi":
        value = formula(
          `${ref("Penerimaan penjualan Batch 1")}+${ref("Penerimaan penjualan Batch 2")}+${ref("Transfer uji coba QRIS")}`,
          totals.cashInOps,
        );
        break;
      case "Biaya cetak foto Batch 1":
      case "Biaya cetak foto Batch 2":
      case "Biaya print resi Batch 1":
      case "Biaya print resi Batch 2":
        value = formula(at(`beban.${line.label}`), cashAmount(line.label));
        note = "Sudah termasuk di HPP";
        break;
      case "Biaya administrasi top up GoPay":
        value = formula(at("beban.opex"), totals.opex);
        note = "Beban operasional";
        break;
      case "Total pengeluaran operasi":
        value = formula(
          [...CASH_INSIDE_HPP, "Biaya administrasi top up GoPay"].map(ref).join("+"),
          totals.cashOutOps,
        );
        break;
      case "Arus kas bersih dari operasi":
        value = formula(
          `${ref("Total penerimaan operasi")}-${ref("Total pengeluaran operasi")}`,
          totals.cashOps,
        );
        note = "Penerimaan dikurangi pengeluaran";
        break;
      case "Pembelian bahan baku Batch 1":
        value = num(totals.capital1);
        note = "Iuran kelompok dipakai membeli bahan";
        break;
      case "Pembelian restock bahan baku Batch 2":
        value = num(totals.restock);
        note = "Dibiayai hasil Batch 1";
        break;
      case "Arus kas bersih untuk investasi":
        value = formula(
          `${ref("Pembelian bahan baku Batch 1")}+${ref("Pembelian restock bahan baku Batch 2")}`,
          totals.capital,
        );
        note = "Arus keluar";
        break;
      case "Penerimaan modal awal (iuran kelompok)":
        value = formula(ref("Pembelian bahan baku Batch 1"), totals.capital1);
        note = "Sama dengan pembelian bahan Batch 1";
        break;
      case "Arus kas bersih dari pendanaan":
        value = formula(ref("Penerimaan modal awal (iuran kelompok)"), totals.capital1);
        break;
      case "Kenaikan bersih kas":
        value = formula(
          `${ref("Arus kas bersih dari operasi")}-${ref("Arus kas bersih untuk investasi")}+${ref("Arus kas bersih dari pendanaan")}`,
          totals.cashEnd,
        );
        note = "Operasi − investasi + pendanaan";
        break;
      case "Saldo kas awal periode":
        value = num(0);
        break;
      case "Saldo kas akhir periode":
        value = formula(
          `${ref("Saldo kas awal periode")}+${ref("Kenaikan bersih kas")}`,
          totals.cashEnd,
        );
        note = `Per ${identity.cashDate}`;
        break;
      default:
        throw new Error(`Baris kas belum dipetakan: ${line.label}`);
    }
    const tone: Tone =
      line.kind === "grand"
        ? "grand"
        : line.kind === "total"
          ? "total"
          : itemIndex++ % 2
            ? "alt"
            : "item";
    const writtenRow = sheet.row([line.label, value, note], tone);
    invariant(writtenRow === rowNumber, "Baris kas bergeser");
    written.set(line.label, writtenRow);
  }
  pin("kas.end", SHEET.kas, written.get("Saldo kas akhir periode") ?? 0, 2);
  pin("kas.modal1", SHEET.kas, written.get("Pembelian bahan baku Batch 1") ?? 0, 2);
  pin("kas.restock", SHEET.kas, written.get("Pembelian restock bahan baku Batch 2") ?? 0, 2);
  pin("kas.modal", SHEET.kas, written.get("Arus kas bersih untuk investasi") ?? 0, 2);

  sheet.blank();
  sheet.section("Titik impas");
  const avgRow = sheet.row(
    [
      "Rata-rata harga jual",
      formula(`ROUND(${at("sales.rp")}/${at("sales.qty")},0)`, totals.avgPrice),
      "Pendapatan dibagi seluruh unit, dibulatkan",
    ],
    "item",
  );
  pin("bep.avg", SHEET.kas, avgRow, 2);
  const bepRow = sheet.row(
    [
      "Titik impas (unit)",
      formula(`ROUND(${at("kas.modal")}/${at("bep.avg")},0)`, totals.bepUnits, "qty"),
      "Total modal bahan dibagi rata-rata harga jual",
    ],
    "grand",
  );
  pin("bep.units", SHEET.kas, bepRow, 2);
  sheet.row(
    [
      "Penutupan modal bahan",
      formula(`${at("sales.rp")}/${at("kas.modal")}`, totals.revenue / totals.capital, "pct1"),
      `Di situs: ${totals.coverRatio}`,
    ],
    "total",
  );
}

function fillLaba(sheet: Sheet) {
  const written = new Map<string, number>();
  const ref = (label: string) => {
    const row = written.get(label);
    if (!row) throw new Error(`Baris laba rugi belum ditulis: ${label}`);
    return `B${row}`;
  };
  const lineValue = (label: string): { value: Value; note: string } => {
    switch (label) {
      case "Pendapatan penjualan Batch 1":
        return { value: formula(at("sales.b1.rp"), totals.revenue1), note: "Total tercatat" };
      case "Pendapatan penjualan Batch 2":
        return { value: formula(at("sales.b2.rp"), totals.revenue2), note: "Total tercatat" };
      case "Total pendapatan penjualan":
        return {
          value: formula(
            `${ref("Pendapatan penjualan Batch 1")}+${ref("Pendapatan penjualan Batch 2")}`,
            totals.revenue,
          ),
          note: "",
        };
      case "Beban HPP produk terjual Batch 1":
        return { value: formula(at("hpp.b1"), totals.hpp1), note: "Termasuk add-on dan kemasan" };
      case "Beban HPP produk terjual Batch 2":
        return { value: formula(at("hpp.b2"), totals.hpp2), note: "Termasuk add-on dan kemasan" };
      case "Total beban pokok penjualan":
        return {
          value: formula(
            `${ref("Beban HPP produk terjual Batch 1")}+${ref("Beban HPP produk terjual Batch 2")}`,
            totals.hpp,
          ),
          note: "",
        };
      case "Laba kotor":
        return {
          value: formula(
            `${ref("Total pendapatan penjualan")}-${ref("Total beban pokok penjualan")}`,
            totals.gross,
          ),
          note: "",
        };
      case "Biaya administrasi top up GoPay":
        return { value: formula(at("beban.opex"), totals.opex), note: "Dari beban operasional" };
      case "Total beban operasional":
        return {
          value: formula(ref("Biaya administrasi top up GoPay"), totals.opex),
          note: "",
        };
      case "Laba bersih usaha":
        return {
          value: formula(`${ref("Laba kotor")}-${ref("Total beban operasional")}`, totals.net),
          note: "Angka ini yang tampil di halaman Keuangan",
        };
      default:
        throw new Error(`Baris laba rugi belum dipetakan: ${label}`);
    }
  };
  let itemIndex = 0;
  for (const line of incomeLines) {
    const spec = lineValue(line.label);
    const tone: Tone =
      line.kind === "grand"
        ? "grand"
        : line.kind === "total"
          ? "total"
          : itemIndex++ % 2
            ? "alt"
            : "item";
    const rowNumber = sheet.row([line.label, spec.value, spec.note], tone);
    written.set(line.label, rowNumber);
  }
  pin("laba.rev", SHEET.laba, written.get("Total pendapatan penjualan") ?? 0, 2);
  pin("laba.net", SHEET.laba, written.get("Laba bersih usaha") ?? 0, 2);
  sheet.blank();
  sheet.section("Laba kotor per batch");
  sheet.row(
    [
      "Laba kotor Batch 1",
      formula(
        `${ref("Pendapatan penjualan Batch 1")}-${ref("Beban HPP produk terjual Batch 1")}`,
        totals.gross1,
      ),
      "",
    ],
    "total",
  );
  sheet.row(
    [
      "Laba kotor Batch 2",
      formula(
        `${ref("Pendapatan penjualan Batch 2")}-${ref("Beban HPP produk terjual Batch 2")}`,
        totals.gross2,
      ),
      "",
    ],
    "total",
  );
}

function fillRingkasan(sheet: Sheet, salesBody: { start: number; end: number }) {
  const names = `'${SHEET.penjualan}'!$B$${salesBody.start}:$B$${salesBody.end}`;
  const qty = `'${SHEET.penjualan}'!$C$${salesBody.start}:$C$${salesBody.end}`;
  const sumif = (name: string) => `SUMIF(${names},"${name}",${qty})`;
  sheet.section("Ikhtisar");
  const rows: { label: string; value: Value; note: string; tone: Tone }[] = [
    {
      label: "Unit terjual Batch 1",
      value: formula(at("sales.b1.qty"), totals.units1, "qty"),
      note: "",
      tone: "item",
    },
    {
      label: "Unit terjual Batch 2",
      value: formula(at("sales.b2.qty"), totals.units2, "qty"),
      note: "",
      tone: "alt",
    },
    {
      label: "Unit terjual",
      value: formula(at("sales.qty"), totals.units, "qty"),
      note: "Dua batch pre-order",
      tone: "total",
    },
    {
      label: "Pendapatan Batch 1",
      value: formula(at("sales.b1.rp"), totals.revenue1),
      note: "",
      tone: "item",
    },
    {
      label: "Pendapatan Batch 2",
      value: formula(at("sales.b2.rp"), totals.revenue2),
      note: "",
      tone: "alt",
    },
    {
      label: "Pendapatan penjualan",
      value: formula(at("laba.rev"), totals.revenue),
      note: "",
      tone: "total",
    },
    {
      label: "HPP Batch 1",
      value: formula(at("hpp.b1"), totals.hpp1),
      note: "",
      tone: "item",
    },
    {
      label: "HPP Batch 2",
      value: formula(at("hpp.b2"), totals.hpp2),
      note: "",
      tone: "alt",
    },
    {
      label: "HPP produk terjual",
      value: formula(at("hpp.total"), totals.hpp),
      note: "",
      tone: "total",
    },
    {
      label: "Laba kotor Batch 1",
      value: formula(`${at("sales.b1.rp")}-${at("hpp.b1")}`, totals.gross1),
      note: "",
      tone: "item",
    },
    {
      label: "Laba kotor Batch 2",
      value: formula(`${at("sales.b2.rp")}-${at("hpp.b2")}`, totals.gross2),
      note: "",
      tone: "alt",
    },
    {
      label: "Laba kotor",
      value: formula(`${at("laba.rev")}-${at("hpp.total")}`, totals.gross),
      note: "",
      tone: "total",
    },
    {
      label: "Beban operasional",
      value: formula(at("beban.total"), totals.opex),
      note: "Administrasi top up GoPay",
      tone: "item",
    },
    {
      label: "Laba bersih usaha",
      value: formula(at("laba.net"), totals.net),
      note: "Sama dengan angka di halaman Keuangan",
      tone: "grand",
    },
    {
      label: "Margin laba bersih",
      value: formula(`${at("laba.net")}/${at("laba.rev")}`, totals.net / totals.revenue, "pct2"),
      note: `Di situs ditulis ${totals.netMargin}`,
      tone: "item",
    },
    {
      label: "Pertumbuhan omzet",
      value: formula(
        `(${at("sales.b2.rp")}-${at("sales.b1.rp")})/${at("sales.b1.rp")}`,
        (totals.revenue2 - totals.revenue1) / totals.revenue1,
        "pct1",
      ),
      note: `Di situs ditulis ${totals.growth}`,
      tone: "alt",
    },
    {
      label: "Saldo kas akhir",
      value: formula(at("kas.end"), totals.cashEnd),
      note: `Per ${identity.cashDate}`,
      tone: "grand",
    },
  ];
  for (const row of rows) sheet.row([row.label, row.value, row.note], row.tone);

  sheet.blank();
  sheet.section("Modal dan titik impas");
  sheet.row(
    ["Modal bahan Batch 1", formula(at("kas.modal1"), totals.capital1), "Iuran kelompok"],
    "item",
  );
  sheet.row(
    ["Restock Batch 2", formula(at("kas.restock"), totals.restock), "Dari hasil Batch 1"],
    "alt",
  );
  sheet.row(["Total modal bahan", formula(at("kas.modal"), totals.capital), ""], "total");
  sheet.row(["Rata-rata harga jual", formula(at("bep.avg"), totals.avgPrice), ""], "item");
  sheet.row(
    ["Titik impas (unit)", formula(at("bep.units"), totals.bepUnits, "qty"), "Sudah terlewati"],
    "grand",
  );
  sheet.row(
    [
      "Penutupan modal bahan",
      formula(`${at("sales.rp")}/${at("kas.modal")}`, totals.revenue / totals.capital, "pct1"),
      `Di situs: ${totals.coverRatio}`,
    ],
    "total",
  );

  sheet.blank();
  sheet.section("Komposisi penjualan");
  const basic = totals.basic;
  sheet.row(
    [
      "Basic",
      formula(
        `${sumif("Basic Ballchain")}+${sumif("Basic Lobster")}+${sumif("Basic Carabiner")}`,
        basic,
        "qty",
      ),
      "Ballchain, lobster, dan carabiner",
    ],
    "item",
  );
  sheet.row(
    ["Combo Huruf", formula(sumif("Combo Huruf"), totals.comboLetter, "qty"), "Inisial akrilik"],
    "alt",
  );
  sheet.row(
    [
      "Combo Foto",
      formula(sumif("Combo Foto"), totals.comboPhoto, "qty"),
      "Di HPP bernama Combo Frame",
    ],
    "item",
  );
  sheet.row(
    ["Complete", formula(sumif("Complete"), totals.complete, "qty"), "Huruf dan frame foto"],
    "alt",
  );
  sheet.row(
    [
      "Unit dengan elemen custom",
      formula(
        `${sumif("Combo Huruf")}+${sumif("Combo Foto")}+${sumif("Complete")}`,
        totals.customUnits,
        "qty",
      ),
      `Di situs: ${totals.customShare} dari seluruh unit`,
    ],
    "total",
  );
  sheet.row(
    [
      "Frame foto",
      formula(`${sumif("Combo Foto")}+${sumif("Complete")}`, totals.photoFrames, "qty"),
      "Combo Foto ditambah Complete",
    ],
    "item",
  );
}

function fillHarga(sheet: Sheet) {
  prices.forEach((row, index) => {
    sheet.row([row.paket, row.item, num(row.sell)], index % 2 ? "alt" : "item");
  });
}

function fillCatatan(sheet: Sheet) {
  const identityRows = [
    `${identity.brand} (${identity.meaning})`,
    `${identity.course} · ${identity.group} · ${identity.program}`,
    `${identity.faculty} · ${identity.campus} · ${identity.city}`,
    `Periode ${identity.period} · Saldo kas per ${identity.cashDate} · ${identity.instagram}`,
  ];
  identityRows.forEach((text, index) => {
    sheet.row(["Identitas", text], index % 2 ? "alt" : "item");
  });
  sheet.blank();
  sheet.section("Asumsi perhitungan");
  assumptions.forEach((text, index) => {
    sheet.row([String(index + 1), text], index % 2 ? "alt" : "item");
  });
  sheet.blank();
  sheet.section("Yang tidak ada angkanya di situs");
  const gaps = [
    "Penjualan dicatat per varian per batch, bukan per nota atau per pembeli.",
    "Pembelian bahan hanya dua total: Batch 1 dan restock Batch 2. Faktur per barang tidak ada; yang ada adalah biaya per unit pada HPP.",
    "Evaluasi menyebut sisa bahan baku, tetapi nilainya tidak dicatat.",
    "ROI tidak dihitung di situs, jadi tidak dibuat sebagai angka laporan.",
    "Upah anggota tidak dibebankan. Kompensasi dialokasikan dari laba bersih.",
    "Sebagian total penjualan tercatat tidak sama dengan kuantitas kali harga katalog. Selisihnya ada di lembar penjualan dan tidak dijelaskan lebih lanjut di data.",
  ];
  gaps.forEach((text, index) => {
    sheet.row([String(index + 1), text], index % 2 ? "alt" : "item");
  });
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

export async function loadFinanceWorkbook(data: ArrayBuffer) {
  const wb = await createWorkbook();
  await wb.xlsx.load(data);
  return wb;
}

export async function buildFinanceWorkbook() {
  loc.clear();
  checkInvariants();
  const wb = await createWorkbook();
  wb.creator = identity.brand;
  wb.lastModifiedBy = identity.brand;
  wb.company = identity.brand;
  wb.title = `Laporan Keuangan ${identity.brand}`;
  wb.subject = `Periode ${identity.period}`;
  wb.description =
    "Laporan laba rugi, penjualan, HPP, beban operasional, modal, dan arus kas Acrea Things.";
  wb.keywords = "Acrea Things, laba rugi, HPP, arus kas";
  wb.category = "Laporan keuangan";
  wb.calcProperties = { fullCalcOnLoad: true };

  const made = new Map<string, Worksheet>();
  for (const name of Object.values(SHEET)) made.set(name, wb.addWorksheet(name));
  const open = (name: string, cols: Col[], title: string, note: string) => {
    const ws = made.get(name);
    if (!ws) throw new Error(name);
    return new Sheet(ws, cols, title, note);
  };

  const penjualan = open(
    SHEET.penjualan,
    [
      { header: "Batch", width: 18, fmt: "text" },
      { header: "Varian", width: 22, fmt: "text" },
      { header: "Kuantitas", width: 14, fmt: "qty" },
      { header: "Harga katalog", width: 18, fmt: "money" },
      { header: "Nilai katalog", width: 18, fmt: "money" },
      { header: "Total tercatat", width: 18, fmt: "money" },
      { header: "Selisih", width: 16, fmt: "money" },
    ],
    "Rincian Penjualan",
    "Total tercatat yang masuk laba rugi. Nilai katalog = kuantitas × harga jual. Selisih tidak dirinci per nota.",
  );
  const salesBody = fillPenjualan(penjualan);

  const komponen = open(
    SHEET.komponen,
    [
      { header: "Batch", width: 14, fmt: "text" },
      { header: "Varian", width: 20, fmt: "text" },
      { header: "Komponen", width: 22, fmt: "text" },
      { header: "Biaya per unit", width: 18, fmt: "money" },
    ],
    "Biaya Komponen HPP",
    "Biaya per unit. Ballchain tercatat nol. Total varian dijumlahkan di lembar HPP per Varian.",
  );
  const componentRange = fillKomponen(komponen);

  const hpp = open(
    SHEET.hpp,
    [
      { header: "Batch", width: 14, fmt: "text" },
      { header: "Varian", width: 20, fmt: "text" },
      { header: "Total HPP", width: 16, fmt: "money" },
      { header: "Harga jual", width: 16, fmt: "money" },
      { header: "Laba per unit", width: 16, fmt: "money" },
      { header: "Margin", width: 12, fmt: "pct0" },
      { header: "Margin di situs", width: 16, fmt: "text" },
    ],
    "HPP per Varian",
    "Combo Frame pada lembar ini adalah Combo Foto di lembar penjualan. Margin = (harga jual − HPP) / harga jual.",
  );
  fillHpp(hpp, componentRange);

  const terjual = open(
    SHEET.terjual,
    [
      { header: "Batch", width: 16, fmt: "text" },
      { header: "Item", width: 22, fmt: "text" },
      { header: "Kuantitas", width: 14, fmt: "qty" },
      { header: "HPP satuan", width: 16, fmt: "money" },
      { header: "Total HPP", width: 18, fmt: "money" },
      { header: "Keterangan", width: 46, fmt: "text" },
    ],
    "HPP Produk Terjual",
    "Total = kuantitas × HPP satuan, termasuk add-on dan kemasan paket sebesar Rp1.352.",
  );
  fillTerjual(terjual);

  const beban = open(
    SHEET.beban,
    [
      { header: "Uraian", width: 46, fmt: "text" },
      { header: "Jumlah", width: 20, fmt: "money" },
      { header: "Perlakuan", width: 48, fmt: "text" },
    ],
    "Beban Operasional",
    "Tenaga kerja tidak dibebankan. Cetak foto dan resi sudah masuk HPP, jadi tidak dijumlahkan lagi di sini.",
  );
  fillBeban(beban);

  const kas = open(
    SHEET.kas,
    [
      { header: "Uraian", width: 52, fmt: "text" },
      { header: "Jumlah", width: 20, fmt: "money" },
      { header: "Keterangan", width: 46, fmt: "text" },
    ],
    "Modal dan Arus Kas",
    `Saldo kas per ${identity.cashDate}. Kenaikan kas = arus operasi − investasi + pendanaan.`,
  );
  fillKas(kas);

  const laba = open(
    SHEET.laba,
    [
      { header: "Uraian", width: 46, fmt: "text" },
      { header: "Jumlah", width: 20, fmt: "money" },
      { header: "Keterangan", width: 42, fmt: "text" },
    ],
    "Laporan Laba Rugi",
    `Untuk periode yang berakhir ${identity.period}. Laba bersih sama dengan angka di halaman Keuangan.`,
  );
  fillLaba(laba);

  const ringkasan = open(
    SHEET.ringkasan,
    [
      { header: "Indikator", width: 34, fmt: "text" },
      { header: "Nilai", width: 20, fmt: "money" },
      { header: "Keterangan", width: 46, fmt: "text" },
    ],
    "Ringkasan Keuangan",
    "Sel angka memakai rumus ke lembar rincian. Margin di situs dibulatkan menjadi 43,1%.",
  );
  fillRingkasan(ringkasan, salesBody);

  const harga = open(
    SHEET.harga,
    [
      { header: "Paket", width: 16, fmt: "text" },
      { header: "Komponen", width: 52, fmt: "text" },
      { header: "Harga jual", width: 16, fmt: "money" },
    ],
    "Daftar Harga",
    "Harga yang sama dipakai pada Batch 1 dan Batch 2.",
  );
  fillHarga(harga);

  const catatan = open(
    SHEET.catatan,
    [
      { header: "Bagian", width: 16, fmt: "text" },
      { header: "Uraian", width: 92, fmt: "text" },
    ],
    "Catatan Laporan",
    "Kebijakan hitung yang tertulis di halaman Keuangan, dan hal yang tidak ada angkanya.",
  );
  fillCatatan(catatan);

  for (const bookSheet of [
    penjualan,
    komponen,
    hpp,
    terjual,
    beban,
    kas,
    laba,
    ringkasan,
    harga,
    catatan,
  ]) {
    bookSheet.finish();
  }
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
