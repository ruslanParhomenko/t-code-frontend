import { notFound } from "next/navigation";
import { Product } from "@/app/type/interface";

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/products/${params.id}`);
  if (!res.ok) {
    notFound();
  }
  const product: Product = await res.json();

  return (
    <div>
      <h1>{product.title}</h1>
      {product.photoUrl && (
        <img src={product.photoUrl} alt={product.title} width={200} />
      )}
      <p>{product.description}</p>
      <p>Цена: ${product.price}</p>
      {product.discountedPrice && (
        <p>Цена со скидкой: ${product.discountedPrice}</p>
      )}
      <p>Артикул: {product.sku}</p>
    </div>
  );
}
