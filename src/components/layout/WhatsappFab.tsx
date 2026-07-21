import { MessageCircle } from "lucide-react";
import { buildWhatsappUrl, mensagemGeral } from "@/lib/whatsapp";

export function WhatsappFab() {
  return (
    <a
      href={buildWhatsappUrl([mensagemGeral])}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-laranja text-creme shadow-lg shadow-marrom/30 transition hover:scale-105 hover:bg-laranja-deep"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
