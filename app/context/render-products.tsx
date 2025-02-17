"use client";

import LinkPage from "../component-iu/button-link";
import { useData } from "./data-products";
import Image from "next/image";

export default function RenderProducts() {
  const { productsdata, loading, error } = useData();

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
      {productsdata?.data.map((product) => (
        <div
          key={product.id}
          className="flex justify-start items-center border border-solid border-separate p-2 mb-2"
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
            <Image src={product.photoUrl} alt="foto" width={32} height={32} />
          )}
        </div>
      ))}
    </div>
  );
}
