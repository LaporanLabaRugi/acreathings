import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose, SectionHeading, SiteShell } from "@/components/site-shell";
import { BatchFlow, OrgChart } from "@/components/diagrams";
import { identity, weeks } from "@/lib/report";

export const Route = createFileRoute("/organisasi")({
  head: () => ({ meta: [{ title: "Organisasi — Acrea Things" }] }),
  component: Organisasi,
});

const jobs: Record<string, string> = {
  Operasional: "Mengatur pembelian bahan baku, perakitan produk, dan proses produksi.",
  Pelayanan: "Menerima dan merekap pesanan, serta memperbarui stok bahan baku.",
  Keuangan: "Menerima pembayaran, mengelola, dan mencatat keuangan.",
  Pemasaran: "Mempromosikan produk dan mengelola konten media sosial.",
};

function Organisasi() {
  return (
    <SiteShell>
      <PageHero
        kicker="Tim"
        title="Dikerjakan dari rumah, dijual lewat pre-order"
        text="Karena jadwal kuliah dan efisiensi biaya, Acrea Things belum membuka toko fisik. Perakitan, cetak foto, dan packing berpusat di Magelang."
      />

      <div className="mx-auto max-w-6xl space-y-14 px-5 py-12">
        <section id="operasional" className="scroll-mt-28">
          <SectionHeading title="Lokasi dan cara menjual" />
          <Prose>
            <p>
              Kegiatan berjalan secara home-based di {identity.city}. Penjualan online memakai sistem pre-order
              lewat Instagram ({identity.instagram}) dan WhatsApp. Pesanan luar kota diproses melalui Shopee.
            </p>
            <p>
              Modal Batch 1 untuk tali makrame, pengait, huruf akrilik, frame foto, dan perlengkapan packing
              berasal dari iuran bersama. Restock Batch 2 sudah dibiayai dari perputaran kas penjualan Batch 1.
              Gunting, perlengkapan cetak foto, polymailer, dan cetak resi dipakai untuk memperlancar pengerjaan
              sampai barang siap kirim.
            </p>
          </Prose>
        </section>

        <section id="tugas" className="scroll-mt-28">
          <SectionHeading title="Siapa mengerjakan apa" text="Setiap peran dijalankan selama produksi dan penjualan." />
          <OrgChart jobs={jobs} />
        </section>

        <section id="jadwal" className="scroll-mt-28">
          <SectionHeading
            title="Sepuluh minggu"
            text="Jadwal menyesuaikan kuliah. Penjualan rutin berjalan sejak pre-order dibuka."
          />
          <ol className="mt-6 space-y-3">
            {weeks.map((row) => (
              <li key={row.week} className="grid grid-cols-[auto_1fr] items-start gap-4">
                <span className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-blush px-2 text-sm font-bold text-rose-deep">
                  {row.week}
                </span>
                <p className="pt-2 text-sm">{row.task}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="alur" className="scroll-mt-28">
          <SectionHeading title="Alur satu batch" />
          <BatchFlow />
        </section>
      </div>
    </SiteShell>
  );
}
