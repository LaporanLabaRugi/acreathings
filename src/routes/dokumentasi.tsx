import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { PageHero, SiteShell } from "@/components/site-shell";
import { shots, type Shot } from "@/lib/report";

export const Route = createFileRoute("/dokumentasi")({
  head: () => ({ meta: [{ title: "Dokumentasi — Acrea Things" }] }),
  component: Dokumentasi,
});

function Gallery({ items }: { items: Shot[] }) {
  const [active, setActive] = useState<Shot | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(item)}
            className="overflow-hidden rounded-2xl border border-line bg-paper text-left"
          >
            <img src={item.src} alt={item.alt} className="aspect-4/5 w-full object-cover" />
            <span className="block px-3 py-3 text-sm font-bold">{item.caption}</span>
          </button>
        ))}
      </div>
      {active ? (
        <div
          className="no-print fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-paper text-ink"
            aria-label="Tutup gambar"
            onClick={() => setActive(null)}
          >
            <X className="size-5" />
          </button>
          <figure className="max-h-[90vh] max-w-3xl" onClick={(event) => event.stopPropagation()}>
            <img src={active.src} alt={active.alt} className="max-h-[80vh] w-auto rounded-xl object-contain" />
            <figcaption className="mt-2 text-center text-sm text-paper">{active.caption}</figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}

function Dokumentasi() {
  return (
    <SiteShell>
      <PageHero
        kicker="Galeri"
        title="Foto produk dan pembeli"
        text="Katalog, poster, dan foto penyerahan pesanan dari dua batch pre-order."
      />

      <div id="lampiran" className="mx-auto max-w-6xl space-y-14 scroll-mt-28 px-5 py-12">
        <section>
          <h2 className="font-display text-3xl">Logo usaha</h2>
          <img
            src="/media/logo-acrea.jpg"
            alt="Logo Acrea Things dengan lingkar bunga"
            className="mx-auto mt-5 w-full max-w-sm rounded-2xl border border-line bg-paper object-contain"
          />
        </section>

        <section>
          <h2 className="font-display text-3xl">Katalog produk</h2>
          <Gallery items={shots.catalog} />
        </section>

        <section>
          <h2 className="font-display text-3xl">Media pemasaran</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Poster open PO, profil Instagram @acreathings, dan unggahan di komunitas.
          </p>
          <Gallery items={shots.media} />
        </section>

        <section>
          <h2 className="font-display text-3xl">Batch 1</h2>
          <Gallery items={shots.batch1} />
        </section>

        <section>
          <h2 className="font-display text-3xl">Batch 2</h2>
          <Gallery items={shots.batch2} />
        </section>
      </div>
    </SiteShell>
  );
}
