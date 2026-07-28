export function ManifestoSection() {
  return (
    <section className="relative overflow-hidden bg-marrom-deep py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-dourado/6 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 text-center">
        <div className="-rotate-2 inline-block mb-6">
          <span className="inline-block rounded border border-dourado/40 bg-dourado/10 px-5 py-2 font-script text-lg text-dourado-soft italic">
            com modos de cavalheiro
          </span>
        </div>

        <h2 className="font-display text-3xl leading-tight text-creme sm:text-4xl lg:text-5xl">
          Feitas à mão.
          <br />
          <span className="text-dourado">Uma a uma.</span>
        </h2>

        <p className="mt-5 text-sm leading-relaxed text-marrom-soft sm:text-base">
          O Sr. Trufa não tem linha de produção. Cada trufa passa por uma mão antes da sua.
          É assim desde o começo — e não muda.
        </p>

        <div className="brand-divider mx-auto mt-8 max-w-[160px]">
          <span className="brand-divider__diamond" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold uppercase tracking-widest text-marrom-soft/70 sm:gap-8 sm:text-xs">
          <span>Artesanal</span>
          <span className="text-dourado/30">·</span>
          <span>Feito à mão</span>
          <span className="text-dourado/30">·</span>
          <span>Barretos/SP</span>
        </div>
      </div>
    </section>
  );
}
