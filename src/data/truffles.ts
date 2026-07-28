export type Categoria = "classicos" | "frutas" | "brancos" | "especiais";

export type Truffle = {
  id: string;
  nome: string;
  categoria: Categoria;
  descricao: string;
};

/** Títulos exibidos como cabeçalho de cada categoria no cardápio */
export const categoriaLabel: Record<Categoria, string> = {
  classicos:  "Clássicos",
  frutas:     "Frutas",
  brancos:    "Brancos & Cremosos",
  especiais:  "Especiais",
};

/**
 * Lista completa — 20 sabores.
 * Preço: edite UMA linha em config.ts (precoTrufa) e faça deploy.
 */
export const truffles: Truffle[] = [
  // ── CLÁSSICOS
  { id: "brigadeiro",     nome: "Brigadeiro",          categoria: "classicos",  descricao: "Chocolate ao leite com granulado. O clássico que não precisa de apresentação." },
  { id: "meio-amargo",    nome: "Meio Amargo",          categoria: "classicos",  descricao: "Cacau intenso para quem prefere o chocolate mais sério. Na medida certa." },
  { id: "prestigio",      nome: "Prestígio",            categoria: "classicos",  descricao: "Coco com chocolate ao leite. Uma dupla irresistível que nunca sai de moda." },
  { id: "floresta-negra", nome: "Floresta Negra",       categoria: "classicos",  descricao: "Chocolate com cereja e chantilly. Sofisticado e impossível de esquecer." },
  { id: "alpino",         nome: "Alpino",               categoria: "classicos",  descricao: "Chocolate ao leite com toque de avelã. Encorpado e cheio de personalidade." },

  // ── FRUTAS
  { id: "maracuja-nut",   nome: "Maracujá com Nutella", categoria: "frutas",     descricao: "Maracujá azedinho com Nutella cremosa. Tropical e gourmet ao mesmo tempo." },
  { id: "morango",        nome: "Morango",              categoria: "frutas",     descricao: "Chocolate branco com morango. Delicado, leve e muito bonito por dentro." },
  { id: "torta-limao",    nome: "Torta de Limão",       categoria: "frutas",     descricao: "Creme de limão com biscoito. Azedinho na medida — impossível comer só uma." },

  // ── BRANCOS & CREMOSOS
  { id: "ninho-branco",   nome: "Ninho Branco",         categoria: "brancos",    descricao: "Leite Ninho com chocolate branco. Cremoso, suave e cheio de memória afetiva." },
  { id: "kinder-branco",  nome: "Kinder Bueno Branco",  categoria: "brancos",    descricao: "Kinder Bueno branco com creme de avelã. Sofisticação em cada mordida." },
  { id: "laka",           nome: "Laka",                 categoria: "brancos",    descricao: "Chocolate Laka puro e aveludado. Para os verdadeiros fãs do chocolate branco." },

  // ── ESPECIAIS
  { id: "nutninho",       nome: "Nutninho",             categoria: "especiais",  descricao: "Leite Ninho com Nutella. O combo favorito de todo mundo — numa trufa." },
  { id: "ovomaltine",     nome: "Ovomaltine",           categoria: "especiais",  descricao: "Crocante de Ovomaltine que estoura no palato. Viciante desde a primeira vez." },
  { id: "kinder-bueno",   nome: "Kinder Bueno",         categoria: "especiais",  descricao: "Creme de avelã inspirado no Kinder Bueno. Um dos mais pedidos do cardápio." },
  { id: "oreo",           nome: "Oreo Chocolate",       categoria: "especiais",  descricao: "Creme de biscoito Oreo com chocolate. Para os fãs do biscoito mais famoso do mundo." },
  { id: "ferrero",        nome: "Ferrero Rocher",       categoria: "especiais",  descricao: "Avelã inteira com ganache de chocolate. A trufa dos presentes especiais." },
  { id: "kitkat-choc",    nome: "Kit Kat Chocolate",    categoria: "especiais",  descricao: "Wafer crocante coberto de chocolate. Aquela textura que surpreende." },
  { id: "suflair",        nome: "Suflair",              categoria: "especiais",  descricao: "Chocolate aerado que derrete na boca. Leve, surpreendente e elegante." },
  { id: "sensacao-nut",   nome: "Sensação com Nutella", categoria: "especiais",  descricao: "Chocolate Sensação com Nutella — doce e levemente cítrico. Um contraste que prende." },
  { id: "diamante-negro", nome: "Diamante Negro",       categoria: "especiais",  descricao: "Chocolate amargo e aveludado. Para os apreciadores do cacau mais puro." },
];
