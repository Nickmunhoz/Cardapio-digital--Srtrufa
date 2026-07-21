import { useEffect, useState } from "react";

const AVISOS = [
  "🍫 16 sabores de trufas artesanais — feitas à mão",
  "🎨 Personalize sua caneca com foto, frase ou arte da loja",
  "📍 Retirada grátis em Barretos/SP · entregamos na região",
  "💬 Faça seu pedido pelo WhatsApp, rapidinho",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % AVISOS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-y border-dourado/30 bg-marrom text-creme">
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-center overflow-hidden px-4 text-center sm:h-11">
        <p key={i} className="animate-fade-up text-xs font-medium text-creme/95 sm:text-sm">
          {AVISOS[i]}
        </p>
      </div>
    </div>
  );
}
