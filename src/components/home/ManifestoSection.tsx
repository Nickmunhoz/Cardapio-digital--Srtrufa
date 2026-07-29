import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mascoteHero from "@/assets/img/brand/mascote-hero.png";

gsap.registerPlugin(ScrollTrigger);

export function ManifestoSection() {
  const mascoteRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = mascoteRef.current;
    if (!el) return;

    /* Scroll animation — mascote bola entra conforme o usuário rola */
    const ctx = gsap.context(() => {
      gsap.from(el, {
        scale: 0.6,
        y: 60,
        opacity: 0,
        ease: "none",   /* scrub requer ease: none para movimento linear */
        scrollTrigger: {
          scrub: 1,
          trigger: el,
          start: "top 90%",
          end: "bottom 30%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-marrom-deep py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-dourado/6 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">

          {/* Mascote em formato de bola */}
          <div className="flex-none flex justify-center lg:order-2">
            <div
              ref={mascoteRef}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[26rem] xl:h-[26rem]
                         rounded-full overflow-hidden border-2 border-dourado/20
                         shadow-[0_0_60px_rgba(201,162,74,0.12)]"
              style={{ willChange: "transform, opacity" }}
            >
              <img
                src={mascoteHero}
                alt="Mascote Sr. Trufa"
                className="w-full h-full object-cover object-center scale-110"
                width={1080}
                height={1080}
              />
            </div>
          </div>

          {/* Texto */}
          <div className="lg:order-1 text-center lg:text-left">
            <div className="-rotate-1 inline-block mb-5">
              <span className="inline-block rounded border border-dourado/40 bg-dourado/10 px-5 py-2 font-script text-lg text-dourado-soft italic">
                com ingredientes de verdade
              </span>
            </div>

            <h2 className="font-display text-3xl leading-tight text-creme sm:text-4xl lg:text-5xl">
              Cada sabor tem
              <br />
              <span className="text-dourado">uma história por trás.</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-marrom-soft sm:text-base">
              As trufas do Sr. Trufa são feitas com ingredientes que você já conhece e ama —
              Nutella, Kinder Bueno, Oreo, Ovomaltine, Ferrero Rocher. Chocolates de qualidade,
              receitas desenvolvidas com cuidado e o detalhe de quem leva o sabor a sério.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-marrom-soft sm:text-base">
              Cada sabor é pensado para surpreender. Gourmet não é palavra — é o que você sente
              na primeira mordida.
            </p>

            <div className="brand-divider mt-8 max-w-[160px] lg:mx-0 mx-auto">
              <span className="brand-divider__diamond" />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-[11px] font-semibold uppercase tracking-widest text-marrom-soft/70 sm:gap-8 sm:text-xs">
              <span>Ingredientes selecionados</span>
              <span className="text-dourado/30">·</span>
              <span>Receita artesanal</span>
              <span className="text-dourado/30">·</span>
              <span>Barretos/SP</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
