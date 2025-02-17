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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    sku: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/products");
      if (!res.ok) throw new Error("Не удалось загрузить товары");
      const data = await res.json();
      setProducts(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: parseFloat(form.price),
          sku: form.sku,
        }),
      });
      if (!res.ok) throw new Error("Не удалось добавить товар");
      // Обновляем список товаров после добавления
      await fetchProducts();
      setForm({ title: "", description: "", price: "", sku: "" });
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h1>Управление товарами</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Название"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Описание"
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Цена"
          required
        />
        <input
          type="text"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
          placeholder="Артикул"
          required
        />
        <button type="submit">Добавить товар</button>
      </form>
      <h2>Список товаров</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
