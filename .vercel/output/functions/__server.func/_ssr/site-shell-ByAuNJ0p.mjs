import { i as __toESM } from "../_runtime.mjs";
import { h as identity, n as WHATSAPP_NUMBER, t as WHATSAPP_LABEL, y as lecturers } from "./order-FPz1wTXG.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Printer, l as MessageCircle, t as X, u as Menu } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-shell-ByAuNJ0p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/",
		label: "Beranda"
	},
	{
		to: "/tentang",
		label: "Tentang"
	},
	{
		to: "/produk",
		label: "Produk"
	},
	{
		to: "/organisasi",
		label: "Organisasi"
	},
	{
		to: "/laporan",
		label: "Keuangan"
	},
	{
		to: "/dokumentasi",
		label: "Dokumentasi"
	}
];
function isActive(path, to) {
	if (to === "/") return path === "/";
	return path === to || path.startsWith(to + "/");
}
function SiteShell({ children }) {
	const path = useRouterState({ select: (state) => state.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [path]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "no-print sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-5 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex min-w-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/media/logo-acrea.jpg",
								alt: "Logo Acrea Things",
								className: "size-11 shrink-0 rounded-full border border-line object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-lg leading-none text-rose-deep",
									children: "Acrea Things"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-xs text-muted",
									children: "Bag charm custom"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 lg:flex",
							"aria-label": "Utama",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: "rounded-md px-3 py-2 text-sm font-bold " + (isActive(path, item.to) ? "bg-blush text-rose-deep" : "text-ink hover:bg-blush"),
								children: item.label
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/pesan",
									className: "inline-flex items-center gap-2 rounded-md bg-rose-deep px-3 py-2 text-sm font-bold text-paper",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
										className: "size-4",
										"aria-hidden": true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Pesan"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => window.print(),
									className: "inline-flex items-center gap-2 rounded-md border border-line bg-paper px-3 py-2 text-sm font-bold text-rose-deep",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
										className: "size-4",
										"aria-hidden": true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Cetak"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex size-11 items-center justify-center rounded-md border border-line lg:hidden",
									"aria-expanded": open,
									"aria-label": open ? "Tutup menu" : "Buka menu",
									onClick: () => setOpen((value) => !value),
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							]
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "border-t border-line px-3 py-2 lg:hidden",
					"aria-label": "Utama",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pesan",
						className: "block rounded-md bg-rose-deep px-3 py-3 text-sm font-bold text-paper",
						children: "Pesan via WhatsApp"
					}), NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "block rounded-md px-3 py-3 text-sm font-bold " + (isActive(path, item.to) ? "bg-blush text-rose-deep" : "text-ink"),
						children: item.label
					}, item.to))]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "print-only border-b border-line px-6 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-rose-deep",
					children: "Acrea Things"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [
						"Acrea Things · Bag charm makrame dan akrilik · ",
						identity.group,
						" · ",
						identity.campus
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "pb-20",
				children
			}),
			path !== "/pesan" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/pesan",
				className: "no-print fixed right-4 bottom-4 z-30 inline-flex items-center gap-2 rounded-full bg-rose-deep px-4 py-3 text-sm font-bold text-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
					className: "size-4",
					"aria-hidden": true
				}), "Pesan"]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "no-print mt-8 bg-footer text-blush",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl text-paper",
								children: "Acrea Things"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm leading-relaxed text-paper/85",
								children: [
									"Bag charm makrame dengan huruf dan foto yang bisa disusun sendiri. ",
									identity.meaning,
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://wa.me/${WHATSAPP_NUMBER}`,
								target: "_blank",
								rel: "noreferrer",
								className: "mt-3 inline-block text-sm text-paper underline",
								children: ["WhatsApp ", WHATSAPP_LABEL]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-paper",
							children: "Menu"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-col gap-1",
							children: NAV.slice(1).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: "text-sm text-paper/85 hover:text-paper",
								children: item.label
							}, item.to))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-paper",
								children: "Pengampu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-1 text-sm text-paper/85",
								children: lecturers.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: name }, name))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-paper/85",
								children: [
									identity.program,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									identity.faculty,
									", ",
									identity.campus
								]
							})
						] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-paper/15 px-5 py-4 text-center text-xs text-paper/75",
					children: [
						"© ",
						identity.year,
						" Acrea Things · ",
						identity.group,
						" · ",
						identity.study
					]
				})]
			})
		]
	});
}
function PageHero({ kicker, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-line bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 py-10 md:py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold tracking-widest text-rose uppercase",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-2 max-w-3xl text-4xl leading-tight text-ink md:text-5xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-base text-muted md:text-lg",
					children: text
				})
			]
		})
	});
}
function SectionHeading({ kicker, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl",
		children: [
			kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-widest text-rose uppercase",
				children: kicker
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-1 text-3xl text-ink",
				children: title
			}),
			text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: text
			}) : null
		]
	});
}
function Prose({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-ink",
		children
	});
}
//#endregion
export { SiteShell as i, Prose as n, SectionHeading as r, PageHero as t };
