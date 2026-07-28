import { useEffect, useState } from "react";
import { Star, MapPin, MessageCircle, Package } from "lucide-react";

const AVISOS = [
  { icon: Star,          text: "20 sabores de trufas artesanais — feitas à mão" },
  { icon: Package,       text: "Cada trufa conferida uma a uma antes de chegar até você" },
  { icon: MapPin,        text: "Retirada grátis em Barretos/SP · entregamos na região" },
  { icon: MessageCircle, text: "Faça seu pedido pelo WhatsApp" },
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % AVISOS.length), 4000);
    return () => clearInterval(id);
  }, []);

  const aviso = AVISOS[i];
  const Icon = aviso.icon;

  return (
    <div className="border-b border-dourado/20 bg-marrom-deep">
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-center gap-2 overflow-hidden px-4">
        <p key={i} className="animate-fade-up flex items-center gap-2 text-xs font-medium text-creme/80 sm:text-sm">
          <Icon className="h-3.5 w-3.5 flex-none text-dourado" />
          {aviso.text}
        </p>
      </div>
    </div>
  );
}
