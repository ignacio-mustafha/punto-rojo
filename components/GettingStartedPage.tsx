"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import CodeBlock from "@/components/CodeBlock";
import type {
  OnboardingData,
  OnboardingStep,
  VersionSummary,
} from "@/lib/mocks/onboarding.mock";
import { useOnboardingSteps } from "@/lib/queries/useOnboardingSteps";

type Props = {
  initialData: OnboardingData;
  locale: string;
  country: string | null;
};

type BuiltStep = OnboardingStep & {
  content: React.ReactNode;
};

export default function GettingStartedPage({
  initialData,
  locale,
  country,
}: Props) {
  const t = useTranslations("gettingStarted");

  const steps = useMemo(
    () =>
      buildSteps(
        initialData.steps,
        initialData.countries,
        initialData.versionsSummary,
        initialData.snippets
      ),
    [initialData]
  );

  const stepIds = steps.map((s) => s.id);

  const { completed, toggleComplete, progress, isUpdating } = useOnboardingSteps(
    locale,
    country,
    stepIds
  );

  const [activeStep, setActiveStep] = useState<string>(steps[0]?.id ?? "");

  const activeData = steps.find((s) => s.id === activeStep) ?? steps[0] ?? null;
  const activeIndex = activeData ? steps.findIndex((s) => s.id === activeData.id) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t("header.badge")}
          </p>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {t("header.title")}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {t("header.subtitle")}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Progress value={progress} className="h-2 max-w-xs" />
            <span className="text-xs text-muted-foreground">
              {completed.length}/{steps.length} {t("progress.label")}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* ── SIDEBAR (Desktop) ── */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <Card className="sticky top-24">
              <CardHeader className="px-4 pb-3 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("sidebar.title")}
                </p>
              </CardHeader>
              <CardContent className="px-3 pb-4 pt-0">
                <nav className="space-y-0.5">
                  {steps.map((step, i) => {
                    const isDone = completed.includes(step.id);
                    const isActive = activeStep === step.id;
                    return (
                      <button
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 size={16} className="shrink-0 text-secondary" />
                        ) : (
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                              isActive
                                ? "border-primary text-primary"
                                : "border-muted-foreground text-muted-foreground"
                            }`}
                          >
                            {i + 1}
                          </span>
                        )}
                        <span className={isDone ? "line-through opacity-70" : undefined}>
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </nav>

                {completed.length === steps.length && (
                  <>
                    <Separator className="my-3" />
                    <div className="rounded-lg bg-secondary/10 p-3 text-center">
                      <p className="text-xs font-bold text-secondary">
                        {t("completedBanner.title")}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t("completedBanner.subtitle")}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* ── MAIN CONTENT (Desktop) ── */}
          <main className="hidden flex-1 lg:block">
            <Card>
              <CardContent className="p-6">
                {activeData && (
                  <>
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Paso {activeIndex + 1} de {steps.length}
                          </span>
                          {completed.includes(activeData.id) && (
                            <Badge
                              variant="outline"
                              className="flex h-5 items-center gap-1 border-secondary/30 bg-secondary/10 text-xs text-secondary"
                            >
                              <CheckCircle2 size={10} /> Completado
                            </Badge>
                          )}
                        </div>
                        <h2 className="text-lg font-bold text-foreground">{activeData.title}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {activeData.description}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleComplete(activeData.id)}
                        disabled={isUpdating}
                        className={`shrink-0 text-xs ${
                          completed.includes(activeData.id)
                            ? "border-secondary/40 bg-secondary/10 text-secondary hover:bg-secondary/20"
                            : "border-primary text-primary hover:bg-primary/10"
                        }`}
                      >
                        {completed.includes(activeData.id)
                          ? t("buttons.undo")
                          : t("buttons.markCompleted")}
                      </Button>
                    </div>

                    {activeData.content}

                    <Separator className="my-4 mt-6" />
                    <div className="flex items-center justify-between">
                      <a
                        href={activeData.helpUrl}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                      >
                        <HelpCircle size={14} /> {t("help")}
                      </a>
                      <div className="flex items-center gap-2">
                        {activeIndex > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => setActiveStep(steps[activeIndex - 1].id)}
                          >
                            {t("buttons.prev")}
                          </Button>
                        )}
                        {activeIndex < steps.length - 1 && (
                          <Button
                            size="sm"
                            className="bg-primary text-primary-foreground text-xs hover:bg-primary-hover"
                            onClick={() => {
                              if (!completed.includes(activeData.id)) {
                                toggleComplete(activeData.id);
                              }
                              setActiveStep(steps[activeIndex + 1].id);
                            }}
                          >
                            {t("buttons.next")}
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </main>

          {/* ── MOBILE: Accordion ── */}
          <div className="flex-1 lg:hidden">
            <Accordion type="single" collapsible defaultValue={steps[0]?.id} className="space-y-2">
              {steps.map((step, i) => {
                const isDone = completed.includes(step.id);
                return (
                  <AccordionItem
                    key={step.id}
                    value={step.id}
                    className="overflow-hidden rounded-xl border border-border bg-card px-0"
                  >
                    <AccordionTrigger className="px-4 py-4 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        {isDone ? (
                          <CheckCircle2 size={18} className="shrink-0 text-secondary" />
                        ) : (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-muted-foreground text-xs font-bold text-muted-foreground">
                            {i + 1}
                          </span>
                        )}
                        <span
                          className={`text-sm font-semibold ${
                            isDone ? "line-through text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-0">
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      {step.content && <div className="mt-3">{step.content}</div>}
                      <div className="mt-4 flex items-center justify-between">
                        <a
                          href={step.helpUrl}
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                        >
                          <HelpCircle size={12} /> {t("help")}
                        </a>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleComplete(step.id)}
                          disabled={isUpdating}
                          className={`min-h-[44px] text-xs sm:min-h-9 ${
                            isDone
                              ? "border-secondary/40 text-secondary hover:bg-secondary/10"
                              : "border-primary text-primary hover:bg-primary/10"
                          }`}
                        >
                          {isDone ? t("buttons.undo") : t("buttons.markCompleted")}
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

function buildSteps(
  baseSteps: OnboardingStep[],
  countries: string[],
  versions: VersionSummary[],
  snippets: OnboardingData["snippets"]
): BuiltStep[] {
  const [authStep, firstTxStep, versionsStep] = [
    baseSteps.find((s) => s.id === "auth"),
    baseSteps.find((s) => s.id === "transaction"),
    baseSteps.find((s) => s.id === "versions"),
  ];

  return baseSteps.map((step) => {
    if (step.id === "country") {
      return {
        ...step,
        content: (
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {countries.map((c) => (
              <div
                key={c}
                className="rounded-md border border-border bg-card px-3 py-2 text-xs text-foreground"
              >
                {c}
              </div>
            ))}
            <div className="col-span-2 rounded-md border border-dashed border-border px-3 py-2 text-xs text-muted-foreground sm:col-span-4">
              + 27 países más disponibles
            </div>
          </div>
        ),
      };
    }

    if (step.id === "auth" && authStep) {
      return {
        ...step,
        content: (
          <div className="mt-4">
            <CodeBlock snippets={snippets.auth} defaultLang="curl" title="auth/token" />
          </div>
        ),
      };
    }

    if (step.id === "transaction" && firstTxStep) {
      return {
        ...step,
        content: (
          <div className="mt-4 space-y-3">
            <Alert className="border-secondary/30 bg-secondary/5">
              <AlertDescription className="flex items-center gap-2 text-xs">
                <Badge
                  variant="outline"
                  className="h-4 gap-1 border-secondary/30 bg-secondary/10 text-xs text-secondary"
                >
                  {/* Texto estático por ahora; si queremos localizar aquí también,
                  habría que pasar la función de traducción o pre-resolver el texto
                  antes de llamar a buildSteps. */}
                  Sandbox environment
                </Badge>
                <span className="text-muted-foreground">
                  Transacciones de prueba — sin cargos reales
                </span>
              </AlertDescription>
            </Alert>
            <CodeBlock
              snippets={snippets.firstTransaction}
              defaultLang="curl"
              title="POST /v2/recharges"
            />
          </div>
        ),
      };
    }

    if (step.id === "versions" && versionsStep) {
      return {
        ...step,
        content: (
          <div className="mt-4 space-y-2">
            {versions.map((v) => (
              <Card key={v.version} className="border-border">
                <CardContent className="p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{v.version}</span>
                    <Badge
                      variant={v.tag === "latest" ? "default" : "secondary"}
                      className={`h-4 px-1.5 py-0 text-xs ${
                        v.tag === "latest"
                          ? "border-secondary/30 bg-secondary/10 text-secondary"
                          : ""
                      }`}
                    >
                      {v.tag}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{v.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ),
      };
    }

    // Paso genérico sin contenido especial
    return {
      ...step,
      content: null,
    };
  });
}
