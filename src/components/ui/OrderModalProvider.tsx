import { createContext, useContext, useState, type ReactNode } from "react";
import { OrderModal } from "@/components/ui/OrderModal";

type OrderModalContextValue = {
  openOrderModal: () => void;
};

const OrderModalContext = createContext<OrderModalContextValue | null>(null);

export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <OrderModalContext.Provider value={{ openOrderModal: () => setOpen(true) }}>
      {children}
      {open && <OrderModal onClose={() => setOpen(false)} />}
    </OrderModalContext.Provider>
  );
}

export function useOrderModal() {
  const ctx = useContext(OrderModalContext);
  if (!ctx) throw new Error("useOrderModal deve ser usado dentro de OrderModalProvider");
  return ctx;
}
