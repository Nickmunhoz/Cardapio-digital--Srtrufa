import canecaBranca from "@/assets/img/canecas/caneca-branca.jpeg";
import canecaCoracao from "@/assets/img/canecas/caneca-coracao.jpeg";
import arteVermelha01 from "@/assets/img/canecas/caneca-arte-vermelha-01.jpeg";
import arteVermelha02 from "@/assets/img/canecas/caneca-arte-vermelha-02.jpeg";
import arteVermelha03 from "@/assets/img/canecas/caneca-arte-vermelha-03.jpeg";
import rosaBorracha from "@/assets/img/canecas/caneca-rosa-borracha.jpeg";
import saudeMental from "@/assets/img/canecas/caneca-arte-saude-mental.jpeg";
import aniversario from "@/assets/img/canecas/caneca-arte-aniversario.jpeg";

export type MugAvulsa = {
  id: string;
  nome: string;
  foto: string;
  desc: string;
  preco: number | null;
};

export type MugEspecial = {
  id: string;
  nome: string;
  fotos: string[];
  desc: string;
};

/** Canecas personalizáveis (foto até o prazo, frase ou arte da loja). Preço a definir. */
export const mugsAvulsas: MugAvulsa[] = [
  {
    id: "branca",
    nome: "Caneca Branca Premium",
    foto: canecaBranca,
    desc: "Sua foto, sua frase, sua cara. A tela perfeita para qualquer história.",
    preco: null,
  },
  {
    id: "coracao",
    nome: "Caneca de Coração",
    foto: canecaCoracao,
    desc: "Alça em coração e interior vermelho. O recado já vem no formato.",
    preco: null,
  },
];

/** Peças únicas com arte pronta — não personalizáveis. Sob encomenda quando esgotam. */
export const mugsEspeciais: MugEspecial[] = [
  {
    id: "arte-vermelha",
    nome: "Arte Interior Vermelho",
    fotos: [arteVermelha01, arteVermelha02, arteVermelha03],
    desc: "Interior tomado por corações e um “love” desenhado à mão. Surpresa a cada gole.",
  },
  {
    id: "rosa-borracha",
    nome: "Detalhe em Borracha Rosa",
    fotos: [rosaBorracha],
    desc: "Alça e base em borracha rosa: pegada macia, antideslize e um charme que não passa despercebido.",
  },
  {
    id: "coracao-bom",
    nome: "Coração Bom",
    fotos: [saudeMental],
    desc: "Estampa colorida: “De saúde mental duvidosa, mas com coração bom.” Para presentear quem você ama do jeito que é.",
  },
  {
    id: "aniversario",
    nome: "Aniversário Feliz",
    fotos: [aniversario],
    desc: "“Te desejo um aniversário maravilhoso e uma vida repleta de felicidade.” O presente certo para qualquer data.",
  },
];
