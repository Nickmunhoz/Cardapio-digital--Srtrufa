import { useEffect, useMemo, useState } from "react";
import { X, Minus, Plus, Check } from "lucide-react";
import { truffles, type Truffle } from "@/data/truffles";
import type { Combo } from "@/data/combos";
import { buildWhatsappUrl, formatBRL } from "@/lib/whatsapp";
import { fotoPersonalizadaDisponivel } from "@/data/config";

type ArtType = "foto" | "frase" | "arte" | null;

const MAX_TRUFAS = 3;

export function ComboModal({ combo, onClose }: { combo: Combo; onClose: () => void }) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [arte, setArte] = useState<ArtType>(null);
  const [frase, setFrase] = useState("");
  const fotoOk = fotoPersonalizadaDisponivel();

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
    () => Object.values(counts).reduce((a, b) => a + b, 0),
    [counts]
  );

  function setQty(t: Truffle, delta: number) {
    setCounts((prev) => {
      const cur = prev[t.id] ?? 0;
      const next = cur + delta;
      if (next < 0) return prev;
      if (t.estoque <= 0) return prev;
      if (t.categoria === "especial" && next > 1) return prev;
      if (next > t.estoque) return prev;
      const novoTotal = total - cur + next;
      if (delta > 0 && novoTotal > MAX_TRUFAS) return prev;
      const updated = { ...prev, [t.id]: next };
      if (next === 0) delete updated[t.id];
      return updated;
    });
  }

  const arteValida =
    arte === "arte" ||
    (arte === "foto" && fotoOk) ||
    (arte === "frase" && frase.trim().length > 0);

  const canSubmit = total === MAX_TRUFAS && arteValida;

  function finalizar() {
    if (!canSubmit) return;
    const trufasLinha = Object.entries(counts)
      .map(([id, qty]) => {
        const t = truffles.find((x) => x.id === id)!;
        return qty > 1 ? `${qty}x ${t.nome}` : t.nome;
      })
      .join(", ");
    const arteLinha =
      arte === "foto"
        ? "Com a sua foto"
        : arte === "frase"
          ? `Com frase — "${frase.trim()}"`
          : "Arte padrão da loja";
    const linhas = [
      "Olá, Sr. Trufa! Quero fazer um pedido 💛",
      "",
      `🎁 Kit: ${combo.nome} (${formatBRL(combo.preco)})`,
      `🍫 Trufas: ${trufasLinha}`,
      `🎨 Arte: ${arteLinha}`,
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
      aria-label={`Montar kit ${combo.nome}`}
      className="fixed inset-0 z-50 flex items-end justify-center bg-marrom/60 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-creme-soft shadow-2xl sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-dourado/30 bg-creme-soft px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-marrom-soft">
              Monte seu kit
            </p>
            <h3 className="mt-0.5 font-display text-2xl text-marrom">{combo.nome}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full p-2 text-marrom hover:bg-dourado-soft/40"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          {/* Passo 1 */}
          <section>
            <div className="flex items-baseline justify-between">
              <h4 className="font-display text-lg text-marrom">
                1. Escolha 3 trufas
              </h4>
              <span
                className={`text-sm font-semibold ${
                  total === MAX_TRUFAS ? "text-dourado" : "text-marrom-soft"
                }`}
              >
                {total}/{MAX_TRUFAS}
              </span>
            </div>
            <p className="mt-1 text-xs text-marrom-soft">
              Sabores <strong>Gourmet Especial</strong> têm limite de 1 por combo. Sabores
              regulares podem repetir.
            </p>

            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {truffles.map((t) => {
                const qty = counts[t.id] ?? 0;
                const esgotado = t.estoque <= 0;
                const podeMais =
                  !esgotado &&
                  total < MAX_TRUFAS &&
                  (t.categoria === "regular" ? qty < t.estoque : qty < 1);
                return (
                  <li
                    key={t.id}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 transition ${
                      esgotado
                        ? "border-marrom/10 bg-creme/40 opacity-60"
                        : qty > 0
                          ? "border-dourado bg-dourado-soft/30"
                          : "border-dourado/30 bg-creme"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-marrom">
                          {t.nome}
                        </span>
                        {t.categoria === "especial" && !esgotado && (
                          <span className="rounded-full bg-dourado/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-dourado">
                            Gourmet
                          </span>
                        )}
                        {esgotado && (
                          <span className="rounded-full bg-marrom/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-marrom-soft">
                            Esgotado
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-xs text-marrom-soft">
                        {t.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        aria-label={`Remover ${t.nome}`}
                        onClick={() => setQty(t, -1)}
                        disabled={qty === 0}
                        className="grid h-7 w-7 place-items-center rounded-full border border-dourado/40 text-marrom disabled:opacity-30"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold tabular-nums text-marrom">
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Adicionar ${t.nome}`}
                        onClick={() => setQty(t, 1)}
                        disabled={!podeMais}
                        className="grid h-7 w-7 place-items-center rounded-full border border-dourado/40 text-marrom disabled:opacity-30"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {total === MAX_TRUFAS && (
              <p className="mt-3 text-xs text-dourado">
                Pronto! Você já escolheu 3 trufas. Para trocar, diminua uma antes.
              </p>
            )}
          </section>

          {/* Passo 2 */}
          <section className="mt-8">
            <h4 className="font-display text-lg text-marrom">
              2. Personalize a caneca
            </h4>
            <div className="mt-3 space-y-2">
              <OptionRow
                checked={arte === "foto"}
                disabled={!fotoOk}
                onClick={() => fotoOk && setArte("foto")}
                title="Com a sua foto"
                hint={
                  fotoOk
                    ? "Combinamos o prazo de produção no WhatsApp."
                    : "No momento, escolha frase ou arte da loja."
                }
              />
              <OptionRow
                checked={arte === "frase"}
                onClick={() => setArte("frase")}
                title="Com frase especial"
                hint="Até 60 caracteres."
              >
                {arte === "frase" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      maxLength={60}
                      value={frase}
                      onChange={(e) => setFrase(e.target.value)}
                      placeholder='Ex.: "Feito com carinho pra você"'
                      className="w-full rounded-lg border border-dourado/40 bg-creme px-3 py-2 text-sm text-marrom placeholder:text-marrom-soft/60 focus:border-dourado focus:outline-none"
                    />
                    <div className="mt-1 text-right text-[11px] text-marrom-soft">
                      {frase.length}/60
                    </div>
                  </div>
                )}
              </OptionRow>
              <OptionRow
                checked={arte === "arte"}
                onClick={() => setArte("arte")}
                title="Arte padrão da loja"
                hint="A gente sugere e você aprova no WhatsApp."
              />
            </div>
          </section>
        </div>

        <footer className="border-t border-dourado/30 bg-creme-soft px-5 py-4 sm:px-7">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-marrom-soft">Total do kit</span>
            <span className="font-display text-xl font-bold text-dourado">
              {formatBRL(combo.preco)}
            </span>
          </div>
          <button
            type="button"
            onClick={finalizar}
            disabled={!canSubmit}
            className="w-full rounded-full bg-laranja px-6 py-3.5 text-sm font-semibold text-creme shadow transition enabled:hover:bg-laranja-deep disabled:opacity-40 sm:text-base"
          >
            Concluir Pedido no WhatsApp
          </button>
          <p className="mt-2 text-center text-[11px] text-marrom-soft">
            Sem pagamento online — frete e pagamento combinados por lá.
          </p>
        </footer>
      </div>
    </div>
  );
}

function OptionRow({
  checked,
  onClick,
  title,
  hint,
  disabled,
  children,
}: {
  checked: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 transition ${
        disabled
          ? "border-marrom/10 bg-creme/40 opacity-60"
          : checked
            ? "border-dourado bg-dourado-soft/30"
            : "border-dourado/30 bg-creme"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="flex w-full items-start gap-3 text-left disabled:cursor-not-allowed"
      >
        <span
          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
            checked ? "border-dourado bg-dourado text-creme" : "border-marrom-soft/40"
          }`}
        >
          {checked && <Check className="h-3 w-3" />}
        </span>
        <span className="flex-1">
          <span className="block text-sm font-semibold text-marrom">{title}</span>
          {hint && <span className="block text-xs text-marrom-soft">{hint}</span>}
        </span>
      </button>
      {children}
    </div>
  );
}
