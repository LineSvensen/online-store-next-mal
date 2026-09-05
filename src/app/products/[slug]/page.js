import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton.js";

//single product page

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="aspect-square bg-gray-100" />

          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <p className="mt-4 text-gray-600">{product.description}</p>

            <p className="mt-6 text-xl font-semibold">{product.price} kr</p>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
