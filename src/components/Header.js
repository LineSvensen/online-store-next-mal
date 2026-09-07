import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Online Store
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  );
}
