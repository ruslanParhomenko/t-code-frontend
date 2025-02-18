import { notFound } from "next/navigation";
import { Product } from "@/app/type/interface";

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) {
    notFound();
  }
  const product: Product = await res.json();

  return (
    <div className="flex flex-col gap-3 justify-center items-center py-20">
      <h1>{product.title}</h1>
      {product.photoUrl && (
        <img src={product.photoUrl} alt={product.title} width={200} />
      )}
      <p>{product.description}</p>
      <p>price: ${product.price}</p>
      {product.discountedPrice && (
        <p>discount price: ${product.discountedPrice}</p>
      )}
      <p>SKU: {product.sku}</p>
    </div>
  );
}
