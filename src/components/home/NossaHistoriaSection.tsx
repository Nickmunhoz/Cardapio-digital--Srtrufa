import mascoteHero from "@/assets/img/brand/mascote-hero.png";

export function NossaHistoriaSection() {
  return (
    <section id="historia" className="bg-marrom py-14 text-creme sm:py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 lg:grid-cols-[1fr_1.3fr]">

        {/* Mascote */}
        <div className="flex justify-center lg:justify-start">
          <img
            src={mascoteHero}
            alt="Mascote Sr. Trufa"
            className="w-48 drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)] sm:w-64 lg:w-72"
            width={1080}
            height={1080}
          />
        </div>

        {/* Texto */}
        <div>
          <span className="font-script block text-xl text-dourado-soft/90 sm:text-2xl">
            Nossa história
          </span>
          <h2 className="mt-2 font-display text-3xl text-creme sm:text-4xl">
            Cada trufa, um detalhe.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-creme/75 sm:text-base">
            O Sr. Trufa nasceu do gosto por detalhes e por chocolate de verdade.
            Cada trufa é feita à mão, conferida uma a uma e embalada com cuidado —
            do jeito antigo em que cada detalhe ainda importa.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-creme/75 sm:text-base">
            Barretos/SP, desde o início. Com o mesmo capricho de sempre.
          </p>

          <div className="brand-divider mt-6 max-w-[120px]">
            <span className="brand-divider__diamond" />
          </div>
        </div>
      </div>
    </section>
  );
}
