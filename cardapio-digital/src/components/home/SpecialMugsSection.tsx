import { mugsEspeciais } from "@/data/mugs";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { ProductCarousel } from "@/components/ui/ProductCarousel";

export function SpecialMugsSection() {
  return (
    <section id="especiais" className="bg-creme-soft py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-dourado/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-marrom-soft">
            Peças únicas
          </span>
          <h2 className="mt-4 font-display text-3xl text-marrom sm:text-4xl">
            Edições especiais
          </h2>
          <p className="mt-3 text-marrom-soft">
            Modelos exclusivos com arte pronta. Temos uma de cada — quando acaba,
            encomendamos sob pedido.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mugsEspeciais.map((m) => (
            <article
              key={m.id}
              className="overflow-hidden rounded-2xl border border-dourado/30 bg-creme shadow-sm transition hover:shadow-lg"
            >
              <ProductCarousel images={m.fotos} alt={m.nome} aspect="portrait" />
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-marrom px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-creme">
                    Peça Única
                  </span>
                  <span className="rounded-full border border-dourado px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-dourado">
                    Sob Encomenda
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg text-marrom">{m.nome}</h3>
                <p className="mt-1 line-clamp-3 text-xs text-marrom-soft">{m.desc}</p>
                <a
                  href={buildWhatsappUrl([
                    `Olá, Sr. Trufa! Quero a caneca "${m.nome}".`,
                    "",
                    "Nome: ____",
                  ])}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-block w-full rounded-full bg-laranja px-4 py-2.5 text-center text-xs font-semibold text-creme transition hover:bg-laranja-deep"
                >
                  Quero esta
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
