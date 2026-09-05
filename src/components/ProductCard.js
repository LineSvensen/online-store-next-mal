import Link from "next/link";

//product card

export default function ProductCard({ product }) {
  return (
    <article className="border border-gray-200 p-4">
      <div className="aspect-square bg-gray-100" />

      <div className="mt-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>

        <p className="mt-2 text-gray-600">{product.description}</p>

        <p className="mt-3 font-medium">{product.price} kr</p>

        <Link
          href={`/products/${product.slug}`}
          className="mt-4 inline-block underline"
        >
          View product
        </Link>
      </div>
    </article>
  );
}
