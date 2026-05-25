import type { Product } from "@/types/chat";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="action-card">
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <div className="meta-row">
        <span>${product.price.toFixed(2)}</span>
        <span>{product.brand}</span>
        <span>{product.stock} in stock</span>
      </div>
    </article>
  );
}
