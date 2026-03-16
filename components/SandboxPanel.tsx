"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { Copy, Check, Play } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSandbox } from "@/lib/queries/useSandbox";

type Props = {
  method: string;
  endpoint: string;
  // Reservado para cuando agreguemos snippets reales
  snippets?: {
    curl?: string;
    javascript?: string;
    python?: string;
  } | null;
  responseExample?: string | null;
  footer?: ReactNode;
};

export default function SandboxPanel({
  method,
  endpoint,
  snippets,
  responseExample,
  footer,
}: Props) {
  const mutation = useSandbox();
  const { mutateAsync, data, error, status } = mutation;
  const [bodyRaw, setBodyRaw] = useState<string>("");
  const [bodyError, setBodyError] = useState<string | null>(null);
  const [bodyFormat, setBodyFormat] = useState<BodyFormat>("text");

  function inferBodyFormat(value: string): BodyFormat {
    const trimmed = value.trim();
    if (!trimmed) return "text";
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "json";
    if (trimmed.includes("&") && trimmed.includes("=")) return "query";
    const lines = trimmed.split("\n");
    if (lines.every((ln) => !ln.trim() || ln.includes(":"))) return "headers";
    return "text";
  }

  function validateBody(value: string, format: BodyFormat): string | null {
    if (!value.trim()) return null;

    if (format === "json") {
      try {
        JSON.parse(value);
      } catch {
        return "El cuerpo no es un JSON válido.";
      }
    }

    if (format === "query") {
      const pairs = value
        .split("&")
        .flatMap((segment) => segment.split("\n"))
        .map((p) => p.trim())
        .filter(Boolean);
      const invalid = pairs.find((p) => !p.includes("=") || !p.split("=")[0]);
      if (invalid) {
        return "Query string inválido. Usá formato clave=valor&otra=valor.";
      }
    }

    if (format === "headers") {
      const lines = value.split("\n");
      const invalid = lines.find((ln) => {
        const trimmed = ln.trim();
        if (!trimmed) return false;
        const idx = trimmed.indexOf(":");
        return idx <= 0;
      });
      if (invalid) {
        return "Formato de headers inválido. Usá \"Header-Name: valor\" por línea.";
      }
    }

    return null;
  }

  const handleCopy = () => {
    const code =
      snippets?.curl || snippets?.javascript || snippets?.python || "";

    if (!code) return;

    void navigator.clipboard.writeText(code);
  };

  const handleTry = async () => {
    if (!method || !endpoint) return;

    const format = inferBodyFormat(bodyRaw);
    const validationError = validateBody(bodyRaw, format);
    setBodyFormat(format);
    setBodyError(validationError);

    if (validationError) return;

    try {
      await mutateAsync({
        method,
        endpoint,
        bodyRaw,
        bodyFormat: format,
      });
    } catch {
      // el mensaje de error se muestra en el panel de response
    }
  };

  const isPending = status === "pending";
  const isError = status === "error";

  const effectiveResponse =
    (data?.mockResponse && JSON.stringify(data.mockResponse, null, 2)) ||
    responseExample ||
    `{\n  "status": "success",\n  "message": "Ejemplo de respuesta mock para pruebas de integración."\n}`;

  const errorMessage =
    error instanceof Error ? error.message : typeof error === "string" ? error : null;

  return (
    <Card className="flex h-full flex-col border border-border/40 bg-card shadow-card-hover">
      <CardHeader className="space-y-2 border-b border-border/40 pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
            Sandbox
          </CardTitle>
          <Button
            variant="secondary"
            size="sm"
            className="h-7 px-2 text-[11px]"
            disabled={isPending || !method || !endpoint}
            onClick={handleTry}
          >
            <Play className="mr-1 h-3 w-3" />
            {isPending ? "Probando..." : "Probar"}
          </Button>
        </div>
        {method && endpoint && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-secondary/20 px-2 py-0.5 font-semibold uppercase tracking-wide text-secondary-foreground">
              {method}
            </span>
            <code className="rounded bg-muted px-2 py-1 font-mono text-muted-foreground">
              {endpoint}
            </code>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Request</p>
          <RequestCodeBlock
            snippets={snippets ?? {}}
            defaultLang={snippets?.curl ? "curl" : "javascript"}
            title={method && endpoint ? `${method} ${endpoint}` : undefined}
            bodyRaw={bodyRaw}
            bodyFormat={bodyFormat}
            onBodyChange={(value) => {
              setBodyRaw(value);
              const format = inferBodyFormat(value);
              setBodyFormat(format);
              setBodyError(validateBody(value, format));
            }}
          />
          {bodyError && (
            <p className="text-[11px] text-destructive">{bodyError}</p>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground">Response</p>
          <div className="overflow-hidden rounded-xl border border-border bg-hero-bg">
            <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span
                  className={[
                    "h-2 w-2 rounded-full",
                    isPending
                      ? "bg-secondary animate-pulse"
                      : isError
                        ? "bg-destructive"
                        : "bg-secondary",
                  ].join(" ")}
                />
                <span className="text-xs font-semibold">
                  {isPending ? "Ejecutando..." : isError ? "Error" : "200 OK"}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">application/json</span>
            </div>
            <div className="code-scroll overflow-x-auto">
              {isPending ? (
                <div className="p-4 text-xs leading-relaxed text-muted-foreground">
                  <div className="h-3 w-3/4 animate-pulse rounded bg-muted/60" />
                  <div className="mt-2 h-3 w-full animate-pulse rounded bg-muted/40" />
                  <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-muted/40" />
                </div>
              ) : (
                <pre className="p-4 text-xs leading-relaxed text-primary-subtle">
                  <code>
                    {isError && errorMessage
                      ? `{\n  "status": "error",\n  "message": "${errorMessage}"\n}`
                      : effectiveResponse}
                  </code>
                </pre>
              )}
            </div>
          </div>
        </div>

        {footer && <div className="pt-1 text-xs text-muted-foreground">{footer}</div>}
      </CardContent>
    </Card>
  );
}

type Language = "curl" | "javascript" | "python";

type RequestCodeSnippets = {
  curl?: string;
  javascript?: string;
  python?: string;
};

type BodyFormat = "json" | "query" | "headers" | "text";

type RequestCodeBlockProps = {
  snippets: RequestCodeSnippets;
  defaultLang?: Language;
  title?: string;
  bodyRaw: string;
  bodyFormat: BodyFormat;
  onBodyChange: (value: string) => void;
};

const LANG_LABELS: Record<Language, string> = {
  curl: "cURL",
  javascript: "JavaScript",
  python: "Python",
};

function RequestCodeBlock({
  snippets,
  defaultLang = "curl",
  title,
  bodyRaw,
  bodyFormat,
  onBodyChange,
}: RequestCodeBlockProps) {
  const available = (Object.keys(snippets) as Language[]).filter(
    (k) => snippets[k],
  );

  if (available.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-hero-bg">
        <div className="flex items-center justify-between border-b border-border/30 bg-hero-bg px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive/60" />
              <span className="h-3 w-3 rounded-full bg-secondary/40" />
              <span className="h-3 w-3 rounded-full bg-primary-muted-color/60" />
            </div>
            {title && (
              <span className="text-xs text-muted-foreground">{title}</span>
            )}
          </div>
        </div>
        <div className="code-scroll overflow-x-auto">
          <pre className="p-4 text-xs leading-relaxed text-primary-subtle">
            <code>
              {`# Próximamente\n# Ejemplo de petición para este endpoint.`}
            </code>
          </pre>
        </div>
      </div>
    );
  }

  const initialLang = available.includes(defaultLang) ? defaultLang : available[0];
  const [copied, setCopied] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(initialLang);

  const code = snippets[currentLang] || "";
  const displayValue = bodyRaw || code || "";

  const onCopyClick = () => {
    if (!code) return;
    void navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-hero-bg">
      <Tabs
        defaultValue={initialLang}
        onValueChange={(v) => setCurrentLang(v as Language)}
      >
        <div className="flex items-center justify-between border-b border-border/30 bg-hero-bg px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive/60" />
              <span className="h-3 w-3 rounded-full bg-secondary/40" />
              <span className="h-3 w-3 rounded-full bg-primary-muted-color/60" />
            </div>
            {title && (
              <span className="text-xs text-muted-foreground">{title}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <TabsList className="h-7 gap-0 bg-hero-bg/60 border border-border/30 p-0.5">
              {available.map((lang) => (
                <TabsTrigger
                  key={lang}
                  value={lang}
                  className="h-6 rounded px-2 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground"
                >
                  {LANG_LABELS[lang]}
                </TabsTrigger>
              ))}
            </TabsList>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:bg-primary/20 hover:text-secondary"
              onClick={onCopyClick}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-secondary" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>

        {available.map((lang) => (
          <TabsContent key={lang} value={lang} className="m-0">
            <div className="code-scroll overflow-x-auto">
              <textarea
                value={displayValue}
                onChange={(e) => onBodyChange(e.target.value)}
                className="w-full border-0 bg-transparent p-4 font-mono text-xs leading-relaxed text-primary-subtle outline-none resize-none min-h-[140px]"
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
