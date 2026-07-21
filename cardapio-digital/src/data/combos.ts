import amor1 from "@/assets/img/combos/combo-amor-premium-01.jpeg";
import especial1 from "@/assets/img/combos/combo-especial-namorados-01.jpeg";
import especial2 from "@/assets/img/combos/combo-especial-namorados-02.jpeg";
import canecaCoracao from "@/assets/img/canecas/caneca-coracao.jpeg";
import canecaBranca from "@/assets/img/canecas/caneca-branca.jpeg";
import caixaFrente from "@/assets/img/caixa/caixa-fechada-frente.jpeg";
import caixaTag from "@/assets/img/caixa/caixa-fechada-tag.jpeg";

export type Combo = {
  id: string;
  nome: string;
  preco: number;
  curto: string;
  inclui: string[];
  fotos: string[];
};

export const combos: Combo[] = [
  {
    id: "kit-coracao",
    nome: "Kit Coração",
    preco: 70.0,
    curto:
      "Nossa peça-prima. Caneca de alça em coração e interior vermelho, com 3 trufas artesanais à sua escolha, na caixinha presente com laço e tag para você assinar. Encanta em qualquer ocasião.",
    inclui: [
      "1 caneca de coração personalizável",
      "3 trufas artesanais à sua escolha",
      "Caixa presente + laço + tag",
    ],
    fotos: [amor1, canecaCoracao, caixaFrente],
  },
  {
    id: "kit-classico",
    nome: "Kit Clássico",
    preco: 65.0,
    curto:
      "Clássico, elegante e 100% seu. A caneca branca premium vira tela para a sua foto, frase ou arte, acompanhada de 3 trufas artesanais selecionadas a dedo. Vem na caixinha presente com laço e tag.",
    inclui: [
      "1 caneca branca personalizável",
      "3 trufas artesanais à sua escolha",
      "Caixa presente + laço + tag",
    ],
    fotos: [especial1, especial2, canecaBranca, caixaTag],
  },
];
