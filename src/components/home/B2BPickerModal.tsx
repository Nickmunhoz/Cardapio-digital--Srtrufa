import { useEffect, useMemo, useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { truffles, categoriaLabel, type Categoria } from "@/data/truffles";
import { config } from "@/data/config";
import { formatBRL } from "@/lib/whatsapp";

const CATEGORIAS: Categoria[] = ["classicos", "frutas", "brancos", "especiais"];

function faixaPara(qty: number) {
  return (
    config.b2bFaixas.find((f) => qty >= f.min && (f.max === null || qty <= f.max)) ??
    null
  );
}

export function B2BPickerModal({
  initialCounts,
  onClose,
  onConfirm,
}: {
  initialCounts: Record<string, number>;
  onClose: () => void;
  onConfirm: (counts: Record<string, number>) => void;
}) {
  const [counts, setCounts] = useState<Record<string, number>>(initialCounts);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const total = useMemo(
    () => Object.values(counts).reduce((s, q) => s + q, 0),
    [counts]
  );
  const faixa = faixaPara(total);
  const subtotal = faixa ? faixa.preco * total : 0;

  function setQty(id: string, delta: number) {
    setCounts((prev) => {
      const cur = prev[id] ?? 0;
      const next = Math.max(0, cur + delta);
      const updated = { ...prev, [id]: next };
      if (next === 0) delete updated[id];
      return updated;
    });
  }

  const podeConfirmar = total >= config.b2bMinimo;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Escolher sabores e quantidades"
      className="fixed inset-0 z-[60] flex items-end justify-center bg-marrom-deep/80 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-marrom shadow-2xl sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-dourado/25 px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-dourado">
              Pedido corporativo
            </p>
            <h3 className="mt-0.5 font-display text-2xl text-creme">
              Escolha sabores e quantidades
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
          {CATEGORIAS.map((cat) => (
            <div key={cat} className="mb-6 last:mb-0">
              <h4 className="font-script text-2xl text-dourado-soft">
                {categoriaLabel[cat]}
              </h4>
              <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {truffles
                  .filter((t) => t.categoria === cat)
                  .map((t) => {
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
                        <span className="truncate text-sm font-semibold text-creme">
                          {t.nome}
                        </span>
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
                          <span className="w-6 text-center text-sm font-semibold tabular-nums text-creme">
                            {qty}
                          </span>
                          <button
                            type="button"
                            aria-label={`Adicionar ${t.nome}`}
                            onClick={() => setQty(t.id, 1)}
                            className="grid h-7 w-7 place-items-center rounded-full border border-dourado/40 text-creme"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>

        <footer className="border-t border-dourado/25 bg-marrom-deep/40 px-5 py-4 sm:px-7">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-marrom-soft">
              {total} {total === 1 ? "trufa" : "trufas"}
              {faixa ? ` · ${formatBRL(faixa.preco)} un.` : ""}
            </span>
            <span className="font-display text-xl font-bold text-dourado">
              {formatBRL(subtotal)}
            </span>
          </div>
          {!podeConfirmar && (
            <p className="mb-3 text-center text-xs text-red-400">
              Pedido mínimo de {config.b2bMinimo} unidades para pedidos corporativos.
            </p>
          )}
          <button
            type="button"
            onClick={() => onConfirm(counts)}
            disabled={!podeConfirmar}
            className="w-full rounded-full bg-dourado px-6 py-3.5 text-sm font-semibold text-marrom-deep shadow transition enabled:hover:bg-dourado-soft disabled:opacity-40 sm:text-base"
          >
            Confirmar seleção
          </button>
        </footer>
      </div>
    </div>
  );
}
