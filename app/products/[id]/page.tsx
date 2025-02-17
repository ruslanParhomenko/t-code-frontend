import { notFound } from "next/navigation";

interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  sku: string;
  photoUrl?: string;
}

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  const res = await fetch(`http://localhost:3000/products/${params.id}`);
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
