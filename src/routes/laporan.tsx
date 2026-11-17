import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHero, Prose, SectionHeading, SiteShell } from "@/components/site-shell";
import { HppTable, SalesTable, SoldTable, Statement, TableWrap } from "@/components/tables";
import {
  batchChart,
  hppBatch1,
  hppBatch2,
  incomeLines,
  rp,
  salesBatch1,
  salesBatch2,
  soldBatch1,
  soldBatch2,
  suggestions,
  totals,
} from "@/lib/report";

export const Route = createFileRoute("/laporan")({
  head: () => ({ meta: [{ title: "Keuangan — Acrea Things" }] }),
  component: Laporan,
});

type TipPayload = { name?: string; value?: number; color?: string };

function ChartTip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-paper px-3 py-2 text-sm shadow-sm">
      <p className="font-bold">{label}</p>
      {payload.map((item) => (
        <p key={item.name} className="text-muted">
          {item.name}: {rp(item.value ?? 0)}
        </p>
      ))}
    </div>
  );
}

function BatchChart() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="h-72 rounded-2xl border border-line bg-paper" />;
  return (
    <div className="h-72 rounded-2xl border border-line bg-paper p-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={batchChart} barGap={6}>
          <CartesianGrid stroke="var(--color-line)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "var(--color-muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value: number) => `${Math.round(value / 1000)} rb`}
            tick={{ fill: "var(--color-muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip content={<ChartTip />} cursor={{ fill: "var(--color-blush)" }} />
          <Bar dataKey="penjualan" name="Penjualan" fill="var(--color-rose)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="hpp" name="HPP terjual" fill="var(--color-rose-deep)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Laporan() {
  return (
    <SiteShell>
      <PageHero
        kicker="Keuangan"
        title="Modal kembali, lalu berputar sendiri"
        text="Omzet naik dari Rp349.000 di Batch 1 menjadi Rp427.000 di Batch 2. Laba bersih dua batch sebesar Rp334.919, atau 43,1% dari pendapatan."
      />

      <div className="mx-auto max-w-6xl space-y-14 px-5 py-12">
        <section id="anggaran" className="scroll-mt-28">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Pendapatan", rp(totals.revenue)],
              ["HPP terjual", rp(totals.hpp)],
              ["Laba bersih", rp(totals.net)],
              ["Saldo kas", rp(totals.cashEnd)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-line bg-paper px-4 py-4">
                <p className="text-xs font-bold tracking-widest text-rose uppercase">{label}</p>
                <p className="font-display mt-2 text-xl text-ink md:text-2xl">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <BatchChart />
            <p className="mt-2 text-sm text-muted">
              Batang muda adalah penjualan, batang tua adalah HPP produk yang terjual. Laba kotor Batch 1{" "}
              {rp(totals.gross1)}, Batch 2 {rp(totals.gross2)}.
            </p>
          </div>
        </section>

        <section id="asumsi" className="scroll-mt-28">
          <SectionHeading title="Asumsi perhitungan" />
          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "HPP dihitung terpisah per batch karena harga carabiner, huruf akrilik, dan tali makrame berubah saat restock.",
              "Bahan yang tidak dibeli lagi di Batch 2 — frame akrilik, plastik zipper, stiker logo, dan lobster hook — memakai harga beli Batch 1.",
              "Cetak foto dan kemasan kiriman (polymailer, bubble wrap, dan cetak resi) sebesar Rp1.352 per paket dimasukkan ke HPP produk terjual.",
              "Produksi dikerjakan manual oleh anggota. Kompensasi tenaga kerja tidak dibebankan sebagai biaya harian, melainkan dialokasikan dari laba bersih.",
            ].map((text, index) => (
              <li key={text} className="rounded-2xl border border-line bg-paper p-4 text-sm leading-relaxed">
                <span className="font-bold text-rose-deep">{index + 1}. </span>
                {text}
              </li>
            ))}
          </ol>
        </section>

        <section id="hpp" className="scroll-mt-28">
          <SectionHeading
            title="HPP dan harga jual Batch 1"
            text="Modal bahan per unit berkisar Rp2.685 sampai Rp7.708. Margin kotor berada di kisaran 35% sampai 49%."
          />
          <TableWrap caption="Perhitungan HPP Batch 1">
            <HppTable rows={hppBatch1} />
          </TableWrap>
          <div className="mt-10">
            <SectionHeading
              title="HPP dan harga jual Batch 2"
              text="Harga jual dipertahankan. Kenaikan biaya makrame membuat margin beberapa varian sedikit menyempit."
            />
          </div>
          <TableWrap caption="Perhitungan HPP Batch 2">
            <HppTable rows={hppBatch2} />
          </TableWrap>
        </section>

        <section id="penjualan" className="scroll-mt-28">
          <SectionHeading
            title="Penjualan dua batch"
            text="Batch 1 menjual 27 unit. Batch 2 naik menjadi 35 unit. Basic baru laku di batch kedua."
          />
          <TableWrap caption="Penjualan Batch 1">
            <SalesTable rows={salesBatch1} totalQty={totals.units1} totalRp={totals.revenue1} />
          </TableWrap>
          <TableWrap caption="HPP terjual Batch 1">
            <SoldTable rows={soldBatch1} total={totals.hpp1} />
          </TableWrap>
          <p className="mt-3 text-sm text-muted">
            Pendapatan Batch 1 {rp(totals.revenue1)} dikurangi HPP {rp(totals.hpp1)} menghasilkan laba kotor{" "}
            {rp(totals.gross1)}.
          </p>
          <TableWrap caption="Penjualan Batch 2">
            <SalesTable rows={salesBatch2} totalQty={totals.units2} totalRp={totals.revenue2} />
          </TableWrap>
          <TableWrap caption="HPP terjual Batch 2">
            <SoldTable rows={soldBatch2} total={totals.hpp2} />
          </TableWrap>
          <p className="mt-3 text-sm text-muted">
            Pendapatan Batch 2 {rp(totals.revenue2)} dikurangi HPP {rp(totals.hpp2)} menghasilkan laba kotor{" "}
            {rp(totals.gross2)}.
          </p>
        </section>

        <section id="bep" className="scroll-mt-28">
          <SectionHeading title="Titik impas" />
          <div className="mt-5 rounded-2xl border border-line bg-paper p-5 md:p-6">
            <p className="text-sm leading-relaxed">
              BEP (unit) = total modal bahan baku / rata-rata harga jual
            </p>
            <p className="font-display mt-3 text-2xl text-rose-deep md:text-3xl">
              {rp(totals.capital)} / {rp(totals.avgPrice)} = {totals.bepUnits} unit
            </p>
            <p className="mt-3 text-sm text-muted">
              Modal bahan adalah pembelian Batch 1 {rp(totals.capital1)} ditambah restock Batch 2{" "}
              {rp(totals.restock)}. Rata-rata harga jual dihitung dari seluruh penjualan dua batch (
              {rp(totals.revenue)} / {totals.units} unit).
            </p>
            <div className="mt-5">
              <div className="flex h-3 overflow-hidden rounded-full bg-blush">
                <div className="bg-rose" style={{ width: "100%" }} />
              </div>
              <p className="mt-2 text-sm">
                Realisasi {totals.units} unit sudah melewati titik impas {totals.bepUnits} unit. Penerimaan{" "}
                {rp(totals.revenue)} menutup {totals.coverRatio} dari total modal bahan.
              </p>
            </div>
            <Prose>
              <p>
                Pengembalian modal lebih cepat dari proyeksi rata-rata karena penjualan didominasi varian
                bernilai lebih tinggi, yaitu Complete (Rp15.000) dan Combo Foto (Rp12.000). Usaha juga masih
                menyimpan sisa bahan baku untuk periode berikutnya.
              </p>
            </Prose>
          </div>
        </section>

        <section id="labarugi" className="scroll-mt-28 print-break">
          <SectionHeading
            title="Laba rugi"
            text="Acrea Things · untuk periode yang berakhir Oktober 2026"
          />
          <Statement lines={incomeLines} />
          <Prose>
            <p>
              Setelah pendapatan {rp(totals.revenue)} dikurangi beban pokok {rp(totals.hpp)} dan biaya
              administrasi {rp(totals.opex)}, laba bersih usaha tercatat {rp(totals.net)}.
            </p>
          </Prose>
        </section>

        <section id="evaluasi" className="scroll-mt-28">
          <SectionHeading title="Evaluasi" />
          <Prose>
            <p>
              Kinerja dua batch sesuai harapan dan menunjukkan tren positif. Omzet naik sekitar {totals.growth},
              dari {rp(totals.revenue1)} menjadi {rp(totals.revenue2)}. Akumulasi pendapatan {rp(totals.revenue)}{" "}
              menghasilkan laba bersih {rp(totals.net)}, setara margin {totals.netMargin}.
            </p>
            <p>
              Arus kas sudah dikelola secara mandiri. Iuran kelompok {rp(totals.capital1)} kembali sepenuhnya,
              dan restock {rp(totals.restock)} murni dari hasil Batch 1. Per 2 Oktober 2026 saldo kas masih{" "}
              {rp(totals.cashEnd)}, ditambah persediaan bahan yang belum terpakai. Posisi ini sehat untuk modal
              operasional batch berikutnya.
            </p>
          </Prose>
        </section>

        <section id="penutup" className="scroll-mt-28">
          <SectionHeading title="Kesimpulan" />
          <Prose>
            <p>
              Acrea Things adalah usaha bag charm yang memadukan tali makrame dengan elemen akrilik custom.
              Modelnya B2C dengan sistem pre-order: bahan disiapkan di awal batch, lalu pemasaran dan penjualan
              dilakukan online melalui Instagram, WhatsApp, dan Shopee.
            </p>
            <p>
              Dua batch menghasilkan {totals.units} unit, pendapatan {rp(totals.revenue)}, dan laba bersih{" "}
              {rp(totals.net)}. Penerimaan Batch 1 cukup untuk membiayai bahan Batch 2 sebesar{" "}
              {rp(totals.restock)} tanpa modal tambahan. Arus kas usaha sehat, efisien, dan mandiri.
            </p>
            <p>
              Secara keseluruhan, Acrea Things menjadi sarana yang efektif untuk melatih kewirausahaan anggota
              kelompok, mulai dari perencanaan produk, produksi, pemasaran digital, hingga pengelolaan keuangan.
            </p>
          </Prose>
          <div className="mt-8">
            <SectionHeading title="Saran" />
          </div>
          <ol className="mt-5 grid gap-3">
            {suggestions.map((item) => (
              <li key={item.title} className="rounded-2xl border border-line bg-paper p-5">
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </SiteShell>
  );
}
