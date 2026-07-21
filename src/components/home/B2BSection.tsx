import { useState } from "react";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { config } from "@/data/config";
import { buildWhatsappUrl, formatBRL } from "@/lib/whatsapp";

type FormState = "idle" | "enviando" | "sucesso";

export function B2BSection() {
  const [form, setForm] = useState({
    empresa: "",
    quantidade: "",
    email: "",
    telefone: "",
    observacao: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function faixaAtual() {
    const qty = parseInt(form.quantidade, 10);
    if (!qty || qty < config.b2bMinimo) return null;
    return (
      config.b2bFaixas.find(
        (f) => qty >= f.min && (f.max === null || qty <= f.max)
      ) ?? null
    );
  }

  function enviarWhatsApp(e: React.FormEvent) {
    e.preventDefault();
    const faixa = faixaAtual();
    const qty = parseInt(form.quantidade, 10);
    const subtotal = faixa ? faixa.preco * qty : null;

    const linhas = [
      "Olá, Sr. Trufa! Tenho interesse em um pedido corporativo 🏢🍫",
      "",
      `*Empresa:* ${form.empresa}`,
      `*Quantidade:* ${form.quantidade} trufas`,
      faixa
        ? `*Faixa de preço:* ${formatBRL(faixa.preco)} un (${faixa.label})`
        : "",
      subtotal ? `*Subtotal estimado:* ${formatBRL(subtotal)}` : "",
      "",
      `*E-mail:* ${form.email || "—"}`,
      `*Telefone:* ${form.telefone || "—"}`,
      ...(form.observacao
        ? ["", `*Observações:* ${form.observacao}`]
        : []),
    ].filter(Boolean);

    window.open(buildWhatsappUrl(linhas), "_blank", "noopener,noreferrer");
    setFormState("sucesso");
  }

  const faixa = faixaAtual();
  const qty = parseInt(form.quantidade, 10);

  return (
    <div className="space-y-10">

      {/* Tabela de preços */}
      <div>
        <h3 className="mb-4 text-center font-display text-xl text-creme">
          Tabela de preços corporativos
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {config.b2bFaixas.map((f) => (
            <div
              key={f.label}
              className={[
                "rounded-2xl border px-5 py-4 text-center transition",
                qty >= f.min && (f.max === null || qty <= f.max)
                  ? "border-dourado bg-dourado/15 ring-1 ring-dourado"
                  : "border-dourado/20 bg-marrom-deep/50",
              ].join(" ")}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-marrom-soft mb-1">
                {f.label}
              </p>
              <p className="font-display text-3xl font-bold text-dourado">
                {formatBRL(f.preco)}
              </p>
              <p className="mt-1 text-xs text-marrom-soft">por unidade</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-marrom-soft">
          Pedido mínimo: {config.b2bMinimo} unidades ·
          Sabores à escolha · Embalagem inclusa
        </p>
      </div>

      {/* Estimativa dinâmica */}
      {faixa && qty >= config.b2bMinimo && (
        <div className="rounded-2xl border border-dourado/40 bg-dourado/10 px-6 py-4 text-center">
          <p className="text-sm text-marrom-soft mb-1">Estimativa para {qty} trufas</p>
          <p className="font-display text-3xl font-bold text-dourado">
            {formatBRL(faixa.preco * qty)}
          </p>
          <p className="mt-1 text-xs text-marrom-soft">
            {formatBRL(faixa.preco)} × {qty} unidades
          </p>
        </div>
      )}

      {/* Formulário de orçamento */}
      {formState === "sucesso" ? (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <CheckCircle2 className="h-12 w-12 text-dourado" />
          <p className="font-display text-xl text-creme">Solicitação enviada!</p>
          <p className="text-sm text-marrom-soft max-w-xs">
            Abrimos o WhatsApp com os detalhes do seu pedido. Em breve
            retornamos com a confirmação e prazo.
          </p>
          <button
            type="button"
            onClick={() => { setFormState("idle"); setForm({ empresa: "", quantidade: "", email: "", telefone: "", observacao: "" }); }}
            className="mt-2 rounded-full border border-dourado/40 px-6 py-2.5 text-sm font-semibold text-dourado hover:bg-dourado/10 transition"
          >
            Novo orçamento
          </button>
        </div>
      ) : (
        <form onSubmit={enviarWhatsApp} className="space-y-4">
          <h3 className="font-display text-xl text-creme text-center">
            Solicitar orçamento
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-marrom-soft" htmlFor="empresa">
                Nome da empresa *
              </label>
              <input
                id="empresa"
                name="empresa"
                required
                value={form.empresa}
                onChange={handleChange}
                placeholder="Razão social ou nome fantasia"
                className="w-full rounded-xl border border-dourado/30 bg-marrom-deep/50 px-4 py-2.5 text-sm text-creme placeholder:text-marrom-soft outline-none focus:border-dourado"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-marrom-soft" htmlFor="quantidade">
                Quantidade de trufas *
              </label>
              <input
                id="quantidade"
                name="quantidade"
                type="number"
                required
                min={config.b2bMinimo}
                value={form.quantidade}
                onChange={handleChange}
                placeholder={`Mínimo ${config.b2bMinimo} unidades`}
                className="w-full rounded-xl border border-dourado/30 bg-marrom-deep/50 px-4 py-2.5 text-sm text-creme placeholder:text-marrom-soft outline-none focus:border-dourado"
              />
              {qty > 0 && qty < config.b2bMinimo && (
                <p className="mt-1 text-xs text-red-400">
                  Mínimo de {config.b2bMinimo} unidades para pedidos B2B
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-marrom-soft" htmlFor="email">
                E-mail para contato *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="empresa@email.com"
                className="w-full rounded-xl border border-dourado/30 bg-marrom-deep/50 px-4 py-2.5 text-sm text-creme placeholder:text-marrom-soft outline-none focus:border-dourado"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-marrom-soft" htmlFor="telefone">
                WhatsApp / Telefone *
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                required
                value={form.telefone}
                onChange={handleChange}
                placeholder="(17) 9 ____-____"
                className="w-full rounded-xl border border-dourado/30 bg-marrom-deep/50 px-4 py-2.5 text-sm text-creme placeholder:text-marrom-soft outline-none focus:border-dourado"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-marrom-soft" htmlFor="observacao">
              Observações (opcional)
            </label>
            <textarea
              id="observacao"
              name="observacao"
              rows={3}
              value={form.observacao}
              onChange={handleChange}
              placeholder="Data do evento, sabores preferidos, embalagem personalizada..."
              className="w-full resize-none rounded-xl border border-dourado/30 bg-marrom-deep/50 px-4 py-2.5 text-sm text-creme placeholder:text-marrom-soft outline-none focus:border-dourado"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" />
            Solicitar orçamento pelo WhatsApp
          </button>

          <p className="text-center text-xs text-marrom-soft">
            Respondemos em até 24h · Sem compromisso
          </p>
        </form>
      )}
    </div>
  );
}
