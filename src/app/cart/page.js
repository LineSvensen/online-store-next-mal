"use client";

import { useCartStore } from "@/store/cartStore";

//viser cart

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Cart</h1>

        {items.length === 0 ? (
          <p className="mt-4 text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="mt-8 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 pb-4"
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>

                  <p className="text-gray-600">{item.price} kr</p>

                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">{item.price * item.quantity} kr</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
