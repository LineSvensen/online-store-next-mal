import { create } from "zustand";
import { persist } from "zustand/middleware";

// handlekurv på tvers av sider

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

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
    }),
    {
      name: "cart-storage",
    },
  ),
);
