import { useState } from "react";
import { ShoppingBag, Instagram, Building2, User } from "lucide-react";
import {
  truffles,
  categoriaLabel,
  categoriaEmoji,
  type Categoria,
} from "@/data/truffles";
import { config } from "@/data/config";
import { buildWhatsappUrl, formatBRL } from "@/lib/whatsapp";
import { OrderModal } from "@/components/ui/OrderModal";
import { B2BSection } from "@/components/home/B2BSection";

const CATEGORIAS: Categoria[] = ["classicos", "frutas", "brancos", "especiais"];
const FORMAS_PAGAMENTO = ["Dinheiro", "Pix", "Débito", "Crédito"];
type Modo = "b2c" | "b2b";

export function CardapioSection() {
  const [modo, setModo] = useState<Modo>("b2c");
  const [tab, setTab] = useState<Categoria>("classicos");
  const [modalOpen, setModalOpen] = useState(false);

  const visiveis = truffles.filter((t) => t.categoria === tab);

  return (
    <section id="cardapio" className="bg-marrom py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4">

        {/* Cabeçalho */}
        <div className="mb-10 text-center">
          <h2 className="font-display text-4xl text-dourado-soft sm:text-5xl">
            Nossos Sabores
          </h2>
          <p className="font-script mt-1 text-xl text-creme/80">
            Escolha o seu — todos feitos à mão
          </p>
          <div className="brand-divider mx-auto mt-6 max-w-xs">
            <span className="brand-divider__diamond" />
          </div>
        </div>

        {/* Toggle B2C / B2B */}
        <div className="mb-10 flex justify-center">
          <div className="flex rounded-full border border-dourado/30 bg-marrom/60 p-1">
            <button
              type="button"
              onClick={() => setModo("b2c")}
              className={[
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition",
                modo === "b2c"
                  ? "bg-dourado text-marrom shadow"
                  : "text-dourado/60 hover:text-dourado",
              ].join(" ")}
            >
              <User className="h-4 w-4" />
              Pessoa Física
            </button>
            <button
              type="button"
              onClick={() => setModo("b2b")}
              className={[
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition",
                modo === "b2b"
                  ? "bg-dourado text-marrom shadow"
                  : "text-dourado/60 hover:text-dourado",
              ].join(" ")}
            >
              <Building2 className="h-4 w-4" />
              Empresa / Evento
            </button>
          </div>
        </div>

        {/* ── VERSÃO B2C ── */}
        {modo === "b2c" && (
          <>
            {/* Tabs de categoria */}
            <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setTab(cat)}
                  className={[
                    "flex-none rounded-full px-4 py-2 text-sm font-semibold transition whitespace-nowrap",
                    tab === cat
                      ? "bg-dourado text-marrom shadow-md"
                      : "border border-dourado/30 text-dourado hover:border-dourado/60",
                  ].join(" ")}
                >
                  {categoriaEmoji[cat]} {categoriaLabel[cat]}
                </button>
              ))}
            </div>

            {/* Grid de sabores */}
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {visiveis.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-2 rounded-xl border border-dourado/20 bg-marrom/60 px-3 py-3 text-sm font-medium text-creme transition hover:border-dourado/50 hover:bg-dourado/10"
                >
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-dourado" />
                  {t.nome}
                </li>
              ))}
            </ul>

            {/* Preço, como no cardápio impresso */}
            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dourado/40 bg-marrom-deep/50 px-6 py-6 sm:flex-row sm:px-8">
              <div>
                <p className="font-script text-xl text-dourado">Cada trufa artesanal</p>
                <p className="text-xs text-marrom-soft">Dinheiro e Pix — preço cheio</p>
              </div>
              <p className="font-display text-4xl font-bold text-creme sm:text-5xl">
                {formatBRL(config.precoTrufa)}
              </p>
            </div>

            {/* Formas de pagamento */}
            <div className="mt-8">
              <p className="text-center text-[11px] font-bold uppercase tracking-widest text-dourado">
                Formas de pagamento
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {FORMAS_PAGAMENTO.map((forma) => (
                  <span
                    key={forma}
                    className="flex items-center gap-1.5 rounded-full border border-dourado/40 px-4 py-1.5 text-sm font-semibold text-creme"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-dourado" />
                    {forma}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-marrom-soft italic">
                No crédito, cada trufa sai por {formatBRL(config.precoTrufaCredito)} —
                acréscimo por conta da taxa da maquininha.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-dourado px-8 py-4 text-base font-semibold text-marrom-deep shadow-lg shadow-dourado/20 transition hover:bg-dourado-soft sm:w-auto"
              >
                <ShoppingBag className="h-5 w-5" />
                Fazer meu pedido
              </button>
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-dourado/40 px-8 py-4 text-base font-semibold text-dourado transition hover:border-dourado hover:bg-dourado/10 sm:w-auto"
              >
                <Instagram className="h-5 w-5" />
                Ver no Instagram
              </a>
            </div>

            <p className="mt-4 text-center text-xs text-marrom-soft">
              Veja fotos de todos os sabores em{" "}
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dourado underline underline-offset-2 hover:text-dourado/80"
              >
                {config.instagramHandle}
              </a>
            </p>
          </>
        )}

        {/* ── VERSÃO B2B ── */}
        {modo === "b2b" && <B2BSection />}
      </div>

      {modalOpen && <OrderModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}
