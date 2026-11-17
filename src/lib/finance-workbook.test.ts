import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Cell, Workbook, Worksheet } from "exceljs";
import { assumptions, cashLines, incomeLines, totals } from "./report.ts";
import { buildFinanceWorkbook, loadFinanceWorkbook } from "./finance-workbook.ts";

const SHEETS = [
  "Ringkasan",
  "Laba Rugi",
  "Rincian Penjualan",
  "HPP per Varian",
  "Biaya Komponen",
  "HPP Terjual",
  "Beban Operasional",
  "Modal dan Arus Kas",
  "Daftar Harga",
  "Catatan",
];

function sheet(wb: Workbook, name: string) {
  const found = wb.getWorksheet(name);
  assert.ok(found, name);
  return found;
}

function findRow(ws: Worksheet, label: string) {
  for (let row = 1; row <= ws.rowCount; row += 1) {
    if (ws.getCell(row, 1).value === label) return row;
  }
  throw new Error(`Baris tidak ada: ${label}`);
}

function raw(cell: Cell) {
  return cell.value;
}

function callBody(expr: string, name: string) {
  const head = `${name}(`;
  if (!expr.startsWith(head)) return undefined;
  let depth = 0;
  let quote = false;
  for (let i = name.length; i < expr.length; i += 1) {
    const ch = expr[i];
    if (ch === "'") quote = !quote;
    else if (!quote && ch === "(") depth += 1;
    else if (!quote && ch === ")") {
      depth -= 1;
      if (depth === 0) return i === expr.length - 1 ? expr.slice(head.length, -1) : undefined;
    }
  }
  return undefined;
}

function unwrap(expression: string) {
  let expr = expression.trim();
  for (;;) {
    if (!expr.startsWith("(") || !expr.endsWith(")")) break;
    let depth = 0;
    let quote = false;
    let wrapsAll = true;
    for (let i = 0; i < expr.length; i += 1) {
      const ch = expr[i];
      if (ch === "'") quote = !quote;
      else if (!quote && ch === "(") depth += 1;
      else if (!quote && ch === ")") {
        depth -= 1;
        if (depth === 0 && i !== expr.length - 1) wrapsAll = false;
      }
    }
    if (!wrapsAll || depth !== 0) break;
    expr = expr.slice(1, -1).trim();
  }
  return expr;
}

function evaluate(wb: Workbook, sheetName: string, expression: string): number {
  const expr = unwrap(expression);
  const sumParts = splitTop(expr, ["+", "-"]);
  if (sumParts.length > 1) {
    return sumParts.reduce((total, part) => {
      const value = evaluate(wb, sheetName, part.text);
      return part.op === "-" ? total - value : total + value;
    }, 0);
  }
  const sumIfs = callBody(expr, "SUMIFS");
  if (sumIfs !== undefined) return evalSumIfs(wb, sheetName, sumIfs);
  const sumIf = callBody(expr, "SUMIF");
  if (sumIf !== undefined) return evalSumIf(wb, sheetName, sumIf);
  const sum = callBody(expr, "SUM");
  if (sum !== undefined) return evalSum(wb, sheetName, sum);
  const round = callBody(expr, "ROUND");
  if (round !== undefined) {
    const [inner, digits] = splitArgs(round);
    const factor = 10 ** evaluate(wb, sheetName, digits);
    return Math.round(evaluate(wb, sheetName, inner) * factor) / factor;
  }
  const condition = callBody(expr, "IF");
  if (condition !== undefined) {
    const [cond, yes, no] = splitArgs(condition);
    const eq = cond.split("=");
    assert.equal(eq.length, 2);
    return evaluate(wb, sheetName, eq[0]) === evaluate(wb, sheetName, eq[1])
      ? evaluate(wb, sheetName, yes)
      : evaluate(wb, sheetName, no);
  }
  const product = splitTop(expr, ["*", "/"]);
  if (product.length > 1) {
    return product.reduce((total, part) => {
      const value = evaluate(wb, sheetName, part.text);
      return part.op === "/" ? total / value : total * value;
    }, 1);
  }
  if (/^-?\d+(\.\d+)?$/.test(expr)) return Number(expr);
  return cellRef(wb, sheetName, expr);
}

function splitArgs(input: string) {
  const args: string[] = [];
  let depth = 0;
  let quote = false;
  let start = 0;
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (ch === "'") quote = !quote;
    else if (!quote && ch === "(") depth += 1;
    else if (!quote && ch === ")") depth -= 1;
    else if (!quote && depth === 0 && ch === ",") {
      args.push(input.slice(start, i));
      start = i + 1;
    }
  }
  args.push(input.slice(start));
  return args.map((part) => part.trim());
}

function splitTop(input: string, ops: string[]) {
  const parts: { op: string; text: string }[] = [];
  let depth = 0;
  let quote = false;
  let start = 0;
  let op = "+";
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (ch === "'") quote = !quote;
    else if (!quote && ch === "(") depth += 1;
    else if (!quote && ch === ")") depth -= 1;
    else if (!quote && depth === 0 && ops.includes(ch)) {
      parts.push({ op, text: input.slice(start, i).trim() });
      op = ch;
      start = i + 1;
    }
  }
  parts.push({ op, text: input.slice(start).trim() });
  return parts.filter((part) => part.text.length > 0);
}

function cellRef(wb: Workbook, current: string, token: string) {
  const quoted = token.match(/^'([^']+)'!\$?([A-Z]+)\$?(\d+)$/);
  const local = token.match(/^\$?([A-Z]+)\$?(\d+)$/);
  const match = quoted ?? (local ? [token, current, local[1], local[2]] : null);
  assert.ok(match, `Referensi tidak dikenali: ${token}`);
  const ws = sheet(wb, match[1]);
  return cellNumber(wb, ws, match[2], Number(match[3]));
}

function cellNumber(wb: Workbook, ws: Worksheet, col: string, row: number) {
  const cell = ws.getCell(`${col}${row}`);
  const value = raw(cell);
  if (typeof value === "number") return value;
  if (
    value &&
    typeof value === "object" &&
    "formula" in value &&
    typeof value.formula === "string"
  ) {
    return evaluate(wb, ws.name, value.formula);
  }
  if (value === null || value === undefined || value === "") return 0;
  throw new Error(`Bukan angka ${ws.name}!${col}${row}: ${JSON.stringify(value)}`);
}

function evalSum(wb: Workbook, sheetName: string, inner: string) {
  const range = parseRange(inner, sheetName);
  let total = 0;
  for (let row = range.start; row <= range.end; row += 1) {
    total += cellNumber(wb, sheet(wb, range.sheet), range.col, row);
  }
  return total;
}

function evalSumIf(wb: Workbook, sheetName: string, inner: string) {
  const [criteriaRange, criteria, sumRange] = splitArgs(inner);
  const left = parseRange(criteriaRange, sheetName);
  const right = parseRange(sumRange, sheetName);
  const expected = criteria.replace(/^"|"$/g, "");
  let total = 0;
  for (let row = left.start; row <= left.end; row += 1) {
    if (sheet(wb, left.sheet).getCell(`${left.col}${row}`).value === expected) {
      total += cellNumber(wb, sheet(wb, right.sheet), right.col, row);
    }
  }
  return total;
}

function evalSumIfs(wb: Workbook, sheetName: string, inner: string) {
  const args = splitArgs(inner);
  const sumRange = parseRange(args[0], sheetName);
  const current = sheet(wb, sheetName);
  let total = 0;
  for (let row = sumRange.start; row <= sumRange.end; row += 1) {
    let ok = true;
    for (let i = 1; i < args.length; i += 2) {
      const criteriaRange = parseRange(args[i], sheetName);
      const expected = current.getCell(args[i + 1]).value;
      const actual = sheet(wb, criteriaRange.sheet).getCell(`${criteriaRange.col}${row}`).value;
      if (actual !== expected) ok = false;
    }
    if (ok) total += cellNumber(wb, sheet(wb, sumRange.sheet), sumRange.col, row);
  }
  return total;
}

function parseRange(token: string, current: string) {
  const match = token.trim().match(/^(?:'([^']+)'!)?\$?([A-Z]+)\$?(\d+):\$?([A-Z]+)\$?(\d+)$/);
  assert.ok(match, `Rentang tidak dikenali: ${token}`);
  assert.equal(match[2], match[4]);
  return {
    sheet: match[1] ?? current,
    col: match[2],
    start: Number(match[3]),
    end: Number(match[5]),
  };
}

function valueOf(wb: Workbook, ws: Worksheet, label: string, col = 2) {
  const cell = ws.getCell(findRow(ws, label), col);
  const value = raw(cell);
  if (typeof value === "number") return value;
  if (
    value &&
    typeof value === "object" &&
    "formula" in value &&
    typeof value.formula === "string"
  ) {
    const calculated = evaluate(wb, ws.name, value.formula);
    assert.equal(value.result, calculated, `${ws.name} ${label}`);
    return calculated;
  }
  throw new Error(`Nilai ${ws.name} / ${label} tidak berupa angka`);
}

describe("laporan keuangan excel", () => {
  it("menghitung ulang rumus agar sama dengan angka di situs", async () => {
    const built = await buildFinanceWorkbook();
    const rawBuffer = await built.xlsx.writeBuffer();
    const wb = await loadFinanceWorkbook(rawBuffer);

    assert.deepEqual(
      wb.worksheets.map((item) => item.name),
      SHEETS,
    );

    const laba = sheet(wb, "Laba Rugi");
    for (const line of incomeLines) {
      assert.equal(valueOf(wb, laba, line.label), line.amount);
    }
    assert.equal(valueOf(wb, laba, "Laba kotor Batch 1"), totals.gross1);
    assert.equal(valueOf(wb, laba, "Laba kotor Batch 2"), totals.gross2);

    const kas = sheet(wb, "Modal dan Arus Kas");
    for (const line of cashLines) {
      assert.equal(valueOf(wb, kas, line.label), line.amount);
    }
    assert.equal(valueOf(wb, kas, "Rata-rata harga jual"), totals.avgPrice);
    assert.equal(valueOf(wb, kas, "Titik impas (unit)"), totals.bepUnits);
    assert.ok(
      Math.abs(valueOf(wb, kas, "Penutupan modal bahan") - totals.revenue / totals.capital) < 1e-9,
    );
    assert.equal(kas.getCell(findRow(kas, "Titik impas (unit)"), 2).numFmt, "#,##0");
    assert.match(String(laba.getCell(findRow(laba, "Laba bersih usaha"), 2).numFmt), /Rp/);

    const ringkasan = sheet(wb, "Ringkasan");
    assert.equal(valueOf(wb, ringkasan, "Laba bersih usaha"), totals.net);
    assert.equal(valueOf(wb, ringkasan, "Saldo kas akhir"), totals.cashEnd);
    assert.equal(valueOf(wb, ringkasan, "Unit terjual"), totals.units);
    assert.equal(valueOf(wb, ringkasan, "Basic"), totals.basic);
    assert.equal(valueOf(wb, ringkasan, "Combo Huruf"), totals.comboLetter);
    assert.equal(valueOf(wb, ringkasan, "Combo Foto"), totals.comboPhoto);
    assert.equal(valueOf(wb, ringkasan, "Complete"), totals.complete);
    assert.equal(valueOf(wb, ringkasan, "Unit dengan elemen custom"), totals.customUnits);
    assert.equal(valueOf(wb, ringkasan, "Frame foto"), totals.photoFrames);
    assert.ok(
      Math.abs(valueOf(wb, ringkasan, "Margin laba bersih") - totals.net / totals.revenue) < 1e-9,
    );
    assert.ok(
      Math.abs(
        valueOf(wb, ringkasan, "Pertumbuhan omzet") -
          (totals.revenue2 - totals.revenue1) / totals.revenue1,
      ) < 1e-9,
    );

    const penjualan = sheet(wb, "Rincian Penjualan");
    assert.equal(valueOf(wb, penjualan, "Total Batch 1", 3), totals.units1);
    assert.equal(valueOf(wb, penjualan, "Total Batch 1", 6), totals.revenue1);
    assert.equal(valueOf(wb, penjualan, "Total Batch 2", 6), totals.revenue2);
    assert.equal(valueOf(wb, penjualan, "Total dua batch", 6), totals.revenue);
    const foto = Array.from({ length: penjualan.rowCount }, (_, index) => index + 1).find(
      (row) =>
        penjualan.getCell(row, 1).value === "Batch 1" &&
        penjualan.getCell(row, 2).value === "Combo Foto",
    );
    assert.ok(foto);
    assert.equal(cellNumber(wb, penjualan, "F", foto), 104000);
    assert.equal(cellNumber(wb, penjualan, "G", foto), 104000 - 10 * 12000);

    const hpp = sheet(wb, "HPP per Varian");
    const lobster = Array.from({ length: hpp.rowCount }, (_, index) => index + 1).find(
      (row) =>
        hpp.getCell(row, 1).value === "Batch 1" && hpp.getCell(row, 2).value === "Basic Lobster",
    );
    assert.ok(lobster);
    assert.equal(cellNumber(wb, hpp, "C", lobster), 3187);
    assert.equal(hpp.getCell(lobster, 7).value, "47%");

    const terjual = sheet(wb, "HPP Terjual");
    assert.equal(valueOf(wb, terjual, "Total HPP Batch 1", 5), totals.hpp1);
    assert.equal(valueOf(wb, terjual, "Total HPP Batch 2", 5), totals.hpp2);
    assert.equal(valueOf(wb, terjual, "Total HPP produk terjual", 5), totals.hpp);

    const beban = sheet(wb, "Beban Operasional");
    assert.equal(valueOf(wb, beban, "Total beban operasional"), totals.opex);

    const catatan = sheet(wb, "Catatan");
    const notes = Array.from(
      { length: catatan.rowCount },
      (_, index) => catatan.getCell(index + 1, 2).value,
    ).join("\n");
    assert.ok(notes.includes(assumptions[0]));
    assert.ok(notes.includes("ROI tidak dihitung"));

    for (const name of SHEETS) {
      const ws = sheet(wb, name);
      const header = ws.getRow(4).getCell(1);
      assert.equal(header.font?.bold, true);
      assert.equal(header.font?.color?.argb, "FFFFFFFF");
      const fill = header.fill;
      assert.equal(fill && fill.type === "pattern" ? fill.fgColor?.argb : undefined, "FF8D3D56");
      assert.equal(header.border?.bottom?.style, "thin");
      const view = ws.views[0];
      assert.equal(view?.state, "frozen");
      assert.equal(view && "ySplit" in view ? view.ySplit : undefined, 4);
      assert.equal(ws.pageSetup.orientation, "landscape");
      assert.equal(ws.pageSetup.fitToWidth, 1);
      assert.equal(ws.pageSetup.paperSize, 9);
      assert.equal(ws.pageSetup.printTitlesRow, "1:4");
      assert.equal(ws.pageSetup.showGridLines, false);
      const width = ws.getColumn(1).width ?? 0;
      assert.ok(width > 8);
    }
  });
});
