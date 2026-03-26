"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";

interface LoginDialogProps {
  trigger: React.ReactNode;
}

export default function LoginDialog({ trigger }: LoginDialogProps) {
  const { login } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("test.user@yopmail.com");
  const [password, setPassword] = useState("123password");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      setOpen(false);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Error al iniciar sesion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Iniciar sesion</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 pt-2">
          <div className="grid gap-1.5">
            <Label htmlFor="auth-email">Correo</Label>
            <Input
              id="auth-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="auth-password">Contrasena</Label>
            <Input
              id="auth-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error ? <p className="text-xs text-red-500">{error}</p> : null}

          <p className="text-xs text-muted-foreground">
            Usuario mock: test.user@yopmail.com / 123password
          </p>

          <Button type="submit" disabled={isSubmitting} className="w-full font-bold">
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
