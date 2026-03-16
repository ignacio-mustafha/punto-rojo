"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { ExternalLink } from "lucide-react";

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
  locale: string;
  doc: ProductDocResponse | null;
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
  locale,
  doc,
}: Props) {
  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) ?? null;

  const buildHref = (categoryId: string, productId: string) => {
    const params = new URLSearchParams();
    params.set("country", country);
    params.set("category", categoryId);
    params.set("product", productId);

    return `/${locale}/products?${params.toString()}`;
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <aside className="hidden w-64 shrink-0 border-r border-border pr-4 sm:block">
        <h1 className="mb-4 text-base font-semibold tracking-tight">
          Productos
        </h1>

        {categories.length === 0 || !activeCategory ? (
          <p className="text-sm text-muted-foreground">
            Sin productos disponibles para este país.
          </p>
        ) : (
          <div className="space-y-4">
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
          </div>
        )}
      </aside>

      <main className="flex-1 space-y-4">
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

        <div className="flex items-center justify-between gap-3 pt-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {country} · {locale}
            </p>
            {doc?.meta.title && (
              <h2 className="text-lg font-semibold tracking-tight">
                {doc.meta.title}
              </h2>
            )}
          </div>
        </div>

        <motion.div
          key={`${country}-${activeProductId ?? "none"}`}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="grid gap-4 lg:grid-cols-2"
        >
          <Card className="bg-card/90 shadow-card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold tracking-tight">
                {doc?.meta.title || "Detalles del producto"}
              </CardTitle>
              {doc?.meta.method && doc?.meta.endpoint && (
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {doc.meta.method}
                  </span>
                  <code className="rounded bg-muted px-2 py-1 text-xs font-mono text-muted-foreground">
                    {doc.meta.endpoint}
                  </code>
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-0 space-y-5 text-sm text-muted-foreground">
              {doc ? (
                <>
                  <p className="leading-relaxed">{doc.description}</p>

                  <Alert className="border-primary/20 bg-primary/5">
                    <AlertDescription className="text-xs">
                      <span className="font-semibold text-foreground">
                        Caso de uso:
                      </span>{" "}
                      <span className="text-muted-foreground">
                        {doc.useCase}
                      </span>
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h3 className="mb-3 text-sm font-bold text-foreground">
                      Parámetros
                    </h3>
                    {doc.params.length > 0 ? (
                      <div className="overflow-hidden rounded-xl border border-border">
                        <Table>
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
                            {doc.params.map((p) => (
                              <TableRow key={p.name}>
                                <TableCell>
                                  <code className="font-mono text-xs text-primary">
                                    {p.name}
                                  </code>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs font-normal"
                                  >
                                    {p.type}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {p.required ? (
                                    <span className="text-xs font-semibold text-secondary">
                                      Sí
                                    </span>
                                  ) : (
                                    <span className="text-xs text-muted-foreground">
                                      No
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                  {p.description}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
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

          <SandboxPanel
            method={doc?.meta.method ?? ""}
            endpoint={doc?.meta.endpoint ?? ""}
            snippets={doc?.snippets ?? null}
            responseExample={doc?.responseExample ?? null}
          />
        </motion.div>
      </main>
    </div>
  );
}

