import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  component: ScrollArea,
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-40 w-72 rounded-md border border-border p-4">
      <div className="space-y-2 text-sm text-muted-foreground">
        {Array.from({ length: 12 }).map((_, i) => (
          <p key={i}>Línea de contenido de ejemplo #{i + 1} para probar el scroll.</p>
        ))}
      </div>
    </ScrollArea>
  ),
};

