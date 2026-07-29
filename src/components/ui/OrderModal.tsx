import { useEffect, useMemo, useState } from "react";
import {
  X,
  Minus,
  Plus,
  Send,
  MessageCircle,
  Smartphone,
  Mail,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { truffles, categoriaLabel, type Categoria } from "@/data/truffles";
import { config } from "@/data/config";
import { buildWhatsappUrl, formatBRL } from "@/lib/whatsapp";

type Step = "sabores" | "contato" | "enviando" | "sucesso" | "erro";
const CATEGORIAS: Categoria[] = ["classicos", "frutas", "brancos", "especiais"];

function initialTab(counts: Record<string, number>): Categoria {
  const firstId = Object.keys(counts)[0];
  if (!firstId) return "classicos";
  return truffles.find((t) => t.id === firstId)?.categoria ?? "classicos";
}

export function OrderModal({
  onClose,
  initialCounts = {},
}: {
  onClose: () => void;
  initialCounts?: Record<string, number>;
}) {
  const [step, setStep] = useState<Step>("sabores");
  const [tab, setTab] = useState<Categoria>(() => initialTab(initialCounts));
  const [counts, setCounts] = useState<Record<string, number>>(initialCounts);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    observacao: "",
    entrega: "" as "" | "retirada" | "entrega",
    endereco: "",
  });
  const [via, setVia] = useState<"whatsapp" | "email">("whatsapp");

  const entregaValida =
    form.entrega === "retirada" ||
    (form.entrega === "entrega" && form.endereco.trim().length > 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const { subtotal, totalPecas } = useMemo(() => {
    let s = 0, p = 0;
    for (const [id, qty] of Object.entries(counts)) {
      if (qty > 0) { s += config.precoTrufa * qty; p += qty; }
    }
    return { subtotal: s, totalPecas: p };
  }, [counts]);

  const itensSelecionados = Object.entries(counts)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => ({ trufa: truffles.find((t) => t.id === id)!, qty: q }));

  function setQty(id: string, delta: number) {
    setCounts((prev) => {
      const cur = prev[id] ?? 0;
      const next = Math.max(0, cur + delta);
      const updated = { ...prev, [id]: next };
      if (next === 0) delete updated[id];
      return updated;
    });
  }

  function setQtyDirect(id: string, val: number) {
    const next = Math.max(0, Math.min(99, isNaN(val) ? 0 : val));
    setCounts((prev) => {
      const updated = { ...prev, [id]: next };
      if (next === 0) delete updated[id];
      return updated;
    });
  }

  function pedirWhatsapp() {
    if (!entregaValida) return;
    const linhas = [
      "Olá, Sr. Trufa! Quero fazer um pedido 🍫",
      "",
      `*Nome:* ${form.nome || "—"}`,
      `*Telefone:* ${form.telefone || "—"}`,
      "",
      "*Sabores escolhidos:*",
      ...itensSelecionados.map((i) => `• ${i.qty}x ${i.trufa.nome}`),
      "",
      `*Total:* ${totalPecas} trufa${totalPecas !== 1 ? "s" : ""} — ${formatBRL(subtotal)}`,
      "",
      `*Retirada ou entrega:* ${form.entrega === "entrega" ? "Entrega" : "Retirada"}`,
      ...(form.entrega === "entrega" ? [`*Endereço:* ${form.endereco}`] : []),
      ...(form.observacao ? ["", `*Obs:* ${form.observacao}`] : []),
    ];
    window.open(buildWhatsappUrl(linhas), "_blank", "noopener,noreferrer");
    onClose();
  }

  async function pedirEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!config.formspreeId || !entregaValida) return;
    setStep("enviando");
    try {
      const res = await fetch(`https://formspree.io/f/${config.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          telefone: form.telefone,
          observacao: form.observacao,
          entrega: form.entrega === "entrega" ? "Entrega" : "Retirada",
          endereco: form.entrega === "entrega" ? form.endereco : "",
          pedido: itensSelecionados.map((i) => `${i.qty}x ${i.trufa.nome}`).join(", "),
          total: formatBRL(subtotal),
          totalPecas,
        }),
      });
      setStep(res.ok ? "sucesso" : "erro");
    } catch {
      setStep("erro");
    }
  }

  const visiveis = truffles.filter((t) => t.categoria === tab);
  const hasFormspree = Boolean(config.formspreeId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fazer pedido"
      className="fixed inset-0 z-50 flex items-end justify-center bg-marrom-deep/80 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[94vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-marrom shadow-2xl sm:rounded-2xl"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-dourado/25 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-dourado">
              {step === "sabores" ? "Passo 1 de 2" : step === "contato" ? "Passo 2 de 2" : ""}
            </p>
            <h3 className="mt-0.5 font-display text-xl text-creme">
              {step === "sabores" && "Escolha seus sabores"}
              {step === "contato" && "Finalizar pedido"}
              {step === "enviando" && "Enviando…"}
              {step === "sucesso" && "Pedido enviado!"}
              {step === "erro" && "Erro no envio"}
            </h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar"
            className="rounded-full p-2 text-creme hover:bg-creme/10">
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* ── STEP 1: Sabores ── */}
        {step === "sabores" && (
          <>
            <div className="flex gap-1.5 overflow-x-auto border-b border-dourado/20 px-4 py-2">
              {CATEGORIAS.map((cat) => (
                <button key={cat} type="button" onClick={() => setTab(cat)}
                  className={["flex-none rounded-full px-3 py-1 text-xs font-semibold transition whitespace-nowrap",
                    tab === cat ? "bg-dourado text-marrom-deep" : "text-marrom-soft hover:text-creme"].join(" ")}>
                  {categoriaLabel[cat]}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              <ul className="grid grid-cols-1 gap-2">
                {visiveis.map((t) => {
                  const qty = counts[t.id] ?? 0;
                  return (
                    <li key={t.id}
                      className={["rounded-xl border px-3 pt-2.5 pb-3 transition",
                        qty > 0 ? "border-dourado bg-dourado/15" : "border-dourado/20 bg-marrom-deep/40"].join(" ")}>
                      {/* Nome + controles +/- */}
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-creme">{t.nome}</span>
                        <div className="flex items-center gap-1.5">
                          <button type="button" onClick={() => setQty(t.id, -1)} disabled={qty === 0}
                            aria-label={`Remover ${t.nome}`}
                            className="grid h-7 w-7 place-items-center rounded-full border border-dourado/40 text-creme disabled:opacity-30">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          {/* Input editável */}
                          <input
                            type="number"
                            min={0}
                            max={99}
                            value={qty === 0 ? "" : qty}
                            placeholder="0"
                            onChange={(e) => setQtyDirect(t.id, parseInt(e.target.value))}
                            onFocus={(e) => e.target.select()}
                            className="w-9 bg-transparent text-center text-sm font-bold tabular-nums text-creme outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button type="button" onClick={() => setQty(t.id, 1)}
                            aria-label={`Adicionar ${t.nome}`}
                            className="grid h-7 w-7 place-items-center rounded-full border border-dourado/40 text-creme">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      {/* Slider */}
                      <div className="mt-2.5 px-0.5">
                        <input
                          type="range"
                          min={0}
                          max={20}
                          value={qty}
                          onChange={(e) => setQtyDirect(t.id, parseInt(e.target.value))}
                          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-dourado/20 outline-none"
                          style={{ accentColor: "#c9a24a" }}
                          aria-label={`Quantidade de ${t.nome}`}
                        />
                        <div className="mt-1 flex justify-between text-[9px] text-marrom-soft/50 tabular-nums">
                          <span>0</span><span>10</span><span>20</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <footer className="border-t border-dourado/25 bg-marrom-deep/40 px-5 py-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-marrom-soft">{totalPecas} trufa{totalPecas !== 1 ? "s" : ""} selecionada{totalPecas !== 1 ? "s" : ""}</span>
                <span className="font-display text-xl font-bold text-dourado">{formatBRL(subtotal)}</span>
              </div>
              <button type="button" disabled={totalPecas === 0} onClick={() => setStep("contato")}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-dourado px-6 py-3.5 text-sm font-semibold text-marrom-deep shadow transition enabled:hover:bg-dourado-soft disabled:opacity-40">
                Continuar <ChevronRight className="h-4 w-4" />
              </button>
            </footer>
          </>
        )}

        {/* ── STEP 2: Contato ── */}
        {step === "contato" && (
          <form onSubmit={pedirEmail} className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {/* Resumo do pedido */}
              <div className="rounded-xl border border-dourado/25 bg-marrom-deep/40 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-dourado mb-2">Resumo</p>
                <ul className="space-y-1">
                  {itensSelecionados.map((i) => (
                    <li key={i.trufa.id} className="flex justify-between text-sm text-creme">
                      <span>{i.trufa.nome}</span>
                      <span className="font-semibold">×{i.qty}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-between border-t border-dourado/20 pt-2 text-sm font-bold text-creme">
                  <span>Total estimado</span>
                  <span className="text-dourado">{formatBRL(subtotal)}</span>
                </div>
              </div>

              {/* Campos */}
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-marrom-soft" htmlFor="nome">
                    Seu nome *
                  </label>
                  <input id="nome" required value={form.nome}
                    onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                    placeholder="Como posso te chamar?"
                    className="w-full rounded-xl border border-dourado/25 bg-marrom-deep/40 px-4 py-2.5 text-sm text-creme placeholder:text-marrom-soft outline-none focus:border-dourado" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-marrom-soft" htmlFor="telefone">
                    WhatsApp / Telefone
                  </label>
                  <input id="telefone" type="tel" value={form.telefone}
                    onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
                    placeholder="(17) 9 ____-____"
                    className="w-full rounded-xl border border-dourado/25 bg-marrom-deep/40 px-4 py-2.5 text-sm text-creme placeholder:text-marrom-soft outline-none focus:border-dourado" />
                </div>
                <div>
                  <span className="mb-1 block text-xs font-semibold text-marrom-soft">
                    Retirada ou entrega? *
                  </span>
                  <div className="flex gap-2">
                    {(["retirada", "entrega"] as const).map((opt) => (
                      <button key={opt} type="button"
                        onClick={() => setForm((f) => ({ ...f, entrega: opt }))}
                        className={["flex-1 rounded-xl border py-2.5 text-sm font-semibold transition",
                          form.entrega === opt ? "border-dourado bg-dourado/15 text-creme" : "border-dourado/20 text-marrom-soft"].join(" ")}>
                        {opt === "retirada" ? "Retirada" : "Entrega"}
                      </button>
                    ))}
                  </div>
                  {form.entrega === "entrega" && (
                    <input required value={form.endereco}
                      onChange={(e) => setForm((f) => ({ ...f, endereco: e.target.value }))}
                      placeholder="Endereço completo de entrega"
                      className="mt-2 w-full rounded-xl border border-dourado/25 bg-marrom-deep/40 px-4 py-2.5 text-sm text-creme placeholder:text-marrom-soft outline-none focus:border-dourado" />
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-marrom-soft" htmlFor="obs">
                    Observações (opcional)
                  </label>
                  <textarea id="obs" rows={2} value={form.observacao}
                    onChange={(e) => setForm((f) => ({ ...f, observacao: e.target.value }))}
                    placeholder="Alguma preferência, endereço de entrega, etc."
                    className="w-full resize-none rounded-xl border border-dourado/25 bg-marrom-deep/40 px-4 py-2.5 text-sm text-creme placeholder:text-marrom-soft outline-none focus:border-dourado" />
                </div>
              </div>

              {/* Escolha de canal */}
              {hasFormspree && (
                <div className="flex gap-2">
                  {(["whatsapp", "email"] as const).map((v) => (
                    <button key={v} type="button" onClick={() => setVia(v)}
                      className={["flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-semibold transition",
                        via === v ? "border-dourado bg-dourado/15 text-creme" : "border-dourado/20 text-marrom-soft"].join(" ")}>
                      {v === "whatsapp" ? <Smartphone className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                      {v === "whatsapp" ? "WhatsApp" : "E-mail"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <footer className="border-t border-dourado/25 bg-marrom-deep/40 px-5 py-4 space-y-2">
              {via === "whatsapp" || !hasFormspree ? (
                <button type="button" onClick={pedirWhatsapp} disabled={!entregaValida}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow transition hover:opacity-90 disabled:opacity-40">
                  <MessageCircle className="h-4 w-4" />
                  Enviar pedido no WhatsApp
                </button>
              ) : (
                <button type="submit" disabled={!entregaValida}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-dourado px-6 py-3.5 text-sm font-semibold text-marrom-deep shadow transition hover:bg-dourado-soft disabled:opacity-40">
                  <Send className="h-4 w-4" />
                  Enviar pedido por e-mail
                </button>
              )}
              <button type="button" onClick={() => setStep("sabores")}
                className="flex w-full items-center justify-center gap-1 text-xs text-marrom-soft hover:text-creme">
                <ChevronLeft className="h-3.5 w-3.5" /> Voltar aos sabores
              </button>
            </footer>
          </form>
        )}

        {/* ── ENVIANDO ── */}
        {step === "enviando" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-dourado/25 border-t-dourado" />
            <p className="text-marrom-soft text-sm">Enviando seu pedido…</p>
          </div>
        )}

        {/* ── SUCESSO ── */}
        {step === "sucesso" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-dourado" />
            <p className="font-display text-xl text-creme">Pedido recebido!</p>
            <p className="text-sm text-marrom-soft">
              Em breve entraremos em contato pelo WhatsApp para confirmar e combinar a entrega.
            </p>
            <button type="button" onClick={onClose}
              className="mt-2 rounded-full bg-dourado px-6 py-3 text-sm font-semibold text-marrom-deep">
              Fechar
            </button>
          </div>
        )}

        {/* ── ERRO ── */}
        {step === "erro" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
            <AlertTriangle className="h-10 w-10 text-dourado" />
            <p className="font-display text-xl text-creme">Não conseguimos enviar</p>
            <p className="text-sm text-marrom-soft">
              Tente pelo WhatsApp ou tente novamente em instantes.
            </p>
            <div className="flex gap-2 mt-2">
              <button type="button" onClick={pedirWhatsapp}
                className="rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white">
                WhatsApp
              </button>
              <button type="button" onClick={() => setStep("contato")}
                className="rounded-full border border-dourado/40 px-5 py-2.5 text-sm font-semibold text-creme">
                Tentar novamente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
