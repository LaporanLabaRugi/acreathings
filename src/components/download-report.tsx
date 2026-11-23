import { useEffect, useRef, useState } from "react";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

type Format = "excel" | "pdf";
type Variant = "prominent" | "nav" | "header" | "menu" | "footer";

const COPY: Record<Format, { short: string; label: string }> = {
  excel: { short: "Excel", label: "Unduh Excel" },
  pdf: { short: "PDF", label: "Unduh PDF" },
};

const FULL: Record<Format, string> = {
  excel: "Unduh Laporan Laba Rugi (Excel)",
  pdf: "Unduh Laporan Laba Rugi (PDF)",
};

async function saveReport(format: Format) {
  if (format === "excel") {
    const { downloadFinanceWorkbook } = await import("@/lib/finance-workbook");
    await downloadFinanceWorkbook();
    return;
  }
  const { downloadFinancePdf } = await import("@/lib/finance-pdf");
  await downloadFinancePdf();
}

function useReportDownload() {
  const [busy, setBusy] = useState<Format | null>(null);
  const [error, setError] = useState(false);

  async function onDownload(format: Format) {
    if (busy) return false;
    setBusy(format);
    setError(false);
    try {
      await saveReport(format);
      return true;
    } catch (cause) {
      console.error(cause);
      setError(true);
      return false;
    } finally {
      setBusy(null);
    }
  }

  return { busy, error, onDownload };
}

function ErrorNote({ error, light }: { error: boolean; light?: boolean }) {
  if (!error) return null;
  return (
    <p className={light ? "text-sm text-paper" : "text-sm text-rose-deep"} role="alert">
      Berkas belum terunduh. Coba sekali lagi.
    </p>
  );
}

function FormatButton({
  format,
  busy,
  className,
  children,
  onDownload,
}: {
  format: Format;
  busy: Format | null;
  className: string;
  children: React.ReactNode;
  onDownload: (format: Format) => void | Promise<boolean>;
}) {
  const waiting = busy === format;
  return (
    <button
      type="button"
      onClick={() => onDownload(format)}
      disabled={busy !== null}
      aria-busy={waiting}
      aria-label={FULL[format]}
      title={FULL[format]}
      className={className}
    >
      {waiting ? "Menyiapkan…" : children}
    </button>
  );
}

export function DownloadReportButton({ variant }: { variant: Variant }) {
  const { busy, error, onDownload } = useReportDownload();

  if (variant === "header") {
    return <HeaderDownload busy={busy} error={error} onDownload={onDownload} />;
  }

  if (variant === "nav") {
    return (
      <div className="flex items-center gap-1">
        {(["excel", "pdf"] as const).map((format) => (
          <FormatButton
            key={format}
            format={format}
            busy={busy}
            onDownload={onDownload}
            className="rounded-md px-3 py-2 text-sm font-bold whitespace-nowrap text-rose-deep hover:bg-blush disabled:opacity-60"
          >
            {COPY[format].short}
          </FormatButton>
        ))}
      </div>
    );
  }

  if (variant === "menu") {
    return (
      <div className="mt-1 grid gap-2">
        {(["excel", "pdf"] as const).map((format) => (
          <FormatButton
            key={format}
            format={format}
            busy={busy}
            onDownload={onDownload}
            className="flex w-full items-center gap-2 rounded-md bg-blush px-3 py-3 text-left text-sm font-bold text-rose-deep disabled:opacity-60"
          >
            {format === "excel" ? (
              <FileSpreadsheet className="size-4 shrink-0" aria-hidden />
            ) : (
              <FileText className="size-4 shrink-0" aria-hidden />
            )}
            {COPY[format].label}
          </FormatButton>
        ))}
        <ErrorNote error={error} />
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className="flex flex-col gap-1">
        {(["excel", "pdf"] as const).map((format) => (
          <FormatButton
            key={format}
            format={format}
            busy={busy}
            onDownload={onDownload}
            className="text-left text-sm text-paper/85 hover:text-paper disabled:opacity-60"
          >
            {COPY[format].label}
          </FormatButton>
        ))}
        <ErrorNote error={error} light />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <FormatButton
          format="excel"
          busy={busy}
          onDownload={onDownload}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-rose-deep px-4 py-3 text-sm font-bold text-paper disabled:opacity-60 sm:w-auto"
        >
          <FileSpreadsheet className="size-4" aria-hidden />
          Unduh Excel
        </FormatButton>
        <FormatButton
          format="pdf"
          busy={busy}
          onDownload={onDownload}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-rose-deep bg-paper px-4 py-3 text-sm font-bold text-rose-deep disabled:opacity-60 sm:w-auto"
        >
          <FileText className="size-4" aria-hidden />
          Unduh PDF
        </FormatButton>
      </div>
      <ErrorNote error={error} />
    </div>
  );
}

function HeaderDownload({
  busy,
  error,
  onDownload,
}: {
  busy: Format | null;
  error: boolean;
  onDownload: (format: Format) => Promise<boolean>;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Unduh laporan laba rugi"
        title="Unduh laporan laba rugi"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-md border border-line bg-paper text-rose-deep"
      >
        <Download className="size-4" aria-hidden />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-52 rounded-md border border-line bg-paper p-1 shadow-sm"
        >
          {(["excel", "pdf"] as const).map((format) => (
            <FormatButton
              key={format}
              format={format}
              busy={busy}
              onDownload={async (chosen) => {
                const saved = await onDownload(chosen);
                if (saved) setOpen(false);
                return saved;
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm font-bold text-rose-deep hover:bg-blush disabled:opacity-60"
            >
              {format === "excel" ? (
                <FileSpreadsheet className="size-4 shrink-0" aria-hidden />
              ) : (
                <FileText className="size-4 shrink-0" aria-hidden />
              )}
              {COPY[format].label}
            </FormatButton>
          ))}
          <ErrorNote error={error} />
        </div>
      ) : null}
    </div>
  );
}
