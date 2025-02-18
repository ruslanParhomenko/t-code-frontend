"use client";

import { useData } from "../hooks/data-products";

export default function ButtonPage() {
  const { productsdata, page, setPage } = useData();

  return (
    <div className="flex justify-center items-center gap-4">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="rounded-full border border-solid border-transparent flex items-center justify-center text-white gap-2 hover:bg-[#383838] h-10 w-40"
      >
        prev
      </button>
      <span> page: {page} </span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={
          !productsdata || productsdata.data.length < productsdata?.perPage
        }
        className="rounded-full border border-solid border-transparent flex items-center justify-center text-white gap-2 hover:bg-[#383838] h-10 w-40"
      >
        next
      </button>
    </div>
  );
}
