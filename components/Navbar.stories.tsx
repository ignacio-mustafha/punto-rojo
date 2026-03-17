import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Navbar from "./Navbar";

const messages = {
  nav: {
    home: "Inicio",
    products: "Productos",
    gettingStarted: "Comenzar",
    changelog: "Versiones",
    contactCta: "Solicitar información",
  },
};

// Router mínimo para que los hooks de next/navigation no fallen en Storybook
const mockRouter: AppRouterInstance = {
  back: () => {},
  forward: () => {},
  refresh: () => {},
  push: () => {},
  replace: () => {},
  prefetch: async () => {},
};

const meta: Meta<typeof Navbar> = {
  title: "Composite/Navbar",
  component: Navbar,
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => (
    <AppRouterContext.Provider value={mockRouter}>
      <NextIntlClientProvider locale="es" messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    </AppRouterContext.Provider>
  ),
};
