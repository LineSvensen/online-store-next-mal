"use client";

import CartItem from "@/components/CartItem";
import { useCartStore } from "@/store/cartStore";

//viser cart

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Cart</h1>

        {items.length === 0 ? (
          <p className="mt-4 text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="mt-8 space-y-6">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="mt-8 flex justify-between border-t border-gray-300 pt-4">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-semibold">{total} kr</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
