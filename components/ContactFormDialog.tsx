 "use client";

import { useState } from "react";
import { Controller } from "react-hook-form";

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
import { useContactForm, PAISES, REGIONES, SECTORES } from "@/hooks/useContactForm";

interface ContactFormDialogProps {
  trigger: React.ReactNode;
}

export default function ContactFormDialog({ trigger }: ContactFormDialogProps) {
  const [open, setOpen] = useState(false);
  const { form, handleSubmit, regiones } = useContactForm(() => {
    setOpen(false);
  });

  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Solicitar información</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 pt-2">
          <div className="grid gap-1.5">
            <Label htmlFor="cf-email">Correo corporativo</Label>
            <Input
              id="cf-email"
              type="email"
              placeholder="nombre@empresa.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message as string}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="cf-nombre">Nombre</Label>
              <Input id="cf-nombre" {...register("nombre")} />
              {errors.nombre && (
                <p className="text-xs text-red-500">{errors.nombre.message as string}</p>
              )}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cf-apellido">Apellido</Label>
              <Input id="cf-apellido" {...register("apellido")} />
              {errors.apellido && (
                <p className="text-xs text-red-500">{errors.apellido.message as string}</p>
              )}
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="cf-tel">Número de teléfono</Label>
            <Input id="cf-tel" type="tel" {...register("telefono")} />
            {errors.telefono && (
              <p className="text-xs text-red-500">{errors.telefono.message as string}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="cf-cargo">Cargo</Label>
            <Input id="cf-cargo" {...register("cargo")} />
            {errors.cargo && (
              <p className="text-xs text-red-500">{errors.cargo.message as string}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label>Sector de tu empresa</Label>
            <Controller
              control={control}
              name="sector"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
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
              )}
            />
            {errors.sector && (
              <p className="text-xs text-red-500">{errors.sector.message as string}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label>País</Label>
            <Controller
              control={control}
              name="pais"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
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
              )}
            />
            {errors.pais && (
              <p className="text-xs text-red-500">{errors.pais.message as string}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label>Región</Label>
            <Controller
              control={control}
              name="region"
              render={({ field }) => (
                <Select
                  disabled={!form.watch("pais")}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.watch("pais") ? "Selecciona una región" : "Selecciona un país primero"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {regiones.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.region && (
              <p className="text-xs text-red-500">{errors.region.message as string}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="cf-msg">
              Déjanos saber en qué podemos ayudarte y uno de nuestros expertos se pondrá en
              contacto contigo para ofrecerte la mejor solución para tu negocio.
            </Label>
            <Textarea id="cf-msg" rows={3} {...register("mensaje")} />
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Puntored se compromete a proteger y respetar tu privacidad, y solo usaremos tu
            información personal para administrar tu cuenta y proporcionar los productos y
            servicios que nos solicitaste.
          </p>

          <div className="flex items-start gap-2">
            <Controller
              control={control}
              name="aceptaComunicaciones"
              render={({ field }) => (
                <Checkbox
                  id="cf-acepta"
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(v === true)}
                />
              )}
            />
            <Label htmlFor="cf-acepta" className="text-xs leading-relaxed font-normal cursor-pointer">
              Acepto recibir otras comunicaciones de Puntored.
            </Label>
          </div>
          {errors.aceptaComunicaciones && (
            <p className="text-xs text-red-500">
              {errors.aceptaComunicaciones.message as string}
            </p>
          )}

          <p className="text-xs text-muted-foreground leading-relaxed">
            Al hacer clic en Enviar, aceptas que Puntored almacene y procese la información personal
            suministrada para proporcionarte el contenido solicitado.
          </p>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary-hover disabled:opacity-70"
          >
            Enviar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

