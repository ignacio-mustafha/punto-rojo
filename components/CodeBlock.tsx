"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type Language = "curl" | "javascript" | "python" | "php";

type Snippets = Record<string, string>;

type Props = {
  snippets: Snippets;
  defaultLang?: Language;
  title?: string;
};

const LANG_LABELS: Record<Language, string> = {
  curl: "cURL",
  javascript: "JavaScript",
  python: "Python",
  php: "PHP",
};

export default function CodeBlock({
  snippets,
  defaultLang = "curl",
  title,
}: Props) {
  const available = (Object.keys(snippets) as Language[]).filter(
    (k) => snippets[k],
  );

  if (available.length === 0) {
    return null;
  }

  const initialLang = available.includes(defaultLang)
    ? defaultLang
    : available[0];

  const [currentLang, setCurrentLang] = useState<Language>(initialLang);
  const [copied, setCopied] = useState(false);

  const code = snippets[currentLang] || "";

  const handleCopy = () => {
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
              onClick={handleCopy}
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
              <pre className="p-4 text-xs leading-relaxed text-primary-subtle">
                <code>{snippets[lang]}</code>
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

