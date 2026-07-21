import { useEffect, useMemo, useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { truffles } from "@/data/truffles";
import { config } from "@/data/config";
import { buildWhatsappUrl, formatBRL } from "@/lib/whatsapp";

export function TrufflePickerModal({ onClose }: { onClose: () => void }) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const { subtotal, total } = useMemo(() => {
    let s = 0,
      t = 0;
    for (const [, qty] of Object.entries(counts)) {
      s += config.precoTrufa * qty;
      t += qty;
    }
    return { subtotal: s, total: t };
  }, [counts]);

  function setQty(id: string, delta: number) {
    setCounts((prev) => {
      const cur = prev[id] ?? 0;
      const next = Math.max(0, cur + delta);
      const updated = { ...prev, [id]: next };
      if (next === 0) delete updated[id];
      return updated;
    });
  }

  function pedir() {
    if (total === 0) return;
    const itens = Object.entries(counts).map(([id, qty]) => {
      const t = truffles.find((x) => x.id === id)!;
      return `• ${qty}x ${t.nome}`;
    });
    const linhas = [
      "Olá, Sr. Trufa! Quero trufas avulsas 🍫",
      "",
      ...itens,
      "",
      `Subtotal estimado: ${formatBRL(subtotal)}`,
      "",
      "Nome: ____",
      "Bairro/Retirada: ____",
    ];
    window.open(buildWhatsappUrl(linhas), "_blank", "noopener,noreferrer");
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Escolher trufas avulsas"
      className="fixed inset-0 z-50 flex items-end justify-center bg-marrom-deep/80 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-marrom shadow-2xl sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-dourado/25 px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-dourado">
              Trufas avulsas
            </p>
            <h3 className="mt-0.5 font-display text-2xl text-creme">
              Monte sua caixinha
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full p-2 text-creme hover:bg-creme/10"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {truffles.map((t) => {
              const qty = counts[t.id] ?? 0;
              return (
                <li
                  key={t.id}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${
                    qty > 0
                      ? "border-dourado bg-dourado/15"
                      : "border-dourado/20 bg-marrom-deep/40"
                  }`}
                >
                  <div className="min-w-0">
                    <span className="truncate text-sm font-semibold text-creme">
                      {t.nome}
                    </span>
                    <p className="text-xs text-dourado">{formatBRL(config.precoTrufa)}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      aria-label={`Remover ${t.nome}`}
                      onClick={() => setQty(t.id, -1)}
                      disabled={qty === 0}
                      className="grid h-7 w-7 place-items-center rounded-full border border-dourado/40 text-creme disabled:opacity-30"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold tabular-nums text-creme">
                      {qty}
                    </span>
                    <button
                      type="button"
                      aria-label={`Adicionar ${t.nome}`}
                      onClick={() => setQty(t.id, 1)}
                      className="grid h-7 w-7 place-items-center rounded-full border border-dourado/40 text-creme disabled:opacity-30"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="border-t border-dourado/25 bg-marrom-deep/40 px-5 py-4 sm:px-7">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-marrom-soft">
              Subtotal ({total} {total === 1 ? "trufa" : "trufas"})
            </span>
            <span className="font-display text-xl font-bold text-dourado">
              {formatBRL(subtotal)}
            </span>
          </div>
          <button
            type="button"
            onClick={pedir}
            disabled={total === 0}
            className="w-full rounded-full bg-dourado px-6 py-3.5 text-sm font-semibold text-marrom-deep shadow transition enabled:hover:bg-dourado-soft disabled:opacity-40 sm:text-base"
          >
            Pedir no WhatsApp
          </button>
          <p className="mt-2 text-center text-[11px] text-marrom-soft">
            Frete combinado à parte. Sem pagamento online.
          </p>
        </footer>
      </div>
    </div>
  );
}
