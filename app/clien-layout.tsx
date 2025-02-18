"use client";

import { DataProvider } from "./hooks/data-products";
import Header from "./component/header";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DataProvider>
      <Header />
      {children}
    </DataProvider>
  );
}
