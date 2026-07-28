export type Categoria = "classicos" | "frutas" | "brancos" | "especiais";

export type Truffle = {
  id: string;
  nome: string;
  categoria: Categoria;
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
  { id: "brigadeiro",     nome: "Brigadeiro",         categoria: "classicos" },
  { id: "meio-amargo",    nome: "Meio Amargo",         categoria: "classicos" },
  { id: "prestigio",      nome: "Prestígio",           categoria: "classicos" },
  { id: "floresta-negra", nome: "Floresta Negra",      categoria: "classicos" },
  { id: "alpino",         nome: "Alpino",              categoria: "classicos" },

  // ── FRUTAS
  { id: "maracuja-nut",   nome: "Maracujá com Nutella", categoria: "frutas" },
  { id: "morango",        nome: "Morango",              categoria: "frutas" },
  { id: "torta-limao",    nome: "Torta de Limão",       categoria: "frutas" },

  // ── BRANCOS & CREMOSOS
  { id: "ninho-branco",   nome: "Ninho Branco",         categoria: "brancos" },
  { id: "kinder-branco",  nome: "Kinder Bueno Branco",  categoria: "brancos" },
  { id: "laka",           nome: "Laka",                 categoria: "brancos" },

  // ── ESPECIAIS
  { id: "nutninho",       nome: "Nutninho",             categoria: "especiais" },
  { id: "ovomaltine",     nome: "Ovomaltine",           categoria: "especiais" },
  { id: "kinder-bueno",   nome: "Kinder Bueno",         categoria: "especiais" },
  { id: "oreo",           nome: "Oreo Chocolate",       categoria: "especiais" },
  { id: "ferrero",        nome: "Ferrero Rocher",       categoria: "especiais" },
  { id: "kitkat-choc",    nome: "Kit Kat Chocolate",    categoria: "especiais" },
  { id: "suflair",        nome: "Suflair",              categoria: "especiais" },
  { id: "sensacao-nut",   nome: "Sensação com Nutella", categoria: "especiais" },
  { id: "diamante-negro", nome: "Diamante Negro",       categoria: "especiais" },
];
