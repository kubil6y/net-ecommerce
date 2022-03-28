import { createContext, PropsWithChildren, useContext, useState } from "react";
import { IBasket } from "../models";

interface IStoreContextValue {
  basket: IBasket | null;
  setBasket: (basket: IBasket) => void;
  removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<IStoreContextValue | undefined>(
  undefined
);

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("store context is not available");

  return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
  const [basket, setBasket] = useState<IBasket | null>(null);

  function removeItem(productId: number, quantity: number): void {
    if (!basket) return;
    const items = [...basket.items];
    const itemIndex = items.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
      return;
    }

    if (items[itemIndex].quantity - quantity > 0) {
      items[itemIndex].quantity -= quantity;
    } else {
      items.splice(itemIndex, 1);
    }

    setBasket((prev) => ({ ...prev!, items }));
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
