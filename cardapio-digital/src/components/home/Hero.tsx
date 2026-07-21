import mascote from "@/assets/img/brand/mascote.png";

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-creme">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:py-20 lg:grid-cols-2 lg:gap-10">
        {/* Texto */}
        <div className="order-2 max-w-xl animate-fade-up lg:order-1">
          <span className="inline-block rounded-full border border-dourado/50 bg-creme-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-marrom-soft">
            Trufas artesanais · Canecas personalizadas
          </span>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] text-marrom sm:text-5xl lg:text-6xl">
            Trufas artesanais e canecas que viram presente.
          </h1>
          <p className="mt-5 max-w-lg text-base text-marrom-soft sm:text-lg">
            Feitos à mão, com o capricho do Sr. Trufa. Monte sua caixinha de trufas,
            personalize sua caneca com foto ou frase e a gente cuida do resto.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#kits"
              className="rounded-full bg-laranja px-7 py-3.5 text-sm font-semibold text-creme shadow-md shadow-marrom/20 transition hover:scale-[1.02] hover:bg-laranja-deep sm:text-base"
            >
              Montar um kit presente
            </a>
            <a
              href="#trufas"
              className="rounded-full border border-marrom/30 px-6 py-3 text-sm font-semibold text-marrom transition hover:bg-creme-soft sm:text-base"
            >
              Ver os sabores
            </a>
          </div>
          <p className="mt-4 text-xs text-marrom-soft/90">
            Feito à mão em Barretos/SP · Pedidos pelo WhatsApp
          </p>
        </div>

        {/* Mascote */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-6 rounded-full bg-dourado-soft/40 blur-3xl" />
            <img
              src={mascote}
              alt="Mascote Sr. Trufa"
              className="relative h-full w-full object-contain drop-shadow-[0_18px_30px_rgba(44,26,20,0.25)]"
              width={721}
              height={896}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
