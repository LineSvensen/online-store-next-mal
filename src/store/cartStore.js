import { create } from "zustand";
import { persist } from "zustand/middleware";

// Handlekurv på tvers av sider

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      // Legg produkt i handlekurven
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          // Produktet finnes allerede → øk quantity
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: (item.quantity ?? 0) + 1,
                    }
                  : item,
              ),
            };
          }

          // Produktet finnes ikke → legg det til med quantity 1
          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: 1,
              },
            ],
          };
        }),

      // +1
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),

      // -1
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        })),

      // Fjern produktet helt
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () =>
        set({
          items: [],
        }),
    }),

    {
      name: "cart-storage",
    },
  ),
);
