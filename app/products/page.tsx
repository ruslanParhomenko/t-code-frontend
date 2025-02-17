"use client";

import RenderProducts from "../context/render-products";
import ButtonPage from "../component-iu/button-page";

export default function ProductsPage() {
  console.log("ProductsPage");
  return (
    <>
      <h1>PRODUCTS</h1>
      <RenderProducts />
      <ButtonPage />
    </>
  );
}
