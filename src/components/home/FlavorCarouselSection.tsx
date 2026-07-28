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

/* ── Card desktop: fundo creme, hover revela nome em quadrado ── */
function DesktopCard({ sabor, index }: { sabor: Sabor; index: number }) {
  const [hovered, setHovered] = useState(false);
  const waMsg = buildWhatsappUrl([`Olá, Sr. Trufa! Quero pedir trufas de ${sabor.nome}.`]);

  return (
    <div
      className="relative flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#f5ead9" }}
    >
      {/* Número do card */}
      <span
        className="absolute top-8 right-10 font-display text-sm tracking-widest opacity-30"
        style={{ color: "#2b1408" }}
      >
        0{index + 1} / 0{SABORES.length}
      </span>

      {/* Área interativa: trufa + hover overlay */}
      <div
        className="relative flex items-center justify-center cursor-pointer"
        style={{ width: 360, height: 360 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered((v) => !v)}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalhes de ${sabor.nome}`}
        onKeyDown={(e) => e.key === "Enter" && setHovered((v) => !v)}
      >
        {/* Trufa fechada */}
        <img
          src={trufaFechada}
          alt={sabor.nome}
          className={`absolute w-56 h-56 object-contain transition-all duration-500 drop-shadow-[0_16px_40px_rgba(43,20,8,0.22)] ${
            hovered ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        />

        {/* Recheio */}
        <img
          src={sabor.recheio}
          alt={`Recheio de ${sabor.nome}`}
          className={`absolute w-56 h-56 object-contain transition-all duration-500 drop-shadow-[0_16px_40px_rgba(43,20,8,0.22)] ${
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />

        {/* Overlay com nome em quadrado (aparece ao hover) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-400 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "rgba(28,13,5,0.88)" }}
        >
          <div
            className="border px-8 py-7 text-center"
            style={{ borderColor: "rgba(201,162,74,0.35)" }}
          >
            <p
              className="font-script text-base"
              style={{ color: "rgba(227,205,161,0.85)" }}
            >
              sabor
            </p>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl text-creme">
              {sabor.nome}
            </h3>
            <div
              className="mx-auto my-3 h-px w-10"
              style={{ backgroundColor: sabor.accent }}
            />
            <p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(201,178,158,0.75)" }}
            >
              {sabor.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Rodapé do card */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-10 py-5"
        style={{ borderTop: "1px solid rgba(43,20,8,0.10)" }}
      >
        <div>
          <p
            className="font-display text-lg font-semibold"
            style={{ color: "#2b1408" }}
          >
            {sabor.nome}
          </p>
          <p className="text-xs" style={{ color: "rgba(43,20,8,0.50)" }}>
            {sabor.tagline}
          </p>
        </div>
        <a
          href={waMsg}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          style={{ backgroundColor: sabor.accent }}
        >
          <MessageCircle className="h-4 w-4" />
          Pedir este
        </a>
      </div>
    </div>
  );
}

/* ── Card mobile: clique revela recheio ── */
function MobileCard({ sabor }: { sabor: Sabor }) {
  const [revealed, setRevealed] = useState(false);
  const waMsg = buildWhatsappUrl([`Olá, Sr. Trufa! Quero pedir trufas de ${sabor.nome}.`]);

  return (
    <div
      className="overflow-hidden rounded-2xl shadow-lg"
      style={{ backgroundColor: "#f5ead9" }}
    >
      {/* Foto */}
      <div
        className="relative flex items-center justify-center p-8 cursor-pointer"
        style={{ minHeight: 220 }}
        onClick={() => setRevealed((v) => !v)}
        role="button"
        tabIndex={0}
        aria-label={revealed ? "Ver trufa fechada" : "Ver recheio"}
        onKeyDown={(e) => e.key === "Enter" && setRevealed((v) => !v)}
      >
        <img
          src={trufaFechada}
          alt={sabor.nome}
          className={`w-40 object-contain transition-opacity duration-500 drop-shadow-lg ${
            revealed ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src={sabor.recheio}
          alt={`Recheio de ${sabor.nome}`}
          className={`absolute w-40 object-contain transition-opacity duration-500 drop-shadow-lg ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          className="absolute bottom-3 text-[10px] font-semibold"
          style={{ color: "rgba(43,20,8,0.40)" }}
        >
          {revealed ? "recheio revelado · toque para fechar" : "toque para ver o recheio"}
        </span>
      </div>

      {/* Info + CTA */}
      <div className="px-5 pb-5 pt-3" style={{ backgroundColor: "#2b1408" }}>
        <h3 className="font-display text-xl text-creme">{sabor.nome}</h3>
        <p className="mt-0.5 text-xs text-marrom-soft">{sabor.tagline}</p>
        <a
          href={waMsg}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-marrom-deep shadow-sm"
          style={{ backgroundColor: sabor.accent }}
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Quero esse sabor
        </a>
      </div>
    </div>
  );
}

/* ── Seção principal ── */
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
        // Aguarda o layout estabilizar
        ScrollTrigger.refresh();

        const totalWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: "top top",
            end: `+=${totalWidth}`,
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
    <section className="bg-marrom">
      {/* Cabeçalho (não pinned) */}
      <div className="py-10 px-4 text-center sm:py-14">
        <p className="font-script text-xl text-dourado-soft sm:text-2xl">
          sabores fotografados
        </p>
        <h2 className="mt-1 font-display text-3xl text-creme sm:text-4xl lg:text-5xl">
          5 sabores, 5 recheios reais
        </h2>
        <p className="mt-2 text-xs text-marrom-soft sm:text-sm hidden md:block">
          Role a página para explorar · passe o cursor sobre a trufa para ver o recheio
        </p>
        <p className="mt-2 text-xs text-marrom-soft sm:text-sm md:hidden">
          Toque na trufa para revelar o recheio
        </p>
      </div>

      {/* ── Mobile: cards empilhados ── */}
      <div className="md:hidden grid gap-4 px-4 pb-12">
        {SABORES.map((sabor) => (
          <MobileCard key={sabor.id} sabor={sabor} />
        ))}
      </div>

      {/* ── Desktop: scroll-jacking horizontal ── */}
      <div ref={containerRef} className="hidden md:block overflow-hidden">
        <div
          ref={trackRef}
          className="flex"
          style={{ willChange: "transform" }}
        >
          {SABORES.map((sabor, i) => (
            <DesktopCard key={sabor.id} sabor={sabor} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
