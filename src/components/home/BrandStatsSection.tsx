import { HandMetal, ScanLine, Gift, Phone } from "lucide-react";
import trufaFechada from "@/assets/img/sabores/trufa-fechada.png";

const SELOS = [
  {
    Icon: HandMetal,
    title: "Feito à mão",
    desc: "Uma trufa de cada vez, sem atalhos.",
  },
  {
    Icon: ScanLine,
    title: "Conferido 1 a 1",
    desc: "Cada unidade verificada antes de embalar.",
  },
  {
    Icon: Gift,
    title: "Embalado com capricho",
    desc: "Do jeito que presentinho merece.",
  },
  {
    Icon: Phone,
    title: "Atendimento direto",
    desc: "Você fala com quem faz. Sem robô.",
  },
];

export function BrandStatsSection() {
  return (
    <section className="relative overflow-hidden bg-marrom-deep py-16 sm:py-24">
      {/* Trufa como textura de fundo */}
      <div
        className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-[0.05] blur-sm"
        style={{ backgroundImage: `url(${trufaFechada})` }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-marrom-deep/50 to-marrom-deep/70" />

      <div className="relative mx-auto max-w-5xl px-4">

        {/* Cabeçalho */}
        <div className="mb-10 text-center sm:mb-12">
          <span className="inline-block rounded-full border border-dourado/30 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-dourado sm:text-[11px]">
            o jeito Sr. Trufa
          </span>
          <h2 className="mt-3 font-display text-3xl text-creme sm:text-4xl">
            Do capricho à sua mão
          </h2>
        </div>

        {/* Grid de selos */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          {SELOS.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-3 rounded-2xl border border-dourado/15 bg-marrom/35 p-6 text-center backdrop-blur-sm transition hover:border-dourado/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-dourado/30 bg-dourado/10">
                <Icon className="h-5 w-5 text-dourado" />
              </div>
              <h3 className="font-display text-base font-semibold text-creme sm:text-lg">{title}</h3>
              <p className="text-xs leading-relaxed text-marrom-soft sm:text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-script text-xl text-dourado-soft/80 sm:mt-12 sm:text-2xl">
          "Do mesmo jeito — desde o primeiro dia."
        </p>
      </div>
    </section>
  );
}
