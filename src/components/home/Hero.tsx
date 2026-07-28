import { useRef, useLayoutEffect } from "react";
import heroVideo from "@/assets/video/hero.mp4";
import { config } from "@/data/config";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINE1 = "Vossa Senhoria Merece";
const LINE2 = "o Melhor Chocolate.";

export function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const heroTextRef  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Desktop (768px+): animações de scroll ── */
      mm.add("(min-width: 768px)", () => {
        const scope = heroTextRef.current!;

        /* Apenas a linha 2 começa vazada e preenche no scroll */
        gsap.set(scope.querySelectorAll(".char-l2"), { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        /* 1. Vídeo encolhe e sobe */
        tl.to(videoWrapRef.current, {
          scale: 0.44,
          y: -120,
          borderRadius: "32px",
          ease: "none",
          duration: 1,
        }, 0);

        /* 2. "o Melhor Chocolate." — letra por letra, fill dourado */
        tl.to(scope.querySelectorAll(".char-l2"), {
          opacity: 1,
          stagger: { each: 0.038, from: "start" },
          duration: 0.06,
          ease: "none",
        }, 0.2);
      });

      /* ── Mobile: texto sempre sólido ── */
      mm.add("(max-width: 767px)", () => {
        gsap.set(heroTextRef.current!.querySelectorAll(".char-l2"), { opacity: 1 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="topo"
      className="relative bg-marrom-deep h-screen md:h-[300vh]"
    >
      {/* Container sticky */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Wrapper do vídeo */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 overflow-hidden"
          style={{ willChange: "transform, border-radius" }}
        >
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-marrom-deep/92 via-marrom-deep/60 to-marrom-deep/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-marrom-deep/80 via-transparent to-transparent" />
        </div>

        {/* Conteúdo de texto */}
        <div className="relative z-10 flex h-full items-center">
          <div className="px-4 sm:px-8 lg:px-16 max-w-2xl">

            {/* Slogan */}
            <span className="-rotate-2 inline-block rounded-lg border border-dourado/40 bg-dourado/10 px-5 py-2 font-script text-2xl sm:text-3xl lg:text-4xl text-dourado-soft italic leading-snug">
              com modos de cavalheiro
            </span>

            {/* Título */}
            <h1
              ref={heroTextRef}
              aria-label={`${LINE1} ${LINE2}`}
              className="mt-5 select-none font-display text-4xl leading-[1.12] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {/* LINE1 — sempre sólido, sem animação */}
              <div className="text-creme">{LINE1}</div>

              {/* LINE2 — vazado dourado que preenche no scroll */}
              <div className="relative">
                {/* Outline sempre visível */}
                <div aria-hidden>
                  {LINE2.split("").map((ch, i) => (
                    <span
                      key={i}
                      className="inline-block"
                      style={{
                        WebkitTextStroke: "1.5px rgba(201,162,74,0.72)",
                        color: "transparent",
                        letterSpacing: ch === " " ? "0.2em" : undefined,
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </div>
                {/* Fill dourado — animado letra por letra */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                >
                  {LINE2.split("").map((ch, i) => (
                    <span
                      key={i}
                      className="char-l2 inline-block text-dourado"
                      style={{ letterSpacing: ch === " " ? "0.2em" : undefined }}
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-marrom-soft sm:text-base">
              Surpreenda com uma nobre caixa de trufas artesanais. São 20 sabores à sua disposição.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
              <a
                href="#cardapio"
                className="rounded-full bg-dourado px-6 py-3 text-sm font-semibold text-marrom-deep shadow-md transition hover:bg-dourado-soft sm:px-7 sm:py-3.5 sm:text-base"
              >
                Ver o cardápio
              </a>
              <a
                href={buildWhatsappUrl(["Olá, Sr. Trufa! Quero fazer um pedido."])}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-dourado/40 px-6 py-3 text-sm font-semibold text-dourado-soft transition hover:border-dourado hover:bg-dourado/10 sm:px-7 sm:py-3.5 sm:text-base"
              >
                Pedir pelo WhatsApp
              </a>
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
