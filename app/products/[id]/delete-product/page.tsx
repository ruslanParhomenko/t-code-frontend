"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function DeletePhotoPage() {
  const API_URL = process.env.API_URL;
  const { id } = useParams();
  const [message, setMessage] = useState<string>("");

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Ошибка удаления продукта");
      setMessage("продукт успешно удален!");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>product ID: {id}</h1>
      <button onClick={handleDelete}>DELETE</button>
      {message && <p>{message}</p>}
    </div>
  );
}
