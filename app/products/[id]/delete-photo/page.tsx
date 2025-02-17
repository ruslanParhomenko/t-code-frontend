"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function DeletePhotoPage() {
  const { id } = useParams();
  const [message, setMessage] = useState<string>("");

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}/photo`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Ошибка удаления фото");
      setMessage("Фото успешно удалено!");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Удаление фото для товара ID: {id}</h1>
      <button onClick={handleDelete}>Удалить фото</button>
      {message && <p>{message}</p>}
    </div>
  );
}
