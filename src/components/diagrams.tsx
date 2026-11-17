import { bmc, flow, members } from "@/lib/report";

function bmcBlock(title: string) {
  return bmc.find((item) => item.title === title);
}

function CanvasCell({
  title,
  text,
  className = "",
}: {
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <article className={"h-full rounded-2xl border border-line bg-paper p-4 " + className}>
      <h3 className="text-sm font-bold text-rose-deep">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed">{text}</p>
    </article>
  );
}

export function BusinessCanvas() {
  const cell = (title: string) => {
    const block = bmcBlock(title);
    return <CanvasCell title={title} text={block?.text ?? ""} />;
  };
  return (
    <div className="mt-6 space-y-3">
      <div className="grid gap-3 lg:grid-cols-5">
        <div className="lg:row-span-2">{cell("Key Partners")}</div>
        <div className="grid gap-3">
          {cell("Key Activities")}
          {cell("Key Resources")}
        </div>
        <div className="lg:row-span-2">{cell("Value Propositions")}</div>
        <div className="grid gap-3">
          {cell("Customer Relationships")}
          {cell("Channels")}
        </div>
        <div className="lg:row-span-2">{cell("Customer Segments")}</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {cell("Cost Structure")}
        {cell("Revenue Streams")}
      </div>
    </div>
  );
}

const roles = ["Keuangan", "Pemasaran", "Operasional", "Pelayanan"] as const;

export function OrgChart({ jobs }: { jobs: Record<string, string> }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <div className="min-w-3xl">
        <div className="flex justify-center">
          <div className="rounded-full bg-rose-deep px-6 py-3 text-sm font-bold text-paper">Acrea Things</div>
        </div>
        <div className="mx-auto h-6 w-px bg-rose" />
        <div className="grid grid-cols-4">
          {roles.map((role, index) => (
            <div key={role} className="flex flex-col">
              <div className="flex h-6">
                <span className={"h-px flex-1 " + (index === 0 ? "bg-transparent" : "bg-rose")} />
                <span className="w-px bg-rose" />
                <span className={"h-px flex-1 " + (index === roles.length - 1 ? "bg-transparent" : "bg-rose")} />
              </div>
              <article className="mx-2 flex-1 rounded-2xl border border-line bg-paper p-4">
                <h3 className="font-display text-xl">{role}</h3>
                <p className="mt-1 text-sm text-muted">{jobs[role]}</p>
                <ul className="mt-3 space-y-1">
                  {members
                    .filter((member) => member.role === role)
                    .map((member) => (
                      <li key={member.name} className="text-sm font-bold">
                        {member.name}
                      </li>
                    ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BatchFlow() {
  return (
    <ol className="mt-6 grid gap-3 md:grid-cols-4">
      {flow.map((item, index) => (
        <li key={item.step} className="relative rounded-2xl border border-line bg-paper p-5">
          {index < flow.length - 1 ? (
            <span
              aria-hidden
              className="absolute top-8 -right-2 hidden h-px w-4 bg-rose md:block"
            />
          ) : null}
          <span className="flex size-11 items-center justify-center rounded-full bg-rose-deep text-sm font-bold text-paper">
            {index + 1}
          </span>
          <h3 className="font-display mt-3 text-xl">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}
