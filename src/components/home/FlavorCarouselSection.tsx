import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingBag } from "lucide-react";
import trufaFechada    from "@/assets/img/sabores/trufa-fechada.png";
import kinderRecheio   from "@/assets/img/sabores/kinder-bueno.png";
import nutninhoRecheio from "@/assets/img/sabores/nutninho.png";
import maracujaRecheio from "@/assets/img/sabores/maracuja-nutella.png";
import oreoRecheio     from "@/assets/img/sabores/oreo-chocolate.png";
import ovoRecheio      from "@/assets/img/sabores/ovomaltine.png";
import { useOrderModal } from "@/components/ui/OrderModalProvider";

gsap.registerPlugin(ScrollTrigger);

type Sabor = {
  id: string;
  nome: string;
  tagline: string;
  accent: string;
  recheio: string;
};

const SABORES: Sabor[] = [
  { id: "kinder-bueno", nome: "Kinder Bueno",        tagline: "Creme de avelã com chocolate ao leite",  accent: "#C08A3C", recheio: kinderRecheio },
  { id: "nutninho",     nome: "Nutninho",             tagline: "Leite Ninho com creme de avelã",         accent: "#D4A84E", recheio: nutninhoRecheio },
  { id: "maracuja-nut", nome: "Maracujá com Nutella", tagline: "Acidez do maracujá com creme de avelã",  accent: "#D4961E", recheio: maracujaRecheio },
  { id: "oreo",         nome: "Oreo Chocolate",       tagline: "Creme de biscoito Oreo no recheio",      accent: "#9E8AB0", recheio: oreoRecheio },
  { id: "ovomaltine",   nome: "Ovomaltine",           tagline: "Crocante de Ovomaltine no recheio",      accent: "#C07828", recheio: ovoRecheio },
];

/* ══════════════════════════════════════════════
   Card desktop
   ══════════════════════════════════════════════ */
function DesktopCard({
  sabor,
  index,
  onPedir,
}: {
  sabor: Sabor;
  index: number;
  onPedir: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 rounded-3xl overflow-hidden"
      style={{ width: 360, backgroundColor: "#f5ead9", boxShadow: "0 20px 60px rgba(0,0,0,0.45)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagem — dobrada de 265→330px */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: 380, backgroundColor: "#ede0cc" }}
      >
        <span className="absolute top-4 right-4 font-display text-xs tracking-widest opacity-40" style={{ color: "#2b1408" }}>
          0{index + 1}
        </span>

        <img
          src={trufaFechada}
          alt={sabor.nome}
          className={`absolute object-contain drop-shadow-[0_12px_28px_rgba(43,20,8,0.28)] transition-all duration-500 ${
            hovered ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
          style={{ width: 330, height: 330 }}
        />
        <img
          src={sabor.recheio}
          alt={`Recheio ${sabor.nome}`}
          className={`absolute object-contain drop-shadow-[0_12px_28px_rgba(43,20,8,0.28)] transition-all duration-500 ${
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
          style={{ width: 330, height: 330 }}
        />

        <span
          className={`absolute bottom-3 text-[10px] font-semibold tracking-wider uppercase transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-45"}`}
          style={{ color: "#2b1408" }}
        >
          hover · ver recheio
        </span>
      </div>

      {/* Rodapé */}
      <div className="px-5 py-4" style={{ borderTop: "1px solid rgba(43,20,8,0.10)" }}>
        <div
          className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest"
          style={{ backgroundColor: sabor.accent, color: "#fff" }}
        >
          sabor especial
        </div>
        <h3 className="font-display text-lg leading-tight" style={{ color: "#2b1408" }}>{sabor.nome}</h3>
        <p className="mt-0.5 text-xs leading-relaxed line-clamp-2" style={{ color: "rgba(43,20,8,0.60)" }}>{sabor.tagline}</p>

        <button
          type="button"
          onClick={() => onPedir(sabor.id)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: sabor.accent }}
        >
          <ShoppingBag className="h-3 w-3" />
          Quero este sabor
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Card mobile — fundo creme, imagens maiores
   ══════════════════════════════════════════════ */
function MobileCard({
  sabor,
  onPedir,
}: {
  sabor: Sabor;
  onPedir: (id: string) => void;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        backgroundColor: "#f5ead9",
        borderColor: "rgba(43,20,8,0.12)",
        boxShadow: "0 4px 20px rgba(43,20,8,0.10)",
      }}
    >
      {/* Imagem — dobrada de 170→290px, container 220→320px */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: 320, backgroundColor: "#ede0cc", cursor: "pointer" }}
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
          style={{ width: 290, height: 290 }}
        />
        <img
          src={sabor.recheio}
          alt={`Recheio ${sabor.nome}`}
          className={`absolute object-contain transition-opacity duration-500 ${revealed ? "opacity-100" : "opacity-0"}`}
          style={{ width: 290, height: 290 }}
        />
        <span
          className="absolute bottom-3 text-[10px] font-semibold tracking-wider uppercase"
          style={{ color: "rgba(43,20,8,0.40)" }}
        >
          {revealed ? "toque para fechar" : "toque para ver o recheio"}
        </span>
      </div>

      {/* Info */}
      <div className="px-5 pb-5 pt-4" style={{ borderTop: "1px solid rgba(43,20,8,0.10)" }}>
        <h3 className="font-display text-xl" style={{ color: "#2b1408" }}>{sabor.nome}</h3>
        <p className="mt-0.5 text-xs" style={{ color: "rgba(43,20,8,0.60)" }}>{sabor.tagline}</p>
        <button
          type="button"
          onClick={() => onPedir(sabor.id)}
          className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: sabor.accent }}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Quero este sabor
        </button>
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
  const { openOrderModal } = useOrderModal();

  function handlePedir(id: string) {
    openOrderModal({ [id]: 1 });
  }

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track     = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.refresh();

        const totalWidth     = track.scrollWidth - window.innerWidth;
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
    <section className="bg-creme md:bg-marrom-deep">

      {/* Cabeçalho */}
      <div className="py-10 px-4 text-center sm:py-14">
        <p className="font-script text-xl text-dourado sm:text-2xl">
          os favoritos do pessoal
        </p>
        <h2 className="mt-1 font-display text-3xl sm:text-4xl lg:text-5xl text-marrom-deep md:text-creme">
          Os que o pessoal não para de pedir.
        </h2>
        <p className="mt-2 text-xs text-marrom/60 sm:text-sm md:hidden">
          Toque na trufa para revelar o recheio · tem muito mais no cardápio
        </p>
        <p className="mt-2 hidden md:block text-xs text-marrom-soft sm:text-sm">
          Role para explorar · tem muito mais aguardando no cardápio completo
        </p>
      </div>

      {/* Mobile: cards empilhados */}
      <div className="md:hidden grid gap-4 px-4 pb-12">
        {SABORES.map((sabor) => (
          <MobileCard key={sabor.id} sabor={sabor} onPedir={handlePedir} />
        ))}
      </div>

      {/* Desktop: scroll-jacking horizontal */}
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
            <DesktopCard key={sabor.id} sabor={sabor} index={i} onPedir={handlePedir} />
          ))}
          <div style={{ width: "calc(50vw - 180px)", flexShrink: 0 }} />
        </div>
      </div>
    </section>
  );
}
