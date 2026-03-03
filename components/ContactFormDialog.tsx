"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SECTORES = [
  "Fintech",
  "Banca",
  "Telecomunicaciones",
  "Retail",
  "Seguros",
  "Gobierno",
  "Tecnología",
  "Otro",
];

const PAISES = [
  "Colombia",
  "México",
  "Perú",
  "Argentina",
  "Chile",
  "Ecuador",
  "Guatemala",
  "Panamá",
];

const REGIONES: Record<string, string[]> = {
  Colombia: ["Bogotá D.C.", "Antioquia", "Valle del Cauca", "Atlántico", "Santander", "Otra"],
  México: ["Ciudad de México", "Jalisco", "Nuevo León", "Puebla", "Otra"],
  Perú: ["Lima", "Arequipa", "La Libertad", "Cusco", "Otra"],
  Argentina: ["Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Otra"],
  Chile: ["Región Metropolitana", "Valparaíso", "Biobío", "Otra"],
  Ecuador: ["Pichincha", "Guayas", "Azuay", "Otra"],
  Guatemala: ["Guatemala", "Quetzaltenango", "Otra"],
  Panamá: ["Panamá", "Colón", "Chiriquí", "Otra"],
};

interface ContactFormDialogProps {
  trigger: React.ReactNode;
}

export default function ContactFormDialog({ trigger }: ContactFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [pais, setPais] = useState("");
  const [acepta, setAcepta] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Solicitar información</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
          className="grid gap-4 pt-2"
        >
          <div className="grid gap-1.5">
            <Label htmlFor="cf-email">Correo corporativo</Label>
            <Input id="cf-email" type="email" required placeholder="nombre@empresa.com" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="cf-nombre">Nombre</Label>
              <Input id="cf-nombre" required />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cf-apellido">Apellido</Label>
              <Input id="cf-apellido" required />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="cf-tel">Número de teléfono</Label>
            <Input id="cf-tel" type="tel" required />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="cf-cargo">Cargo</Label>
            <Input id="cf-cargo" required />
          </div>

          <div className="grid gap-1.5">
            <Label>Sector de tu empresa</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un sector" />
              </SelectTrigger>
              <SelectContent>
                {SECTORES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label>País</Label>
            <Select required onValueChange={(v) => setPais(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un país" />
              </SelectTrigger>
              <SelectContent>
                {PAISES.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label>Región</Label>
            <Select required disabled={!pais}>
              <SelectTrigger>
                <SelectValue
                  placeholder={pais ? "Selecciona una región" : "Selecciona un país primero"}
                />
              </SelectTrigger>
              <SelectContent>
                {(REGIONES[pais] || []).map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="cf-msg">
              Déjanos saber en qué podemos ayudarte y uno de nuestros expertos se pondrá en
              contacto contigo para ofrecerte la mejor solución para tu negocio.
            </Label>
            <Textarea id="cf-msg" rows={3} />
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Puntored se compromete a proteger y respetar tu privacidad, y solo usaremos tu
            información personal para administrar tu cuenta y proporcionar los productos y
            servicios que nos solicitaste.
          </p>

          <div className="flex items-start gap-2">
            <Checkbox
              id="cf-acepta"
              checked={acepta}
              onCheckedChange={(v) => setAcepta(v === true)}
            />
            <Label htmlFor="cf-acepta" className="text-xs leading-relaxed font-normal cursor-pointer">
              Acepto recibir otras comunicaciones de Puntored.
            </Label>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Al hacer clic en Enviar, aceptas que Puntored almacene y procese la información personal
            suministrada para proporcionarte el contenido solicitado.
          </p>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary-hover"
          >
            Enviar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

