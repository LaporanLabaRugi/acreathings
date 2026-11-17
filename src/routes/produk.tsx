import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Prose, SectionHeading, SiteShell } from "@/components/site-shell";
import { prices, rp, shots, totals } from "@/lib/report";
import { colorways } from "@/lib/order";
import { TableWrap, td, th } from "@/components/tables";

export const Route = createFileRoute("/produk")({
  head: () => ({ meta: [{ title: "Produk — Acrea Things" }] }),
  component: Produk,
});

const mix = [
  { name: "Complete", qty: totals.complete, tone: "bg-rose" },
  { name: "Combo Foto", qty: totals.comboPhoto, tone: "bg-rose/70" },
  { name: "Combo Huruf", qty: totals.comboLetter, tone: "bg-rose/45" },
  { name: "Basic", qty: totals.basic, tone: "bg-line" },
];

function Produk() {
  return (
    <SiteShell>
      <PageHero
        kicker="Katalog"
        title="Charm makrame yang dirakit sesuai pesanan"
        text="Bunga rajutan dengan rumbai warna-warni, bisa dilengkapi huruf akrilik atau frame foto. Charm dibeli dalam keadaan jadi, lalu dirakit bersama pengait, huruf, frame, dan kemasan."
      />

      <div className="mx-auto max-w-6xl space-y-14 px-5 py-12">
        <section id="produk" className="scroll-mt-28">
          <SectionHeading title="Deskripsi" />
          <Prose>
            <p>
              Desain photostrip dibuat sendiri oleh tim dan tersedia dalam 24 pilihan. Konsumen cukup mengirim
              foto dan memilih desain. Setiap produk dikemas dalam zip pouch bening berstiker logo Acrea Things,
              siap dipakai sendiri maupun diberikan sebagai hadiah personal.
            </p>
          </Prose>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {shots.catalog.map((shot) => (
              <figure key={shot.src} className="overflow-hidden rounded-2xl border border-line bg-paper">
                <img src={shot.src} alt={shot.alt} className="aspect-4/5 w-full object-cover" />
                <figcaption className="px-4 py-3 text-sm font-bold">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="varian" className="scroll-mt-28">
          <SectionHeading
            title="Tiga varian"
            text="Selama Batch 1 dan Batch 2, paket disesuaikan dengan kebutuhan dan anggaran konsumen."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Basic",
                text: "Charm makrame tanpa elemen custom. Konsumen memilih satu dari tiga pengait: ballchain, lobster hook, atau carabiner berbentuk hati.",
                links: [{ label: "Pesan Basic", paket: "basic" as const }],
              },
              {
                name: "Combo",
                text: "Charm makrame dengan satu elemen custom, yaitu huruf akrilik (inisial) atau frame akrilik berisi foto.",
                links: [
                  { label: "Pesan Combo Huruf", paket: "huruf" as const },
                  { label: "Pesan Combo Foto", paket: "foto" as const },
                ],
              },
              {
                name: "Complete",
                text: "Menggabungkan huruf akrilik dan frame foto pada satu charm makrame yang sama.",
                links: [{ label: "Pesan Complete", paket: "complete" as const }],
              },
            ].map((item) => (
              <article key={item.name} className="rounded-2xl border border-line bg-paper p-5">
                <h3 className="font-display text-2xl">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                <div className="mt-4 flex flex-col items-start gap-2">
                  {item.links.map((link) => (
                    <Link
                      key={link.paket}
                      to="/pesan"
                      search={{ paket: link.paket }}
                      className="text-sm font-bold text-rose-deep"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-paper p-5">
            <div className="flex h-4 overflow-hidden rounded-full">
              {mix.map((item) => (
                <div
                  key={item.name}
                  className={item.tone}
                  style={{ width: `${(item.qty / totals.units) * 100}%` }}
                  title={`${item.name}: ${item.qty}`}
                />
              ))}
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {mix.map((item) => (
                <li key={item.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className={"size-3 rounded-full " + item.tone} />
                    {item.name}
                  </span>
                  <span className="font-bold tabular-nums">{item.qty} unit</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">
              Paket dengan elemen custom berjumlah 55 unit, atau sekitar 89% dari 62 unit yang terjual.
            </p>
          </div>
        </section>

        <section id="warna" className="scroll-mt-28">
          <SectionHeading
            title="Sepuluh warna bertema"
            text="Penamaan mengikuti kombinasi warna yang mengingatkan pada tema tersebut. Carat adalah yang paling diminati."
          />
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {colorways.map((item) => (
              <Link
                key={item.name}
                to="/pesan"
                search={{ warna: item.name }}
                className="overflow-hidden rounded-xl border border-line bg-paper"
              >
                <img src={item.src} alt="" className="aspect-4/5 w-full object-cover" />
                <span className="block px-2 py-2 text-sm font-bold">
                  {item.name}
                  {item.name === "Carat" ? " · paling diminati" : ""}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="harga" className="scroll-mt-28">
          <SectionHeading
            title="Daftar harga"
            text="Harga jual per unit. Pada Batch 2 harga tidak dinaikkan walaupun biaya tali makrame naik, agar minat beli tetap terjaga."
          />
          <TableWrap caption="Harga jual Batch 1 dan Batch 2">
            <thead>
              <tr>
                <th className={th}>Paket</th>
                <th className={th}>Komponen</th>
                <th className={th}>Harga</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((row) => (
                <tr key={row.item}>
                  <td className={td + " font-bold"}>{row.paket}</td>
                  <td className={td}>{row.item}</td>
                  <td className={td}>{rp(row.sell)}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </section>

        <section id="keunggulan" className="scroll-mt-28">
          <SectionHeading title="Keunggulan produk" />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              "Konsumen bisa menambahkan inisial atau foto pribadi. Dari 62 unit, 55 memakai elemen custom dan 45 memakai frame foto.",
              "Tiga tingkat harga berhasil terjual semua. Combo (31 unit) dan Complete (24 unit) menjadi pilihan terbanyak.",
              "Sepuluh kombinasi warna, dengan Carat sebagai yang paling diminati. Kemasan zip pouch dan stiker logo seragam di kedua batch.",
              "Cocok sebagai hadiah saudara, kenang-kenangan magang, atau aksesori couple. Pesanan tetap jalan tanpa harus bertemu langsung.",
            ].map((text) => (
              <p key={text} className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed">
                {text}
              </p>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
