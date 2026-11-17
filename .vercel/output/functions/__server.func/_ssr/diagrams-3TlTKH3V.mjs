import { i as bmc, l as flow, x as members } from "./order-FPz1wTXG.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagrams-3TlTKH3V.js
var import_jsx_runtime = require_jsx_runtime();
function bmcBlock(title) {
	return bmc.find((item) => item.title === title);
}
function CanvasCell({ title, text, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "h-full rounded-2xl border border-line bg-paper p-4 " + className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-bold text-rose-deep",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed",
			children: text
		})]
	});
}
function BusinessCanvas() {
	const cell = (title) => {
		const block = bmcBlock(title);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasCell, {
			title,
			text: block?.text ?? ""
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:row-span-2",
					children: cell("Key Partners")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [cell("Key Activities"), cell("Key Resources")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:row-span-2",
					children: cell("Value Propositions")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [cell("Customer Relationships"), cell("Channels")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:row-span-2",
					children: cell("Customer Segments")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: [cell("Cost Structure"), cell("Revenue Streams")]
		})]
	});
}
var roles = [
	"Keuangan",
	"Pemasaran",
	"Operasional",
	"Pelayanan"
];
function OrgChart({ jobs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-fit rounded-full bg-rose-deep px-5 py-3 text-sm font-bold text-paper",
				children: "Acrea Things"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-6 w-px bg-line" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: roles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl border border-line bg-paper p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl",
							children: role
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: jobs[role]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-1",
							children: members.filter((member) => member.role === role).map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm font-bold",
								children: member.name
							}, member.name))
						})
					]
				}, role))
			})
		]
	});
}
function BatchFlow() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "mt-6 grid gap-3 md:grid-cols-4",
		children: flow.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "relative rounded-2xl border border-line bg-paper p-5",
			children: [
				index < flow.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "absolute top-8 -right-2 hidden h-px w-4 bg-rose md:block"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-11 items-center justify-center rounded-full bg-rose-deep text-sm font-bold text-paper",
					children: index + 1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display mt-3 text-xl",
					children: item.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: item.text
				})
			]
		}, item.step))
	});
}
//#endregion
export { BusinessCanvas as n, OrgChart as r, BatchFlow as t };
