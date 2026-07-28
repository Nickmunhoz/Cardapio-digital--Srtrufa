import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, Hand } from "lucide-react";
import trufaFechada  from "@/assets/img/sabores/trufa-fechada.png";
import kinderRecheio from "@/assets/img/sabores/kinder-bueno.png";
import nutninhoRecheio from "@/assets/img/sabores/nutninho.png";
import maracujaRecheio from "@/assets/img/sabores/maracuja-nutella.png";
import oreoRecheio   from "@/assets/img/sabores/oreo-chocolate.png";
import ovoRecheio    from "@/assets/img/sabores/ovomaltine.png";
// Ingredientes
import avelas           from "@/assets/img/ingredientes/avelas.png";
import ninho            from "@/assets/img/ingredientes/ninho.png";
import chocolateNinho   from "@/assets/img/ingredientes/chocolate-ninho.png";
import maracuja         from "@/assets/img/ingredientes/maracuja.png";
import chocolateMaracuja from "@/assets/img/ingredientes/chocolate-maracuja.png";
import oreo             from "@/assets/img/ingredientes/oreo.png";
import ovomaltine       from "@/assets/img/ingredientes/ovomaltine.png";
import { buildWhatsappUrl } from "@/lib/whatsapp";

// blend: "multiply" = fundo branco desaparece em bg escuro via screen
//        "screen"   = fundo preto desaparece em bg escuro
type Ingrediente = {
  src: string;
  blend: "multiply" | "screen";
  style: React.CSSProperties;
};

type Sabor = {
  id: string;
  nome: string;
  tagline: string;
  bg: string;
  accent: string;
  recheio: string;
  ingredientes: Ingrediente[];
};

const SABORES: Sabor[] = [
  {
    id: "kinder-bueno",
    nome: "Kinder Bueno",
    tagline: "Creme de avelã com chocolate ao leite",
    bg: "#28140A",
    accent: "#C08A3C",
    recheio: kinderRecheio,
    ingredientes: [
      { src: avelas, blend: "multiply", style: { top: "4%",  right: "-2%", width: "38%", opacity: 0.28, transform: "rotate(10deg)" } },
      { src: avelas, blend: "multiply", style: { bottom: "6%", left: "-3%",  width: "30%", opacity: 0.18, transform: "rotate(-8deg) scaleX(-1)" } },
    ],
  },
  {
    id: "nutninho",
    nome: "Nutninho",
    tagline: "Leite Ninho com creme de avelã",
    bg: "#1E0E06",
    accent: "#D4A84E",
    recheio: nutninhoRecheio,
    ingredientes: [
      { src: ninho,          blend: "multiply", style: { top: "3%",   right: "0%",  width: "36%", opacity: 0.30, transform: "rotate(6deg)" } },
      { src: chocolateNinho, blend: "screen",   style: { bottom: "4%", left: "-2%", width: "42%", opacity: 0.22, transform: "rotate(-5deg)" } },
    ],
  },
  {
    id: "maracuja-nutella",
    nome: "Maracujá com Nutella",
    tagline: "Acidez do maracujá com creme de avelã",
    bg: "#221205",
    accent: "#D4961E",
    recheio: maracujaRecheio,
    ingredientes: [
      { src: maracuja,         blend: "multiply", style: { top: "2%",   right: "-1%", width: "44%", opacity: 0.32, transform: "rotate(4deg)" } },
      { src: chocolateMaracuja, blend: "screen",  style: { bottom: "3%", left: "-3%", width: "40%", opacity: 0.20, transform: "rotate(-7deg)" } },
    ],
  },
  {
    id: "oreo-chocolate",
    nome: "Oreo Chocolate",
    tagline: "Creme de biscoito Oreo no recheio",
    bg: "#0C080C",
    accent: "#9E8AB0",
    recheio: oreoRecheio,
    ingredientes: [
      { src: oreo, blend: "screen", style: { top: "-2%",  right: "-4%", width: "52%", opacity: 0.35, transform: "rotate(5deg)" } },
      { src: oreo, blend: "screen", style: { bottom: "-2%", left: "-4%",  width: "40%", opacity: 0.22, transform: "rotate(-10deg) scaleX(-1)" } },
    ],
  },
  {
    id: "ovomaltine",
    nome: "Ovomaltine",
    tagline: "Crocante de Ovomaltine no recheio",
    bg: "#1E0C04",
    accent: "#C07828",
    recheio: ovoRecheio,
    ingredientes: [
      { src: ovomaltine, blend: "screen", style: { top: "-5%", right: "-6%", width: "56%", opacity: 0.30, transform: "rotate(3deg)" } },
      { src: ovomaltine, blend: "screen", style: { bottom: "-5%", left: "-5%", width: "40%", opacity: 0.18, transform: "rotate(-12deg) scaleX(-1)" } },
    ],
  },
];

export function FlavorCarouselSection() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const sabor = SABORES[active];

  function prev() { setActive((i) => (i - 1 + SABORES.length) % SABORES.length); setRevealed(false); }
  function next() { setActive((i) => (i + 1) % SABORES.length); setRevealed(false); }
  function goTo(i: number) { setActive(i); setRevealed(false); }
  function toggleReveal() { setRevealed((v) => !v); }

  const waMsg = buildWhatsappUrl([`Olá, Sr. Trufa! Quero pedir trufas de ${sabor.nome}.`]);

  return (
    <section className="overflow-hidden bg-marrom py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">

        {/* Cabeçalho */}
        <div className="mb-8 text-center sm:mb-10">
          <p className="font-script text-xl text-dourado-soft sm:text-2xl">
            sabores fotografados
          </p>
          <h2 className="mt-1 font-display text-3xl text-creme sm:text-4xl lg:text-5xl">
            5 sabores, 5 recheios reais
          </h2>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-marrom-soft sm:text-sm">
            <Hand className="h-3.5 w-3.5" />
            Toque na trufa para ver o recheio
          </p>
        </div>

        {/* Card principal */}
        <div
          key={sabor.id}
          className="relative overflow-hidden rounded-2xl shadow-2xl sm:rounded-3xl"
          style={{ backgroundColor: sabor.bg }}
        >
          {/* Ingredientes de fundo */}
          {sabor.ingredientes.map((ing, idx) => (
            <img
              key={idx}
              src={ing.src}
              aria-hidden
              className="pointer-events-none absolute select-none"
              style={{
                ...ing.style,
                mixBlendMode: ing.blend,
              }}
            />
          ))}

          {/* Layout: vertical em mobile, horizontal em desktop */}
          <div className="relative z-10 flex flex-col sm:grid sm:grid-cols-2">

            {/* Área da foto */}
            <button
              type="button"
              aria-label={revealed ? "Ver trufa fechada" : "Ver recheio"}
              onClick={toggleReveal}
              onMouseEnter={() => setRevealed(true)}
              onMouseLeave={() => setRevealed(false)}
              className="relative flex min-h-[220px] cursor-pointer items-center justify-center bg-[#F5EAD9] p-8 sm:min-h-[360px] sm:p-10"
            >
              {/* Trufa fechada */}
              <img
                src={trufaFechada}
                alt="Trufa"
                className={[
                  "absolute w-36 object-contain transition-opacity duration-500 sm:w-52",
                  revealed ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              {/* Recheio */}
              <img
                src={sabor.recheio}
                alt={`Recheio ${sabor.nome}`}
                className={[
                  "absolute w-36 object-contain transition-opacity duration-500 sm:w-52",
                  revealed ? "opacity-100" : "opacity-0",
                ].join(" ")}
              />

              {/* Badge de hint */}
              <span
                className={[
                  "absolute bottom-3 rounded-full px-3 py-1 text-[10px] font-semibold text-white transition-opacity duration-300 sm:text-xs",
                  revealed ? "opacity-0" : "opacity-90",
                ].join(" ")}
                style={{ backgroundColor: sabor.accent }}
              >
                {revealed ? "" : "toque para ver o recheio"}
              </span>
            </button>

            {/* Texto */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span
                className="mb-3 w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-marrom-deep sm:text-[11px]"
                style={{ backgroundColor: sabor.accent }}
              >
                {active + 1} de {SABORES.length}
              </span>

              <h3 className="font-display text-2xl text-creme sm:text-3xl lg:text-4xl">
                {sabor.nome}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-creme/55 sm:text-base">
                {sabor.tagline}
              </p>

              <div className="my-5 brand-divider max-w-[80px]">
                <span className="brand-divider__diamond" style={{ background: sabor.accent }} />
              </div>

              <a
                href={waMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-marrom-deep transition hover:opacity-90 sm:px-6 sm:py-3"
                style={{ backgroundColor: sabor.accent }}
              >
                <MessageCircle className="h-4 w-4" />
                Quero esse sabor
              </a>
            </div>
          </div>
        </div>

        {/* Navegação */}
        <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8 sm:gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Sabor anterior"
            className="rounded-full border border-dourado/25 p-2 text-dourado/50 transition hover:border-dourado hover:text-dourado"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {SABORES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={s.nome}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  i === active ? 22 : 7,
                  height: 7,
                  backgroundColor: i === active ? "#C9A24A" : "rgba(201,162,74,0.25)",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Próximo sabor"
            className="rounded-full border border-dourado/25 p-2 text-dourado/50 transition hover:border-dourado hover:text-dourado"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Labels clicáveis dos sabores */}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {SABORES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold transition sm:text-sm",
                i === active
                  ? "border border-dourado/50 bg-dourado/15 text-dourado"
                  : "text-marrom-soft hover:text-creme",
              ].join(" ")}
            >
              {s.nome}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
