import type { Meta, StoryObj } from "@storybook/react";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
} from "./toast";
import { useState } from "react";
import { Button } from "./button";

const meta: Meta = {
  title: "UI/Toast",
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider swipeDirection="right">
        <Button onClick={() => setOpen(true)}>Mostrar toast</Button>
        <Toast open={open} onOpenChange={setOpen}>
          <ToastTitle>Transacción exitosa</ToastTitle>
          <ToastDescription>Tu recarga en sandbox se procesó correctamente.</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

