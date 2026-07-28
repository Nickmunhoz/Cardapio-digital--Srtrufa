import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle } from "lucide-react";
import trufaFechada    from "@/assets/img/sabores/trufa-fechada.png";
import kinderRecheio   from "@/assets/img/sabores/kinder-bueno.png";
import nutninhoRecheio from "@/assets/img/sabores/nutninho.png";
import maracujaRecheio from "@/assets/img/sabores/maracuja-nutella.png";
import oreoRecheio     from "@/assets/img/sabores/oreo-chocolate.png";
import ovoRecheio      from "@/assets/img/sabores/ovomaltine.png";
import { buildWhatsappUrl } from "@/lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

type Sabor = {
  id: string;
  nome: string;
  tagline: string;
  accent: string;
  recheio: string;
};

const SABORES: Sabor[] = [
  {
    id: "kinder-bueno",
    nome: "Kinder Bueno",
    tagline: "Creme de avelã com chocolate ao leite",
    accent: "#C08A3C",
    recheio: kinderRecheio,
  },
  {
    id: "nutninho",
    nome: "Nutninho",
    tagline: "Leite Ninho com creme de avelã",
    accent: "#D4A84E",
    recheio: nutninhoRecheio,
  },
  {
    id: "maracuja-nutella",
    nome: "Maracujá com Nutella",
    tagline: "Acidez do maracujá com creme de avelã",
    accent: "#D4961E",
    recheio: maracujaRecheio,
  },
  {
    id: "oreo-chocolate",
    nome: "Oreo Chocolate",
    tagline: "Creme de biscoito Oreo no recheio",
    accent: "#9E8AB0",
    recheio: oreoRecheio,
  },
  {
    id: "ovomaltine",
    nome: "Ovomaltine",
    tagline: "Crocante de Ovomaltine no recheio",
    accent: "#C07828",
    recheio: ovoRecheio,
  },
];

/* ══════════════════════════════════════════════
   Card desktop — estilo feed Instagram
   ══════════════════════════════════════════════ */
function DesktopCard({ sabor, index }: { sabor: Sabor; index: number }) {
  const [hovered, setHovered] = useState(false);
  const waMsg = buildWhatsappUrl([`Olá, Sr. Trufa! Quero pedir trufas de ${sabor.nome}.`]);

  return (
    <div
      className="flex-shrink-0 rounded-3xl overflow-hidden border"
      style={{
        width: 340,
        backgroundColor: "#1c0d05",
        borderColor: "rgba(201,162,74,0.20)",
        boxShadow: "0 16px 56px rgba(0,0,0,0.55)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Área da imagem (topo do card) ── */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: 300, backgroundColor: "#150a03", cursor: "pointer" }}
      >
        {/* Número */}
        <span
          className="absolute top-4 right-4 font-display text-xs tracking-widest opacity-35"
          style={{ color: sabor.accent }}
        >
          0{index + 1}
        </span>

        {/* Trufa fechada */}
        <img
          src={trufaFechada}
          alt={sabor.nome}
          className={`absolute object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-all duration-500 ${
            hovered ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
          style={{ width: 210, height: 210 }}
        />

        {/* Recheio (hover) */}
        <img
          src={sabor.recheio}
          alt={`Recheio ${sabor.nome}`}
          className={`absolute object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-all duration-500 ${
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
          style={{ width: 210, height: 210 }}
        />

        {/* Hint hover */}
        <span
          className={`absolute bottom-3 text-[10px] font-semibold tracking-wider uppercase transition-opacity duration-300 ${
            hovered ? "opacity-0" : "opacity-50"
          }`}
          style={{ color: sabor.accent }}
        >
          hover · ver recheio
        </span>
      </div>

      {/* ── Rodapé do card (abaixo da imagem, nunca sobreposto) ── */}
      <div
        className="px-5 py-4"
        style={{ borderTop: `1px solid rgba(201,162,74,0.12)` }}
      >
        {/* Tag de acento */}
        <div
          className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-marrom-deep"
          style={{ backgroundColor: sabor.accent }}
        >
          sabor especial
        </div>

        <h3 className="font-display text-lg leading-tight text-creme">
          {sabor.nome}
        </h3>
        <p className="mt-0.5 text-xs leading-relaxed text-marrom-soft line-clamp-2">
          {sabor.tagline}
        </p>

        <a
          href={waMsg}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-marrom-deep transition hover:opacity-90"
          style={{ backgroundColor: sabor.accent }}
        >
          <MessageCircle className="h-3 w-3" />
          Quero este sabor
        </a>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Card mobile — clique revela recheio
   ══════════════════════════════════════════════ */
function MobileCard({ sabor }: { sabor: Sabor }) {
  const [revealed, setRevealed] = useState(false);
  const waMsg = buildWhatsappUrl([`Olá, Sr. Trufa! Quero pedir trufas de ${sabor.nome}.`]);

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        backgroundColor: "#1c0d05",
        borderColor: "rgba(201,162,74,0.18)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* Imagem */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: 220, backgroundColor: "#150a03", cursor: "pointer" }}
        onClick={() => setRevealed((v) => !v)}
        role="button"
        tabIndex={0}
        aria-label={revealed ? "Ver trufa fechada" : "Revelar recheio"}
        onKeyDown={(e) => e.key === "Enter" && setRevealed((v) => !v)}
      >
        <img
          src={trufaFechada}
          alt={sabor.nome}
          className={`absolute object-contain transition-opacity duration-500 ${revealed ? "opacity-0" : "opacity-100"}`}
          style={{ width: 170, height: 170 }}
        />
        <img
          src={sabor.recheio}
          alt={`Recheio ${sabor.nome}`}
          className={`absolute object-contain transition-opacity duration-500 ${revealed ? "opacity-100" : "opacity-0"}`}
          style={{ width: 170, height: 170 }}
        />
        <span
          className="absolute bottom-3 text-[10px] font-semibold tracking-wider uppercase"
          style={{ color: "rgba(201,162,74,0.50)" }}
        >
          {revealed ? "recheio revelado · toque para fechar" : "toque para ver o recheio"}
        </span>
      </div>

      {/* Info */}
      <div className="px-5 pb-5 pt-4" style={{ borderTop: "1px solid rgba(201,162,74,0.12)" }}>
        <h3 className="font-display text-xl text-creme">{sabor.nome}</h3>
        <p className="mt-0.5 text-xs text-marrom-soft">{sabor.tagline}</p>
        <a
          href={waMsg}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-marrom-deep"
          style={{ backgroundColor: sabor.accent }}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Quero esse sabor
        </a>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Seção principal
   ══════════════════════════════════════════════ */
export function FlavorCarouselSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track     = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.refresh();

        const totalWidth = track.scrollWidth - window.innerWidth;
        // Cria espaço de scroll maior que o movimento horizontal → sensação de "peso"
        const scrollDistance = Math.max(totalWidth * 2.2, 800);

        gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1.2,
            start: "top top",
            end: `+=${scrollDistance}`,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (SABORES.length - 1),
              duration: { min: 0.2, max: 0.5 },
              delay: 0.1,
              ease: "power1.inOut",
            },
          },
        });

        return () => {};
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-marrom-deep">
      {/* Cabeçalho */}
      <div className="py-10 px-4 text-center sm:py-14">
        <p className="font-script text-xl text-dourado-soft sm:text-2xl">
          sabores fotografados
        </p>
        <h2 className="mt-1 font-display text-3xl text-creme sm:text-4xl lg:text-5xl">
          5 sabores, 5 recheios reais
        </h2>
        <p className="mt-2 text-xs text-marrom-soft sm:text-sm md:hidden">
          Toque na trufa para revelar o recheio
        </p>
        <p className="mt-2 hidden md:block text-xs text-marrom-soft sm:text-sm">
          Role para explorar · passe o cursor sobre a trufa para ver o recheio
        </p>
      </div>

      {/* ── Mobile: cards empilhados ── */}
      <div className="md:hidden grid gap-4 px-4 pb-12">
        {SABORES.map((sabor) => (
          <MobileCard key={sabor.id} sabor={sabor} />
        ))}
      </div>

      {/* ── Desktop: scroll-jacking horizontal ── */}
      <div
        ref={containerRef}
        className="hidden md:flex items-center"
        style={{ height: "88vh" }}
      >
        <div
          ref={trackRef}
          className="flex gap-6 px-10"
          style={{ willChange: "transform" }}
        >
          {SABORES.map((sabor, i) => (
            <DesktopCard key={sabor.id} sabor={sabor} index={i} />
          ))}
          {/* Espaço extra à direita para o último card ficar confortável */}
          <div style={{ width: "calc(50vw - 170px)", flexShrink: 0 }} />
        </div>
      </div>
    </section>
  );
}
