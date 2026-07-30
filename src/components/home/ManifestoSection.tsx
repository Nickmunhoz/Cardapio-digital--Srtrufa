import mascoteHero from "@/assets/img/brand/mascote-hero.png";

export function ManifestoSection() {
  return (
    <section className="relative overflow-hidden bg-marrom-deep py-16 sm:py-24">
      <div className="relative mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-20">

          {/* Mascote de braços abertos */}
          <div className="flex-none flex justify-center lg:order-2">
            <img
              src={mascoteHero}
              alt="Mascote Sr. Trufa de braços abertos"
              className="w-72 sm:w-96 lg:w-[28rem] xl:w-[32rem]"
              width={1080}
              height={1080}
            />
          </div>

          {/* Texto — mascote em primeira pessoa */}
          <div className="lg:order-1 text-center lg:text-left max-w-lg">
            <span className="-rotate-1 inline-block mb-6 rounded border border-dourado/40 bg-dourado/10 px-5 py-2 font-script text-xl text-dourado-soft italic">
              Seja bem-vindo!
            </span>

            <h2 className="font-display text-3xl leading-tight text-creme sm:text-4xl lg:text-5xl">
              Eu sou o Sr. Trufa —
              <br />
              <span className="text-dourado">prazer em te receber.</span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-marrom-soft sm:text-base">
              Este é o meu cardápio digital. Aqui você encontra todos os meus sabores,
              pode escolher com calma e montar o seu pedido do jeito que preferir.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-marrom-soft sm:text-base">
              Cada trufa que você ver aqui tem uma história por trás —
              feita à mão, com ingredientes que você já conhece e ama.
              Escolha com vontade. Você merece o melhor chocolate.
            </p>

            <div className="brand-divider mt-8 max-w-[160px] lg:mx-0 mx-auto">
              <span className="brand-divider__diamond" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
