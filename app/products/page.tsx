"use client";

import RenderProducts from "../component/render-products";
import ButtonPage from "../component/button-page";

export default function ProductsPage() {
  console.log("ProductsPage");
  return (
    <div className="max-w-[50%] mx-auto">
      <h1>PRODUCTS</h1>
      <RenderProducts />
      <ButtonPage />
    </div>
  );
}
