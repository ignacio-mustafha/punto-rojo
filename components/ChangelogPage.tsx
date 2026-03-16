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
  payments: { icon: CreditCard, bg: "bg-secondary/10", color: "text-secondary" },
  data: { icon: BarChart3, bg: "bg-accent", color: "text-accent-foreground" },
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

      {/* Tabs bar */}
      <div className="sticky top-16 z-40 border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs value={activeId} onValueChange={setActiveId}>
            <TabsList className="h-11 gap-1 rounded-none border-b-0 bg-transparent p-0">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="rounded-none border-b-2 border-transparent px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Version timeline */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeCategory && (
          <>
            <div className="mb-6 flex items-center gap-3">
              <div
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconMeta.bg}`}
              >
                <Icon size={20} className={iconMeta.color} />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                {activeCategory.name}
              </h2>
            </div>

            <div className="space-y-4 border-l-2 border-border pl-6 ml-5">
              {activeCategory.versions.map((entry) => (
                <div key={entry.version} className="relative">
                  <div className="absolute -left-[calc(1.5rem+5px)] top-6 h-2.5 w-2.5 rounded-full border-2 border-border bg-background" />
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
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-1 flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-bold text-foreground">{entry.version}</h3>
          <TagBadge tag={entry.tag} />
          <span className="text-xs text-muted-foreground">{entry.date}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
                    className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                  >
                    <CheckCircle2
                      size={12}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    {item}
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
                    className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                  >
                    <CheckCircle2
                      size={12}
                      className="mt-0.5 shrink-0 text-secondary"
                    />
                    {item}
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
                    className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                  >
                    <AlertTriangle
                      size={12}
                      className="mt-0.5 shrink-0 text-destructive"
                    />
                    {item}
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

