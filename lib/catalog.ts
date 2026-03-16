import type { CountryCode } from "./country-context";

export type CategoryId = "prepaid" | "payments" | "data";

export type HttpMethod = "GET" | "POST";

export type ProductId =
  | "recargas-moviles"
  | "paquetes-datos"
  | "pines-contenido"
  | "apuestas-deportivas"
  | "pago-servicios"
  | "cash-in"
  | "cash-out"
  | "consulta-cuenta"
  | "data-basic"
  | "data-advanced"
  | "actividad-usuario"
  | "perfil-consumidor";

export type Product = {
  id: ProductId;
  categoryId: CategoryId;
  name: string;
  method: HttpMethod;
  endpoint: string;
};

const PRODUCTS: Product[] = [
  {
    id: "recargas-moviles",
    categoryId: "prepaid",
    name: "Recargas móviles",
    method: "POST",
    endpoint: "/v2/recharges",
  },
  {
    id: "paquetes-datos",
    categoryId: "prepaid",
    name: "Paquetes datos/voz/SMS",
    method: "POST",
    endpoint: "/v2/packages",
  },
  {
    id: "pines-contenido",
    categoryId: "prepaid",
    name: "Pines de contenido",
    method: "POST",
    endpoint: "/v2/pins",
  },
  {
    id: "apuestas-deportivas",
    categoryId: "prepaid",
    name: "Apuestas deportivas",
    method: "POST",
    endpoint: "/v2/betting",
  },
  {
    id: "pago-servicios",
    categoryId: "payments",
    name: "Pago de servicios",
    method: "POST",
    endpoint: "/v2/bill-payments",
  },
  {
    id: "cash-in",
    categoryId: "payments",
    name: "Cash-in bancario",
    method: "POST",
    endpoint: "/v2/cash-in",
  },
  {
    id: "cash-out",
    categoryId: "payments",
    name: "Cash-out bancario",
    method: "POST",
    endpoint: "/v2/cash-out",
  },
  {
    id: "consulta-cuenta",
    categoryId: "payments",
    name: "Consulta de cuenta",
    method: "GET",
    endpoint: "/v2/accounts/balance",
  },
  {
    id: "data-basic",
    categoryId: "data",
    name: "Data Basic",
    method: "GET",
    endpoint: "/v2/data/basic",
  },
  {
    id: "data-advanced",
    categoryId: "data",
    name: "Data Advanced",
    method: "GET",
    endpoint: "/v2/data/advanced",
  },
  {
    id: "actividad-usuario",
    categoryId: "data",
    name: "Actividad de usuario",
    method: "GET",
    endpoint: "/v2/data/activity",
  },
  {
    id: "perfil-consumidor",
    categoryId: "data",
    name: "Perfil de consumidor",
    method: "GET",
    endpoint: "/v2/data/profile",
  },
];

export function getProductById(id: ProductId): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export type CatalogMockCategory = {
  id: CategoryId;
  products: ProductId[];
};

export type CatalogMock = {
  country: CountryCode;
  categories: CatalogMockCategory[];
};

