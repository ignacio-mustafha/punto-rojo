"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTransition } from "react";

import { ExternalLink, Globe } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SandboxPanel from "@/components/SandboxPanel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProductDocResponse } from "@/lib/types/product-doc";

type SimpleProduct = {
  id: string;
  name: string;
  method: string;
  endpoint: string;
};

type SimpleCategory = {
  id: string;
  label: string;
  products: SimpleProduct[];
};

type Props = {
  categories: SimpleCategory[];
  activeCategoryId: string | null;
  activeProductId: string | null;
  country: string;
  countries: string[];
  docByCountry: Record<string, ProductDocResponse | null>;
  locale: string;
  doc: ProductDocResponse | null; // doc “base” (fallback)
};

const fadeInUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductsPageContent({
  categories,
  activeCategoryId,
  activeProductId,
  country,
  countries,
  docByCountry,
  locale,
  doc: initialDoc,
}: Props) {
  // En modo “dual” habrá docs distintos por país; en single usamos el doc base.
  const doc = docByCountry[country] ?? initialDoc;

  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) ?? null;

  const dualOther = country === "CO" ? "MX" : country === "MX" ? "CO" : null;
  const canToggleDual = dualOther !== null;
  const isDualMode = countries.length === 2 && countries.includes("CO") && countries.includes("MX");
  const renderCountries = isDualMode ? countries.slice(0, 2) : [country];

  const formatCountry = (code: string) => {
    if (code === "CO") return "Colombia";
    if (code === "MX") return "México";
    if (code === "PE") return "Perú";
    if (code === "AR") return "Argentina";
    if (code === "CL") return "Chile";
    if (code === "EC") return "Ecuador";
    if (code === "GT") return "Guatemala";
    if (code === "PA") return "Panamá";
    return code;
  };

  const countryFlag = (code: string) => {
    if (code === "CO") return "🇨🇴";
    if (code === "MX") return "🇲🇽";
    if (code === "PE") return "🇵🇪";
    if (code === "AR") return "🇦🇷";
    if (code === "CL") return "🇨🇱";
    if (code === "EC") return "🇪🇨";
    if (code === "GT") return "🇬🇹";
    if (code === "PA") return "🇵🇦";
    return "";
  };

  const countryShortCode = (code: string) => code.toUpperCase();

  const buildHref = (categoryId: string, productId: string) => {
    const params = new URLSearchParams();
    params.set("country", country); // primer país siempre
    params.set("category", categoryId);
    params.set("product", productId);
    if (isDualMode) {
      params.set("countries", renderCountries.join(","));
    }

    return `/${locale}/products?${params.toString()}`;
  };

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleToggle = (nextMode: "single" | "dual") => {
    const params = new URLSearchParams();
    params.set("country", country);

    if (nextMode === "dual" && dualOther) {
      params.set("countries", `${country},${dualOther}`);
    }

    const categoryIdForUrl = activeCategoryId ?? categories[0]?.id;
    const productIdForUrl =
      activeProductId ?? categories[0]?.products?.[0]?.id;

    if (categoryIdForUrl) params.set("category", categoryIdForUrl);
    if (productIdForUrl) params.set("product", productIdForUrl);

    const nextUrl = `/${locale}/products?${params.toString()}`;
    startTransition(() => {
      router.push(nextUrl, { scroll: false });
    });
  };

  return (
    <div className="w-full">
      <div className="mb-2 w-full border-y border-primary/10 bg-primary/[0.04] dark:border-primary/25 dark:bg-primary/[0.10]">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Globe className="h-4 w-4 text-primary dark:text-primary/90" />
          <span className="text-sm font-semibold text-foreground dark:text-foreground/95">
            Viendo productos en{" "}
            {isDualMode ? (
              <>
                {countryFlag(countries[0] ?? country)} {formatCountry(countries[0] ?? country)} +{" "}
                {countryFlag(countries[1] ?? "")} {formatCountry(countries[1] ?? "")}
              </>
            ) : (
              <>
                {countryFlag(country)} {formatCountry(country)}
              </>
            )}
          </span>
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary dark:border-primary/40 dark:bg-primary/20 dark:text-primary-foreground">
            {isDualMode
              ? `${countryShortCode(countries[0] ?? country)}+${countryShortCode(countries[1] ?? "")}`
              : countryShortCode(country)}
          </div>
        </div>
      </div>

      <div className="mx-auto flex min-w-0 w-full max-w-7xl gap-6 px-4 pb-8 pt-0 sm:px-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 border-r border-border pr-4 sm:block">
        <h1 className="mb-4 text-base font-semibold tracking-tight">
          Productos
        </h1>

        {categories.length === 0 || !activeCategory ? (
          <p className="text-sm text-muted-foreground">
            Sin productos disponibles para este país.
          </p>
        ) : (
          <div className="space-y-6">
            {isDualMode ? (
              renderCountries.map((sectionCountry) => (
                <div key={sectionCountry}>
                  <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                    {formatCountry(sectionCountry)} · {activeCategory.label}
                  </p>
                  <div className="space-y-1">
                    {activeCategory.products.map((product, index) => {
                      const isActive = product.id === activeProductId;
                      return (
                        <motion.div
                          key={product.id}
                          variants={fadeInUp}
                          initial="hidden"
                          animate="visible"
                          transition={{
                            duration: 0.28,
                            delay: index * 0.08,
                            ease: "easeOut",
                          }}
                        >
                          <Link
                            href={buildHref(activeCategory.id, product.id)}
                            scroll={false}
                            className={[
                              "block w-full rounded-md px-2 py-1.5 text-left text-xs transition-colors",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted",
                            ].join(" ")}
                          >
                            <span className="block truncate">{product.name}</span>
                            <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                              <span className="rounded-sm border border-border px-1 py-0.5">
                                {product.method}
                              </span>
                              <span className="truncate text-[9px] font-mono">
                                {product.endpoint}
                              </span>
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                  {activeCategory.label}
                </p>
                <div className="space-y-1">
                  {activeCategory.products.map((product, index) => {
                    const isActive = product.id === activeProductId;
                    return (
                      <motion.div
                        key={product.id}
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{
                          duration: 0.28,
                          delay: index * 0.08,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={buildHref(activeCategory.id, product.id)}
                          scroll={false}
                          className={[
                            "block w-full rounded-md px-2 py-1.5 text-left text-xs transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted",
                          ].join(" ")}
                        >
                          <span className="block truncate">{product.name}</span>
                          <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                            <span className="rounded-sm border border-border px-1 py-0.5">
                              {product.method}
                            </span>
                            <span className="truncate text-[9px] font-mono">
                              {product.endpoint}
                            </span>
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        </aside>

        <main className="min-w-0 flex-1 space-y-4">
          {categories.length > 0 && activeCategory && (
            <section className="min-w-0 rounded-lg border border-border bg-card p-3 sm:hidden">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Productos
              </p>
              <div className="mt-2 max-h-[min(50vh,22rem)] overflow-y-auto overscroll-y-contain pr-1 [-webkit-overflow-scrolling:touch]">
                {isDualMode ? (
                  <div className="space-y-4">
                    {renderCountries.map((sectionCountry) => (
                      <div key={sectionCountry}>
                        <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                          {formatCountry(sectionCountry)} · {activeCategory.label}
                        </p>
                        <div className="space-y-1">
                          {activeCategory.products.map((product) => {
                            const isActive = product.id === activeProductId;
                            return (
                              <Link
                                key={`${sectionCountry}-${product.id}`}
                                href={buildHref(activeCategory.id, product.id)}
                                scroll={false}
                                className={[
                                  "block w-full rounded-md px-2 py-1.5 text-left text-xs transition-colors",
                                  isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted",
                                ].join(" ")}
                              >
                                <span className="block truncate">{product.name}</span>
                                <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                                  <span className="rounded-sm border border-border px-1 py-0.5">
                                    {product.method}
                                  </span>
                                  <span className="truncate text-[9px] font-mono">
                                    {product.endpoint}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="mb-2 text-xs font-semibold text-foreground">
                      {activeCategory.label}
                    </p>
                    <div className="space-y-1">
                      {activeCategory.products.map((product) => {
                        const isActive = product.id === activeProductId;
                        return (
                          <Link
                            key={product.id}
                            href={buildHref(activeCategory.id, product.id)}
                            scroll={false}
                            className={[
                              "block w-full rounded-md px-2 py-1.5 text-left text-xs transition-colors",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted",
                            ].join(" ")}
                          >
                            <span className="block truncate">{product.name}</span>
                            <span className="mt-0.5 inline-flex w-full min-w-0 items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                              <span className="shrink-0 rounded-sm border border-border px-1 py-0.5">
                                {product.method}
                              </span>
                              <span className="min-w-0 truncate text-[9px] font-mono">
                                {product.endpoint}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

        {categories.length > 0 && (
          <nav className="flex items-end gap-6 border-b border-border pb-1">
            {categories.map((category) => {
              const isActive = category.id === activeCategoryId;
              const defaultProductId = category.products[0]?.id;
              if (!defaultProductId) return null;

              return (
                <Link
                  key={category.id}
                  href={buildHref(category.id, defaultProductId)}
                  scroll={false}
                  className={[
                    "pb-2 text-sm font-medium transition-colors",
                    isActive
                      ? "border-b-2 border-primary text-primary"
                      : "border-b-2 border-transparent text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {category.label}
                </Link>
              );
            })}
          </nav>
        )}

        {canToggleDual && categories.length > 0 && (
          <div className="sticky top-16 z-20 -mx-4 px-4 py-2 bg-background/70 backdrop-blur border-b border-border/60">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                País
              </p>
              <Tabs
                value={isDualMode ? "dual" : "single"}
                onValueChange={(v) => {
                  const next = v === "dual" ? "dual" : "single";
                  if (isPending) return;
                  handleToggle(next);
                }}
              >
                <TabsList className="h-9 bg-muted/40">
                  <TabsTrigger
                    value="single"
                    disabled={isPending}
                    className="px-3 text-xs"
                  >
                    Solo {formatCountry(country)}
                  </TabsTrigger>
                  <TabsTrigger
                    value="dual"
                    disabled={isPending}
                    className="px-3 text-xs"
                  >
                    {formatCountry(country)} + {formatCountry(dualOther!)}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <div>
            {doc?.meta.title && (
              <h2 className="text-lg font-semibold tracking-tight">
                {doc.meta.title}
              </h2>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {renderCountries.map((sectionCountry) => {
            const sectionDoc = docByCountry[sectionCountry] ?? doc;

            return (
              <motion.div
                key={`${sectionCountry}-${activeProductId ?? "none"}`}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="grid min-w-0 gap-4 lg:grid-cols-2"
              >
                <Card className="min-w-0 bg-card/90 shadow-card-hover">
                  <CardHeader className="flex flex-col gap-3 space-y-0 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <CardTitle className="min-w-0 shrink text-lg font-semibold tracking-tight">
                      {sectionDoc?.meta.title || "Detalles del producto"}
                    </CardTitle>
                    {sectionDoc?.meta.method && sectionDoc?.meta.endpoint && (
                      <div className="flex min-w-0 shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                          {sectionDoc.meta.method}
                        </span>
                        <code className="max-w-full break-all rounded bg-muted px-2 py-1 text-xs font-mono text-muted-foreground">
                          {sectionDoc.meta.endpoint}
                        </code>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0 space-y-5 text-sm text-muted-foreground">
                    {sectionDoc ? (
                      <>
                        <p className="leading-relaxed">{sectionDoc.description}</p>

                        <Alert className="border-primary/20 bg-primary/5">
                          <AlertDescription className="text-xs">
                            <span className="font-semibold text-foreground">
                              Caso de uso:
                            </span>{" "}
                            <span className="text-muted-foreground">
                              {sectionDoc.useCase}
                            </span>
                          </AlertDescription>
                        </Alert>

                        <div className="min-w-0">
                          <h3 className="mb-3 text-sm font-bold text-foreground">
                            Parámetros
                          </h3>
                          {sectionDoc.params.length > 0 ? (
                            <>
                              <div className="space-y-3 sm:hidden">
                                {sectionDoc.params.map((p) => (
                                  <div
                                    key={p.name}
                                    className="rounded-xl border border-border bg-card/50 px-3 py-3"
                                  >
                                    <div className="flex flex-wrap items-center gap-2">
                                      <code className="break-all font-mono text-xs text-primary">
                                        {p.name}
                                      </code>
                                      <Badge
                                        variant="secondary"
                                        className="text-xs font-normal dark:bg-primary/55 dark:text-primary-foreground dark:border-transparent"
                                      >
                                        {p.type}
                                      </Badge>
                                      <span className="text-[10px] font-semibold uppercase text-muted-foreground">
                                        {p.required ? (
                                          <span className="text-secondary dark:text-primary-subtle">
                                            Req.: Sí
                                          </span>
                                        ) : (
                                          <span>Req.: No</span>
                                        )}
                                      </span>
                                    </div>
                                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                      {p.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="hidden min-w-0 overflow-x-auto rounded-xl border border-border sm:block">
                                <Table className="min-w-0">
                                  <TableHeader>
                                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                                      <TableHead className="text-xs font-semibold">
                                        Nombre
                                      </TableHead>
                                      <TableHead className="text-xs font-semibold">
                                        Tipo
                                      </TableHead>
                                      <TableHead className="w-16 text-xs font-semibold">
                                        Req.
                                      </TableHead>
                                      <TableHead className="text-xs font-semibold">
                                        Descripción
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {sectionDoc.params.map((p) => (
                                      <TableRow key={p.name}>
                                        <TableCell>
                                          <code className="font-mono text-xs text-primary">
                                            {p.name}
                                          </code>
                                        </TableCell>
                                        <TableCell>
                                          <Badge
                                            variant="secondary"
                                            className="text-xs font-normal dark:bg-primary/55 dark:text-primary-foreground dark:border-transparent"
                                          >
                                            {p.type}
                                          </Badge>
                                        </TableCell>
                                        <TableCell>
                                          {p.required ? (
                                            <span className="text-xs font-semibold text-secondary dark:text-primary-subtle">
                                              Sí
                                            </span>
                                          ) : (
                                            <span className="text-xs text-muted-foreground dark:text-foreground/70">
                                              No
                                            </span>
                                          )}
                                        </TableCell>
                                        <TableCell className="break-words text-xs text-muted-foreground">
                                          {p.description}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              Este endpoint no requiere parámetros adicionales.
                            </p>
                          )}
                        </div>

                        <div>
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="gap-1.5 text-xs text-muted-foreground hover:text-primary"
                          >
                            <a
                              href="https://documenter.getpostman.com/view/24590790/2s8YsnYwsc#ee38b174-d09d-4d43-bc1c-cfee26527c93"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink size={12} /> Ver en Postman collection
                            </a>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <p className="leading-relaxed">
                        Selecciona un producto para ver los detalles de su
                        implementación.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <div className="min-w-0">
                  <SandboxPanel
                    method={sectionDoc?.meta.method ?? ""}
                    endpoint={sectionDoc?.meta.endpoint ?? ""}
                    snippets={sectionDoc?.snippets ?? null}
                    responseExample={sectionDoc?.responseExample ?? null}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
        </main>
      </div>
    </div>
  );
}

