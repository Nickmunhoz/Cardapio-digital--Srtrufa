import { Instagram, MessageCircle, Clock } from "lucide-react";
import { config } from "@/data/config";
import { buildWhatsappUrl, mensagemGeral } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-dourado/20 bg-marrom-deep text-creme">
      <div className="brand-divider mx-auto max-w-5xl px-4 pt-10">
        <span className="brand-divider__diamond" />
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-xl text-dourado-soft">Sr. Trufa</h3>
          <p className="mt-2 text-xs leading-relaxed text-creme/65 sm:text-sm">
            Feito à mão em {config.cidade}.
            Cada trufa conferida antes de sair daqui.
          </p>
        </div>

        <div>
          <h4 className="font-display text-base text-dourado-soft sm:text-lg">Retirada</h4>
          <p className="mt-2 text-xs leading-relaxed text-creme/65 sm:text-sm">
            {config.cidade}<br />
            Quinta · 14h–20h<br />
            Sexta · 09h–18h
          </p>
          <p className="mt-1 text-xs text-creme/40">Grátis</p>
        </div>

        <div>
          <h4 className="font-display text-base text-dourado-soft sm:text-lg">Entrega</h4>
          <p className="mt-2 text-xs leading-relaxed text-creme/65 sm:text-sm">
            Zona próxima · Grátis<br />
            Zona central · Grátis<br />
            Zonas afastadas · Frete a combinar
          </p>
        </div>

        <div>
          <h4 className="font-display text-base text-dourado-soft sm:text-lg">Fale com a gente</h4>
          <div className="mt-3 flex flex-col gap-2 text-xs sm:text-sm">
            <a
              href={buildWhatsappUrl([mensagemGeral])}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-creme/70 transition hover:text-dourado-soft"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-creme/70 transition hover:text-dourado-soft"
            >
              <Instagram className="h-4 w-4" /> {config.instagramHandle}
            </a>
          </div>
          <p className="mt-4 flex items-start gap-1.5 text-xs leading-relaxed text-creme/45">
            <Clock className="mt-px h-3 w-3 flex-none" />
            Pedidos grandes ou de última hora: o prazo é combinado no WhatsApp.
          </p>
        </div>
      </div>

      <div className="border-t border-creme/8 py-4 text-center text-xs text-creme/35">
        © {new Date().getFullYear()} Sr. Trufa · Feito à mão em {config.cidade}
      </div>
    </footer>
  );
}
