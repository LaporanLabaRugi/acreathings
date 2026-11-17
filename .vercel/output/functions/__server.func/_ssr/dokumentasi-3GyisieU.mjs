import { i as __toESM } from "../_runtime.mjs";
import { M as shots } from "./order-FPz1wTXG.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { i as SiteShell, t as PageHero } from "./site-shell-ByAuNJ0p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dokumentasi-3GyisieU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Gallery({ items }) {
	const [active, setActive] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!active) return;
		const onKey = (event) => {
			if (event.key === "Escape") setActive(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [active]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-5 grid grid-cols-2 gap-3 md:grid-cols-3",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setActive(item),
			className: "overflow-hidden rounded-2xl border border-line bg-paper text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.src,
				alt: item.alt,
				className: "aspect-4/5 w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block px-3 py-3 text-sm font-bold",
				children: item.caption
			})]
		}, item.src))
	}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "no-print fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": active.caption,
		onClick: () => setActive(null),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-paper text-ink",
			"aria-label": "Tutup gambar",
			onClick: () => setActive(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
			className: "max-h-[90vh] max-w-3xl",
			onClick: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: active.src,
				alt: active.alt,
				className: "max-h-[80vh] w-auto rounded-xl object-contain"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mt-2 text-center text-sm text-paper",
				children: active.caption
			})]
		})]
	}) : null] });
}
function Dokumentasi() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Galeri",
		title: "Foto produk dan pembeli",
		text: "Katalog, poster, dan foto penyerahan pesanan dari dua batch pre-order."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "lampiran",
		className: "mx-auto max-w-6xl space-y-14 scroll-mt-28 px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl",
				children: "Logo usaha"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid items-center gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/media/logo-acrea.jpg",
					alt: "Logo Acrea Things dengan lingkar bunga",
					className: "w-full rounded-2xl border border-line bg-paper object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/media/logo-untidar.jpg",
					alt: "Lambang Universitas Tidar",
					className: "mx-auto w-56 rounded-2xl border border-line bg-paper p-4"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl",
				children: "Katalog produk"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, { items: shots.catalog })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "Media pemasaran"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "Poster open PO, profil Instagram @acreathings, dan unggahan di komunitas."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, { items: shots.media })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl",
				children: "Batch 1"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, { items: shots.batch1 })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl",
				children: "Batch 2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, { items: shots.batch2 })] })
		]
	})] });
}
//#endregion
export { Dokumentasi as component };
