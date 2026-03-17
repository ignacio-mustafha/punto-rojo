import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  render: () => (
    <Alert>
      <AlertDescription>Mensaje informativo de ejemplo.</AlertDescription>
    </Alert>
  ),
};

