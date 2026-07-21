export type Categoria = "classicos" | "frutas" | "brancos" | "especiais";

export type Truffle = {
  id: string;
  nome: string;
  categoria: Categoria;
};

/** Rótulos exibidos nas tabs do cardápio */
export const categoriaLabel: Record<Categoria, string> = {
  classicos:  "Clássicos",
  frutas:     "Frutas",
  brancos:    "Brancos & Cremosos",
  especiais:  "Especiais",
};

export const categoriaEmoji: Record<Categoria, string> = {
  classicos:  "🍫",
  frutas:     "🍋",
  brancos:    "🤍",
  especiais:  "⭐",
};

/**
 * Lista completa — 44 sabores.
 * Preço: edite UMA linha em config.ts (precoTrufa) e faça deploy.
 */
export const truffles: Truffle[] = [
  // ── CLÁSSICOS
  { id: "brigadeiro",      nome: "Brigadeiro",        categoria: "classicos" },
  { id: "camafeu",         nome: "Camafeu",            categoria: "classicos" },
  { id: "prestigio",       nome: "Prestígio",          categoria: "classicos" },
  { id: "prestigio-truf",  nome: "Prestígio Trufado",  categoria: "classicos" },
  { id: "tradicional",     nome: "Tradicional",        categoria: "classicos" },
  { id: "meio-amargo",     nome: "Meio Amargo",        categoria: "classicos" },
  { id: "floresta-negra",  nome: "Floresta Negra",     categoria: "classicos" },
  { id: "diamante-negro",  nome: "Diamante Negro",     categoria: "classicos" },

  // ── FRUTAS
  { id: "maracuja",        nome: "Maracujá",             categoria: "frutas" },
  { id: "maracuja-nut",    nome: "Maracujá com Nutella", categoria: "frutas" },
  { id: "maracuja-branco", nome: "Maracujá Branco",      categoria: "frutas" },
  { id: "limao",           nome: "Limão",                categoria: "frutas" },
  { id: "limao-branco",    nome: "Limão Branco",         categoria: "frutas" },
  { id: "torta-limao",     nome: "Torta de Limão",       categoria: "frutas" },
  { id: "cereja",          nome: "Cereja",               categoria: "frutas" },
  { id: "morango",         nome: "Morango",              categoria: "frutas" },
  { id: "moraninho",       nome: "Moraninho",            categoria: "frutas" },

  // ── BRANCOS & CREMOSOS
  { id: "ninho",           nome: "Ninho",               categoria: "brancos" },
  { id: "ninho-branco",    nome: "Ninho Branco",        categoria: "brancos" },
  { id: "camafeu-branco",  nome: "Camafeu Branco",      categoria: "brancos" },
  { id: "ouro-branco",     nome: "Ouro Branco",         categoria: "brancos" },
  { id: "laka",            nome: "Laka",                categoria: "brancos" },
  { id: "ferrero-branco",  nome: "Ferrero Branco",      categoria: "brancos" },
  { id: "kinder-branco",   nome: "Kinder Bueno Branco", categoria: "brancos" },
  { id: "kitkat-ninho-b",  nome: "KitKat Ninho Branco", categoria: "brancos" },
  { id: "raffaello",       nome: "Raffaello ao Leite",  categoria: "brancos" },
  { id: "beijinho",        nome: "Beijinho",            categoria: "brancos" },
  { id: "doce-leite",      nome: "Doce de Leite",       categoria: "brancos" },

  // ── ESPECIAIS
  { id: "ferrero",         nome: "Ferrero Rocher",       categoria: "especiais" },
  { id: "kinder-bueno",    nome: "Kinder Bueno",         categoria: "especiais" },
  { id: "kitkat-choc",     nome: "KitKat Chocolate",     categoria: "especiais" },
  { id: "kitkat-ninho",    nome: "KitKat Ninho",         categoria: "especiais" },
  { id: "nutninho",        nome: "Nutninho",             categoria: "especiais" },
  { id: "ovomaltine",      nome: "Ovomaltine",           categoria: "especiais" },
  { id: "oreo",            nome: "Oreo Chocolate",       categoria: "especiais" },
  { id: "sensacao",        nome: "Sensação",             categoria: "especiais" },
  { id: "sensacao-nut",    nome: "Sensação com Nutella", categoria: "especiais" },
  { id: "suflair",         nome: "Suflair",              categoria: "especiais" },
  { id: "alpino",          nome: "Alpino",               categoria: "especiais" },
  { id: "amendoim",        nome: "Amendoim",             categoria: "especiais" },
  { id: "cappuccino",      nome: "Cappuccino",           categoria: "especiais" },
  { id: "nozes",           nome: "Nozes",                categoria: "especiais" },
  { id: "nozes-truf",      nome: "Nozes Trufado",        categoria: "especiais" },
  { id: "pistache",        nome: "Pistache",             categoria: "especiais" },
];
