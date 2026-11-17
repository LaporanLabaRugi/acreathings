import type { CostVariant, SaleRow, SoldRow, StatementLine } from "@/lib/report";
import { rp } from "@/lib/report";

export const th = "bg-blush px-3 py-3 text-left text-xs font-bold text-rose-deep";
export const td = "border-t border-line px-3 py-2.5 align-top tabular-nums";

export function TableWrap({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mt-6">
      <figcaption className="mb-2 text-sm font-bold text-ink">{caption}</figcaption>
      <div className="overflow-x-auto rounded-xl border border-line bg-paper">
        <table className="w-full min-w-[680px] border-collapse text-sm">{children}</table>
      </div>
    </figure>
  );
}

export function HppTable({ rows }: { rows: CostVariant[] }) {
  return (
    <>
      <thead>
        <tr>
          <th className={th}>Varian</th>
          <th className={th}>Komposisi</th>
          <th className={th}>Harga satuan</th>
          <th className={th}>Total HPP</th>
          <th className={th}>Margin</th>
          <th className={th}>Harga jual</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) =>
          row.lines.map((line, index) => (
            <tr key={row.name + line.name}>
              {index === 0 ? (
                <td className={td + " font-bold"} rowSpan={row.lines.length}>
                  {row.name}
                </td>
              ) : null}
              <td className={td}>{line.name}</td>
              <td className={td}>{rp(line.amount)}</td>
              {index === 0 ? (
                <td className={td + " font-bold"} rowSpan={row.lines.length}>
                  {rp(row.total)}
                </td>
              ) : null}
              {index === 0 ? (
                <td className={td} rowSpan={row.lines.length}>
                  {row.margin}
                </td>
              ) : null}
              {index === 0 ? (
                <td className={td + " font-bold"} rowSpan={row.lines.length}>
                  {rp(row.sell)}
                </td>
              ) : null}
            </tr>
          )),
        )}
      </tbody>
    </>
  );
}

export function SalesTable({ rows, totalQty, totalRp }: { rows: SaleRow[]; totalQty: number; totalRp: number }) {
  return (
    <>
      <thead>
        <tr>
          <th className={th}>Varian</th>
          <th className={th}>Kuantitas</th>
          <th className={th}>Total penjualan</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td className={td}>{row.name}</td>
            <td className={td}>{row.qty}</td>
            <td className={td}>{rp(row.total)}</td>
          </tr>
        ))}
        <tr className="bg-blush font-bold">
          <td className={td}>Total penjualan</td>
          <td className={td}>{totalQty}</td>
          <td className={td}>{rp(totalRp)}</td>
        </tr>
      </tbody>
    </>
  );
}

export function SoldTable({ rows, total }: { rows: SoldRow[]; total: number }) {
  return (
    <>
      <thead>
        <tr>
          <th className={th}>Varian terjual</th>
          <th className={th}>Kuantitas</th>
          <th className={th}>HPP satuan</th>
          <th className={th}>Total</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td className={td}>{row.name}</td>
            <td className={td}>{row.qty}</td>
            <td className={td}>{rp(row.unit)}</td>
            <td className={td}>{rp(row.total)}</td>
          </tr>
        ))}
        <tr className="bg-blush font-bold">
          <td className={td} colSpan={3}>
            Total HPP produk terjual
          </td>
          <td className={td}>{rp(total)}</td>
        </tr>
      </tbody>
    </>
  );
}

export function Statement({ lines }: { lines: StatementLine[] }) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-line bg-paper">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {lines.map((line) => (
            <tr
              key={line.label}
              className={line.kind === "grand" ? "bg-blush font-bold" : line.kind === "total" ? "font-bold" : ""}
            >
              <td className={td + (line.kind === "item" ? "" : " text-ink")}>{line.label}</td>
              <td className={td + " text-right"}>{line.amount === undefined ? "" : rp(line.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
