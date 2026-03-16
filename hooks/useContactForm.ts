import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const SECTORES = [
  "Fintech",
  "Banca",
  "Telecomunicaciones",
  "Retail",
  "Seguros",
  "Gobierno",
  "Tecnología",
  "Otro",
] as const;

export const PAISES = [
  "Colombia",
  "México",
  "Perú",
  "Argentina",
  "Chile",
  "Ecuador",
  "Guatemala",
  "Panamá",
] as const;

export const REGIONES: Record<(typeof PAISES)[number], string[]> = {
  Colombia: ["Bogotá D.C.", "Antioquia", "Valle del Cauca", "Atlántico", "Santander", "Otra"],
  México: ["Ciudad de México", "Jalisco", "Nuevo León", "Puebla", "Otra"],
  Perú: ["Lima", "Arequipa", "La Libertad", "Cusco", "Otra"],
  Argentina: ["Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Otra"],
  Chile: ["Región Metropolitana", "Valparaíso", "Biobío", "Otra"],
  Ecuador: ["Pichincha", "Guayas", "Azuay", "Otra"],
  Guatemala: ["Guatemala", "Quetzaltenango", "Otra"],
  Panamá: ["Panamá", "Colón", "Chiriquí", "Otra"],
};

export const contactFormSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  nombre: z.string().min(1, "Campo obligatorio"),
  apellido: z.string().min(1, "Campo obligatorio"),
  telefono: z.string().min(1, "Campo obligatorio"),
  cargo: z.string().min(1, "Campo obligatorio"),
  sector: z.enum(SECTORES, { errorMap: () => ({ message: "Selecciona un sector" }) }),
  pais: z.enum(PAISES, { errorMap: () => ({ message: "Selecciona un país" }) }),
  region: z.string().min(1, "Selecciona una región"),
  mensaje: z.string().optional(),
  aceptaComunicaciones: z.boolean().refine((v) => v === true, {
    message: "Debes aceptar recibir comunicaciones",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function useContactForm(onSubmitted?: (values: ContactFormValues) => void) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      nombre: "",
      apellido: "",
      telefono: "",
      cargo: "",
      sector: undefined,
      pais: undefined,
      region: "",
      mensaje: "",
      aceptaComunicaciones: false,
    } as unknown as ContactFormValues,
    mode: "onSubmit",
  });

  const watchPais = form.watch("pais");

  const regiones = useMemo(() => {
    if (!watchPais) return [];
    return REGIONES[watchPais] ?? [];
  }, [watchPais]);

  const handleSubmit = form.handleSubmit((values) => {
    // Aquí se podría llamar al endpoint real.
    console.log("[CONTACT_FORM_SUBMIT]", values);
    onSubmitted?.(values);
  });

  return {
    form,
    handleSubmit,
    regiones,
  };
}

