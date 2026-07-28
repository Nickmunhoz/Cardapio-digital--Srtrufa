import { useRef, useLayoutEffect } from "react";
import heroVideo  from "@/assets/video/hero.mp4";
import mascote   from "@/assets/img/brand/mascote-hero.png";
import { config } from "@/data/config";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINE1 = "Trufas que";
const LINE2 = "viram presente.";

export function Hero() {
  const sectionRef    = useRef<HTMLElement>(null);
  const videoWrapRef  = useRef<HTMLDivElement>(null);
  const mascoteRef    = useRef<HTMLDivElement>(null);
  const heroTextRef   = useRef<HTMLDivElement>(null); // scope para querySelectorAll

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Desktop (768px+): animações de scroll ── */
      mm.add("(min-width: 768px)", () => {
        const scope = heroTextRef.current!;

        // Esconde os chars de preenchimento antes de qualquer scroll
        gsap.set(scope.querySelectorAll(".char-l1, .char-l2"), { opacity: 0 });
        // Mascote inicia invisível
        gsap.set(mascoteRef.current, { opacity: 0, y: 56, scale: 0.82 });

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

        /* 2. Mascote surge abaixo do vídeo encolhido */
        tl.to(mascoteRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          duration: 0.55,
        }, 0.28);

        /* 3. Linha 1 — letra por letra */
        tl.to(scope.querySelectorAll(".char-l1"), {
          opacity: 1,
          stagger: { each: 0.038, from: "start" },
          duration: 0.06,
          ease: "none",
        }, 0);

        /* 4. Linha 2 — começa após linha 1 completar (~0.42 timeline units) */
        tl.to(scope.querySelectorAll(".char-l2"), {
          opacity: 1,
          stagger: { each: 0.038, from: "start" },
          duration: 0.06,
          ease: "none",
        }, 0.48);
      });

      /* ── Mobile: texto sempre sólido, mascote sempre visível ── */
      mm.add("(max-width: 767px)", () => {
        gsap.set(heroTextRef.current!.querySelectorAll(".char-l1, .char-l2"), { opacity: 1 });
        gsap.set(mascoteRef.current, { opacity: 0 }); // mascote não aparece no mobile nesta seção
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="topo"
      className="relative bg-marrom-deep h-screen md:h-[150vh]"
    >
      {/* ── Container sticky ── */}
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

        {/* ── Mascote: aparece na direita conforme o vídeo encolhe (desktop) ── */}
        <div
          ref={mascoteRef}
          className="absolute hidden md:block"
          style={{ right: "4%", bottom: "6%", willChange: "transform, opacity" }}
        >
          <img
            src={mascote}
            alt="Mascote Sr. Trufa"
            className="w-64 lg:w-80 xl:w-[22rem] drop-shadow-[0_24px_56px_rgba(0,0,0,0.7)]"
            width={1080}
            height={1080}
          />
        </div>

        {/* ── Conteúdo de texto ── */}
        <div className="relative z-10 flex h-full items-center">
          <div className="px-4 sm:px-8 lg:px-16 max-w-2xl">

            {/* Slogan */}
            <span className="-rotate-2 inline-block rounded-lg border border-dourado/40 bg-dourado/10 px-5 py-2 font-script text-2xl sm:text-3xl lg:text-4xl text-dourado-soft italic leading-snug">
              com modos de cavalheiro
            </span>

            {/* ── Título com dupla camada (outline + preenchimento por letra) ── */}
            <div ref={heroTextRef} className="relative mt-5 select-none">

              {/* Outline — sempre visível */}
              <h1
                aria-label={`${LINE1} ${LINE2}`}
                className="font-display text-4xl leading-[1.12] sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                {/* Linha 1 */}
                <div>
                  {LINE1.split("").map((ch, i) => (
                    <span
                      key={i}
                      className="inline-block"
                      style={{
                        WebkitTextStroke: "1.5px rgba(245,234,217,0.60)",
                        color: "transparent",
                        letterSpacing: ch === " " ? "0.2em" : undefined,
                      }}
                    >
                      {ch === " " ? " " : ch}
                    </span>
                  ))}
                </div>
                {/* Linha 2 */}
                <div>
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
                      {ch === " " ? " " : ch}
                    </span>
                  ))}
                </div>
              </h1>

              {/* Preenchimento sólido por letra (anima com scroll no desktop) */}
              <div
                aria-hidden
                className="absolute inset-0 font-display text-4xl leading-[1.12] sm:text-5xl lg:text-6xl xl:text-7xl pointer-events-none"
              >
                {/* Linha 1 */}
                <div>
                  {LINE1.split("").map((ch, i) => (
                    <span
                      key={i}
                      className="char-l1 inline-block text-creme"
                      style={{ letterSpacing: ch === " " ? "0.2em" : undefined }}
                    >
                      {ch === " " ? " " : ch}
                    </span>
                  ))}
                </div>
                {/* Linha 2 */}
                <div>
                  {LINE2.split("").map((ch, i) => (
                    <span
                      key={i}
                      className="char-l2 inline-block text-dourado"
                      style={{ letterSpacing: ch === " " ? "0.2em" : undefined }}
                    >
                      {ch === " " ? " " : ch}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Subtítulo */}
            <p className="mt-5 max-w-md text-sm leading-relaxed text-marrom-soft sm:text-base">
              20 sabores feitos à mão em Barretos/SP.
              Monte sua caixinha e a gente cuida do resto.
            </p>

            {/* CTAs */}
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
