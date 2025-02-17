export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  sku: string;
  photoUrl?: string;
}
export interface FormData {
  title: string;
  description: string;
  price: string;
  article: string;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  perPage: number;
}
