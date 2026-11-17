import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Palette, Wallet } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { identity, members, rp, totals } from "@/lib/report";
import { colorways } from "@/lib/order";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Beranda — Acrea Things" }],
  }),
  component: Home,
});

const contents = [
  { href: "/tentang", hash: "latar", label: "Cerita", title: "Kenapa Acrea ada" },
  { href: "/tentang", hash: "model", label: "Model", title: "Cara usaha berjalan" },
  { href: "/produk", hash: "produk", label: "Produk", title: "Paket dan harga" },
  { href: "/tentang", hash: "pasar", label: "Pembeli", title: "Siapa yang memesan" },
  { href: "/tentang", hash: "pemasaran", label: "Promosi", title: "Cara dikenal" },
  { href: "/organisasi", hash: "operasional", label: "Tim", title: "Siapa mengerjakan apa" },
  { href: "/laporan", hash: "anggaran", label: "Angka", title: "Penjualan dan laba" },
  { href: "/dokumentasi", hash: "lampiran", label: "Galeri", title: "Foto dan katalog" },
] as const;

function Home() {
  return (
    <SiteShell>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[1.15fr_0.85fr] md:py-16">
          <div>
            <p className="text-xs font-bold tracking-widest text-rose uppercase">
              Handmade · {identity.city}
            </p>
            <h1 className="font-display mt-3 text-4xl leading-tight text-ink md:text-6xl">
              Bag charm yang bisa disusun sendiri
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Acrea Things memadukan tali makrame dengan huruf akrilik dan frame foto. Dari dua batch
              pre-order, {totals.units} charm terjual dan {totals.customShare} di antaranya memuat elemen custom.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/pesan"
                className="inline-flex items-center gap-2 rounded-md bg-rose-deep px-4 py-3 text-sm font-bold text-paper"
              >
                Pesan via WhatsApp
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                to="/produk"
                className="inline-flex items-center rounded-md bg-blush px-4 py-3 text-sm font-bold text-rose-deep"
              >
                Lihat produk
              </Link>
            </div>
          </div>
          <figure>
            <img
              src="/media/b1-produk.jpg"
              alt="Deretan bag charm Acrea Things yang sudah dikemas"
              className="aspect-4/5 w-full rounded-2xl border border-line object-cover"
            />
            <figcaption className="mt-2 text-sm text-muted">Batch 1, siap diserahkan dan dikirim.</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid grid-cols-2 divide-x divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper md:grid-cols-4 md:divide-y-0">
          {[
            { value: String(totals.units), label: "Unit terjual" },
            { value: rp(totals.revenue), label: "Total pendapatan" },
            { value: rp(totals.net), label: "Laba bersih" },
            { value: totals.netMargin, label: "Margin laba bersih" },
          ].map((item) => (
            <div key={item.label} className="px-4 py-5">
              <p className="font-display text-2xl text-rose-deep md:text-3xl">{item.value}</p>
              <p className="mt-1 text-sm text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-2">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-ink">Pilih warna, lalu pesan</h2>
            <p className="mt-1 text-sm text-muted">Sepuluh kombinasi dari katalog. Ketuk warna untuk mulai menyusun pesanan.</p>
          </div>
          <Link to="/pesan" className="shrink-0 text-sm font-bold text-rose-deep">
            Penyusun
          </Link>
        </div>
        <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2">
          {colorways.map((item) => (
            <Link
              key={item.name}
              to="/pesan"
              search={{ warna: item.name }}
              className="w-36 shrink-0 overflow-hidden rounded-xl border border-line bg-paper"
            >
              <img src={item.src} alt="" className="aspect-4/5 w-full object-cover" />
              <span className="block px-2 py-2 text-sm font-bold">
                {item.name}
                {item.name === "Carat" ? " · favorit" : ""}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <img
            src="/media/logo-acrea.jpg"
            alt="Logo Acrea Things"
            className="mx-auto w-full max-w-sm rounded-2xl border border-line bg-paper object-contain"
          />
          <div>
            <p className="text-xs font-bold tracking-widest text-rose uppercase">Tentang usaha</p>
            <h2 className="font-display mt-2 text-3xl text-ink">Acrylic and Create</h2>
            <p className="mt-3 text-muted">
              Nama Acrea merangkum dua bahan utamanya: akrilik custom dan tali makrame. Konsumen memilih
              paket, warna, pengait, huruf, dan desain foto, sehingga setiap charm bersifat personal.
              Penjualan dilakukan pre-order dari rumah di {identity.city}, lewat Instagram {identity.instagram}{" "}
              dan WhatsApp. Pesanan luar kota dikirim melalui Shopee.
            </p>
            <Link to="/tentang" className="mt-4 inline-flex items-center gap-2 font-bold text-rose-deep">
              Selengkapnya
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="font-display text-3xl text-ink">Yang membedakan Acrea</h2>
        <p className="mt-2 text-muted">Dari 62 produk terjual, 55 memakai elemen custom dan 45 di antaranya memuat foto.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Palette,
              title: "Bisa disesuaikan",
              text: "Tiga paket, sepuluh warna bertema, tiga pengait, huruf inisial, dan 24 desain photostrip.",
            },
            {
              icon: Wallet,
              title: "Harga pelajar",
              text: "Harga jual Rp5.000–Rp15.000. Di Batch 2 harga tidak dinaikkan meskipun biaya makrame naik.",
            },
            {
              icon: MapPin,
              title: "Sampai luar Jawa",
              text: "Pemasaran berpusat di Magelang, tetapi pesanan datang dari Jabodetabek hingga luar Pulau Jawa.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-line bg-paper p-5">
              <div className="flex size-11 items-center justify-center rounded-full bg-blush text-rose-deep">
                <item.icon className="size-5" aria-hidden />
              </div>
              <h3 className="font-display mt-4 text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-ink">Tiga paket</h2>
          <Link to="/produk" className="text-sm font-bold text-rose-deep">
            Daftar harga
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { name: "Basic", price: "Rp5.000", text: "Charm makrame dan satu pilihan pengait, tanpa elemen custom.", sold: "7 unit" },
            { name: "Combo", price: "Rp12.000", text: "Makrame ditambah satu elemen: huruf akrilik atau frame foto.", sold: "31 unit" },
            { name: "Complete", price: "Rp15.000", text: "Huruf akrilik dan frame foto pada satu charm yang sama.", sold: "24 unit" },
          ].map((item) => (
            <article key={item.name} className="rounded-2xl border border-line bg-paper p-5">
              <p className="text-xs font-bold tracking-widest text-rose uppercase">{item.sold}</p>
              <h3 className="font-display mt-2 text-2xl">{item.name}</h3>
              <p className="mt-1 font-display text-xl text-rose-deep">{item.price}</p>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="font-display text-3xl text-ink">Jelajahi</h2>
        <p className="mt-2 max-w-2xl text-muted">Dari cerita usaha sampai foto pesanan yang sudah sampai.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {contents.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              hash={item.hash}
              className="rounded-xl border border-line bg-paper px-4 py-4 hover:border-rose"
            >
              <p className="text-xs font-bold tracking-widest text-rose uppercase">{item.label}</p>
              <p className="mt-1 font-bold">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12">
        <div className="rounded-2xl border border-line bg-paper p-6 md:p-8">
          <p className="text-xs font-bold tracking-widest text-rose uppercase">Tim</p>
          <h2 className="font-display mt-2 text-3xl">Lima orang, empat peran</h2>
          <p className="mt-2 text-sm text-muted">
            {identity.group} · {identity.campus}
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {members.map((member) => (
              <li key={member.name} className="flex items-baseline justify-between gap-3 border-b border-line py-2 text-sm">
                <span>{member.name}</span>
                <span className="text-muted">{member.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
