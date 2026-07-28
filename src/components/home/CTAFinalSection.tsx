import { MessageCircle } from "lucide-react";
import mascoteApontando from "@/assets/img/brand/mascote-apontando.png";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { config } from "@/data/config";

export function CTAFinalSection() {
  const waMsg = buildWhatsappUrl(["Olá, Sr. Trufa! Quero fazer um pedido."]);

  return (
    <section className="relative overflow-hidden bg-marrom-deep py-16 sm:py-24">
      {/* Glow dourado central */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-dourado/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center sm:flex-row sm:text-left lg:gap-14">

        {/* Mascote apontando */}
        <div className="flex-none">
          <img
            src={mascoteApontando}
            alt="Mascote Sr. Trufa apontando"
            className="w-64 sm:w-80 lg:w-96"
            width={1080}
            height={1080}
          />
        </div>

        {/* Texto + CTA */}
        <div className="flex flex-col items-center sm:items-start">
          <span className="font-script text-xl text-dourado-soft/90 sm:text-2xl">
            ora, ora...
          </span>
          <h2 className="mt-1 font-display text-3xl leading-tight text-creme sm:text-4xl lg:text-5xl">
            Chama a gente no WhatsApp.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-marrom-soft sm:text-base">
            Monte sua caixinha, peça para uma data especial ou consulte o cardápio
            completo — tudo pelo WhatsApp, direto com a gente.
          </p>

          <a
            href={waMsg}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:opacity-90 sm:text-base"
          >
            <MessageCircle className="h-5 w-5" />
            Fazer pedido pelo WhatsApp
          </a>

          <p className="mt-4 text-xs text-marrom-soft/60">
            {config.instagramHandle} · Barretos/SP
          </p>
        </div>
      </div>
    </section>
  );
}
