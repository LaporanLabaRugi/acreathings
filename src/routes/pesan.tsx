import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PageHero, SiteShell } from "@/components/site-shell";
import { rp } from "@/lib/report";
import {
  type CartItem,
  type HookId,
  type PaketId,
  type ShipId,
  cartTotal,
  colorways,
  describeItem,
  frameSrc,
  hookLabel,
  hooks,
  isColorName,
  isPaketId,
  lineTotal,
  needsLetter,
  needsPhoto,
  orderMessage,
  paketLabel,
  pakets,
  ships,
  unitPrice,
  openWhatsapp,
  whatsappUrl,
  WHATSAPP_LABEL,
} from "@/lib/order";

const CART_KEY = "acrea-cart";

export const Route = createFileRoute("/pesan")({
  validateSearch: (search: Record<string, unknown>) => {
    const result: { paket?: PaketId; warna?: string } = {};
    if (isPaketId(search.paket)) result.paket = search.paket;
    if (isColorName(search.warna)) result.warna = search.warna;
    return result;
  },
  head: () => ({ meta: [{ title: "Pesan — Acrea Things" }] }),
  component: Pesan,
});

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as CartItem;
  return typeof item.id === "string" && isPaketId(item.paket) && typeof item.qty === "number";
}

function CharmPreview({
  paket,
  hook,
  color,
  letter,
  frame,
  price,
}: {
  paket: PaketId;
  hook: HookId;
  color: string;
  letter: string;
  frame: number | null;
  price: number;
}) {
  const shot = colorways.find((item) => item.name === color) ?? colorways[2];
  return (
    <div className="rounded-2xl border border-line bg-paper p-4">
      <p className="text-xs font-bold tracking-widest text-rose uppercase">Pratinjau</p>
      <div className="mt-3 flex gap-3">
        <img
          src={shot.src}
          alt={`Makrame warna ${shot.name}`}
          className="aspect-4/5 w-2/5 rounded-xl border border-line object-cover"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="font-display text-2xl leading-tight">{paketLabel(paket)}</p>
          <p className="text-sm text-muted">
            {shot.name} · {hookLabel(hook)}
          </p>
          {needsLetter(paket) ? (
            <p className={"font-display text-4xl " + (letter.trim() ? "text-rose-deep" : "text-muted")}>
              {letter.trim() ? letter.trim().toUpperCase() : "Aa"}
            </p>
          ) : (
            <p className="text-sm text-muted">Tanpa huruf akrilik</p>
          )}
          {needsPhoto(paket) && frame ? (
            <img
              src={frameSrc(frame)}
              alt={`Desain photostrip ${frame}`}
              className="h-28 w-full rounded-lg border border-line bg-blush object-contain"
            />
          ) : null}
          {needsPhoto(paket) && !frame ? (
            <p className="text-sm text-muted">Desain foto bisa dipilih, atau dikirim nanti di chat.</p>
          ) : null}
          <p className="mt-auto font-display text-2xl text-rose-deep">{rp(price)}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">Contoh warna dari katalog, bukan foto pesanan yang sudah jadi.</p>
    </div>
  );
}

function Pesan() {
  const search = Route.useSearch();
  const [paket, setPaket] = useState<PaketId>(search.paket ?? "complete");
  const [hook, setHook] = useState<HookId>("carabiner");
  const [color, setColor] = useState(search.warna ?? "Carat");
  const [letter, setLetter] = useState("");
  const [frame, setFrame] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [ship, setShip] = useState<ShipId>("cod");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [cart, setCart] = useState<CartItem[] | null>(null);
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (search.paket) setPaket(search.paket);
    if (search.warna) setColor(search.warna);
  }, [search.paket, search.warna]);

  useEffect(() => {
    setCart(loadCart());
  }, []);

  useEffect(() => {
    if (cart === null) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const items = cart ?? [];
  const draftPrice = unitPrice(paket, hook);
  const message = useMemo(
    () => orderMessage({ name: name || "—", ship, note, items }),
    [name, ship, note, items],
  );

  function addItem() {
    if (needsLetter(paket) && letter.trim().length === 0) {
      setError("Isi inisial huruf dulu.");
      return;
    }
    setError("");
    const item: CartItem = {
      id: crypto.randomUUID(),
      paket,
      hook,
      color,
      letter: needsLetter(paket) ? letter.trim().toUpperCase() : "",
      frame: needsPhoto(paket) ? frame : null,
      qty,
    };
    setCart((prev) => [...(prev ?? []), item]);
    setLetter("");
    setQty(1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  function updateQty(id: string, next: number) {
    setCart((prev) => (prev ?? []).map((item) => (item.id === id ? { ...item, qty: next } : item)));
  }

  function removeItem(id: string) {
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
    const text = orderMessage({ name, ship, note, items });
    openWhatsapp(whatsappUrl(text));
  }

  async function copyMessage() {
    if (items.length === 0) return;
    try {
      await navigator.clipboard.writeText(orderMessage({ name: name || "—", ship, note, items }));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("Pesan belum tersalin. Pakai tombol WhatsApp.");
    }
  }

  return (
    <SiteShell>
      <PageHero
        kicker="Pre-order"
        title="Susun charm, lalu kirim ke WhatsApp"
        text={`Pilih paket, warna, dan pengait. Pesanan terbuka di chat ${WHATSAPP_LABEL}. Pembayaran QRIS atau COD.`}
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-8">
          <div className="lg:hidden">
            <CharmPreview paket={paket} hook={hook} color={color} letter={letter} frame={frame} price={draftPrice * qty} />
          </div>
          <fieldset>
            <legend className="font-display text-2xl">Paket</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {pakets.map((item) => {
                const selected = paket === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setPaket(item.id)}
                    className={
                      "rounded-xl border px-4 py-3 text-left " +
                      (selected ? "border-rose bg-blush" : "border-line bg-paper")
                    }
                  >
                    <span className="block font-bold">{item.label}</span>
                    <span className="mt-1 block text-sm text-muted">{item.hint}</span>
                    <span className="mt-2 block text-sm font-bold text-rose-deep">
                      {item.id === "basic" ? "Rp5.000–Rp8.000" : rp(unitPrice(item.id, "carabiner"))}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-2xl">Pengait</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {hooks.map((item) => {
                const selected = hook === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setHook(item.id)}
                    className={
                      "rounded-full border px-4 py-2 text-sm font-bold " +
                      (selected ? "border-rose bg-rose-deep text-paper" : "border-line bg-paper")
                    }
                  >
                    {item.label}
                    {paket === "basic" ? ` · ${rp(item.basic)}` : ""}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-2xl">Warna makrame</legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {colorways.map((item) => {
                const selected = color === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setColor(item.name)}
                    className={
                      "overflow-hidden rounded-xl border text-left " +
                      (selected ? "border-rose-deep bg-blush" : "border-line bg-paper")
                    }
                  >
                    <img src={item.src} alt="" className="aspect-4/5 w-full object-cover" />
                    <span className="block px-2 py-2 text-xs font-bold">
                      {item.name}
                      {item.name === "Carat" ? " · favorit" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {needsLetter(paket) ? (
            <label className="block">
              <span className="font-display text-2xl">Inisial</span>
              <input
                value={letter}
                maxLength={2}
                onChange={(event) => setLetter(event.target.value)}
                placeholder="Contoh: A"
                className="mt-3 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base"
              />
            </label>
          ) : null}

          {needsPhoto(paket) ? (
            <fieldset>
              <legend className="font-display text-2xl">Desain photostrip</legend>
              <p className="mt-1 text-sm text-muted">Opsional. Fotonya dikirim menyusul di chat WhatsApp.</p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                <button
                  type="button"
                  aria-pressed={frame === null}
                  onClick={() => setFrame(null)}
                  className={
                    "col-span-3 flex min-h-11 items-center justify-center rounded-lg border px-2 py-2 text-sm font-bold sm:col-span-2 " +
                    (frame === null ? "border-rose-deep bg-rose-deep text-paper" : "border-line bg-paper")
                  }
                >
                  Nanti di chat
                </button>
                {Array.from({ length: 24 }, (_, index) => index + 1).map((number) => (
                  <button
                    key={number}
                    type="button"
                    aria-pressed={frame === number}
                    onClick={() => setFrame(number)}
                    className={
                      "overflow-hidden rounded-lg border " +
                      (frame === number ? "border-rose-deep bg-blush" : "border-line bg-paper")
                    }
                  >
                    <img src={frameSrc(number)} alt="" className="aspect-4/5 w-full bg-blush object-contain" />
                    <span className="block py-1 text-center text-xs font-bold tabular-nums">{number}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-paper p-4">
            <div>
              <p className="text-sm text-muted">Harga satuan</p>
              <p className="font-display text-2xl text-rose-deep">{rp(draftPrice)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Kurangi jumlah"
                disabled={qty <= 1}
                onClick={() => setQty((value) => Math.max(1, value - 1))}
                className="inline-flex size-11 items-center justify-center rounded-md border border-line disabled:opacity-40"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center font-bold tabular-nums">{qty}</span>
              <button
                type="button"
                aria-label="Tambah jumlah"
                disabled={qty >= 10}
                onClick={() => setQty((value) => Math.min(10, value + 1))}
                className="inline-flex size-11 items-center justify-center rounded-md border border-line disabled:opacity-40"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="rounded-md bg-rose-deep px-4 py-3 text-sm font-bold text-paper"
            >
              Tambah · {rp(draftPrice * qty)}
            </button>
          </div>
          {added ? <p className="text-sm font-bold text-rose-deep">Masuk ke daftar pesanan.</p> : null}
          {error ? <p className="text-sm font-bold text-rose-deep">{error}</p> : null}
        </section>

        <aside className="h-fit space-y-4">
          <div className="hidden lg:block">
            <CharmPreview paket={paket} hook={hook} color={color} letter={letter} frame={frame} price={draftPrice * qty} />
          </div>
          <div className="rounded-2xl border border-line bg-paper p-5">
            <h2 className="font-display text-2xl">Pesanan</h2>
            {items.length === 0 ? (
              <p className="mt-3 text-sm text-muted">Belum ada charm. Susun di sebelah kiri, lalu tambahkan.</p>
            ) : (
              <ul className="mt-4 divide-y divide-line">
                {items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3 py-3">
                    <img
                      src={colorways.find((swatch) => swatch.name === item.color)?.src ?? colorways[2].src}
                      alt=""
                      className="size-14 shrink-0 rounded-lg border border-line object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{describeItem(item)}</p>
                      <p className="text-sm text-rose-deep">{rp(lineTotal(item))}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Kurangi ${paketLabel(item.paket)}`}
                          disabled={item.qty <= 1}
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="inline-flex size-11 items-center justify-center rounded-md border border-line disabled:opacity-40"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-sm tabular-nums">{item.qty}</span>
                        <button
                          type="button"
                          aria-label={`Tambah ${paketLabel(item.paket)}`}
                          disabled={item.qty >= 10}
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="inline-flex size-11 items-center justify-center rounded-md border border-line disabled:opacity-40"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Hapus item"
                      onClick={() => removeItem(item.id)}
                      className="inline-flex size-11 items-center justify-center rounded-md text-rose-deep"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
              <span className="text-sm font-bold">Total</span>
              <span className="font-display text-2xl text-rose-deep">{rp(cartTotal(items))}</span>
            </p>
          </div>

          <form
            className="space-y-3 rounded-2xl border border-line bg-paper p-5"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <label className="block text-sm font-bold">
              Nama
              <input
                id="nama-pemesan"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-line px-4 py-3 font-normal"
                placeholder="Nama pemesan"
              />
            </label>
            <fieldset>
              <legend className="text-sm font-bold">Pengiriman</legend>
              <div className="mt-2 grid grid-cols-1 gap-2">
                {ships.map((item) => (
                  <label key={item.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="ship"
                      checked={ship === item.id}
                      onChange={() => setShip(item.id)}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="block text-sm font-bold">
              Catatan
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
                className="mt-1 w-full rounded-xl border border-line px-4 py-3 font-normal"
                placeholder="Contoh: untuk hadiah wisuda"
              />
            </label>
            <a
              id="kirim-whatsapp"
              href={whatsappUrl(orderMessage({ name: name.trim() || "—", ship, note, items }))}
              target="_top"
              rel="noreferrer"
              onClick={(event) => {
                if (items.length === 0) {
                  event.preventDefault();
                  setError("Tambahkan minimal satu charm.");
                  return;
                }
                if (!name.trim()) {
                  event.preventDefault();
                  setError("Isi nama pemesan dulu.");
                  document.getElementById("nama-pemesan")?.focus();
                  return;
                }
                setError("");
              }}
              className="block w-full rounded-md bg-rose-deep px-4 py-3 text-center text-sm font-bold text-paper"
            >
              Pesan via WhatsApp
            </a>
            {error ? (
              <p role="alert" className="text-sm font-bold text-rose-deep">
                {error}
              </p>
            ) : null}
            <button
              type="button"
              onClick={copyMessage}
              disabled={items.length === 0}
              className="w-full rounded-md bg-blush px-4 py-3 text-sm font-bold text-rose-deep disabled:opacity-40"
            >
              {copied ? "Pesan tersalin" : "Salin pesan"}
            </button>
            <p className="text-xs text-muted">
              Chat ke {WHATSAPP_LABEL}. {needsPhoto(paket) ? "Kalau ada foto, kirim gambarnya setelah chat terbuka." : "Pengait " + hookLabel(hook) + " bisa diganti sebelum ditambahkan."}
            </p>
          </form>

          {items.length > 0 ? (
            <pre className="overflow-x-auto rounded-2xl border border-line bg-blush p-4 text-xs leading-relaxed whitespace-pre-wrap text-ink">
              {message}
            </pre>
          ) : null}
        </aside>
      </div>
    </SiteShell>
  );
}
