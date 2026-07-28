import { useRef, useLayoutEffect } from "react";
import heroVideo from "@/assets/video/hero.mp4";
import mascote from "@/assets/img/brand/mascote-hero.png";
import { config } from "@/data/config";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const textFillRef  = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ── Desktop: scroll-linked animation ── */
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        /* Vídeo encolhe e sobe */
        tl.to(
          videoWrapRef.current,
          {
            scale: 0.44,
            y: -130,
            borderRadius: "32px",
            ease: "none",
          },
          0
        );

        /* Texto: outline → preenchido (clip-path da esquerda para direita) */
        tl.fromTo(
          textFillRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", ease: "none" },
          0
        );
      });

      /* ── Mobile: texto sempre preenchido (sem animação) ── */
      mm.add("(max-width: 767px)", () => {
        gsap.set(textFillRef.current, { clipPath: "inset(0 0% 0 0)" });
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
      {/* Container sticky – permanece visível enquanto o usuário rola */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Wrapper do vídeo – animado no scroll (desktop) */}
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
          {/* Gradientes que revelam o conteúdo de texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-marrom-deep/90 via-marrom-deep/55 to-marrom-deep/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-marrom-deep/75 via-transparent to-transparent" />
        </div>

        {/* Conteúdo sobreposto ao vídeo */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto grid w-full max-w-6xl items-center px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:gap-12">

            {/* Coluna de texto */}
            <div className="flex flex-col items-start">
              <span className="-rotate-2 inline-block rounded border border-dourado/40 bg-dourado/10 px-4 py-1.5 font-script text-base text-dourado-soft italic">
                com modos de cavalheiro
              </span>

              {/* Título com dupla camada: outline + preenchimento */}
              <div className="relative mt-5 select-none">
                {/* Camada 1: outline (sempre visível) */}
                <h1
                  aria-hidden="true"
                  className="font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl xl:text-7xl"
                  style={{
                    WebkitTextStroke: "1.5px rgba(245,234,217,0.65)",
                    color: "transparent",
                  }}
                >
                  Trufas que
                  <br />
                  <span style={{ WebkitTextStroke: "1.5px rgba(201,162,74,0.75)" }}>
                    viram presente.
                  </span>
                </h1>

                {/* Camada 2: preenchimento sólido (revelado pelo scroll) */}
                <h1
                  ref={textFillRef}
                  className="absolute inset-0 font-display text-4xl leading-[1.08] text-creme sm:text-5xl lg:text-6xl xl:text-7xl"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  Trufas que
                  <br />
                  <span className="text-dourado">viram presente.</span>
                </h1>
              </div>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-marrom-soft sm:text-base lg:mt-6">
                20 sabores feitos à mão em Barretos/SP.
                Monte sua caixinha e a gente cuida do resto.
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

            {/* Mascote – visível somente no desktop */}
            <div className="hidden lg:block">
              <div className="relative w-72 xl:w-[22rem]">
                <div className="absolute inset-6 rounded-full bg-dourado/10 blur-3xl" />
                <img
                  src={mascote}
                  alt="Mascote Sr. Trufa"
                  className="relative w-full drop-shadow-[0_20px_48px_rgba(0,0,0,0.65)]"
                  width={1080}
                  height={1080}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
