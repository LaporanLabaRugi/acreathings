import { i as __toESM } from "../_runtime.mjs";
import { A as salesBatch2, F as suggestions, I as totals, N as soldBatch1, O as rp, P as soldBatch2, g as incomeLines, k as salesBatch1, m as hppBatch2, o as cashLines, p as hppBatch1, r as batchChart } from "./order-FPz1wTXG.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SiteShell, n as Prose, r as SectionHeading, t as PageHero } from "./site-shell-ByAuNJ0p.mjs";
import { a as TableWrap, i as Statement, n as SalesTable, r as SoldTable, t as HppTable } from "./tables-COrHHAeM.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/laporan-CltGtozb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChartTip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-paper px-3 py-2 text-sm shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-bold",
			children: label
		}), payload.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-muted",
			children: [
				item.name,
				": ",
				rp(item.value ?? 0)
			]
		}, item.name))]
	});
}
function BatchChart() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-72 rounded-2xl border border-line bg-paper" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-72 rounded-2xl border border-line bg-paper p-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: batchChart,
				barGap: 6,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 12
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tickFormatter: (value) => `${Math.round(value / 1e3)} rb`,
						tick: {
							fill: "var(--color-muted)",
							fontSize: 12
						},
						axisLine: false,
						tickLine: false,
						width: 52
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, {}),
						cursor: { fill: "var(--color-blush)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "penjualan",
						name: "Penjualan",
						fill: "var(--color-rose)",
						radius: [
							6,
							6,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "hpp",
						name: "HPP terjual",
						fill: "var(--color-rose-deep)",
						radius: [
							6,
							6,
							0,
							0
						]
					})
				]
			})
		})
	});
}
function Laporan() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Keuangan",
		title: "Modal kembali, lalu berputar sendiri",
		text: "Omzet naik dari Rp349.000 di Batch 1 menjadi Rp427.000 di Batch 2. Laba bersih dua batch sebesar Rp334.919, atau 43,1% dari pendapatan."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-14 px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "anggaran",
				className: "scroll-mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 md:grid-cols-4",
					children: [
						["Pendapatan", rp(totals.revenue)],
						["HPP terjual", rp(totals.hpp)],
						["Laba bersih", rp(totals.net)],
						["Saldo kas", rp(totals.cashEnd)]
					].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line bg-paper px-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold tracking-widest text-rose uppercase",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display mt-2 text-xl text-ink md:text-2xl",
							children: value
						})]
					}, label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchChart, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							"Batang muda adalah penjualan, batang tua adalah HPP produk yang terjual. Laba kotor Batch 1",
							" ",
							rp(totals.gross1),
							", Batch 2 ",
							rp(totals.gross2),
							"."
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "asumsi",
				className: "scroll-mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Asumsi perhitungan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 grid gap-3 md:grid-cols-2",
					children: [
						"HPP dihitung terpisah per batch karena harga carabiner, huruf akrilik, dan tali makrame berubah saat restock.",
						"Bahan yang tidak dibeli lagi di Batch 2 — frame akrilik, plastik zipper, stiker logo, dan lobster hook — memakai harga beli Batch 1.",
						"Cetak foto dan kemasan kiriman (polymailer, bubble wrap, dan cetak resi) sebesar Rp1.352 per paket dimasukkan ke HPP produk terjual.",
						"Produksi dikerjakan manual oleh anggota. Kompensasi tenaga kerja tidak dibebankan sebagai biaya harian, melainkan dialokasikan dari laba bersih."
					].map((text, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border border-line bg-paper p-4 text-sm leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold text-rose-deep",
							children: [index + 1, ". "]
						}), text]
					}, text))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "hpp",
				className: "scroll-mt-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						title: "HPP dan harga jual Batch 1",
						text: "Modal bahan per unit berkisar Rp2.685 sampai Rp7.708. Margin kotor berada di kisaran 35% sampai 49%."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, {
						caption: "Perhitungan HPP Batch 1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HppTable, { rows: hppBatch1 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							title: "HPP dan harga jual Batch 2",
							text: "Harga jual dipertahankan. Kenaikan biaya makrame membuat margin beberapa varian sedikit menyempit."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, {
						caption: "Perhitungan HPP Batch 2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HppTable, { rows: hppBatch2 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "penjualan",
				className: "scroll-mt-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						title: "Penjualan dua batch",
						text: "Batch 1 menjual 27 unit. Batch 2 naik menjadi 35 unit. Basic baru laku di batch kedua."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, {
						caption: "Penjualan Batch 1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesTable, {
							rows: salesBatch1,
							totalQty: totals.units1,
							totalRp: totals.revenue1
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, {
						caption: "HPP terjual Batch 1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoldTable, {
							rows: soldBatch1,
							total: totals.hpp1
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [
							"Pendapatan Batch 1 ",
							rp(totals.revenue1),
							" dikurangi HPP ",
							rp(totals.hpp1),
							" menghasilkan laba kotor",
							" ",
							rp(totals.gross1),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, {
						caption: "Penjualan Batch 2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesTable, {
							rows: salesBatch2,
							totalQty: totals.units2,
							totalRp: totals.revenue2
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableWrap, {
						caption: "HPP terjual Batch 2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoldTable, {
							rows: soldBatch2,
							total: totals.hpp2
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [
							"Pendapatan Batch 2 ",
							rp(totals.revenue2),
							" dikurangi HPP ",
							rp(totals.hpp2),
							" menghasilkan laba kotor",
							" ",
							rp(totals.gross2),
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "bep",
				className: "scroll-mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Titik impas" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-2xl border border-line bg-paper p-5 md:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed",
							children: "BEP (unit) = total modal bahan baku / rata-rata harga jual"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display mt-3 text-2xl text-rose-deep md:text-3xl",
							children: [
								rp(totals.capital),
								" / ",
								rp(totals.avgPrice),
								" = ",
								totals.bepUnits,
								" unit"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-muted",
							children: [
								"Modal bahan adalah pembelian Batch 1 ",
								rp(totals.capital1),
								" ditambah restock Batch 2",
								" ",
								rp(totals.restock),
								". Rata-rata harga jual dihitung dari seluruh penjualan dua batch (",
								rp(totals.revenue),
								" / ",
								totals.units,
								" unit)."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-3 overflow-hidden rounded-full bg-blush",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-rose",
									style: { width: "100%" }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm",
								children: [
									"Realisasi ",
									totals.units,
									" unit sudah melewati titik impas ",
									totals.bepUnits,
									" unit. Penerimaan",
									" ",
									rp(totals.revenue),
									" menutup ",
									totals.coverRatio,
									" dari total modal bahan."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pengembalian modal lebih cepat dari proyeksi rata-rata karena penjualan didominasi varian bernilai lebih tinggi, yaitu Complete (Rp15.000) dan Combo Foto (Rp12.000). Usaha juga masih menyimpan sisa bahan baku untuk periode berikutnya." }) })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "labarugi",
				className: "scroll-mt-28 print-break",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						title: "Laba rugi",
						text: "Acrea Things · untuk periode yang berakhir Oktober 2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Statement, { lines: incomeLines }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Setelah pendapatan ",
						rp(totals.revenue),
						" dikurangi beban pokok ",
						rp(totals.hpp),
						" dan biaya administrasi ",
						rp(totals.opex),
						", laba bersih usaha tercatat ",
						rp(totals.net),
						"."
					] }) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "aruskas",
				className: "scroll-mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					title: "Arus kas",
					text: `Acrea Things · per 2 Oktober 2026. Modal awal iuran terpakai untuk belanja Batch 1. Restock Batch 2 memakai hasil penjualan, tanpa modal dari luar.`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Statement, { lines: cashLines })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "evaluasi",
				className: "scroll-mt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Evaluasi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Kinerja dua batch sesuai harapan dan menunjukkan tren positif. Omzet naik sekitar ",
					totals.growth,
					", dari ",
					rp(totals.revenue1),
					" menjadi ",
					rp(totals.revenue2),
					". Akumulasi pendapatan ",
					rp(totals.revenue),
					" ",
					"menghasilkan laba bersih ",
					rp(totals.net),
					", setara margin ",
					totals.netMargin,
					"."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Arus kas sudah dikelola secara mandiri. Iuran kelompok ",
					rp(totals.capital1),
					" kembali sepenuhnya, dan restock ",
					rp(totals.restock),
					" murni dari hasil Batch 1. Per 2 Oktober 2026 saldo kas masih",
					" ",
					rp(totals.cashEnd),
					", ditambah persediaan bahan yang belum terpakai. Posisi ini sehat untuk modal operasional batch berikutnya."
				] })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "penutup",
				className: "scroll-mt-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Kesimpulan" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Acrea Things adalah usaha bag charm yang memadukan tali makrame dengan elemen akrilik custom. Modelnya B2C dengan sistem pre-order: bahan disiapkan di awal batch, lalu pemasaran dan penjualan dilakukan online melalui Instagram, WhatsApp, dan Shopee." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Dua batch menghasilkan ",
							totals.units,
							" unit, pendapatan ",
							rp(totals.revenue),
							", dan laba bersih",
							" ",
							rp(totals.net),
							". Penerimaan Batch 1 cukup untuk membiayai bahan Batch 2 sebesar",
							" ",
							rp(totals.restock),
							" tanpa modal tambahan. Arus kas usaha sehat, efisien, dan mandiri."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Secara keseluruhan, Acrea Things menjadi sarana yang efektif untuk melatih kewirausahaan anggota kelompok, mulai dari perencanaan produk, produksi, pemasaran digital, hingga pengelolaan keuangan." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Saran" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-5 grid gap-3",
						children: suggestions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl border border-line bg-paper p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: item.text
							})]
						}, item.title))
					})
				]
			})
		]
	})] });
}
//#endregion
export { Laporan as component };
