import { I as totals, O as rp, h as identity, s as colorways, x as members } from "./order-FPz1wTXG.mjs";
import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as MapPin, f as ArrowRight, n as Wallet, s as Palette } from "../_libs/lucide-react.mjs";
import { i as SiteShell } from "./site-shell-ByAuNJ0p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CBMvDnno.js
var import_jsx_runtime = require_jsx_runtime();
var contents = [
	{
		href: "/tentang",
		hash: "latar",
		label: "Cerita",
		title: "Kenapa Acrea ada"
	},
	{
		href: "/tentang",
		hash: "model",
		label: "Model",
		title: "Cara usaha berjalan"
	},
	{
		href: "/produk",
		hash: "produk",
		label: "Produk",
		title: "Paket dan harga"
	},
	{
		href: "/tentang",
		hash: "pasar",
		label: "Pembeli",
		title: "Siapa yang memesan"
	},
	{
		href: "/tentang",
		hash: "pemasaran",
		label: "Promosi",
		title: "Cara dikenal"
	},
	{
		href: "/organisasi",
		hash: "operasional",
		label: "Tim",
		title: "Siapa mengerjakan apa"
	},
	{
		href: "/laporan",
		hash: "anggaran",
		label: "Angka",
		title: "Penjualan dan laba"
	},
	{
		href: "/dokumentasi",
		hash: "lampiran",
		label: "Galeri",
		title: "Foto dan katalog"
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line bg-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[1.15fr_0.85fr] md:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-bold tracking-widest text-rose uppercase",
						children: ["Handmade · ", identity.city]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-3 text-4xl leading-tight text-ink md:text-6xl",
						children: "Bag charm yang bisa disusun sendiri"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 max-w-xl text-lg text-muted",
						children: [
							"Acrea Things memadukan tali makrame dengan huruf akrilik dan frame foto. Dari dua batch pre-order, ",
							totals.units,
							" charm terjual dan ",
							totals.customShare,
							" di antaranya memuat elemen custom."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/pesan",
							className: "inline-flex items-center gap-2 rounded-md bg-rose-deep px-4 py-3 text-sm font-bold text-paper",
							children: ["Pesan via WhatsApp", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "size-4",
								"aria-hidden": true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/produk",
							className: "inline-flex items-center rounded-md bg-blush px-4 py-3 text-sm font-bold text-rose-deep",
							children: "Lihat produk"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/media/b1-produk.jpg",
					alt: "Deretan bag charm Acrea Things yang sudah dikemas",
					className: "aspect-4/5 w-full rounded-2xl border border-line object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
					className: "mt-2 text-sm text-muted",
					children: "Batch 1, siap diserahkan dan dikirim."
				})] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-5 py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 divide-x divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper md:grid-cols-4 md:divide-y-0",
				children: [
					{
						value: String(totals.units),
						label: "Unit terjual"
					},
					{
						value: rp(totals.revenue),
						label: "Total pendapatan"
					},
					{
						value: rp(totals.net),
						label: "Laba bersih"
					},
					{
						value: totals.netMargin,
						label: "Margin laba bersih"
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-rose-deep md:text-3xl",
						children: item.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: item.label
					})]
				}, item.label))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-ink",
					children: "Pilih warna, lalu pesan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Sepuluh kombinasi dari katalog. Ketuk warna untuk mulai menyusun pesanan."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/pesan",
					className: "shrink-0 text-sm font-bold text-rose-deep",
					children: "Penyusun"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2",
				children: colorways.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/pesan",
					search: { warna: item.name },
					className: "w-36 shrink-0 overflow-hidden rounded-xl border border-line bg-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.src,
						alt: "",
						className: "aspect-4/5 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block px-2 py-2 text-sm font-bold",
						children: [item.name, item.name === "Carat" ? " · favorit" : ""]
					})]
				}, item.name))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-5 pb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-center gap-8 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/media/logo-acrea.jpg",
					alt: "Logo Acrea Things",
					className: "mx-auto w-full max-w-sm rounded-2xl border border-line bg-paper object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold tracking-widest text-rose uppercase",
						children: "Tentang usaha"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-2 text-3xl text-ink",
						children: "Acrylic and Create"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted",
						children: [
							"Nama Acrea merangkum dua bahan utamanya: akrilik custom dan tali makrame. Konsumen memilih paket, warna, pengait, huruf, dan desain foto, sehingga setiap charm bersifat personal. Penjualan dilakukan pre-order dari rumah di ",
							identity.city,
							", lewat Instagram ",
							identity.instagram,
							" ",
							"dan WhatsApp. Pesanan luar kota dikirim melalui Shopee."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/tentang",
						className: "mt-4 inline-flex items-center gap-2 font-bold text-rose-deep",
						children: ["Selengkapnya", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "size-4",
							"aria-hidden": true
						})]
					})
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-ink",
					children: "Yang membedakan Acrea"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: "Dari 62 produk terjual, 55 memakai elemen custom dan 45 di antaranya memuat foto."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 md:grid-cols-3",
					children: [
						{
							icon: Palette,
							title: "Bisa disesuaikan",
							text: "Tiga paket, sepuluh warna bertema, tiga pengait, huruf inisial, dan 24 desain photostrip."
						},
						{
							icon: Wallet,
							title: "Harga pelajar",
							text: "Harga jual Rp5.000–Rp15.000. Di Batch 2 harga tidak dinaikkan meskipun biaya makrame naik."
						},
						{
							icon: MapPin,
							title: "Sampai luar Jawa",
							text: "Pemasaran berpusat di Magelang, tetapi pesanan datang dari Jabodetabek hingga luar Pulau Jawa."
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-line bg-paper p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-11 items-center justify-center rounded-full bg-blush text-rose-deep",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
									className: "size-5",
									"aria-hidden": true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display mt-4 text-xl",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: item.text
							})
						]
					}, item.title))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-ink",
					children: "Tiga paket"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/produk",
					className: "text-sm font-bold text-rose-deep",
					children: "Daftar harga"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-3",
				children: [
					{
						name: "Basic",
						price: "Rp5.000",
						text: "Charm makrame dan satu pilihan pengait, tanpa elemen custom.",
						sold: "7 unit"
					},
					{
						name: "Combo",
						price: "Rp12.000",
						text: "Makrame ditambah satu elemen: huruf akrilik atau frame foto.",
						sold: "31 unit"
					},
					{
						name: "Complete",
						price: "Rp15.000",
						text: "Huruf akrilik dan frame foto pada satu charm yang sama.",
						sold: "24 unit"
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl border border-line bg-paper p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold tracking-widest text-rose uppercase",
							children: item.sold
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display mt-2 text-2xl",
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-xl text-rose-deep",
							children: item.price
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: item.text
						})
					]
				}, item.name))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-ink",
					children: "Jelajahi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted",
					children: "Dari cerita usaha sampai foto pesanan yang sudah sampai."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: contents.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.href,
						hash: item.hash,
						className: "rounded-xl border border-line bg-paper px-4 py-4 hover:border-rose",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold tracking-widest text-rose uppercase",
							children: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-bold",
							children: item.title
						})]
					}, item.title))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-5 pb-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-line bg-paper p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold tracking-widest text-rose uppercase",
						children: "Tim"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-2 text-3xl",
						children: "Lima orang, empat peran"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							identity.group,
							" · ",
							identity.campus
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 grid gap-2 sm:grid-cols-2",
						children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between gap-3 border-b border-line py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: member.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: member.role
							})]
						}, member.name))
					})
				]
			})
		})
	] });
}
//#endregion
export { Home as component };
