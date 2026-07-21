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
          <span className="inline-block rounded-full border border-dourado/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-dourado">
            Cardápio Digital
          </span>
          <h2 className="mt-4 font-display text-3xl text-creme sm:text-4xl">
            Nossos Sabores
          </h2>
          <p className="mt-3 text-sm text-marrom-soft">
            44 sabores artesanais · todos feitos à mão em Barretos/SP
          </p>
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
            <p className="mb-6 text-center font-semibold text-lg text-dourado">
              {formatBRL(config.precoTrufa)} cada
            </p>

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

            <p className="mt-6 text-center text-xs text-marrom-soft italic">
              💳 No crédito: {formatBRL(config.precoTrufaCredito)} por trufa
              (acréscimo da maquininha)
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-laranja px-8 py-4 text-base font-semibold text-creme shadow-lg shadow-laranja/30 transition hover:bg-laranja-deep sm:w-auto"
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
