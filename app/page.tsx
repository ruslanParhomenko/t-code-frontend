"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  sku: string;
  photoUrl?: string;
}

interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  perPage: number;
}

export default function CatalogPage() {
  const [page, setPage] = useState(1);
  const [productsData, setProductsData] = useState<ProductsResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/products?page=${page}`);
      if (!res.ok) throw new Error("Не удалось загрузить товары");
      const data = await res.json();
      setProductsData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!productsData) return null;

  return (
    <div>
      <h1>Каталог товаров</h1>
      {productsData.data.map((product) => (
        <div key={product.id}>
          {product.photoUrl && (
            <img src={product.photoUrl} alt={product.title} width={100} />
          )}
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Цена: ${product.price}</p>
        </div>
      ))}
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Предыдущая
        </button>
        <span> Страница {page} </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={productsData.data.length < productsData.perPage}
        >
          Следующая
        </button>
      </div>
    </div>
  );
}
