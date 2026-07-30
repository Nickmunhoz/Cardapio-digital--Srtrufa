import { useRef, useLayoutEffect } from "react";
import heroVideo from "@/assets/video/hero.mp4";
import { config } from "@/data/config";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { useOrderModal } from "@/components/ui/OrderModalProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Layout:
    Linha 1 — "Vossa Senhoria"        sólido creme
    Linha 2 — "Merece o " + "Melhor"  "Merece o " sólido, "Melhor" vazado → preenche
    Linha 3 — "Chocolate."            vazado → preenche
*/
const CHARS_M = "Melhor".split("");
const CHARS_C = "Chocolate.".split("");

/* Estilo vazado base (sem preenchimento) */
const hollowStyle: React.CSSProperties = {
  WebkitTextStroke: "1.5px rgba(201,162,74,0.72)",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

export function Hero() {
  const { openOrderModal } = useOrderModal();
  const sectionRef   = useRef<HTMLElement>(null);
  const innerRef     = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const heroTextRef  = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Desktop: pin + scrub ── */
      mm.add("(min-width: 768px)", () => {
        const scope = heroTextRef.current!;

        /* Estado inicial — fill transparente (apenas outline visível) */
        gsap.set(scope.querySelectorAll(".char-m, .char-c"), {
          WebkitTextFillColor: "transparent",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: innerRef.current,
            start: "top top",
            end: "+=2400",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        /* 1. Vídeo encolhe */
        tl.to(videoWrapRef.current, {
          scale: 0.44, y: -120, borderRadius: "32px",
          ease: "none", duration: 1,
        }, 0);

        /* 2. "Melhor" — fill dourado letra a letra */
        tl.to(scope.querySelectorAll(".char-m"), {
          WebkitTextFillColor: "#c9a24a",
          stagger: { each: 0.05, from: "start" },
          ease: "none",
        }, 0.1);

        /* 3. "Chocolate." — fill dourado letra a letra */
        tl.to(scope.querySelectorAll(".char-c"), {
          WebkitTextFillColor: "#c9a24a",
          stagger: { each: 0.05, from: "start" },
          ease: "none",
        }, 0.58);

        return () => {};
      });

      /* ── Mobile: texto preenchido imediatamente ── */
      mm.add("(max-width: 767px)", () => {
        gsap.set(heroTextRef.current!.querySelectorAll(".char-m, .char-c"), {
          WebkitTextFillColor: "#c9a24a",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="topo" className="relative bg-marrom-deep">

      <div ref={innerRef} className="h-screen overflow-hidden">

        {/* Vídeo */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 overflow-hidden"
          style={{ willChange: "transform, border-radius" }}
        >
          <video src={heroVideo} autoPlay muted loop playsInline
            className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-marrom-deep/92 via-marrom-deep/60 to-marrom-deep/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-marrom-deep/80 via-transparent to-transparent" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 flex h-full items-center">
          <div className="px-4 sm:px-8 lg:px-16 max-w-2xl">

            <span className="-rotate-2 inline-block rounded-lg border border-dourado/40 bg-dourado/10 px-5 py-2 font-script text-2xl sm:text-3xl lg:text-4xl text-dourado-soft italic leading-snug">
              com modos de cavalheiro
            </span>

            {/* ── Título ── */}
            <h1
              ref={heroTextRef}
              aria-label="Vossa Senhoria Merece o Melhor Chocolate."
              className="mt-5 select-none font-display text-4xl leading-[1.12] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {/* Linha 1 — sólida */}
              <div className="text-creme">Vossa Senhoria</div>

              {/* Linha 2 — "Merece o " sólido + "Melhor" vazado inline */}
              <div className="leading-[1.12]">
                <span className="text-creme">Merece o </span>
                {/* "Melhor" fica junto como uma unidade, não quebra no meio */}
                <span className="inline-block whitespace-nowrap">
                  {CHARS_M.map((ch, i) => (
                    <span key={i} className="char-m inline-block" style={hollowStyle}>{ch}</span>
                  ))}
                </span>
              </div>

              {/* Linha 3 — "Chocolate." vazado, não quebra */}
              <div className="whitespace-nowrap leading-[1.12]">
                {CHARS_C.map((ch, i) => (
                  <span key={i} className="char-c inline-block" style={hollowStyle}>{ch}</span>
                ))}
              </div>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-marrom-soft sm:text-base">
              Surpreenda-se com nobres trufas artesanais. São 20 sabores à sua disposição.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
              <a href="#cardapio"
                className="rounded-full bg-dourado px-6 py-3 text-sm font-semibold text-marrom-deep shadow-md transition hover:bg-dourado-soft sm:px-7 sm:py-3.5 sm:text-base">
                Ver o cardápio
              </a>
              <button
                type="button"
                onClick={() => openOrderModal()}
                className="rounded-full border border-dourado/40 px-6 py-3 text-sm font-semibold text-dourado-soft transition hover:border-dourado hover:bg-dourado/10 sm:px-7 sm:py-3.5 sm:text-base">
                Fazer o pedido
              </button>
            </div>

            <p className="mt-5 text-xs text-marrom-soft/55">
              {config.instagramHandle} · Barretos/SP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
