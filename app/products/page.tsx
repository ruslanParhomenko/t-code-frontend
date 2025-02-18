"use client";

import RenderProducts from "../component/render-products";
import ButtonPage from "../component/button-page";

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
