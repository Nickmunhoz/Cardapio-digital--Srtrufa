const FAQ = [
  {
    q: "Como personalizo a caneca?",
    a: "Você escolhe foto, frase (até 60 caracteres) ou uma arte pronta da loja. A gente confirma tudo no WhatsApp antes de produzir.",
  },
  {
    q: "Qual é o prazo?",
    a: "Pedidos com foto passam por sublimação e levam alguns dias. Combinamos o prazo certinho no WhatsApp, conforme a sua data.",
  },
  {
    q: "Vocês entregam?",
    a: "Retirada é grátis em Barretos/SP. Entregamos na região com taxa por zona (de R$ 5 a R$ 12), combinada no fechamento.",
  },
  {
    q: "Como faço o pagamento?",
    a: "Tudo pelo WhatsApp — não há pagamento online aqui no site. Você fecha direto com a gente.",
  },
  {
    q: "As trufas são feitas por vocês?",
    a: "Sim, são artesanais e feitas à mão, com 16 sabores para você montar a sua caixinha.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-creme-soft py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <h2 className="font-display text-3xl text-marrom sm:text-4xl">
            Perguntas frequentes
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-dourado/30 bg-creme p-5 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-marrom">
                {f.q}
                <span className="text-xl text-dourado transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-marrom-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
