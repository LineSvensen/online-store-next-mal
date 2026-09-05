// what we do with the data/logic

import products from "@/data/products.json";

export function getProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}
