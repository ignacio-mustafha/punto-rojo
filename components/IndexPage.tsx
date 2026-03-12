"use client";

import Link from "next/link";
import {
  ArrowRight,
  Smartphone,
  CreditCard,
  BarChart3,
  Globe,
  Zap,
  Shield,
  ChevronRight,
} from "lucide-react";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const AUTH_CODE = `curl -X POST https://api.puntored.co/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "your_client_id",
    "client_secret": "your_secret",
    "grant_type": "client_credentials",
    "country": "CO"
  }'

# Response
{
  "access_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "api:read api:write"
}`;

export default function IndexPage() {
  const t = useTranslations("index");

  const capabilities = [
    {
      icon: Smartphone,
      title: t("capabilities.prepaid.title"),
      description: t("capabilities.prepaid.description"),
      endpoints: 12,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      path: "/products?tab=prepaid",
    },
    {
      icon: CreditCard,
      title: t("capabilities.payments.title"),
      description: t("capabilities.payments.description"),
      endpoints: 18,
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
      path: "/products?tab=payments",
    },
    {
      icon: BarChart3,
      title: t("capabilities.data.title"),
      description: t("capabilities.data.description"),
      endpoints: 8,
      iconBg: "bg-accent",
      iconColor: "text-accent-foreground",
      path: "/products?tab=data",
    },
  ] as const;

  const stats = [
    { num: t("stats.countries.value"), label: t("stats.countries.label") },
    { num: t("stats.products.value"), label: t("stats.products.label") },
    { num: t("stats.services.value"), label: t("stats.services.label") },
    { num: t("stats.categories.value"), label: t("stats.categories.label") },
  ] as const;

  const steps = [
    {
      num: "01",
      title: t("steps.items.1.title"),
      desc: t("steps.items.1.description"),
    },
    {
      num: "02",
      title: t("steps.items.2.title"),
      desc: t("steps.items.2.description"),
    },
  ] as const;

  const whyItems = [
    { icon: Globe, title: t("why.items.latam.title"), desc: t("why.items.latam.description") },
    {
      icon: Zap,
      title: t("why.items.timeToMarket.title"),
      desc: t("why.items.timeToMarket.description"),
    },
    {
      icon: Shield,
      title: t("why.items.security.title"),
      desc: t("why.items.security.description"),
    },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-hero-bg">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="animate-fade-in">
              <Badge
                variant="outline"
                className="mb-6 text-xs font-bold px-2 py-0.5 bg-accent text-accent-foreground hover:bg-accent border-accent-foreground/20"
              >
                {t("hero.badge")}
              </Badge>
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {t("hero.title")}
                <br />
                <span className="text-[#e2127e]">{t("hero.highlight")}</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed max-w-lg text-white">
                {t("hero.subtitle")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground font-bold hover:bg-primary-hover hover:shadow-primary-glow gap-2"
                >
                  <Link href="/getting-started">
                    {t("hero.primaryCta")} <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="shrink-0 text-xs border-primary text-primary hover:bg-primary/10 hover:text-white"
                >
                  <Link href="/products">{t("hero.secondaryCta")}</Link>
                </Button>
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in">
              <div className="overflow-hidden rounded-2xl border border-primary/30 bg-hero-bg/80 shadow-primary-glow">
                <div className="flex items-center gap-2 border-b border-border/20 bg-hero-bg px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-destructive/60" />
                  <span className="h-3 w-3 rounded-full bg-secondary/40" />
                  <span className="h-3 w-3 rounded-full bg-primary-muted-color/60" />
                  <span className="ml-2 text-xs text-muted-foreground">authentication.sh</span>
                </div>
                <pre className="code-scroll overflow-x-auto p-5 text-xs leading-relaxed">
                  <code>
                    {AUTH_CODE.split("\n").map((line, i) => (
                      <div key={i}>
                        {line.startsWith("#") ? (
                          <span className="token-comment">{line}</span>
                        ) : line.includes('"') ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: line
                                .replace(
                                  /(\"([^\"]*)\")/g,
                                  '<span class="token-string">"$2"</span>'
                                )
                                .replace(
                                  /\b(true|false|null|Bearer|POST)\b/g,
                                  '<span class="token-keyword">$1</span>'
                                ),
                            }}
                          />
                        ) : (
                          <span className="token-key">{line}</span>
                        )}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="px-6 py-4 text-center">
                <p className="text-2xl font-bold text-primary">{s.num}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {t("capabilities.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
            {t("capabilities.description")}
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <Card
                key={cap.title}
                className="group min-w-72 flex flex-col transition-all hover:shadow-card-hover hover:-translate-y-0.5 sm:min-w-0"
              >
                <CardHeader className="pb-3">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${cap.iconBg} mb-3`}
                  >
                    <Icon size={22} className={cap.iconColor} />
                  </div>
                  <CardTitle className="text-base">{cap.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {cap.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto flex items-center justify-between pt-0">
                  <Badge variant="secondary" className="text-xs">
                    {cap.endpoints} {t("capabilities.endpointsLabel")}
                  </Badge>
                  <Button
                    asChild
                    variant="link"
                    className="h-auto p-0 text-xs font-semibold text-primary group-hover:text-primary/80"
                  >
                    <Link href={cap.path} className="flex items-center gap-1">
                      {t("capabilities.explore")} <ChevronRight size={14} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t("steps.title")}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{t("steps.subtitle")}</p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent sm:block" />

          {steps.map((step) => (
            <div key={step.num} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background">
                <span className="text-xl font-bold text-primary">{step.num}</span>
              </div>
              <h3 className="mt-4 text-sm font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            className="gap-2 bg-primary text-primary-foreground font-bold hover:bg-primary-hover hover:shadow-primary-glow px-8"
          >
            <Link href="/getting-started">
              {t("steps.primaryCta")} <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
