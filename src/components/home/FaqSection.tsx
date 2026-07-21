const FAQ = [
  {
    q: "Posso misturar sabores na minha caixinha?",
    a: "Sim! Você escolhe a quantidade de cada sabor no cardápio ou no montador de caixinha — do jeito que quiser.",
  },
  {
    q: "Qual é o prazo para retirar ou receber?",
    a: "Pedidos do dia a dia costumam ficar prontos rapidinho. Para caixinhas grandes ou datas especiais, combinamos o prazo certinho no WhatsApp.",
  },
  {
    q: "Vocês entregam?",
    a: "Retirada é grátis em Barretos/SP. Entregamos na região com taxa por zona (de R$ 5 a R$ 12), combinada no fechamento.",
  },
  {
    q: "Como faço o pagamento?",
    a: "Aceitamos dinheiro, Pix, débito e crédito. Tudo combinado direto pelo WhatsApp — não há pagamento online aqui no site.",
  },
  {
    q: "As trufas são feitas por vocês?",
    a: "Sim, são artesanais e feitas à mão, com 44 sabores para você montar a sua caixinha.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-marrom py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <h2 className="font-display text-3xl text-creme sm:text-4xl">
            Perguntas frequentes
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-dourado/25 bg-marrom-deep/50 p-5 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-creme">
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
