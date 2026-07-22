import mascote from "@/assets/img/brand/mascote.png";

const BADGES = [
  "Feito à mão",
  "Conferido um a um",
  "Embalado com carinho",
  "Atendimento direto",
];

export function NossaHistoriaSection() {
  return (
    <section id="historia" className="bg-marrom py-16 text-creme sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="order-2 lg:order-1">
          <img
            src={mascote}
            alt="Mascote Sr. Trufa"
            className="mx-auto h-56 w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] sm:h-72"
            width={721}
            height={896}
          />
        </div>
        <div className="order-1 lg:order-2">
          <span className="font-script block text-xl text-dourado-soft/90">
            Nossa história
          </span>
          <h2 className="mt-2 font-display text-3xl text-creme sm:text-4xl">
            Cada trufa, um detalhe.
          </h2>
          <p className="mt-4 text-creme/85">
            O Sr. Trufa nasceu do gosto por detalhes e por chocolate feito de verdade.
            Cada trufa é feita à mão, conferida uma a uma e embalada com capricho, do
            jeito antigo em que cada detalhe importa.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <li
                key={b}
                className="rounded-full border border-dourado-soft/40 bg-creme/5 px-3 py-1.5 text-xs font-semibold text-dourado-soft"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
