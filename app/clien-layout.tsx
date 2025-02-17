"use client";

import { DataProvider } from "./context/data-products";
import Header from "./component-iu/header";

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
