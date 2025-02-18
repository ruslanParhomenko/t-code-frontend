"use client";

import LinkPage from "./button-nav";
import { useData } from "../hooks/data-products";
import Image from "next/image";

export default function RenderProducts() {
  const { productsData, loading, error } = useData();
  const API_URL = process.env.API_URL;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen pb-20">
        Загрузка...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen pb-4">
        Произошла ошибка: {error}
      </div>
    );
  }

  return (
    <div className="w-full pt-10">
      {productsData?.data.map((product) => (
        <div
          key={product.id}
          className="flex justify-start items-center gap-2 border border-solid border-separate p-2 mb-2"
        >
          <ul className="w-1/3 flex flex-col">
            <LinkPage
              page={`/products/${product.id}/upload-photo`}
              text="add foto"
            />
            <LinkPage
              page={`/products/${product.id}/delete-photo`}
              text="delete foto"
            />
          </ul>
          <ul className="w-1/3">
            <li className="flex-1">{product.title}</li>
            <li>{product.description}</li>
            <li>Цена: ${product.price}</li>
          </ul>
          {product.photoUrl && (
            <Image
              src={`${API_URL}${product.photoUrl}`}
              alt="foto"
              width={32}
              height={32}
            />
          )}
          <ul className="w-1/3 flex flex-col">
            <LinkPage
              page={`/products/${product.id}/delete-product`}
              text="delete product"
            />
            <LinkPage page={`/products/${product.id}`} text="open product" />
          </ul>
        </div>
      ))}
    </div>
  );
}
