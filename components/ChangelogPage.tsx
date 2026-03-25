"use client";

import { useState } from "react";
import { AlertTriangle, Bug, CheckCircle2, Zap, Smartphone, CreditCard, BarChart3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ChangelogData, CategoryEntry, VersionEntry } from "@/lib/mocks/changelog.mock";

type Props = {
  data: ChangelogData;
  locale: string;
  country?: string | null;
};

const ICON_MAP: Record<string, { icon: React.ComponentType<any>; bg: string; color: string }> = {
  prepaid: { icon: Smartphone, bg: "bg-primary/10", color: "text-primary" },
  payments: { icon: CreditCard, bg: "bg-primary/10", color: "text-primary" },
  data: { icon: BarChart3, bg: "bg-primary/10", color: "text-primary" },
};

export default function ChangelogPage({ data }: Props) {
  const categories = data.categories;
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? "prepaid");

  const activeCategory: CategoryEntry | undefined = categories.find(
    (c) => c.id === activeId,
  );

  const iconMeta = ICON_MAP[activeCategory?.id ?? "prepaid"];
  const Icon = iconMeta.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Changelog
          </p>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Control de versiones
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Historial de cambios, mejoras y correcciones de la API de Puntored,
            organizado por categoría de producto.
          </p>
        </div>
      </div>

      {/* Categorías: selector apilado en mobile (sin scroll), pestañas clásicas en desktop */}
      <div className="sticky top-16 z-40 border-b border-border bg-card">
        <div className="mx-auto max-w-7xl min-w-0 px-4 py-3 sm:px-6 sm:py-0 lg:px-8">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:hidden">
            Categoría de producto
          </p>
          <Tabs value={activeId} onValueChange={setActiveId}>
            <TabsList className="flex h-auto w-full flex-col gap-1 rounded-xl border border-border/80 bg-muted/40 p-1.5 shadow-sm sm:h-11 sm:flex-row sm:items-stretch sm:justify-start sm:gap-1 sm:rounded-none sm:border-0 sm:border-transparent sm:bg-transparent sm:p-0 sm:shadow-none">
              {categories.map((cat) => {
                const meta = ICON_MAP[cat.id] ?? ICON_MAP.prepaid;
                const CatIcon = meta.icon;
                return (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="flex h-auto min-h-0 w-full items-center gap-3 rounded-lg border-2 border-transparent px-3 py-2 text-left text-sm font-semibold text-muted-foreground shadow-none transition-colors data-[state=active]:border-primary/40 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm sm:h-11 sm:w-auto sm:justify-center sm:rounded-none sm:border-0 sm:border-b-2 sm:border-transparent sm:bg-transparent sm:shadow-none data-[state=active]:sm:border-b-primary data-[state=active]:sm:bg-transparent data-[state=active]:sm:shadow-none sm:px-4 sm:py-2 sm:text-xs"
                  >
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:hidden ${meta.bg}`}
                    >
                      <CatIcon
                        className={`h-4 w-4 ${meta.color}`}
                        aria-hidden
                      />
                    </span>
                    <span className="min-w-0 flex-1 truncate sm:flex-none">
                      {cat.name}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Version timeline */}
      <div className="mx-auto min-w-0 max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {activeCategory && (
          <>
            <div className="mb-5 flex min-w-0 items-center gap-3 sm:mb-6">
              <div
                className={`hidden sm:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconMeta.bg}`}
              >
                <Icon
                  className={`h-5 w-5 ${iconMeta.color}`}
                  aria-hidden
                />
              </div>
              <h2 className="min-w-0 text-lg font-bold leading-snug text-foreground sm:text-xl">
                {activeCategory.name}
              </h2>
            </div>

            <div className="ml-2 space-y-4 border-l-2 border-border pl-4 sm:ml-5 sm:pl-6">
              {activeCategory.versions.map((entry) => (
                <div key={entry.version} className="relative">
                  <div className="absolute -left-[calc(1rem+5px)] top-6 h-2.5 w-2.5 rounded-full border-2 border-border bg-background sm:-left-[calc(1.5rem+5px)]" />
                  <VersionCard entry={entry} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TagBadge({ tag }: { tag: VersionEntry["tag"] }) {
  const styles = {
    latest: "bg-secondary/10 text-secondary border-secondary/30",
    stable: "bg-primary/10 text-primary border-primary/30",
    deprecated: "bg-destructive/10 text-destructive border-destructive/30",
  };
  const labels = {
    latest: "Última versión",
    stable: "Estable",
    deprecated: "Deprecada",
  };
  return (
    <Badge variant="outline" className={`text-xs font-bold ${styles[tag]}`}>
      {labels[tag]}
    </Badge>
  );
}

function VersionCard({ entry }: { entry: VersionEntry }) {
  return (
    <Card className="min-w-0 overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-1 flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <h3 className="min-w-0 break-words text-base font-bold text-foreground sm:text-lg">
            {entry.version}
          </h3>
          <TagBadge tag={entry.tag} />
          <span className="text-xs text-muted-foreground">{entry.date}</span>
        </div>
        <p className="mt-2 break-words text-sm leading-relaxed text-muted-foreground">
          {entry.summary}
        </p>

        <Separator className="my-5" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {entry.improvements.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Zap size={14} className="text-primary" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Mejoras
                </h4>
              </div>
              <ul className="space-y-2">
                {entry.improvements.map((item, i) => (
                  <li
                    key={i}
                    className="flex min-w-0 items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                  >
                    <CheckCircle2
                      size={12}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {entry.bugFixes.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Bug size={14} className="text-secondary" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Correcciones
                </h4>
              </div>
              <ul className="space-y-2">
                {entry.bugFixes.map((item, i) => (
                  <li
                    key={i}
                    className="flex min-w-0 items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                  >
                    <CheckCircle2
                      size={12}
                      className="mt-0.5 shrink-0 text-secondary"
                    />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {entry.breakingChanges && entry.breakingChanges.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle size={14} className="text-destructive" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Breaking changes
                </h4>
              </div>
              <ul className="space-y-2">
                {entry.breakingChanges.map((item, i) => (
                  <li
                    key={i}
                    className="flex min-w-0 items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                  >
                    <AlertTriangle
                      size={12}
                      className="mt-0.5 shrink-0 text-destructive"
                    />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

