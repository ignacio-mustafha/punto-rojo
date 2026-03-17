import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <p className="text-sm">Sección superior</p>
      <Separator />
      <p className="text-sm">Sección inferior</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4">
      <span>Izquierda</span>
      <Separator orientation="vertical" />
      <span>Derecha</span>
    </div>
  ),
};

