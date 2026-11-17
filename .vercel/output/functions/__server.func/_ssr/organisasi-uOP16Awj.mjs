import { R as weeks, h as identity } from "./order-FPz1wTXG.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SiteShell, n as Prose, r as SectionHeading, t as PageHero } from "./site-shell-ByAuNJ0p.mjs";
import { r as OrgChart, t as BatchFlow } from "./diagrams-3TlTKH3V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/organisasi-uOP16Awj.js
var import_jsx_runtime = require_jsx_runtime();
var jobs = {
	Operasional: "Mengatur pembelian bahan baku, perakitan produk, dan proses produksi.",
	Pelayanan: "Menerima dan merekap pesanan, serta memperbarui stok bahan baku.",
	Keuangan: "Menerima pembayaran, mengelola, dan mencatat keuangan.",
	Pemasaran: "Mempromosikan produk dan mengelola konten media sosial."
};
function Organisasi() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Tim",
		title: "Dikerjakan dari rumah, dijual lewat pre-order",
		text: "Karena jadwal kuliah dan efisiensi biaya, Acrea Things belum membuka toko fisik. Perakitan, cetak foto, dan packing berpusat di Magelang."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-14 px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "operasional",
				className: "scroll-mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Lokasi dan cara menjual" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Kegiatan berjalan secara home-based di ",
					identity.city,
					". Penjualan online memakai sistem pre-order lewat Instagram (",
					identity.instagram,
					") dan WhatsApp. Pesanan luar kota diproses melalui Shopee."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Modal Batch 1 untuk tali makrame, pengait, huruf akrilik, frame foto, dan perlengkapan packing berasal dari iuran bersama. Restock Batch 2 sudah dibiayai dari perputaran kas penjualan Batch 1. Gunting, perlengkapan cetak foto, polymailer, dan cetak resi dipakai untuk memperlancar pengerjaan sampai barang siap kirim." })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "tugas",
				className: "scroll-mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					title: "Siapa mengerjakan apa",
					text: "Setiap peran dijalankan selama produksi dan penjualan."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgChart, { jobs })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "jadwal",
				className: "scroll-mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					title: "Sepuluh minggu",
					text: "Jadwal menyesuaikan kuliah. Penjualan rutin berjalan sejak pre-order dibuka."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 space-y-3",
					children: weeks.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[auto_1fr] items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex min-h-11 min-w-11 items-center justify-center rounded-full bg-blush px-2 text-sm font-bold text-rose-deep",
							children: row.week
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pt-2 text-sm",
							children: row.task
						})]
					}, row.week))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "alur",
				className: "scroll-mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Alur satu batch" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchFlow, {})]
			})
		]
	})] });
}
//#endregion
export { Organisasi as component };
