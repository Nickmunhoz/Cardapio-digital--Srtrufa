import { useState } from "react";
import trufasGrupo from "@/assets/img/trufas/trufas-grupo.jpeg";
import { TrufflePickerModal } from "@/components/truffle/TrufflePickerModal";

export function TruffleSection() {
  const [open, setOpen] = useState(false);
  return (
    <section id="trufas" className="bg-creme-soft py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Escolher minhas trufas"
          className="group relative overflow-hidden rounded-2xl border border-dourado/30 shadow-sm transition hover:shadow-xl"
        >
          <img
            src={trufasGrupo}
            alt="Variedade de trufas artesanais Sr. Trufa"
            width={1280}
            height={1280}
            loading="lazy"
            className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-marrom/85 px-3 py-1.5 text-xs font-semibold text-creme">
            Clique para escolher seus sabores
          </span>
        </button>

        <div>
          <span className="inline-block rounded-full border border-dourado/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-marrom-soft">
            Nosso catálogo
          </span>
          <h2 className="mt-4 font-display text-3xl text-marrom sm:text-4xl">
            Nossas trufas artesanais
          </h2>
          <p className="mt-3 text-marrom-soft">
            16 sabores, todos feitos à mão. Monte sua caixinha do seu jeito.
          </p>
          <p className="mt-4 text-sm italic text-marrom-soft">
            Da casca que estala ao recheio que derrete: cada trufa é conferida uma a uma
            antes de ir para a sua caixinha.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 rounded-full bg-laranja px-7 py-3.5 text-sm font-semibold text-creme shadow-md shadow-marrom/15 transition hover:scale-[1.02] hover:bg-laranja-deep sm:text-base"
          >
            Escolher minhas trufas
          </button>
        </div>
      </div>

      {open && <TrufflePickerModal onClose={() => setOpen(false)} />}
    </section>
  );
}
