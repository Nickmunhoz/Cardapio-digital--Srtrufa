import mascote from "@/assets/img/brand/mascote.png";

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-marrom">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,74,0.12),transparent_60%)]" />
      <div className="brand-corners mx-auto grid max-w-6xl items-center gap-8 px-4 pb-14 pt-10 sm:pb-20 sm:pt-14 lg:grid-cols-2 lg:gap-10">
        {/* Texto */}
        <div className="order-2 max-w-xl animate-fade-up lg:order-1">
          <span className="font-script block text-lg text-dourado-soft/90 sm:text-xl">
            Trufas Artesanais · Barretos/SP
          </span>
          <h1 className="mt-2 font-display text-4xl leading-[1.05] text-creme sm:text-5xl lg:text-6xl">
            Trufas artesanais que viram presente.
          </h1>
          <p className="mt-5 max-w-lg text-base text-marrom-soft sm:text-lg">
            Feitas à mão, uma a uma, com o capricho do Sr. Trufa. Escolha seus sabores
            favoritos, monte sua caixinha e a gente cuida do resto.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#cardapio"
              className="rounded-full bg-dourado px-7 py-3.5 text-sm font-semibold text-marrom-deep shadow-md shadow-marrom-deep/30 transition hover:scale-[1.02] hover:bg-dourado-soft sm:text-base"
            >
              Ver o cardápio
            </a>
            <a
              href="#trufas"
              className="rounded-full border border-dourado/40 px-6 py-3 text-sm font-semibold text-dourado-soft transition hover:bg-creme/5 sm:text-base"
            >
              Montar minha caixinha
            </a>
          </div>
          <p className="mt-4 text-xs text-marrom-soft/90">
            Feito à mão em Barretos/SP · Pedidos pelo WhatsApp
          </p>
        </div>

        {/* Mascote */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-6 rounded-full bg-dourado/15 blur-3xl" />
            <img
              src={mascote}
              alt="Mascote Sr. Trufa"
              className="relative h-full w-full object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
              width={721}
              height={896}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
