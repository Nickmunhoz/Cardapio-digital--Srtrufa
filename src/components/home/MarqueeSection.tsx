const TEXTO = "ARTESANAL · FEITO À MÃO · COM CARINHO · BARRETOS/SP · SR. TRUFA · ";

/*
  Abordagem: SVG com <textPath> numa curva wave.
  O container tem width: 200% e é animado com translateX(-50%),
  movendo exatamente uma largura de viewport (= uma repetição da wave).
  Isso cria um loop perfeito sem cortes.
*/

// Wave que se repete a cada 1440 unidades.
// Container = 200% da viewport → viewBox = 2880 × 80
// Animação desloca -50% do container = -1440 unidades → loop seamless.
const WAVE = [
  "M0,40",
  "C240,8 480,72 720,40",
  "C960,8 1200,72 1440,40",
  "C1680,8 1920,72 2160,40",
  "C2400,8 2640,72 2880,40",
].join(" ");

// Texto longo o suficiente para preencher os 2880 de caminho
const FAIXA = TEXTO.repeat(6);

export function MarqueeSection() {
  return (
    <div className="bg-marrom-deep border-y border-dourado/20 overflow-hidden">

      {/* Wave SVG acima */}
      <div className="w-full leading-[0] bg-marrom">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="block w-full h-10 sm:h-12"
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32 C240,0 480,48 720,24 C960,0 1200,40 1440,20 L1440,48 L0,48 Z"
            fill="#1c0d05"
          />
        </svg>
      </div>

      {/* Faixa de texto curvado */}
      <div className="py-3 overflow-hidden" aria-hidden>
        {/* Container 200% wide animado por translateX(-50%) = -1 viewport width */}
        <div
          style={{
            width: "200%",
            animation: "waveMarquee 26s linear infinite",
          }}
        >
          <svg
            width="100%"
            height="80"
            viewBox="0 0 2880 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path id="sr-trufa-wave" d={WAVE} />
            </defs>

            <text
              style={{
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                fill: "rgba(201,162,74,0.65)",
                textTransform: "uppercase",
              }}
            >
              <textPath href="#sr-trufa-wave" startOffset="0">
                {FAIXA}
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Wave SVG abaixo (espelhada) */}
      <div className="w-full leading-[0] bg-marrom">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="block w-full h-10 sm:h-12 rotate-180"
          aria-hidden
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
