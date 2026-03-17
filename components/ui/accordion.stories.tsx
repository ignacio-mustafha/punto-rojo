import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>¿Qué es Redpoint?</AccordionTrigger>
        <AccordionContent>
          Plataforma para integrar APIs financieras de Puntored en LATAM.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>¿Cómo empiezo?</AccordionTrigger>
        <AccordionContent>
          Consulta la sección Getting Started y realiza tus primeras pruebas en sandbox.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

