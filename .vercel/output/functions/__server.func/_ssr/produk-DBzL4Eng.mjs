import { D as prices, I as totals, M as shots, O as rp, s as colorways } from "./order-FPz1wTXG.mjs";
import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SiteShell, n as Prose, r as SectionHeading, t as PageHero } from "./site-shell-ByAuNJ0p.mjs";
import { a as TableWrap, o as td, s as th } from "./tables-COrHHAeM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produk-DBzL4Eng.js
var import_jsx_runtime = require_jsx_runtime();
var mix = [
	{
		name: "Complete",
		qty: totals.complete,
		tone: "bg-rose"
	},
	{
		name: "Combo Foto",
		qty: totals.comboPhoto,
		tone: "bg-rose/70"
	},
	{
		name: "Combo Huruf",
		qty: totals.comboLetter,
		tone: "bg-rose/45"
	},
	{
		name: "Basic",
		qty: totals.basic,
		tone: "bg-line"
	}
];
function Produk() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Katalog",
		title: "Charm makrame yang dirakit sesuai pesanan",
		text: "Bunga rajutan dengan rumbai warna-warni, bisa dilengkapi huruf akrilik atau frame foto. Charm dibeli dalam keadaan jadi, lalu dirakit bersama pengait, huruf, frame, dan kemasan."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-14 px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "produk",
				className: "scroll-mt-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Deskripsi" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Desain photostrip dibuat sendiri oleh tim dan tersedia dalam 24 pilihan. Konsumen cukup mengirim foto dan memilih desain. Setiap produk dikemas dalam zip pouch bening berstiker logo Acrea Things, siap dipakai sendiri maupun diberikan sebagai hadiah personal." }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 md:grid-cols-3",
						children: shots.catalog.map((shot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "overflow-hidden rounded-2xl border border-line bg-paper",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: shot.src,
								alt: shot.alt,
								className: "aspect-4/5 w-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
								className: "px-4 py-3 text-sm font-bold",
								children: shot.caption
							})]
						}, shot.src))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "varian",
				className: "scroll-mt-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						title: "Tiga varian",
						text: "Selama Batch 1 dan Batch 2, paket disesuaikan dengan kebutuhan dan anggaran konsumen."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 md:grid-cols-3",
						children: [
							{
								name: "Basic",
								text: "Charm makrame tanpa elemen custom. Konsumen memilih satu dari tiga pengait: ballchain, lobster hook, atau carabiner berbentuk hati.",
								links: [{
									label: "Pesan Basic",
									paket: "basic"
								}]
							},
							{
								name: "Combo",
								text: "Charm makrame dengan satu elemen custom, yaitu huruf akrilik (inisial) atau frame akrilik berisi foto.",
								links: [{
									label: "Pesan Combo Huruf",
									paket: "huruf"
								}, {
									label: "Pesan Combo Foto",
									paket: "foto"
								}]
							},
							{
								name: "Complete",
								text: "Menggabungkan huruf akrilik dan frame foto pada satu charm makrame yang sama.",
								links: [{
									label: "Pesan Complete",
									paket: "complete"
								}]
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-2xl border border-line bg-paper p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl",
									children: item.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted",
									children: item.text
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 flex flex-col items-start gap-2",
									children: item.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/pesan",
										search: { paket: link.paket },
										className: "text-sm font-bold text-rose-deep",
										children: link.label
									}, link.paket))
								})
							]
						}, item.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 rounded-2xl border border-line bg-paper p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-4 overflow-hidden rounded-full",
								children: mix.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: item.tone,
									style: { width: `${item.qty / totals.units * 100}%` },
									title: `${item.name}: ${item.qty}`
								}, item.name))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
								children: mix.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-full " + item.tone }), item.name]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold tabular-nums",
										children: [item.qty, " unit"]
									})]
								}, item.name))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: "Paket dengan elemen custom berjumlah 55 unit, atau sekitar 89% dari 62 unit yang terjual."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "warna",
				className: "scroll-mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					title: "Sepuluh warna bertema",
					text: "Penamaan mengikuti kombinasi warna yang mengingatkan pada tema tersebut. Carat adalah yang paling diminati."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5",
					children: colorways.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/pesan",
						search: { warna: item.name },
						className: "overflow-hidden rounded-xl border border-line bg-paper",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.src,
							alt: "",
							className: "aspect-4/5 w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block px-2 py-2 text-sm font-bold",
							children: [item.name, item.name === "Carat" ? " · paling diminati" : ""]
						})]
					}, item.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "harga",
				className: "scroll-mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					title: "Daftar harga",
					text: "Harga jual per unit. Pada Batch 2 harga tidak dinaikkan walaupun biaya tali makrame naik, agar minat beli tetap terjaga."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableWrap, {
					caption: "Harga jual Batch 1 dan Batch 2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: th,
							children: "Paket"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: th,
							children: "Komponen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: th,
							children: "Harga"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: prices.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: td + " font-bold",
							children: row.paket
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: td,
							children: row.item
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: td,
							children: rp(row.sell)
						})
					] }, row.item)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "keunggulan",
				className: "scroll-mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Keunggulan produk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-4 md:grid-cols-2",
					children: [
						"Konsumen bisa menambahkan inisial atau foto pribadi. Dari 62 unit, 55 memakai elemen custom dan 45 memakai frame foto.",
						"Tiga tingkat harga berhasil terjual semua. Combo (31 unit) dan Complete (24 unit) menjadi pilihan terbanyak.",
						"Sepuluh kombinasi warna, dengan Carat sebagai yang paling diminati. Kemasan zip pouch dan stiker logo seragam di kedua batch.",
						"Cocok sebagai hadiah saudara, kenang-kenangan magang, atau aksesori couple. Pesanan tetap jalan tanpa harus bertemu langsung."
					].map((text) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed",
						children: text
					}, text))
				})]
			})
		]
	})] });
}
//#endregion
export { Produk as component };
