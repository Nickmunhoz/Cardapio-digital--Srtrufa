/**
 * ╔══════════════════════════════════════════════════════╗
 * ║  SR. TRUFA — CONFIGURAÇÃO CENTRAL                   ║
 * ║  Edite aqui e faça deploy. Sem tocar em componentes. ║
 * ╚══════════════════════════════════════════════════════╝
 */
export const config = {
  // ── Contato ──────────────────────────────────────────
  /** WhatsApp — formato internacional, só números. */
  whatsapp: "5517996212158",

  /** E-mail da marca (exibido no rodapé e nos formulários). */
  email: "srtrufa.oficial@gmail.com",

  // ── Redes sociais ─────────────────────────────────────
  instagramUrl: "https://instagram.com/srtrufa.oficial",
  instagramHandle: "@srtrufa.oficial",

  // ── Localização ───────────────────────────────────────
  cidade: "Barretos/SP",

  // ── Preços B2C ────────────────────────────────────────
  /**
   * Preço padrão de cada trufa avulsa (R$).
   * ALTERE AQUI PARA ATUALIZAR EM TODO O SITE.
   */
  precoTrufa: 7.5,

  // ── Preços B2B (Empresas) ─────────────────────────────
  /**
   * Tabela de preços para pedidos corporativos.
   * Cada faixa: { min: quantidade mínima, preco: valor unitário }
   */
  b2bFaixas: [
    { min: 20,  max: 49,  preco: 6.00, label: "20 a 49 unidades" },
    { min: 50,  max: 99,  preco: 5.50, label: "50 a 99 unidades" },
    { min: 100, max: null, preco: 5.00, label: "100+ unidades"    },
  ] as { min: number; max: number | null; preco: number; label: string }[],

  /** Quantidade mínima para pedido B2B. */
  b2bMinimo: 20,

  // ── Formulário de pedido (Formspree) ──────────────────
  /**
   * Para ativar o envio de pedidos por e-mail:
   * 1. Crie conta gratuita em https://formspree.io
   * 2. Crie um Form e copie o ID (ex: "xdoqkbgz")
   * 3. Cole o ID abaixo e faça deploy
   *
   * Enquanto estiver vazio, o botão de e-mail fica oculto
   * e o pedido vai apenas pelo WhatsApp.
   */
  formspreeId: "",
};
