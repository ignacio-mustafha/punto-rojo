"use server";

import type { Locale } from "@/i18n/routing";
import { type ProductsData, PRODUCTS_MOCK } from "@/lib/mocks/products.mock";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProducts(_locale: Locale): Promise<ProductsData> {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/products/catalog`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        return (await res.json()) as ProductsData;
      }
    } catch {
      // fall through to mock
    }
  }
  return PRODUCTS_MOCK;
}

