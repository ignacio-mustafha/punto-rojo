import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";

import ContactFormDialog from "@/components/ContactFormDialog";

const LINKS = {
  Plataforma: [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/products" },
    { label: "Comenzar", href: "/getting-started" },
    { label: "Control de versiones", href: "/changelog" },
  ],
  Recursos: [
    {
      label: "Postman Collection",
      href: "https://documenter.getpostman.com/view/24590790/2s8YsnYwsc#ee38b174-d09d-4d43-bc1c-cfee26527c93",
      external: true,
    },
    {
      label: "Soporte",
      href: "https://puntored.co/soporte-tecnico-puntored/",
      external: true,
    },
  ],
  Empresa: [
    {
      label: "Acerca de Puntored",
      href: "https://puntored.co/puntored-inclusion-financiera-latam/",
      external: true,
    },
    {
      label: "Blog",
      href: "https://puntored.co/blog-soluciones-de-pago/",
      external: true,
    },
  ],
} as const;

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Puntored Developer"
                className="h-7 w-auto object-contain block dark:hidden"
                width={120}
                height={28}
              />
              <Image
                src="/logo-dark.svg"
                alt="Puntored Developer"
                className="h-7 w-auto object-contain hidden dark:block"
                width={120}
                height={28}
              />
              <span className="text-sm font-semibold text-muted-foreground">
                <span className="text-muted-foreground">Developers</span>
              </span>
            </Link>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Plataforma de APIs financieras para LATAM.
              <br />
              35+ países. Un solo punto de integración.
            </p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
                {section}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    {"external" in item && item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
                {section === "Empresa" && (
                  <li>
                    <ContactFormDialog
                      trigger={
                        <button className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                          Solicitar más información
                        </button>
                      }
                    />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Puntored. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://puntored.co/politicas-privacidad-servicio-puntored/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Política de privacidad
            </a>
            <span className="text-xs text-muted-foreground">Términos de servicio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

