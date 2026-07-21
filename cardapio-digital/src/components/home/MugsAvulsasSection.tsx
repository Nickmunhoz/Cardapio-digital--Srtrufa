import { mugsAvulsas } from "@/data/mugs";
import { buildWhatsappUrl, formatBRL } from "@/lib/whatsapp";

export function MugsAvulsasSection() {
  return (
    <section id="canecas" className="bg-creme py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-marrom sm:text-4xl">
            Canecas para chamar de suas
          </h2>
          <p className="mt-3 text-marrom-soft">
            Também vendidas sem trufas. Personalize com foto, frase ou arte da loja.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {mugsAvulsas.map((m) => (
            <article
              key={m.id}
              className="overflow-hidden rounded-2xl border border-dourado/30 bg-creme-soft shadow-sm transition hover:shadow-lg"
            >
              <div className="aspect-[4/3] bg-creme-soft">
                <img
                  src={m.foto}
                  alt={m.nome}
                  width={1376}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl text-marrom">{m.nome}</h3>
                  <span className="whitespace-nowrap text-sm font-semibold text-dourado">
                    {m.preco != null ? formatBRL(m.preco) : "Sob consulta"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-marrom-soft">{m.desc}</p>
                <a
                  href={buildWhatsappUrl([
                    `Olá, Sr. Trufa! Quero a ${m.nome}.`,
                    "",
                    "Personalização: ____",
                    "Nome: ____",
                  ])}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-block rounded-full border-2 border-laranja px-6 py-2.5 text-sm font-semibold text-laranja transition hover:bg-laranja hover:text-creme"
                >
                  Quero esta caneca
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
