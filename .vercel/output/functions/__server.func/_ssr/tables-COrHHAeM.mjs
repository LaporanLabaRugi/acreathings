import { O as rp } from "./order-FPz1wTXG.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tables-COrHHAeM.js
var import_jsx_runtime = require_jsx_runtime();
var th = "bg-blush px-3 py-3 text-left text-xs font-bold text-rose-deep";
var td = "border-t border-line px-3 py-2.5 align-top tabular-nums";
function TableWrap({ caption, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "mb-2 text-sm font-bold text-ink",
			children: caption
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-line bg-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
				className: "w-full min-w-[680px] border-collapse text-sm",
				children
			})
		})]
	});
}
function HppTable({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "Varian"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "Komposisi"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "Harga satuan"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "Total HPP"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "Margin"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "Harga jual"
		})
	] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => row.lines.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
		index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td + " font-bold",
			rowSpan: row.lines.length,
			children: row.name
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td,
			children: line.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td,
			children: rp(line.amount)
		}),
		index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td + " font-bold",
			rowSpan: row.lines.length,
			children: rp(row.total)
		}) : null,
		index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td,
			rowSpan: row.lines.length,
			children: row.margin
		}) : null,
		index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td + " font-bold",
			rowSpan: row.lines.length,
			children: rp(row.sell)
		}) : null
	] }, row.name + line.name))) })] });
}
function SalesTable({ rows, totalQty, totalRp }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "Varian"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "Kuantitas"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "Total penjualan"
		})
	] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td,
			children: row.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td,
			children: row.qty
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td,
			children: rp(row.total)
		})
	] }, row.name)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "bg-blush font-bold",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: td,
				children: "Total penjualan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: td,
				children: totalQty
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: td,
				children: rp(totalRp)
			})
		]
	})] })] });
}
function SoldTable({ rows, total }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "Varian terjual"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "Kuantitas"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "HPP satuan"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: th,
			children: "Total"
		})
	] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td,
			children: row.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td,
			children: row.qty
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td,
			children: rp(row.unit)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td,
			children: rp(row.total)
		})
	] }, row.name)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "bg-blush font-bold",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td,
			colSpan: 3,
			children: "Total HPP produk terjual"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: td,
			children: rp(total)
		})]
	})] })] });
}
function Statement({ lines }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-5 overflow-hidden rounded-xl border border-line bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
			className: "w-full border-collapse text-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: line.kind === "grand" ? "bg-blush font-bold" : line.kind === "total" ? "font-bold" : "",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: td + (line.kind === "item" ? "" : " text-ink"),
					children: line.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: td + " text-right",
					children: line.amount === void 0 ? "" : rp(line.amount)
				})]
			}, line.label)) })
		})
	});
}
//#endregion
export { TableWrap as a, Statement as i, SalesTable as n, td as o, SoldTable as r, th as s, HppTable as t };
