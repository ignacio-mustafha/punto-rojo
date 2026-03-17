import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="one" className="w-80">
      <TabsList className="w-full">
        <TabsTrigger value="one" className="flex-1">
          Paso 1
        </TabsTrigger>
        <TabsTrigger value="two" className="flex-1">
          Paso 2
        </TabsTrigger>
      </TabsList>
      <TabsContent value="one" className="pt-4 text-sm text-muted-foreground">
        Contenido del primer tab.
      </TabsContent>
      <TabsContent value="two" className="pt-4 text-sm text-muted-foreground">
        Contenido del segundo tab.
      </TabsContent>
    </Tabs>
  ),
};

