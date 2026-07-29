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

    const ctx = gsap.context(() => {
      gsap.from(el, {
        scale: 0.6,
        y: 60,
        opacity: 0,
        ease: "none",
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
      {/* Glow de fundo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-dourado/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-20">

          {/* Mascote em bola — anima no scroll */}
          <div className="flex-none flex justify-center lg:order-2">
            <div
              ref={mascoteRef}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem]
                         rounded-full overflow-hidden border-2 border-dourado/25
                         shadow-[0_0_80px_rgba(201,162,74,0.10)]"
              style={{ willChange: "transform, opacity" }}
            >
              <img
                src={mascoteHero}
                alt="Sr. Trufa"
                className="w-full h-full object-cover object-center scale-110"
                width={1080}
                height={1080}
              />
            </div>
          </div>

          {/* Texto — mascote em primeira pessoa */}
          <div className="lg:order-1 text-center lg:text-left max-w-lg">
            <span className="-rotate-1 inline-block mb-6 rounded border border-dourado/40 bg-dourado/10 px-5 py-2 font-script text-xl text-dourado-soft italic">
              Seja bem-vindo!
            </span>

            <h2 className="font-display text-3xl leading-tight text-creme sm:text-4xl lg:text-5xl">
              Eu sou o Sr. Trufa —
              <br />
              <span className="text-dourado">prazer em te receber.</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-marrom-soft sm:text-base">
              Este é o meu cardápio digital. Aqui você encontra todos os meus sabores,
              pode escolher com calma e montar o seu pedido do jeito que preferir.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-marrom-soft sm:text-base">
              Cada trufa que você ver aqui tem uma história por trás —
              feita à mão, com ingredientes que você já conhece e ama.
              Escolha com vontade. Você merece o melhor chocolate.
            </p>

            <div className="brand-divider mt-8 max-w-[160px] lg:mx-0 mx-auto">
              <span className="brand-divider__diamond" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
