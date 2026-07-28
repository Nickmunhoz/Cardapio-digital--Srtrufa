import { createContext, useContext, useState, type ReactNode } from "react";
import { OrderModal } from "@/components/ui/OrderModal";

type OrderModalContextValue = {
  openOrderModal: (initialCounts?: Record<string, number>) => void;
};

const OrderModalContext = createContext<OrderModalContextValue | null>(null);

export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialCounts, setInitialCounts] = useState<Record<string, number>>({});

  function openOrderModal(counts: Record<string, number> = {}) {
    setInitialCounts(counts);
    setOpen(true);
  }

  return (
    <OrderModalContext.Provider value={{ openOrderModal }}>
      {children}
      {open && (
        <OrderModal
          onClose={() => { setOpen(false); setInitialCounts({}); }}
          initialCounts={initialCounts}
        />
      )}
    </OrderModalContext.Provider>
  );
}

export function useOrderModal() {
  const ctx = useContext(OrderModalContext);
  if (!ctx) throw new Error("useOrderModal deve ser usado dentro de OrderModalProvider");
  return ctx;
}
