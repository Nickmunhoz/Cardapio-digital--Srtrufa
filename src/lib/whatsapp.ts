import { config } from "@/data/config";

/** Mensagem pronta dos botões gerais (chat flutuante e "Falar no WhatsApp" do topo). */
export const mensagemGeral =
  "Olá, Sr. Trufa! 💛 Vim pelo site — quero fazer um pedido / tirar uma dúvida.";

export function buildWhatsappUrl(linhas: string[], numero: string = config.whatsapp): string {
  const texto = encodeURIComponent(linhas.join("\n"));
  return `https://wa.me/${numero}?text=${texto}`;
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
