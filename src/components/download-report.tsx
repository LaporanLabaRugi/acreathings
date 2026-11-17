import { useState } from "react";
import { Download } from "lucide-react";

const LABEL = "Unduh Laporan Keuangan (Excel)";

type Variant = "prominent" | "nav" | "header" | "menu" | "footer";

export function DownloadReportButton({ variant }: { variant: Variant }) {
  const [status, setStatus] = useState<"idle" | "busy" | "error">("idle");
  const busy = status === "busy";

  async function onClick() {
    if (busy) return;
    setStatus("busy");
    try {
      const { downloadFinanceWorkbook } = await import("@/lib/finance-workbook");
      await downloadFinanceWorkbook();
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  const error =
    status === "error" ? (
      <p
        className={variant === "footer" ? "text-sm text-paper" : "text-sm text-rose-deep"}
        role="alert"
      >
        Berkas belum terunduh. Coba sekali lagi.
      </p>
    ) : null;

  if (variant === "header") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        aria-busy={busy}
        aria-label={LABEL}
        title={LABEL}
        className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-paper text-rose-deep disabled:opacity-60"
      >
        <Download className="size-4" aria-hidden />
      </button>
    );
  }

  if (variant === "nav") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        aria-busy={busy}
        className="rounded-md px-3 py-2 text-sm font-bold whitespace-nowrap text-rose-deep hover:bg-blush disabled:opacity-60"
      >
        {busy ? "Menyiapkan…" : "Unduh Excel"}
      </button>
    );
  }

  if (variant === "menu") {
    return (
      <div>
        <button
          type="button"
          onClick={onClick}
          disabled={busy}
          aria-busy={busy}
          className="mt-1 flex w-full items-center gap-2 rounded-md bg-blush px-3 py-3 text-left text-sm font-bold text-rose-deep disabled:opacity-60"
        >
          <Download className="size-4 shrink-0" aria-hidden />
          {busy ? "Menyiapkan berkas…" : LABEL}
        </button>
        {error}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div>
        <button
          type="button"
          onClick={onClick}
          disabled={busy}
          aria-busy={busy}
          className="text-left text-sm text-paper/85 hover:text-paper disabled:opacity-60"
        >
          {busy ? "Menyiapkan berkas…" : "Unduh laporan (Excel)"}
        </button>
        {error}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        aria-busy={busy}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-rose-deep px-4 py-3 text-sm font-bold text-paper disabled:opacity-60 sm:w-auto"
      >
        <Download className="size-4" aria-hidden />
        {busy ? "Menyiapkan berkas…" : LABEL}
      </button>
      {error}
    </div>
  );
}
