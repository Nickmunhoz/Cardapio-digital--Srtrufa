import { buildWhatsappUrl } from "@/lib/whatsapp";

const OCASIOES = [
  { emoji: "🎂", nome: "Aniversário" },
  { emoji: "💐", nome: "Dia das Mães" },
  { emoji: "🙏", nome: "Agradecimento" },
  { emoji: "🤝", nome: "Amizade" },
  { emoji: "❤️", nome: "Namoro" },
  { emoji: "🎓", nome: "Formatura" },
  { emoji: "💌", nome: "Saudade" },
  { emoji: "✨", nome: "Só porque sim" },
];

export function OcasioesSection() {
  return (
    <section id="ocasioes" className="bg-marrom-deep py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-script block text-xl text-dourado-soft/90">
            Para presentear
          </span>
          <h2 className="mt-2 font-display text-3xl text-creme sm:text-4xl">
            Um presente para cada momento
          </h2>
          <p className="mt-3 text-marrom-soft">
            Escolha a ocasião e fale com a gente — montamos o presente perfeito com você.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {OCASIOES.map((o) => (
            <a
              key={o.nome}
              href={buildWhatsappUrl([
                `Olá, Sr. Trufa! 💛 Quero um presente para ${o.nome.toLowerCase()}.`,
              ])}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col items-center gap-2 rounded-2xl border border-dourado/20 bg-marrom-deep/50 p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-dourado/60 hover:bg-dourado/10"
            >
              <span className="text-3xl">{o.emoji}</span>
              <span className="text-sm font-semibold text-creme">{o.nome}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
