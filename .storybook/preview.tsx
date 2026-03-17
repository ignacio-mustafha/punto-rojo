import type { Preview } from "@storybook/react";
import "../app/globals.css";
import { Providers } from "../components/providers";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Light or dark theme",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as "light" | "dark") || "light";
      return (
        <Providers forcedTheme={theme}>
          <div className="min-h-screen bg-background text-foreground p-4">
            <Story />
          </div>
        </Providers>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
