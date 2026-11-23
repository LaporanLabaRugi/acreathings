import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { incomeLines, rp, totals } from "./report.ts";
import { FINANCE_PDF_NAME, financePdfBytes, statementRows } from "./finance-pdf.ts";

function pdfText(bytes: Uint8Array) {
  return new TextDecoder("latin1").decode(bytes);
}

describe("laporan laba rugi pdf", () => {
  it("memuat judul, periode, pendapatan, beban, dan laba yang sama dengan Excel", () => {
    const rows = statementRows();
    assert.equal(FINANCE_PDF_NAME, "Laporan-Laba-Rugi-Acrea-Things-Oktober-2026.pdf");
    assert.deepEqual(
      rows.map((row) => ({ label: row.label, amount: row.amount, kind: row.kind })),
      incomeLines.map((line) => ({ label: line.label, amount: line.amount, kind: line.kind })),
    );
    assert.equal(rows.find((row) => row.label === "Laba bersih usaha")?.amount, totals.net);
    assert.equal(
      rows.find((row) => row.label === "Total pendapatan penjualan")?.amount,
      totals.revenue,
    );
    assert.equal(
      rows.find((row) => row.label === "Total beban pokok penjualan")?.amount,
      totals.hpp,
    );
    assert.equal(rows.find((row) => row.label === "Laba kotor")?.amount, totals.gross);

    const text = pdfText(financePdfBytes({ compress: false }));
    assert.match(text, /^%PDF-/);
    assert.match(text, /\/MediaBox \[0 0 595\.2\d* 841\.8\d*\]/);
    for (const phrase of [
      "ACREA THINGS",
      "Laporan Laba Rugi",
      "Periode Oktober 2026",
      "Uraian",
      "Jumlah",
      "Kelompok 5 K1",
      "Universitas Tidar",
      "Halaman 1 dari 1",
      rp(totals.revenue),
      rp(totals.hpp),
      rp(totals.gross),
      rp(totals.net),
      totals.netMargin,
    ]) {
      assert.ok(text.includes(phrase), `PDF tidak memuat: ${phrase}`);
    }
    for (const row of rows) {
      assert.ok(text.includes(row.label), `PDF tidak memuat baris: ${row.label}`);
      assert.ok(text.includes(row.text), `PDF tidak memuat jumlah: ${row.text}`);
    }
    assert.equal(text.match(/\/Type \/Page\b/g)?.length, 1);
  });
});
