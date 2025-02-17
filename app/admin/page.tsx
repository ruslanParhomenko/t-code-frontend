"use client";

import { useState } from "react";
import { Product } from "../type/interface";
import { FormData } from "../type/interface";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    article: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(form.price);
    if (isNaN(price)) {
      setError("Цена должна быть числом");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: price,
          sku: form.article,
        }),
      });

      if (!res.ok) throw new Error("Не удалось добавить товар");

      setForm({ title: "", description: "", price: "", article: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>New Product</h1>
      {error && <div className="text-red-500">{error}</div>}

      {loading && <div>Загрузка...</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-4 mt-4 ">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="title"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="description"
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="price"
          required
        />
        <input
          type="text"
          value={form.article}
          onChange={(e) => setForm({ ...form, article: e.target.value })}
          placeholder="article"
          required
        />
        <button
          className="rounded-full border border-solid border-slate-100 flex items-center justify-center text-white gap-2 hover:bg-[#474040] h-10 w-40"
          type="submit"
        >
          ADD PRODUCTS
        </button>
      </form>
    </div>
  );
}
