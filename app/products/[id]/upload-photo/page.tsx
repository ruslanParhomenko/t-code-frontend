"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function UploadPhotoPage() {
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`http://localhost:3000/products/${id}/photo`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Ошибка загрузки фото");
      setMessage("Фото успешно загружено!");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Загрузка фото для товара ID: {id}</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Загрузить фото</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
