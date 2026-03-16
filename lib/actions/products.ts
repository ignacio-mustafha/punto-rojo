"use server";

import type { Locale } from "@/i18n/routing";
import { type ProductsData, PRODUCTS_MOCK } from "@/lib/mocks/products.mock";

export async function getProducts(_locale: Locale): Promise<ProductsData> {
  // En esta etapa los textos están en un solo idioma (es).
  // Más adelante, cuando dupliquemos los mocks por idioma o
  // haya un endpoint real, usaremos `locale` para seleccionar
  // los textos apropiados.
  return PRODUCTS_MOCK;
}

