import { i as __toESM } from "../_runtime.mjs";
import { C as needsPhoto, E as pakets, L as unitPrice, O as rp, S as needsLetter, T as paketLabel, a as cartTotal, b as lineTotal, c as describeItem, d as hookLabel, f as hooks, j as ships, s as colorways, t as WHATSAPP_LABEL, u as frameSrc, v as isPaketId, w as orderMessage, z as whatsappUrl } from "./order-FPz1wTXG.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Minus, i as Trash2, o as Plus } from "../_libs/lucide-react.mjs";
import { i as SiteShell, t as PageHero } from "./site-shell-ByAuNJ0p.mjs";
import { n as Route$2 } from "./router-DDiUtDgg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pesan-C6db4JPU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CART_KEY = "acrea-cart";
function loadCart() {
	try {
		const raw = localStorage.getItem(CART_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(isCartItem);
	} catch {
		return [];
	}
}
function isCartItem(value) {
	if (!value || typeof value !== "object") return false;
	const item = value;
	return typeof item.id === "string" && isPaketId(item.paket) && typeof item.qty === "number";
}
function CharmPreview({ paket, hook, color, letter, frame, price }) {
	const shot = colorways.find((item) => item.name === color) ?? colorways[2];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-paper p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-widest text-rose uppercase",
				children: "Pratinjau"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: shot.src,
					alt: `Makrame warna ${shot.name}`,
					className: "aspect-4/5 w-2/5 rounded-xl border border-line object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl leading-tight",
							children: paketLabel(paket)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								shot.name,
								" · ",
								hookLabel(hook)
							]
						}),
						needsLetter(paket) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl " + (letter.trim() ? "text-rose-deep" : "text-muted"),
							children: letter.trim() ? letter.trim().toUpperCase() : "Aa"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Tanpa huruf akrilik"
						}),
						needsPhoto(paket) && frame ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: frameSrc(frame),
							alt: `Desain photostrip ${frame}`,
							className: "h-28 w-full rounded-lg border border-line bg-blush object-contain"
						}) : null,
						needsPhoto(paket) && !frame ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Desain foto bisa dipilih, atau dikirim nanti di chat."
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-auto font-display text-2xl text-rose-deep",
							children: rp(price)
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted",
				children: "Contoh warna dari katalog, bukan foto pesanan yang sudah jadi."
			})
		]
	});
}
function Pesan() {
	const search = Route$2.useSearch();
	const [paket, setPaket] = (0, import_react.useState)(search.paket ?? "complete");
	const [hook, setHook] = (0, import_react.useState)("carabiner");
	const [color, setColor] = (0, import_react.useState)(search.warna ?? "Carat");
	const [letter, setLetter] = (0, import_react.useState)("");
	const [frame, setFrame] = (0, import_react.useState)(null);
	const [qty, setQty] = (0, import_react.useState)(1);
	const [name, setName] = (0, import_react.useState)("");
	const [ship, setShip] = (0, import_react.useState)("cod");
	const [note, setNote] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [cart, setCart] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [added, setAdded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (search.paket) setPaket(search.paket);
		if (search.warna) setColor(search.warna);
	}, [search.paket, search.warna]);
	(0, import_react.useEffect)(() => {
		setCart(loadCart());
	}, []);
	(0, import_react.useEffect)(() => {
		if (cart === null) return;
		localStorage.setItem(CART_KEY, JSON.stringify(cart));
	}, [cart]);
	const items = cart ?? [];
	const draftPrice = unitPrice(paket, hook);
	const message = (0, import_react.useMemo)(() => orderMessage({
		name: name || "—",
		ship,
		note,
		items
	}), [
		name,
		ship,
		note,
		items
	]);
	function addItem() {
		if (needsLetter(paket) && letter.trim().length === 0) {
			setError("Isi inisial huruf dulu.");
			return;
		}
		setError("");
		const item = {
			id: crypto.randomUUID(),
			paket,
			hook,
			color,
			letter: needsLetter(paket) ? letter.trim().toUpperCase() : "",
			frame: needsPhoto(paket) ? frame : null,
			qty
		};
		setCart((prev) => [...prev ?? [], item]);
		setLetter("");
		setQty(1);
		setAdded(true);
		window.setTimeout(() => setAdded(false), 1400);
	}
	function updateQty(id, next) {
		setCart((prev) => (prev ?? []).map((item) => item.id === id ? {
			...item,
			qty: next
		} : item));
	}
	function removeItem(id) {
		setCart((prev) => (prev ?? []).filter((item) => item.id !== id));
	}
	function send() {
		if (!name.trim()) {
			setError("Isi nama pemesan dulu.");
			return;
		}
		if (items.length === 0) {
			setError("Tambahkan minimal satu charm.");
			return;
		}
		setError("");
		const text = orderMessage({
			name,
			ship,
			note,
			items
		});
		window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
	}
	async function copyMessage() {
		if (items.length === 0) return;
		try {
			await navigator.clipboard.writeText(orderMessage({
				name: name || "—",
				ship,
				note,
				items
			}));
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setError("Pesan belum tersalin. Pakai tombol WhatsApp.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "Pre-order",
		title: "Susun charm, lalu kirim ke WhatsApp",
		text: `Pilih paket, warna, dan pengait. Pesanan terbuka di chat ${WHATSAPP_LABEL}. Pembayaran QRIS atau COD.`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1.15fr_0.85fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharmPreview, {
						paket,
						hook,
						color,
						letter,
						frame,
						price: draftPrice * qty
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "font-display text-2xl",
					children: "Paket"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2 sm:grid-cols-2",
					children: pakets.map((item) => {
						const selected = paket === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": selected,
							onClick: () => setPaket(item.id),
							className: "rounded-xl border px-4 py-3 text-left " + (selected ? "border-rose bg-blush" : "border-line bg-paper"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-bold",
									children: item.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-sm text-muted",
									children: item.hint
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 block text-sm font-bold text-rose-deep",
									children: item.id === "basic" ? "Rp5.000–Rp8.000" : rp(unitPrice(item.id, "carabiner"))
								})
							]
						}, item.id);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "font-display text-2xl",
					children: "Pengait"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: hooks.map((item) => {
						const selected = hook === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": selected,
							onClick: () => setHook(item.id),
							className: "rounded-full border px-4 py-2 text-sm font-bold " + (selected ? "border-rose bg-rose-deep text-paper" : "border-line bg-paper"),
							children: [item.label, paket === "basic" ? ` · ${rp(item.basic)}` : ""]
						}, item.id);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "font-display text-2xl",
					children: "Warna makrame"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5",
					children: colorways.map((item) => {
						const selected = color === item.name;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": selected,
							onClick: () => setColor(item.name),
							className: "overflow-hidden rounded-xl border text-left " + (selected ? "border-rose-deep bg-blush" : "border-line bg-paper"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.src,
								alt: "",
								className: "aspect-4/5 w-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block px-2 py-2 text-xs font-bold",
								children: [item.name, item.name === "Carat" ? " · favorit" : ""]
							})]
						}, item.name);
					})
				})] }),
				needsLetter(paket) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl",
						children: "Inisial"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: letter,
						maxLength: 2,
						onChange: (event) => setLetter(event.target.value),
						placeholder: "Contoh: A",
						className: "mt-3 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base"
					})]
				}) : null,
				needsPhoto(paket) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "font-display text-2xl",
						children: "Desain photostrip"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Opsional. Fotonya dikirim menyusul di chat WhatsApp."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": frame === null,
							onClick: () => setFrame(null),
							className: "col-span-3 flex min-h-11 items-center justify-center rounded-lg border px-2 py-2 text-sm font-bold sm:col-span-2 " + (frame === null ? "border-rose-deep bg-rose-deep text-paper" : "border-line bg-paper"),
							children: "Nanti di chat"
						}), Array.from({ length: 24 }, (_, index) => index + 1).map((number) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": frame === number,
							onClick: () => setFrame(number),
							className: "overflow-hidden rounded-lg border " + (frame === number ? "border-rose-deep bg-blush" : "border-line bg-paper"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: frameSrc(number),
								alt: "",
								className: "aspect-4/5 w-full bg-blush object-contain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block py-1 text-center text-xs font-bold tabular-nums",
								children: number
							})]
						}, number))]
					})
				] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-paper p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Harga satuan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl text-rose-deep",
							children: rp(draftPrice)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Kurangi jumlah",
									disabled: qty <= 1,
									onClick: () => setQty((value) => Math.max(1, value - 1)),
									className: "inline-flex size-11 items-center justify-center rounded-md border border-line disabled:opacity-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-8 text-center font-bold tabular-nums",
									children: qty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Tambah jumlah",
									disabled: qty >= 10,
									onClick: () => setQty((value) => Math.min(10, value + 1)),
									className: "inline-flex size-11 items-center justify-center rounded-md border border-line disabled:opacity-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: addItem,
							className: "rounded-md bg-rose-deep px-4 py-3 text-sm font-bold text-paper",
							children: ["Tambah · ", rp(draftPrice * qty)]
						})
					]
				}),
				added ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold text-rose-deep",
					children: "Masuk ke daftar pesanan."
				}) : null,
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold text-rose-deep",
					children: error
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "h-fit space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden lg:sticky lg:top-24 lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharmPreview, {
						paket,
						hook,
						color,
						letter,
						frame,
						price: draftPrice * qty
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-line bg-paper p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Pesanan"
						}),
						items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "Belum ada charm. Susun di sebelah kiri, lalu tambahkan."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 divide-y divide-line",
							children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: colorways.find((swatch) => swatch.name === item.color)?.src ?? colorways[2].src,
										alt: "",
										className: "size-14 shrink-0 rounded-lg border border-line object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-bold",
												children: describeItem(item)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-rose-deep",
												children: rp(lineTotal(item))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														"aria-label": `Kurangi ${paketLabel(item.paket)}`,
														disabled: item.qty <= 1,
														onClick: () => updateQty(item.id, item.qty - 1),
														className: "inline-flex size-11 items-center justify-center rounded-md border border-line disabled:opacity-40",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm tabular-nums",
														children: item.qty
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														"aria-label": `Tambah ${paketLabel(item.paket)}`,
														disabled: item.qty >= 10,
														onClick: () => updateQty(item.id, item.qty + 1),
														className: "inline-flex size-11 items-center justify-center rounded-md border border-line disabled:opacity-40",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" })
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "Hapus item",
										onClick: () => removeItem(item.id),
										className: "inline-flex size-11 items-center justify-center rounded-md text-rose-deep",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})
								]
							}, item.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 flex items-baseline justify-between border-t border-line pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl text-rose-deep",
								children: rp(cartTotal(items))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-3 rounded-2xl border border-line bg-paper p-5",
					onSubmit: (event) => {
						event.preventDefault();
						send();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-bold",
							children: ["Nama", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (event) => setName(event.target.value),
								required: true,
								className: "mt-1 w-full rounded-xl border border-line px-4 py-3 font-normal",
								placeholder: "Nama pemesan"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-sm font-bold",
							children: "Pengiriman"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-1 gap-2",
							children: ships.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "ship",
									checked: ship === item.id,
									onChange: () => setShip(item.id)
								}), item.label]
							}, item.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-bold",
							children: ["Catatan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: note,
								onChange: (event) => setNote(event.target.value),
								rows: 3,
								className: "mt-1 w-full rounded-xl border border-line px-4 py-3 font-normal",
								placeholder: "Contoh: untuk hadiah wisuda"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: items.length > 0 ? whatsappUrl(orderMessage({
								name: name.trim(),
								ship,
								note,
								items
							})) : void 0,
							target: "_blank",
							rel: "noreferrer",
							"aria-disabled": items.length === 0,
							onClick: (event) => {
								if (!name.trim() || items.length === 0) {
									event.preventDefault();
									setError(items.length === 0 ? "Tambahkan minimal satu charm." : "Isi nama pemesan dulu.");
								} else setError("");
							},
							className: "block w-full rounded-md bg-rose-deep px-4 py-3 text-center text-sm font-bold text-paper " + (items.length === 0 ? "pointer-events-none opacity-40" : ""),
							children: "Pesan via WhatsApp"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: copyMessage,
							disabled: items.length === 0,
							className: "w-full rounded-md bg-blush px-4 py-3 text-sm font-bold text-rose-deep disabled:opacity-40",
							children: copied ? "Pesan tersalin" : "Salin pesan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								"Chat ke ",
								WHATSAPP_LABEL,
								". ",
								needsPhoto(paket) ? "Kalau ada foto, kirim gambarnya setelah chat terbuka." : "Pengait " + hookLabel(hook) + " bisa diganti sebelum ditambahkan."
							]
						})
					]
				}),
				items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "overflow-x-auto rounded-2xl border border-line bg-blush p-4 text-xs leading-relaxed whitespace-pre-wrap text-ink",
					children: message
				}) : null
			]
		})]
	})] });
}
//#endregion
export { Pesan as component };
