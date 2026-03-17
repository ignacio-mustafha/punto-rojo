import type { Meta, StoryObj } from "@storybook/react";
import CodeBlock from "./CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  title: "Composite/CodeBlock",
  component: CodeBlock,
};

export default meta;

type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  args: {
    title: "POST /auth/token",
    defaultLang: "curl",
    snippets: {
      curl: `curl -X POST https://sandbox.api.puntored.co/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET"
  }'`,
      javascript: `const res = await fetch("https://sandbox.api.puntored.co/auth/token", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    client_id: "YOUR_CLIENT_ID",
    client_secret: "YOUR_CLIENT_SECRET",
  }),
});
const data = await res.json();`,
      python: `import requests

resp = requests.post(
    "https://sandbox.api.puntored.co/auth/token",
    json={
        "client_id": "YOUR_CLIENT_ID",
        "client_secret": "YOUR_CLIENT_SECRET",
    },
)
data = resp.json()`,
      php: `$response = Http::post('https://sandbox.api.puntored.co/auth/token', [
    'client_id' => 'YOUR_CLIENT_ID',
    'client_secret' => 'YOUR_CLIENT_SECRET',
]);

$data = $response->json();`,
    },
  },
};

