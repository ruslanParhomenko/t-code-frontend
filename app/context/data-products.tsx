"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

import { ProductsResponse } from "../type/interface";

interface DataContextType {
  productsdata: ProductsResponse | null;
  loading: boolean;
  error: string | null;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [page, setPage] = useState(1);
  const [productsdata, setProductsData] = useState<ProductsResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/products?page=${page}`, {
          cache: "no-store",
          method: "GET",
          headers: { Accept: "application/json" },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: ProductsResponse = await response.json();
        setProductsData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <DataContext.Provider
      value={{ productsdata, loading, error, page, setPage }}
    >
      {children}
    </DataContext.Provider>
  );
};
