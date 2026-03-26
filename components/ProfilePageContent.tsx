"use client";

import Link from "next/link";
import { Building2, CalendarDays, CreditCard, Globe2, Phone, ShieldCheck, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavbar } from "@/hooks/useNavbar";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePageContent() {
  const { user, isAuthenticated } = useAuth();
  const { buildPath } = useNavbar();

  if (!isAuthenticated || !user) {
    return (
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-12 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Tu perfil</CardTitle>
            <CardDescription>Necesitas iniciar sesion para ver esta seccion.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Link href={buildPath("/")}>
              <Button variant="outline" size="sm">
                Volver al inicio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    );
  }

  const initials = (user.name || user.email)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const profileMock = {
    company: "Conexa Retail Solutions S.A.S.",
    role: "Head of Digital Channels",
    baseCountry: "Colombia",
    createdAt: "12/02/2025",
    phone: "+57 300 123 4567",
    accountId: "PRD-42916",
    segment: "Enterprise",
    monthlyVolume: "USD 128,450",
    kycStatus: "Verificado",
    website: "www.conexa-retail.co",
    billingCycle: "Mensual",
    products: ["Recaudos", "Cash-in", "Recargas", "Data Packages"],
  };

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <Card className="overflow-hidden border-primary/20">
        <div className="bg-gradient-to-r from-primary/95 via-primary to-fuchsia-500 p-6 text-primary-foreground">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-base font-bold">
                {initials || "U"}
              </div>
              <div>
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-sm text-primary-foreground/90">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-white/30 bg-white/15 text-white hover:bg-white/20">
                {profileMock.segment}
              </Badge>
              <Badge className="border-white/30 bg-white/15 text-white hover:bg-white/20">
                {profileMock.kycStatus}
              </Badge>
            </div>
          </div>
        </div>
        <CardContent className="grid gap-4 pt-6 md:grid-cols-3">
          <div className="rounded-lg border bg-muted/20 p-4">
            <p className="text-xs text-muted-foreground">Account ID</p>
            <p className="mt-1 text-lg font-semibold">{profileMock.accountId}</p>
          </div>
          <div className="rounded-lg border bg-muted/20 p-4">
            <p className="text-xs text-muted-foreground">Volumen mensual</p>
            <p className="mt-1 text-lg font-semibold">{profileMock.monthlyVolume}</p>
          </div>
          <div className="rounded-lg border bg-muted/20 p-4">
            <p className="text-xs text-muted-foreground">Ciclo de facturacion</p>
            <p className="mt-1 text-lg font-semibold">{profileMock.billingCycle}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Informacion del usuario</CardTitle>
            <CardDescription>Datos de contacto y perfil principal.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <UserRound size={16} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Nombre</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Phone size={16} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Telefono</p>
                <p className="font-medium">{profileMock.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Building2 size={16} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Empresa</p>
                <p className="font-medium">{profileMock.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <CreditCard size={16} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Cargo</p>
                <p className="font-medium">{profileMock.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Globe2 size={16} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Pais base</p>
                <p className="font-medium">{profileMock.baseCountry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <CalendarDays size={16} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Fecha de alta</p>
                <p className="font-medium">{profileMock.createdAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estado de cuenta</CardTitle>
            <CardDescription>Resumen comercial y operativo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Sitio web</p>
              <p className="font-medium">{profileMock.website}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Productos activos</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {profileMock.products.map((product) => (
                  <Badge key={product} variant="secondary">
                    {product}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <ShieldCheck size={16} className="text-primary" />
              <p className="font-medium">Cumplimiento KYC al dia</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Acciones rapidas</CardTitle>
          <CardDescription>Atajos frecuentes para gestionar tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href={buildPath("/products")}>
            <Button variant="outline" size="sm">
              Ver productos
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            Descargar contrato
          </Button>
          <Button size="sm">Hablar con soporte</Button>
        </CardContent>
      </Card>
    </section>
  );
}
