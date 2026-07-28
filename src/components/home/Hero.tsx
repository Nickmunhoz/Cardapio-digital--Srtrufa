import { useRef, useEffect, useState } from "react";
import heroVideo from "@/assets/video/hero.mp4";
import mascote from "@/assets/img/brand/mascote-hero.png";
import { config } from "@/data/config";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.8;
  }, []);

  return (
    <section id="topo" className="relative overflow-hidden bg-marrom-deep">
      {/* Vídeo de fundo */}
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        className={[
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
          videoLoaded ? "opacity-25" : "opacity-0",
        ].join(" ")}
      />

      {/* Gradiente direcional */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-marrom-deep via-marrom-deep/80 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-marrom-deep via-transparent to-marrom-deep/50" />

      {/* Conteúdo */}
      <div className="relative mx-auto grid max-w-6xl items-center px-4 py-16 sm:py-24 lg:min-h-[88vh] lg:grid-cols-2 lg:gap-12">

        {/* Coluna texto */}
        <div className="order-2 flex flex-col items-start lg:order-1">
          <span className="-rotate-2 inline-block rounded border border-dourado/40 bg-dourado/10 px-4 py-1.5 font-script text-base text-dourado-soft italic">
            com modos de cavalheiro
          </span>

          <h1 className="mt-5 font-display text-4xl leading-[1.08] text-creme sm:text-5xl lg:text-6xl xl:text-7xl">
            Trufas que
            <br />
            <span className="text-dourado">viram presente.</span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-marrom-soft sm:text-base lg:mt-5">
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

          <p className="mt-5 text-xs text-marrom-soft/60">
            {config.instagramHandle} · Barretos/SP
          </p>
        </div>

        {/* Coluna mascote */}
        <div className="order-1 flex justify-center pb-4 lg:order-2 lg:pb-0 lg:justify-end">
          <div className="relative w-52 sm:w-72 lg:w-full lg:max-w-sm xl:max-w-md">
            <div className="absolute inset-6 rounded-full bg-dourado/8 blur-3xl" />
            <img
              src={mascote}
              alt="Mascote Sr. Trufa"
              className="relative w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
              width={1080}
              height={1080}
            />
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden text-dourado/40 lg:block">
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </div>
    </section>
  );
}
