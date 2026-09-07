"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";

export default function Header() {
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Online Store
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart" className="relative inline-flex">
            <ShoppingBag size={24} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[11px] font-medium leading-none text-white">
                <span
                  className={`relative top-[0.5px] ${
                    cartCount >= 10 ? "-left-[0.5px]" : ""
                  }`}
                >
                  {cartCount}
                </span>
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
