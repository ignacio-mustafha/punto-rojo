"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="h-8 w-8 border-border bg-muted text-muted-foreground hover:bg-accent"
      onClick={handleToggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <Sun className={`h-4 w-4 ${isDark ? "hidden" : "block"}`} />
      <Moon className={`h-4 w-4 ${isDark ? "block" : "hidden"}`} />
    </Button>
  );
}

