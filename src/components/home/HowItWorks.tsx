import { Clock } from "lucide-react";
import mascote from "@/assets/img/brand/mascote.png";

const STEPS = [
  {
    n: "1",
    t: "Escolha",
    d: "Percorra o cardápio e escolha entre os 44 sabores artesanais.",
  },
  {
    n: "2",
    t: "Escolha as quantidades",
    d: "Defina quanto quer de cada sabor e a forma de pagamento.",
  },
  {
    n: "3",
    t: "Finalize",
    d: "No WhatsApp a gente confirma tudo, combina retirada ou entrega e o pagamento.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-marrom-deep py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Mascote andando sobre o título */}
        <div className="relative mx-auto h-16 max-w-md sm:h-20">
          <img
            src={mascote}
            alt=""
            aria-hidden="true"
            className="animate-walk absolute bottom-0 h-16 w-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] sm:h-20"
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-creme sm:text-4xl">
            Como o seu pedido fica pronto
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="rounded-2xl border border-dourado/25 bg-marrom/50 p-6 text-center shadow-sm"
            >
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-dourado font-display text-xl font-bold text-marrom-deep">
                {s.n}
              </div>
              <h3 className="mt-4 font-display text-xl text-creme">{s.t}</h3>
              <p className="mt-2 text-sm text-marrom-soft">{s.d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex items-start gap-3 rounded-2xl border-2 border-dourado/40 bg-dourado/10 p-5 sm:p-6">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-dourado" />
          <p className="text-sm text-creme sm:text-base">
            <strong>Feito por encomenda:</strong> pedidos grandes ou de última hora
            podem levar um dia a mais para ficar prontos. Combine o prazo certinho
            com a gente no WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
