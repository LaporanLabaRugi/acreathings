import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Workbook, Worksheet } from "exceljs";
import { incomeLines, totals } from "./report.ts";
import {
  FINANCE_FILE_NAME,
  buildFinanceWorkbook,
  loadFinanceWorkbook,
} from "./finance-workbook.ts";

function evaluate(ws: Worksheet, expression: string): number {
  const expr = expression.trim();
  const parts: { op: string; text: string }[] = [];
  let start = 0;
  let op = "+";
  for (let i = 0; i < expr.length; i += 1) {
    const ch = expr[i];
    if (ch === "+" || ch === "-") {
      parts.push({ op, text: expr.slice(start, i).trim() });
      op = ch;
      start = i + 1;
    }
  }
  parts.push({ op, text: expr.slice(start).trim() });
  if (parts.length > 1) {
    return parts.reduce((total, part) => {
      const value = evaluate(ws, part.text);
      return part.op === "-" ? total - value : total + value;
    }, 0);
  }
  if (/^-?\d+(\.\d+)?$/.test(expr)) return Number(expr);
  const ref = expr.match(/^([A-Z]+)(\d+)$/);
  assert.ok(ref, `Referensi tidak dikenali: ${expr}`);
  return numberAt(ws, ref[1], Number(ref[2]));
}

function numberAt(ws: Worksheet, col: string, row: number) {
  const value = ws.getCell(`${col}${row}`).value;
  if (typeof value === "number") return value;
  if (
    value &&
    typeof value === "object" &&
    "formula" in value &&
    typeof value.formula === "string"
  ) {
    const calculated = evaluate(ws, value.formula);
    assert.equal(value.result, calculated);
    return calculated;
  }
  throw new Error(`Bukan angka ${col}${row}`);
}

function findRow(ws: Worksheet, label: string) {
  for (let row = 1; row <= ws.rowCount; row += 1) {
    if (ws.getCell(row, 1).value === label) return row;
  }
  throw new Error(label);
}

function amount(ws: Worksheet, label: string) {
  return numberAt(ws, "B", findRow(ws, label));
}

describe("laporan laba rugi excel", () => {
  it("hanya berisi satu lembar dan laba bersih Rp334.919", async () => {
    const built = await buildFinanceWorkbook();
    const wb: Workbook = await loadFinanceWorkbook(await built.xlsx.writeBuffer());

    assert.equal(FINANCE_FILE_NAME, "Laporan-Laba-Rugi-Acrea-Things-Oktober-2026.xlsx");
    assert.deepEqual(
      wb.worksheets.map((sheet) => sheet.name),
      ["Laporan Laba Rugi"],
    );

    const ws = wb.getWorksheet("Laporan Laba Rugi");
    assert.ok(ws);
    assert.equal(ws.getCell("A1").value, "Acrea Things");
    assert.equal(ws.getCell("A2").value, "Laporan Laba Rugi");
    assert.equal(ws.getCell("A3").value, "Periode Oktober 2026");
    assert.equal(ws.getCell("A4").value, "Uraian");
    assert.equal(ws.getCell("B4").value, "Jumlah");
    assert.equal(ws.getCell("A4").font?.bold, true);

    for (const line of incomeLines) {
      assert.equal(amount(ws, line.label), line.amount);
    }
    assert.equal(amount(ws, "Laba bersih usaha"), 334919);
    assert.equal(amount(ws, "Laba bersih usaha"), totals.net);
    assert.equal(amount(ws, "Total pendapatan penjualan"), totals.revenue);
    assert.equal(amount(ws, "Total beban pokok penjualan"), totals.hpp);
    assert.equal(amount(ws, "Laba kotor"), totals.gross);
    assert.equal(amount(ws, "Total beban operasional"), totals.opex);
    assert.match(String(ws.getCell(findRow(ws, "Laba bersih usaha"), 2).numFmt), /Rp/);
    assert.equal(ws.getCell(findRow(ws, "Laba bersih usaha"), 1).border?.bottom?.style, "thin");
    assert.equal(ws.pageSetup.fitToWidth, 1);
    assert.equal(ws.pageSetup.fitToHeight, 1);
    assert.equal(ws.pageSetup.orientation, "portrait");
    assert.equal(ws.pageSetup.paperSize, 9);
    assert.ok((ws.getColumn(1).width ?? 0) > 20);
    assert.ok((ws.getColumn(2).width ?? 0) > 12);

    const used = new Set<number>();
    ws.eachRow((row) => used.add(row.number));
    assert.deepEqual(
      [...used].sort((a, b) => a - b),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    );
  });
});
