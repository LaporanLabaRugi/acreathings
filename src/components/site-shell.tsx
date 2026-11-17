import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, MessageCircle, Printer, X } from "lucide-react";
import { identity } from "@/lib/report";
import { publicUrl } from "@/lib/public-url";
import { WHATSAPP_LABEL, WHATSAPP_NUMBER } from "@/lib/order";

const NAV = [
  { to: "/", label: "Beranda" },
  { to: "/tentang", label: "Tentang" },
  { to: "/produk", label: "Produk" },
  { to: "/organisasi", label: "Organisasi" },
  { to: "/laporan", label: "Keuangan" },
  { to: "/dokumentasi", label: "Dokumentasi" },
] as const;

function isActive(path: string, to: string) {
  if (to === "/") return path === "/";
  return path === to || path.startsWith(to + "/");
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <div className="min-h-screen">
      <header className="no-print sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-5 py-2">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src={publicUrl("/media/logo-acrea.jpg")}
              alt="Logo Acrea Things"
              className="size-11 shrink-0 rounded-full border border-line object-cover"
            />
            <span className="min-w-0">
              <span className="block font-display text-lg leading-none text-rose-deep">Acrea Things</span>
              <span className="mt-1 block text-xs text-muted">Bag charm custom</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Utama">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={
                  "rounded-md px-3 py-2 text-sm font-bold " +
                  (isActive(path, item.to) ? "bg-blush text-rose-deep" : "text-ink hover:bg-blush")
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/pesan"
              className="inline-flex items-center gap-2 rounded-md bg-rose-deep px-3 py-2 text-sm font-bold text-paper"
            >
              <MessageCircle className="size-4" aria-hidden />
              <span className="hidden sm:inline">Pesan</span>
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-md border border-line bg-paper px-3 py-2 text-sm font-bold text-rose-deep"
            >
              <Printer className="size-4" aria-hidden />
              <span className="hidden sm:inline">Cetak</span>
            </button>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md border border-line lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-line px-3 py-2 lg:hidden" aria-label="Utama">
            <Link to="/pesan" className="block rounded-md bg-rose-deep px-3 py-3 text-sm font-bold text-paper">
              Pesan via WhatsApp
            </Link>
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={
                  "block rounded-md px-3 py-3 text-sm font-bold " +
                  (isActive(path, item.to) ? "bg-blush text-rose-deep" : "text-ink")
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>

      <div className="print-only border-b border-line px-6 py-4">
        <p className="font-display text-2xl text-rose-deep">Acrea Things</p>
        <p className="text-sm">
          Acrea Things · Bag charm makrame dan akrilik · {identity.group} · {identity.campus}
        </p>
      </div>

      <main className="pb-20">{children}</main>
      {path !== "/pesan" ? (
        <Link
          to="/pesan"
          className="no-print fixed right-4 bottom-4 z-30 inline-flex items-center gap-2 rounded-full bg-rose-deep px-4 py-3 text-sm font-bold text-paper"
        >
          <MessageCircle className="size-4" aria-hidden />
          Pesan
        </Link>
      ) : null}

      <footer className="no-print mt-8 bg-footer text-blush">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-2">
          <div>
            <p className="font-display text-xl text-paper">Acrea Things</p>
            <p className="mt-2 text-sm leading-relaxed text-paper/85">
              Bag charm makrame dengan huruf dan foto yang bisa disusun sendiri. {identity.meaning}.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_top"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-paper underline"
            >
              WhatsApp {WHATSAPP_LABEL}
            </a>
          </div>
          <div>
            <p className="text-sm font-bold text-paper">Menu</p>
            <div className="mt-2 flex flex-col gap-1">
              {NAV.slice(1).map((item) => (
                <Link key={item.to} to={item.to} className="text-sm text-paper/85 hover:text-paper">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-paper/15 px-5 py-4 text-center text-xs text-paper/75">
          © {identity.year} Acrea Things · {identity.group} · {identity.study}
        </div>
      </footer>
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <p className="text-xs font-bold tracking-widest text-rose uppercase">{kicker}</p>
        <h1 className="font-display mt-2 max-w-3xl text-4xl leading-tight text-ink md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">{text}</p>
      </div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  text,
}: {
  kicker?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      {kicker ? <p className="text-xs font-bold tracking-widest text-rose uppercase">{kicker}</p> : null}
      <h2 className="font-display mt-1 text-3xl text-ink">{title}</h2>
      {text ? <p className="mt-2 text-muted">{text}</p> : null}
    </div>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-ink">{children}</div>;
}
