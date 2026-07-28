const TEXTO = "ARTESANAL · FEITO À MÃO · COM CARINHO · BARRETOS/SP · SR. TRUFA · ";
// Duplicamos para criar o loop contínuo
const FAIXA = TEXTO.repeat(6);

export function MarqueeSection() {
  return (
    <div className="overflow-hidden bg-marrom-deep border-y border-dourado/20">
      {/* Wave SVG acima do marquee */}
      <div className="w-full leading-[0] bg-marrom">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="block w-full h-10 sm:h-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32 C240,0 480,48 720,24 C960,0 1200,40 1440,20 L1440,48 L0,48 Z"
            fill="#1c0d05"
          />
        </svg>
      </div>

      {/* Faixa de marquee */}
      <div className="py-4 sm:py-5">
        <div className="animate-marquee whitespace-nowrap">
          {[FAIXA, FAIXA].map((txt, i) => (
            <span
              key={i}
              className="text-xs font-bold uppercase tracking-[0.18em] text-dourado/60 sm:text-sm"
            >
              {txt}
            </span>
          ))}
        </div>
      </div>

      {/* Wave SVG abaixo do marquee */}
      <div className="w-full leading-[0] bg-marrom">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="block w-full h-10 sm:h-12 rotate-180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32 C240,0 480,48 720,24 C960,0 1200,40 1440,20 L1440,48 L0,48 Z"
            fill="#1c0d05"
          />
        </svg>
      </div>
    </div>
  );
}
