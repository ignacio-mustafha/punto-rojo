export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  helpUrl: string;
}

export interface VersionSummary {
  version: string;
  date: string;
  description: string;
  tag: string;
}

export interface OnboardingData {
  steps: OnboardingStep[];
  snippets: {
    auth: Record<string, string>;
    firstTransaction: Record<string, string>;
  };
  countries: string[];
  versionsSummary: VersionSummary[];
}

export const ONBOARDING_MOCK_ES: OnboardingData = {
  steps: [
    {
      id: "explore",
      title: "Explora los productos disponibles",
      description:
        "Conoce las tres categorías de API: Prepaid & Content, Payments & Banking y Data Intelligence. Cada una cubre un conjunto de servicios financieros reales.",
      helpUrl: "/products",
    },
    {
      id: "country",
      title: "Selecciona tu país de operación",
      description:
        "Puntored opera en 35+ países de LATAM. Cada país puede tener productos, operadores y restricciones distintos. Debes especificar el país en cada request.",
      helpUrl: "/products",
    },
    {
      id: "auth",
      title: "Autentica tu primera petición",
      description:
        "Puntored usa OAuth 2.0 con client credentials flow. Obtén un token de acceso antes de hacer cualquier llamada a la API. El token expira en 3600 segundos.",
      helpUrl: "/products",
    },
    {
      id: "transaction",
      title: "Realiza tu primera transacción de prueba",
      description:
        "Con el token activo, puedes realizar tu primera transacción. El ambiente de sandbox te permite probar sin generar cargos reales.",
      helpUrl: "/products",
    },
    {
      id: "versions",
      title: "Revisa el control de versiones",
      description:
        "Consulta el changelog para entender las versiones disponibles de la API, cambios breaking y features nuevas antes de ir a producción.",
      helpUrl: "#",
    },
  ],
  snippets: {
    auth: {
      curl: `curl -X POST https://api.puntored.co/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "grant_type": "client_credentials",
    "country": "CO"
  }'`,
      javascript: `const response = await fetch(
  "https://api.puntored.co/auth/token",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: "YOUR_CLIENT_ID",
      client_secret: "YOUR_CLIENT_SECRET",
      grant_type: "client_credentials",
      country: "CO",
    }),
  }
);
const { access_token } = await response.json();`,
      python: `import requests

response = requests.post(
    "https://api.puntored.co/auth/token",
    json={
        "client_id": "YOUR_CLIENT_ID",
        "client_secret": "YOUR_CLIENT_SECRET",
        "grant_type": "client_credentials",
        "country": "CO",
    }
)
data = response.json()
access_token = data["access_token"]`,
      php: `$response = file_get_contents(
  "https://api.puntored.co/auth/token",
  false,
  stream_context_create([
    "http" => [
      "method" => "POST",
      "header" => "Content-Type: application/json",
      "content" => json_encode([
        "client_id" => "YOUR_CLIENT_ID",
        "client_secret" => "YOUR_CLIENT_SECRET",
        "grant_type" => "client_credentials",
        "country" => "CO",
      ]),
    ]
  ])
);
$data = json_decode($response, true);`,
    },
    firstTransaction: {
      curl: `curl -X POST https://api.puntored.co/v2/recharges \\
  -H "Authorization: Bearer {access_token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "msisdn": "3001234567",
    "amount": 10000,
    "operator": "CLARO",
    "country": "CO",
    "reference": "REF-001"
  }'`,
      javascript: `const res = await fetch(
  "https://api.puntored.co/v2/recharges",
  {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${token}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      msisdn: "3001234567",
      amount: 10000,
      operator: "CLARO",
      country: "CO",
      reference: "REF-001",
    }),
  }
);
const result = await res.json();`,
      python: `import requests

result = requests.post(
    "https://api.puntored.co/v2/recharges",
    headers={"Authorization": f"Bearer {token}"},
    json={
        "msisdn": "3001234567",
        "amount": 10000,
        "operator": "CLARO",
        "country": "CO",
        "reference": "REF-001",
    }
).json()`,
    },
  },
  countries: [
    "🇨🇴 Colombia",
    "🇲🇽 México",
    "🇵🇪 Perú",
    "🇦🇷 Argentina",
    "🇨🇱 Chile",
    "🇪🇨 Ecuador",
    "🇬🇹 Guatemala",
    "🇵🇦 Panamá",
  ],
  versionsSummary: [
    {
      version: "v2.1.0",
      date: "Dic 2024",
      description:
        "Soporte para pagos en tiempo real. Nuevo endpoint /payments/realtime.",
      tag: "latest",
    },
    {
      version: "v2.0.3",
      date: "Nov 2024",
      description:
        "Corrección de errores en validación de MSISDN para MX.",
      tag: "stable",
    },
    {
      version: "v2.0.0",
      date: "Oct 2024",
      description:
        "API v2 con autenticación OAuth 2.0 y soporte multi-país.",
      tag: "stable",
    },
  ],
};

export const ONBOARDING_MOCK_EN: OnboardingData = {
  steps: [
    {
      id: "explore",
      title: "Explore the available products",
      description:
        "Get to know the three API categories: Prepaid & Content, Payments & Banking, and Data Intelligence. Each one covers a real set of financial services.",
      helpUrl: "/products",
    },
    {
      id: "country",
      title: "Select your operating country",
      description:
        "Puntored operates in 35+ LATAM countries. Each country can have different products, operators, and restrictions. You must specify the country on every request.",
      helpUrl: "/products",
    },
    {
      id: "auth",
      title: "Authenticate your first request",
      description:
        "Puntored uses OAuth 2.0 with the client credentials flow. Obtain an access token before making any API call. The token expires in 3600 seconds.",
      helpUrl: "/products",
    },
    {
      id: "transaction",
      title: "Make your first test transaction",
      description:
        "With the token active, you can perform your first transaction. The sandbox environment lets you test without generating real charges.",
      helpUrl: "/products",
    },
    {
      id: "versions",
      title: "Review version control",
      description:
        "Check the changelog to understand available API versions, breaking changes, and new features before going to production.",
      helpUrl: "#",
    },
  ],
  snippets: ONBOARDING_MOCK_ES.snippets,
  countries: ONBOARDING_MOCK_ES.countries,
  versionsSummary: [
    {
      version: "v2.1.0",
      date: "Dec 2024",
      description:
        "Support for real-time payments. New endpoint /payments/realtime.",
      tag: "latest",
    },
    {
      version: "v2.0.3",
      date: "Nov 2024",
      description:
        "Bug fixes in MSISDN validation for MX.",
      tag: "stable",
    },
    {
      version: "v2.0.0",
      date: "Oct 2024",
      description:
        "API v2 with OAuth 2.0 authentication and multi-country support.",
      tag: "stable",
    },
  ],
};

