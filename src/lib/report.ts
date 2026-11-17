import { publicUrl } from "@/lib/public-url";

export const identity = {
  brand: "Acrea Things",
  meaning: "Acrylic and Create",
  course: "Praktik Kewirausahaan",
  group: "Kelompok 5 K1",
  study: "S1 Akuntansi",
  program: "Program Studi S1 Akuntansi",
  faculty: "Fakultas Ekonomi",
  campus: "Universitas Tidar",
  year: "2026",
  instagram: "@acreathings",
  instagramUrl: "https://instagram.com/acreathings",
  city: "Magelang",
  period: "Oktober 2026",
  cashDate: "2 Oktober 2026",
};

export const lecturers = [
  "Lorensa Bunga Ayu S, S.E, M.Ak",
  "Chaidir Iswanaji, S.E., M.Ak.",
];

export const members = [
  { name: "Nadjwa Aurella H.A", nim: "2420104051", role: "Keuangan" },
  { name: "Tri Wulan Sari", nim: "2420104102", role: "Pemasaran" },
  { name: "Aulia Karizhanti Putri", nim: "2420104107", role: "Operasional" },
  { name: "Vifian Safira Azahra", nim: "2440104150", role: "Pelayanan" },
  { name: "Asyifa Ellena Maulidya", nim: "2440104155", role: "Operasional" },
];

export function rp(value: number) {
  return "Rp" + new Intl.NumberFormat("id-ID").format(value);
}

export type CostLine = { name: string; amount: number };
export type CostVariant = {
  name: string;
  lines: CostLine[];
  total: number;
  margin: string;
  sell: number;
};

const pack = [
  { name: "Plastik zipper", amount: 234 },
  { name: "Stiker logo", amount: 199 },
];

export const hppBatch1: CostVariant[] = [
  {
    name: "Basic Lobster",
    lines: [
      { name: "Macrame", amount: 2252 },
      { name: "Lobster hook", amount: 502 },
      ...pack,
    ],
    total: 3187,
    margin: "47%",
    sell: 6000,
  },
  {
    name: "Basic Ballchain",
    lines: [
      { name: "Macrame", amount: 2252 },
      { name: "Ballchain", amount: 0 },
      ...pack,
    ],
    total: 2685,
    margin: "46%",
    sell: 5000,
  },
  {
    name: "Basic Carabiner",
    lines: [
      { name: "Macrame", amount: 2252 },
      { name: "Carabiner", amount: 2491 },
      ...pack,
    ],
    total: 5176,
    margin: "35%",
    sell: 8000,
  },
  {
    name: "Combo Huruf",
    lines: [
      { name: "Macrame", amount: 2252 },
      { name: "Carabiner", amount: 2491 },
      { name: "Huruf akrilik", amount: 1080 },
      { name: "Ballchain", amount: 0 },
      ...pack,
    ],
    total: 6256,
    margin: "48%",
    sell: 12000,
  },
  {
    name: "Combo Frame",
    lines: [
      { name: "Macrame", amount: 2252 },
      { name: "Carabiner", amount: 2491 },
      { name: "Frame akrilik", amount: 952 },
      { name: "Cetak foto", amount: 500 },
      ...pack,
    ],
    total: 6628,
    margin: "45%",
    sell: 12000,
  },
  {
    name: "Complete",
    lines: [
      { name: "Macrame", amount: 2252 },
      { name: "Carabiner", amount: 2491 },
      { name: "Huruf akrilik", amount: 1080 },
      { name: "Ballchain", amount: 0 },
      { name: "Frame akrilik", amount: 952 },
      { name: "Cetak foto", amount: 500 },
      ...pack,
    ],
    total: 7708,
    margin: "49%",
    sell: 15000,
  },
];

export const hppBatch2: CostVariant[] = [
  {
    name: "Basic Lobster",
    lines: [
      { name: "Macrame", amount: 2369 },
      { name: "Lobster hook", amount: 502 },
      ...pack,
    ],
    total: 3304,
    margin: "45%",
    sell: 6000,
  },
  {
    name: "Basic Ballchain",
    lines: [
      { name: "Macrame", amount: 2369 },
      { name: "Ballchain", amount: 0 },
      ...pack,
    ],
    total: 2802,
    margin: "44%",
    sell: 5000,
  },
  {
    name: "Basic Carabiner",
    lines: [
      { name: "Macrame", amount: 2369 },
      { name: "Carabiner", amount: 2449 },
      ...pack,
    ],
    total: 5251,
    margin: "34%",
    sell: 8000,
  },
  {
    name: "Combo Huruf",
    lines: [
      { name: "Macrame", amount: 2369 },
      { name: "Carabiner", amount: 2449 },
      { name: "Huruf akrilik", amount: 1007 },
      { name: "Ballchain", amount: 0 },
      ...pack,
    ],
    total: 6258,
    margin: "48%",
    sell: 12000,
  },
  {
    name: "Combo Frame",
    lines: [
      { name: "Macrame", amount: 2369 },
      { name: "Carabiner", amount: 2449 },
      { name: "Frame akrilik", amount: 952 },
      { name: "Cetak foto", amount: 500 },
      ...pack,
    ],
    total: 6703,
    margin: "44%",
    sell: 12000,
  },
  {
    name: "Complete",
    lines: [
      { name: "Macrame", amount: 2369 },
      { name: "Carabiner", amount: 2449 },
      { name: "Huruf akrilik", amount: 1007 },
      { name: "Ballchain", amount: 0 },
      { name: "Frame akrilik", amount: 952 },
      { name: "Cetak foto", amount: 500 },
      ...pack,
    ],
    total: 7710,
    margin: "49%",
    sell: 15000,
  },
];

export type SaleRow = { name: string; qty: number; total: number };

export const salesBatch1: SaleRow[] = [
  { name: "Basic Ballchain", qty: 0, total: 0 },
  { name: "Basic Lobster", qty: 0, total: 0 },
  { name: "Basic Carabiner", qty: 0, total: 0 },
  { name: "Combo Huruf", qty: 4, total: 49000 },
  { name: "Combo Foto", qty: 10, total: 104000 },
  { name: "Complete", qty: 13, total: 196000 },
];

export const salesBatch2: SaleRow[] = [
  { name: "Basic Ballchain", qty: 0, total: 0 },
  { name: "Basic Lobster", qty: 3, total: 18000 },
  { name: "Basic Carabiner", qty: 4, total: 32000 },
  { name: "Combo Huruf", qty: 6, total: 73000 },
  { name: "Combo Foto", qty: 11, total: 134000 },
  { name: "Complete", qty: 11, total: 170000 },
];

export type SoldRow = { name: string; qty: number; unit: number; total: number };

export const soldBatch1: SoldRow[] = [
  { name: "Combo Huruf", qty: 4, unit: 6256, total: 25024 },
  { name: "Combo Foto", qty: 10, unit: 6628, total: 66280 },
  { name: "Complete", qty: 13, unit: 7708, total: 100204 },
  { name: "Add on foto", qty: 3, unit: 500, total: 1500 },
  { name: "Add on huruf", qty: 1, unit: 1080, total: 1080 },
  { name: "Add on frame", qty: 1, unit: 952, total: 952 },
  { name: "Packing paket", qty: 2, unit: 1352, total: 2704 },
];

export const soldBatch2: SoldRow[] = [
  { name: "Basic Lobster", qty: 3, unit: 3304, total: 9912 },
  { name: "Basic Carabiner", qty: 4, unit: 5251, total: 21004 },
  { name: "Combo Huruf", qty: 6, unit: 6258, total: 37548 },
  { name: "Combo Foto", qty: 11, unit: 6703, total: 73733 },
  { name: "Complete", qty: 11, unit: 7710, total: 84810 },
  { name: "Add on foto", qty: 4, unit: 500, total: 2000 },
  { name: "Add on huruf", qty: 2, unit: 1007, total: 2014 },
  { name: "Packing paket", qty: 8, unit: 1352, total: 10816 },
];

export const totals = {
  units: 62,
  customUnits: 55,
  customShare: "89%",
  photoFrames: 45,
  basic: 7,
  comboLetter: 10,
  comboPhoto: 21,
  complete: 24,
  revenue1: 349000,
  revenue2: 427000,
  revenue: 776000,
  units1: 27,
  units2: 35,
  hpp1: 197744,
  hpp2: 241837,
  hpp: 439581,
  gross1: 151256,
  gross2: 185163,
  gross: 336419,
  opex: 1500,
  net: 334919,
  netMargin: "43,1%",
  growth: "22,3%",
  capital1: 464784,
  restock: 230804,
  capital: 695588,
  avgPrice: 12516,
  bepUnits: 56,
  cashInOps: 776001,
  cashOutOps: 39500,
  cashOps: 736501,
  cashEnd: 505697,
  qrisTest: 1,
  coverRatio: "111,6%",
};

export const prices = [
  { paket: "Basic", item: "Charm makrame + ballchain", sell: 5000 },
  { paket: "Basic", item: "Charm makrame + lobster hook", sell: 6000 },
  { paket: "Basic", item: "Charm makrame + carabiner", sell: 8000 },
  { paket: "Combo", item: "Basic + acrylic letter", sell: 12000 },
  { paket: "Combo", item: "Basic + acrylic frame (foto custom)", sell: 12000 },
  { paket: "Complete", item: "Basic + acrylic letter + acrylic frame", sell: 15000 },
];

export const colors = [
  "Spiderman",
  "Rarity",
  "Carat",
  "Cinnamoroll",
  "Hello Kitty",
  "Ariel",
  "Panda",
  "Blueberry",
  "Strawberry Matcha",
  "Winnie the Pooh",
];

export const bmc = [
  {
    title: "Customer Segments",
    text: "Pelajar, mahasiswa, dan anak muda yang menyukai aksesori tas estetik dan personal, serta pembeli hadiah untuk ulang tahun, wisuda, atau kenang-kenangan. Pembeli berasal dari Magelang, Jabodetabek, hingga luar Pulau Jawa.",
  },
  {
    title: "Value Propositions",
    text: "Bag charm makrame yang estetik dan dapat dikustomisasi secara modular. Tersedia 3 paket, 10 kombinasi warna makrame, 3 pilihan pengait, huruf akrilik, dan frame foto dengan 24 desain. Dikemas dalam zip pouch berstiker logo, dengan harga terjangkau.",
  },
  {
    title: "Channels",
    text: "Instagram, WhatsApp, dan Shopee untuk pembeli luar kota. Promosi juga lewat grup kelas dan mulut ke mulut.",
  },
  {
    title: "Customer Relationships",
    text: "Komunikasi personal lewat chat untuk desain dan update status pre-order, konten media sosial, serta penanganan keluhan dan masukan untuk perbaikan batch berikutnya.",
  },
  {
    title: "Revenue Streams",
    text: "Penjualan tiga paket bag charm (Basic, Combo, dan Complete) beserta add-on huruf akrilik dan foto.",
  },
  {
    title: "Key Resources",
    text: "Bahan baku (makrame, pengait, huruf akrilik, frame foto, zip pouch, dan stiker), desain photostrip, tim pelaksana, akun media sosial dan e-commerce, identitas merek, serta modal iuran anggota yang diputar dari hasil penjualan.",
  },
  {
    title: "Key Activities",
    text: "Promosi dan pengelolaan pre-order, pembelian bahan baku, pencetakan foto, perakitan, quality control, pengemasan, distribusi, pelayanan konsumen, dan pencatatan keuangan.",
  },
  {
    title: "Key Partners",
    text: "Supplier bahan baku, jasa ekspedisi, dan Shopee sebagai platform pengiriman.",
  },
  {
    title: "Cost Structure",
    text: "Pembelian bahan baku, cetak foto, perlengkapan kemasan dan pengiriman, serta biaya administrasi pembayaran digital. Tenaga kerja tidak dibebankan sebagai biaya dan dialokasikan dari laba bersih.",
  },
];

export const weeks = [
  { week: "1", task: "Brainstorming ide, riset pasar, dan penentuan produk" },
  { week: "2", task: "Pencarian supplier serta kalkulasi peluang dan keuntungan" },
  { week: "3", task: "Pembelian bahan baku dan pembuatan sampel" },
  { week: "4", task: "Pembukaan pre-order, promosi, dan penjualan Batch 1" },
  { week: "5–10", task: "Penjualan rutin, produksi, distribusi, dan persiapan batch berikutnya" },
];

export const flow = [
  {
    step: "01",
    title: "Persiapan",
    text: "Pembelian bahan baku, pencatatan stok berdasarkan warna, dan persiapan konten promosi.",
  },
  {
    step: "02",
    title: "Penjualan",
    text: "Katalog diunggah di Instagram, WhatsApp, dan media sosial pribadi. Pelayanan mencatat warna, pengait, huruf, serta file foto, lalu berkoordinasi dengan keuangan.",
  },
  {
    step: "03",
    title: "Produksi dan QC",
    text: "Setelah pre-order tutup, foto dicetak, komponen dirakit sesuai pesanan, lalu diperiksa. Produk lolos QC dikemas dalam zip pouch berlogo.",
  },
  {
    step: "04",
    title: "Distribusi",
    text: "Pesanan dalam kota diserahkan COD di area kampus. Pesanan luar kota dikirim lewat ekspedisi Shopee. Keuangan menutup pencatatan sebelum batch berikutnya dibuka.",
  },
];

export const suggestions = [
  {
    title: "Pengembangan varian",
    text: "Menambah pilihan warna makrame atau bentuk charm baru sesuai tren dan permintaan, agar produk tetap relevan bagi pembeli baru.",
  },
  {
    title: "Perluasan promosi",
    text: "Memaksimalkan konten di TikTok selain Instagram dan WhatsApp, karena platform ini efektif menjangkau target Gen Z.",
  },
  {
    title: "Efisiensi operasional",
    text: "Memperbaiki koordinasi waktu antara pemesanan, produksi, dan pengambilan atau pengiriman agar distribusi lebih cepat dan konsisten.",
  },
  {
    title: "Evaluasi rutin",
    text: "Melakukan evaluasi setiap akhir batch, termasuk umpan balik pelanggan, sebagai dasar perbaikan kualitas dan pelayanan.",
  },
  {
    title: "Pencatatan yang konsisten",
    text: "Mempertahankan disiplin pencatatan arus kas dan laba rugi setiap batch agar keberlanjutan usaha dapat dipantau.",
  },
];

export type Shot = { src: string; alt: string; caption: string };

export const shots = {
  catalog: [
    { src: publicUrl("/media/katalog-produk.jpg"), alt: "Katalog paket Basic, Combo, dan Complete", caption: "Katalog paket" },
    { src: publicUrl("/media/katalog-warna.jpg"), alt: "Sepuluh kombinasi warna makrame", caption: "Macrame colour" },
    { src: publicUrl("/media/katalog-frame.jpg"), alt: "Dua puluh empat desain photostrip frame", caption: "Photostrip frame" },
  ],
  media: [
    { src: publicUrl("/media/poster-batch1.jpg"), alt: "Poster pre-order Batch 1", caption: "Poster Batch 1, 21–23 September" },
    { src: publicUrl("/media/poster-batch2.jpg"), alt: "Poster pre-order Batch 2", caption: "Poster Batch 2, 27–30 September" },
    { src: publicUrl("/media/ig-profil.jpg"), alt: "Profil Instagram Acrea Things", caption: "Profil Instagram @acreathings" },
    { src: publicUrl("/media/wa-komunitas.jpg"), alt: "Promosi di komunitas WhatsApp", caption: "Promosi komunitas" },
  ],
  batch1: [
    { src: publicUrl("/media/b1-produk.jpg"), alt: "Produk Batch 1 tersusun di atas rumput", caption: "Hasil rakitan Batch 1" },
    { src: publicUrl("/media/b1-resi.jpg"), alt: "Resi pengiriman Shopee Batch 1", caption: "Resi pengiriman" },
    { src: publicUrl("/media/b1-a.jpg"), alt: "Produk bag charm di tangan pembeli", caption: "Penyerahan pesanan" },
    { src: publicUrl("/media/b1-b.jpg"), alt: "Dua pembeli menunjukkan pesanan", caption: "Dokumentasi pembeli" },
    { src: publicUrl("/media/b1-c.jpg"), alt: "Dua pembeli memegang paket pesanan", caption: "Dokumentasi pembeli" },
    { src: publicUrl("/media/b1-d.jpg"), alt: "Dua pembeli di area kampus", caption: "COD sekitar kampus" },
    { src: publicUrl("/media/b1-e.jpg"), alt: "Dua pembeli duduk bersama pesanan", caption: "Dokumentasi pembeli" },
  ],
  batch2: [
    { src: publicUrl("/media/b2-produk.jpg"), alt: "Produk Batch 2 tersusun di atas meja", caption: "Hasil rakitan Batch 2" },
    { src: publicUrl("/media/b2-paket.jpg"), alt: "Paket polymailer merah muda siap kirim", caption: "Paket luar kota" },
    { src: publicUrl("/media/b2-a.jpg"), alt: "Pembeli memegang pesanan Batch 2", caption: "Penyerahan pesanan" },
    { src: publicUrl("/media/b2-b.jpg"), alt: "Pembeli menunjukkan charm di kelas", caption: "Dokumentasi pembeli" },
    { src: publicUrl("/media/b2-c.jpg"), alt: "Pembeli memegang zip pouch", caption: "Dokumentasi pembeli" },
    { src: publicUrl("/media/b2-d.jpg"), alt: "Pembeli menunjukkan dua pesanan", caption: "Dokumentasi pembeli" },
    { src: publicUrl("/media/b2-e.jpg"), alt: "Pembeli memegang charm di kelas", caption: "Dokumentasi pembeli" },
    { src: publicUrl("/media/b2-f.jpg"), alt: "Pembeli memegang paket pesanan", caption: "Dokumentasi pembeli" },
  ],
};

export const batchChart = [
  { name: "Batch 1", penjualan: totals.revenue1, hpp: totals.hpp1 },
  { name: "Batch 2", penjualan: totals.revenue2, hpp: totals.hpp2 },
];

export type StatementLine = {
  label: string;
  amount?: number;
  kind: "item" | "total" | "grand";
};

export const incomeLines: StatementLine[] = [
  { label: "Pendapatan penjualan Batch 1", amount: totals.revenue1, kind: "item" },
  { label: "Pendapatan penjualan Batch 2", amount: totals.revenue2, kind: "item" },
  { label: "Total pendapatan penjualan", amount: totals.revenue, kind: "total" },
  { label: "Beban HPP produk terjual Batch 1", amount: totals.hpp1, kind: "item" },
  { label: "Beban HPP produk terjual Batch 2", amount: totals.hpp2, kind: "item" },
  { label: "Total beban pokok penjualan", amount: totals.hpp, kind: "total" },
  { label: "Laba kotor", amount: totals.gross, kind: "grand" },
  { label: "Biaya administrasi top up GoPay", amount: totals.opex, kind: "item" },
  { label: "Total beban operasional", amount: totals.opex, kind: "total" },
  { label: "Laba bersih usaha", amount: totals.net, kind: "grand" },
];

export const cashLines: StatementLine[] = [
  { label: "Penerimaan penjualan Batch 1", amount: totals.revenue1, kind: "item" },
  { label: "Penerimaan penjualan Batch 2", amount: totals.revenue2, kind: "item" },
  { label: "Transfer uji coba QRIS", amount: totals.qrisTest, kind: "item" },
  { label: "Total penerimaan operasi", amount: totals.cashInOps, kind: "total" },
  { label: "Biaya cetak foto Batch 1", amount: 13000, kind: "item" },
  { label: "Biaya cetak foto Batch 2", amount: 10000, kind: "item" },
  { label: "Biaya print resi Batch 1", amount: 3000, kind: "item" },
  { label: "Biaya print resi Batch 2", amount: 12000, kind: "item" },
  { label: "Biaya administrasi top up GoPay", amount: 1500, kind: "item" },
  { label: "Total pengeluaran operasi", amount: totals.cashOutOps, kind: "total" },
  { label: "Arus kas bersih dari operasi", amount: totals.cashOps, kind: "grand" },
  { label: "Pembelian bahan baku Batch 1", amount: totals.capital1, kind: "item" },
  { label: "Pembelian restock bahan baku Batch 2", amount: totals.restock, kind: "item" },
  { label: "Arus kas bersih untuk investasi", amount: totals.capital, kind: "total" },
  { label: "Penerimaan modal awal (iuran kelompok)", amount: totals.capital1, kind: "item" },
  { label: "Arus kas bersih dari pendanaan", amount: totals.capital1, kind: "total" },
  { label: "Kenaikan bersih kas", amount: totals.cashEnd, kind: "grand" },
  { label: "Saldo kas awal periode", amount: 0, kind: "item" },
  { label: "Saldo kas akhir periode", amount: totals.cashEnd, kind: "grand" },
];
