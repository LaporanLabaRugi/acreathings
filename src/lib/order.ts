import { rp } from "@/lib/report";

export const WHATSAPP_NUMBER = "6289520262296";
export const WHATSAPP_LABEL = "0895-2026-2296 (Vifian)";

export const paketIds = ["basic", "huruf", "foto", "complete"] as const;
export type PaketId = (typeof paketIds)[number];
export type HookId = "ballchain" | "lobster" | "carabiner";
export type ShipId = "cod" | "kirim";

export const pakets: { id: PaketId; label: string; hint: string }[] = [
  { id: "basic", label: "Basic", hint: "Charm saja, harga mengikuti pengait" },
  { id: "huruf", label: "Combo Huruf", hint: "Charm + inisial akrilik" },
  { id: "foto", label: "Combo Foto", hint: "Charm + frame foto" },
  { id: "complete", label: "Complete", hint: "Huruf dan frame foto" },
];

export const hooks: { id: HookId; label: string; basic: number }[] = [
  { id: "ballchain", label: "Ballchain", basic: 5000 },
  { id: "lobster", label: "Lobster hook", basic: 6000 },
  { id: "carabiner", label: "Carabiner hati", basic: 8000 },
];

export const ships: { id: ShipId; label: string }[] = [
  { id: "cod", label: "COD Magelang" },
  { id: "kirim", label: "Kirim luar kota (Shopee)" },
];

export const colorways: { name: string; src: string }[] = [
  { name: "Spiderman", src: "/media/colors/spiderman.jpg" },
  { name: "Rarity", src: "/media/colors/rarity.jpg" },
  { name: "Carat", src: "/media/colors/carat.jpg" },
  { name: "Cinnamoroll", src: "/media/colors/cinnamoroll.jpg" },
  { name: "Hello Kitty", src: "/media/colors/hello-kitty.jpg" },
  { name: "Ariel", src: "/media/colors/ariel.jpg" },
  { name: "Panda", src: "/media/colors/panda.jpg" },
  { name: "Blueberry", src: "/media/colors/blueberry.jpg" },
  { name: "Strawberry Matcha", src: "/media/colors/strawberry-matcha.jpg" },
  { name: "Winnie the Pooh", src: "/media/colors/winnie.jpg" },
];

export function frameSrc(frame: number) {
  return `/media/frames/${String(frame).padStart(2, "0")}.jpg`;
}

export function isColorName(value: unknown): value is string {
  return typeof value === "string" && colorways.some((item) => item.name === value);
}

export type CartItem = {
  id: string;
  paket: PaketId;
  hook: HookId;
  color: string;
  letter: string;
  frame: number | null;
  qty: number;
};

export function isPaketId(value: unknown): value is PaketId {
  return paketIds.some((id) => id === value);
}

export function unitPrice(paket: PaketId, hook: HookId) {
  if (paket === "basic") return hooks.find((item) => item.id === hook)?.basic ?? 5000;
  if (paket === "complete") return 15000;
  return 12000;
}

export function needsLetter(paket: PaketId) {
  return paket === "huruf" || paket === "complete";
}

export function needsPhoto(paket: PaketId) {
  return paket === "foto" || paket === "complete";
}

export function paketLabel(id: PaketId) {
  return pakets.find((item) => item.id === id)?.label ?? id;
}

export function hookLabel(id: HookId) {
  return hooks.find((item) => item.id === id)?.label ?? id;
}

export function lineTotal(item: CartItem) {
  return unitPrice(item.paket, item.hook) * item.qty;
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + lineTotal(item), 0);
}

export function describeItem(item: CartItem) {
  const parts = [
    `${item.qty} pcs`,
    paketLabel(item.paket),
    item.color,
    hookLabel(item.hook),
  ];
  if (item.letter) parts.push(`Huruf ${item.letter}`);
  if (item.frame) parts.push(`Desain foto ${item.frame}`);
  return parts.join(" · ");
}

export function orderMessage(input: { name: string; ship: ShipId; note: string; items: CartItem[] }) {
  const lines = input.items.map((item, index) => {
    return `${index + 1}. ${describeItem(item)} — ${rp(lineTotal(item))}`;
  });
  const photo = input.items.some((item) => needsPhoto(item.paket));
  return [
    "Halo Acrea Things, saya ingin pesan bag charm.",
    "",
    `Nama: ${input.name.trim()}`,
    `Pengiriman: ${input.ship === "cod" ? "COD Magelang" : "Kirim luar kota (Shopee)"}`,
    "",
    ...lines,
    "",
    `Total: ${rp(cartTotal(input.items))}`,
    input.note.trim() ? `Catatan: ${input.note.trim()}` : "",
    photo ? "Foto akan saya kirim di chat ini." : "",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Opens WhatsApp outside an embedded preview. Popups are often blocked there, and WhatsApp refuses to load inside a frame. */
export function openWhatsapp(url: string) {
  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (popup) return;
  const link = document.createElement("a");
  link.href = url;
  link.target = "_top";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
