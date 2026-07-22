import { Instagram, MessageCircle } from "lucide-react";
import { config } from "@/data/config";
import { buildWhatsappUrl, mensagemGeral } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-dourado/30 bg-marrom-deep text-creme">
      <div className="brand-divider mx-auto max-w-6xl px-4 pt-10">
        <span className="brand-divider__diamond" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl text-dourado-soft">Sr. Trufa</h3>
          <p className="mt-2 text-sm text-creme/80">
            Feito à mão em {config.cidade}. Cada trufa conferida uma a uma antes de chegar
            até você.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg text-dourado-soft">Retirada (grátis)</h4>
          <p className="mt-2 text-sm text-creme/80">
            {config.cidade}
            <br />
            Quinta · 14h–20h
            <br />
            Sexta · 09h–18h
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg text-dourado-soft">Entrega</h4>
          <p className="mt-2 text-sm text-creme/80">
            Zona próxima · R$ 5
            <br />
            Zona central · R$ 8
            <br />
            Zonas afastadas · R$ 12
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg text-dourado-soft">Fale com a gente</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a
              href={buildWhatsappUrl([mensagemGeral])}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-creme hover:text-dourado-soft"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-creme hover:text-dourado-soft"
            >
              <Instagram className="h-4 w-4" /> {config.instagramHandle}
            </a>
          </div>
          <p className="mt-4 text-xs text-creme/60">
            ⏰ Pedidos grandes ou de última hora: o prazo é combinado certinho no
            WhatsApp.
          </p>
        </div>
      </div>

      <div className="border-t border-creme/10 py-4 text-center text-xs text-creme/50">
        © {new Date().getFullYear()} Sr. Trufa · Feito à mão em {config.cidade}
      </div>
    </footer>
  );
}
