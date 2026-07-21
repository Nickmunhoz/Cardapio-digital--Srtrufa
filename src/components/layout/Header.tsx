import { Instagram } from "lucide-react";
import { config } from "@/data/config";
import { buildWhatsappUrl, mensagemGeral } from "@/lib/whatsapp";
import logo from "@/assets/img/brand/logo.png";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-dourado/30 bg-marrom-deep/95 backdrop-blur supports-[backdrop-filter]:bg-marrom-deep/90">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:h-28">
        <a
          href={config.instagramUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Instagram ${config.instagramHandle}`}
          className="rounded-full p-2 text-dourado-soft transition hover:bg-creme/10 hover:text-dourado"
        >
          <Instagram className="h-5 w-5" />
        </a>

        {/* Logotipo com respiro e destaque central, como na peça impressa */}
        <a
          href="#topo"
          aria-label="Sr. Trufa — início"
          className="flex flex-col items-center gap-1"
        >
          <img
            src={logo}
            alt="Sr. Trufa"
            className="h-12 w-auto drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)] sm:h-16"
            width={519}
            height={194}
          />
          <span className="hidden font-script text-sm text-dourado-soft/90 sm:block">
            Trufas Artesanais
          </span>
        </a>

        <a
          href={buildWhatsappUrl([mensagemGeral])}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-full border border-dourado/60 px-3 py-2 text-xs font-semibold text-dourado transition hover:bg-dourado hover:text-marrom-deep sm:px-5 sm:py-2.5 sm:text-sm"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
