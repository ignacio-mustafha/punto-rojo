import type { Locale } from "@/i18n/routing";
import ProductsPageContent from "@/components/ProductsPageContent";
import { getProducts } from "@/lib/actions/products";
import type { ProductsData, Product } from "@/lib/mocks/products.mock";
import type { ProductDocResponse } from "@/lib/types/product-doc";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    country?: string;
    category?: string;
    product?: string;
  }>;
};

export default async function ProductsPage({ params, searchParams }: Props) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);

  const country = (sp.country ?? "CO").toUpperCase();
  const categoryFromUrl = sp.category;
  const productFromUrl = sp.product;

  const productsData: ProductsData = await getProducts(locale);

  const categories = (["prepaid", "payments", "data"] as const).map(
    (tab) => ({
      id: tab,
      label: productsData.tabs[tab],
      products: productsData.products[tab].map((p) => ({
        id: p.id,
        name: p.name,
        method: p.method,
        endpoint: p.path,
      })),
    }),
  );

  const activeCategoryId =
    (categoryFromUrl &&
      categories.some((c) => c.id === categoryFromUrl) &&
      categoryFromUrl) ||
    categories[0]?.id ||
    null;

  const activeCategory = categories.find((c) => c.id === activeCategoryId);

  const activeProductId =
    (productFromUrl &&
      activeCategory?.products.some((p) => p.id === productFromUrl) &&
      productFromUrl) ||
    activeCategory?.products[0]?.id ||
    null;

  let doc: ProductDocResponse | null = null;

  if (activeCategoryId && activeProductId && activeCategory) {
    const product: Product | undefined = productsData.products[
      activeCategoryId as keyof ProductsData["products"]
    ].find((p) => p.id === activeProductId);

    if (product) {
      doc = {
        meta: {
          title: product.name,
          method: product.method,
          endpoint: product.path,
        },
        description: product.description,
        useCase: product.useCase,
        params: product.params,
        snippets: product.snippets,
        responseExample: product.response,
      };
    }
  }

  return (
    <ProductsPageContent
      categories={categories}
      activeCategoryId={activeCategoryId}
      activeProductId={activeProductId}
      country={country}
      locale={locale}
      doc={doc}
    />
  );
}


