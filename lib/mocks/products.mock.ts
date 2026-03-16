export type Tab = "prepaid" | "payments" | "data";
export type Method = "GET" | "POST";

export interface ProductParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ProductSnippets {
  curl: string;
  javascript: string;
  python: string;
}

export interface Product {
  id: string;
  name: string;
  method: Method;
  path: string;
  description: string;
  useCase: string;
  params: ProductParam[];
  snippets: ProductSnippets;
  response: string;
}

export interface ProductsData {
  tabs: Record<Tab, string>;
  products: Record<Tab, Product[]>;
}

export const TAB_LABELS: Record<Tab, string> = {
  prepaid: "Prepaid & Content",
  payments: "Payments & Banking",
  data: "Data Services",
};

export const PRODUCTS_MOCK: ProductsData = {
  tabs: TAB_LABELS,
  products: {
    prepaid: [
      {
        id: "recargas",
        name: "Recargas móviles",
        method: "POST",
        path: "/v2/recharges",
        description:
          "Realiza recargas de saldo a líneas móviles prepago de cualquier operador disponible en el país seleccionado.",
        useCase:
          "Agentes, billeteras digitales y apps que necesitan ofrecer recargas a usuarios finales.",
        params: [
          {
            name: "msisdn",
            type: "string",
            required: true,
            description:
              "Número de teléfono destino (10 dígitos sin prefijo)",
          },
          {
            name: "amount",
            type: "integer",
            required: true,
            description: "Monto en moneda local (COP, MXN, etc.)",
          },
          {
            name: "operator",
            type: "string",
            required: true,
            description:
              "Código del operador: CLARO, MOVISTAR, TIGO, WOM",
          },
          {
            name: "country",
            type: "string",
            required: true,
            description:
              "Código de país ISO 3166-1 alpha-2 (ej: CO, MX)",
          },
          {
            name: "reference",
            type: "string",
            required: false,
            description:
              "Referencia interna de tu sistema para conciliación",
          },
        ],
        snippets: {
          curl: `curl -X POST https://api.puntored.co/v2/recharges \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "msisdn": "3001234567",
    "amount": 10000,
    "operator": "CLARO",
    "country": "CO",
    "reference": "REF-2024-001"
  }'`,
          javascript: `const result = await fetch(
  "https://api.puntored.co/v2/recharges",
  {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${token}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      msisdn: "3001234567",
      amount: 10000,
      operator: "CLARO",
      country: "CO",
      reference: "REF-2024-001",
    }),
  }
).then(r => r.json());`,
          python: `import requests

result = requests.post(
    "https://api.puntored.co/v2/recharges",
    headers={"Authorization": f"Bearer {token}"},
    json={
        "msisdn": "3001234567",
        "amount": 10000,
        "operator": "CLARO",
        "country": "CO",
        "reference": "REF-2024-001",
    }
).json()`,
        },
        response: `{
  "status": "success",
  "transaction_id": "TXN-20241201-0023",
  "msisdn": "3001234567",
  "amount": 10000,
  "operator": "CLARO",
  "country": "CO",
  "reference": "REF-2024-001",
  "timestamp": "2024-12-01T14:32:00Z",
  "balance_before": 50000,
  "balance_after": 40000
}`,
      },
      {
        id: "paquetes",
        name: "Paquetes datos/voz/SMS",
        method: "POST",
        path: "/v2/packages",
        description:
          "Adquisición de paquetes de datos móviles, minutos de voz y SMS para líneas prepago y pospago.",
        useCase:
          "Apps que ofrecen bundles de conectividad a usuarios sin acceso a planes de datos.",
        params: [
          {
            name: "msisdn",
            type: "string",
            required: true,
            description: "Número de teléfono destino",
          },
          {
            name: "package_id",
            type: "string",
            required: true,
            description:
              "ID del paquete (obtenido de /v2/packages/catalog)",
          },
          {
            name: "country",
            type: "string",
            required: true,
            description:
              "Código de país ISO 3166-1 alpha-2",
          },
          {
            name: "reference",
            type: "string",
            required: false,
            description:
              "Referencia interna para conciliación",
          },
        ],
        snippets: {
          curl: `curl -X POST https://api.puntored.co/v2/packages \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "msisdn": "3001234567",
    "package_id": "CLR-DATA-1GB-7D",
    "country": "CO"
  }'`,
          javascript: `const result = await fetch(
  "https://api.puntored.co/v2/packages",
  {
    method: "POST",
    headers: { Authorization: \`Bearer \${token}\` },
    body: JSON.stringify({
      msisdn: "3001234567",
      package_id: "CLR-DATA-1GB-7D",
      country: "CO",
    }),
  }
).then(r => r.json());`,
          python: `result = requests.post(
    "https://api.puntored.co/v2/packages",
    headers={"Authorization": f"Bearer {token}"},
    json={
        "msisdn": "3001234567",
        "package_id": "CLR-DATA-1GB-7D",
        "country": "CO",
    }
).json()`,
        },
        response: `{
  "status": "success",
  "transaction_id": "TXN-20241201-0024",
  "package": {
    "id": "CLR-DATA-1GB-7D",
    "name": "1 GB por 7 días",
    "type": "data",
    "operator": "CLARO"
  },
  "msisdn": "3001234567",
  "activation_date": "2024-12-01T14:35:00Z",
  "expiration_date": "2024-12-08T14:35:00Z"
}`,
      },
      {
        id: "pines",
        name: "Pines de contenido",
        method: "POST",
        path: "/v2/pins",
        description:
          "Venta de pines digitales para plataformas de streaming, gaming y licencias de software (Netflix, Spotify, Google Play, Xbox, etc.).",
        useCase:
          "Puntos de venta físicos y digitales que comercializan recargas de plataformas de entretenimiento.",
        params: [
          {
            name: "product_id",
            type: "string",
            required: true,
            description:
              "ID del producto (obtenido de /v2/pins/catalog)",
          },
          {
            name: "amount",
            type: "integer",
            required: false,
            description:
              "Monto si el producto es de valor variable",
          },
          {
            name: "country",
            type: "string",
            required: true,
            description:
              "Código de país ISO 3166-1 alpha-2",
          },
          {
            name: "reference",
            type: "string",
            required: false,
            description:
              "Referencia interna para conciliación",
          },
        ],
        snippets: {
          curl: `curl -X POST https://api.puntored.co/v2/pins \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "product_id": "NETFLIX-30K-CO",
    "country": "CO"
  }'`,
          javascript: `const result = await fetch(
  "https://api.puntored.co/v2/pins",
  {
    method: "POST",
    headers: { Authorization: \`Bearer \${token}\` },
    body: JSON.stringify({
      product_id: "NETFLIX-30K-CO",
      country: "CO",
    }),
  }
).then(r => r.json());`,
          python: `result = requests.post(
    "https://api.puntored.co/v2/pins",
    headers={"Authorization": f"Bearer {token}"},
    json={"product_id": "NETFLIX-30K-CO", "country": "CO"}
).json()`,
        },
        response: `{
  "status": "success",
  "transaction_id": "TXN-20241201-0025",
  "product": {
    "id": "NETFLIX-30K-CO",
    "name": "Netflix 30,000 COP",
    "platform": "Netflix"
  },
  "pin": "NFLX-XXXX-XXXX-XXXX",
  "serial": "SN-12345678",
  "instructions": "Ingresa el PIN en netflix.com/redeem"
}`,
      },
      {
        id: "apuestas",
        name: "Apuestas deportivas",
        method: "POST",
        path: "/v2/betting",
        description:
          "Recarga de saldo en plataformas de apuestas deportivas habilitadas y reguladas en el país seleccionado.",
        useCase:
          "Agentes autorizados para comercializar recargas de plataformas de juego reguladas.",
        params: [
          {
            name: "platform_id",
            type: "string",
            required: true,
            description:
              "ID de plataforma de apuestas habilitada",
          },
          {
            name: "user_id",
            type: "string",
            required: true,
            description:
              "ID de usuario en la plataforma de apuestas",
          },
          {
            name: "amount",
            type: "integer",
            required: true,
            description: "Monto en moneda local",
          },
          {
            name: "country",
            type: "string",
            required: true,
            description:
              "Código de país ISO 3166-1 alpha-2",
          },
        ],
        snippets: {
          curl: `curl -X POST https://api.puntored.co/v2/betting \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "platform_id": "BETPLAY-CO",
    "user_id": "USR-789012",
    "amount": 50000,
    "country": "CO"
  }'`,
          javascript: `const result = await fetch(
  "https://api.puntored.co/v2/betting",
  {
    method: "POST",
    headers: { Authorization: \`Bearer \${token}\` },
    body: JSON.stringify({
      platform_id: "BETPLAY-CO",
      user_id: "USR-789012",
      amount: 50000,
      country: "CO",
    }),
  }
).then(r => r.json());`,
          python: `result = requests.post(
    "https://api.puntored.co/v2/betting",
    headers={"Authorization": f"Bearer {token}"},
    json={
        "platform_id": "BETPLAY-CO",
        "user_id": "USR-789012",
        "amount": 50000,
        "country": "CO",
    }
).json()`,
        },
        response: `{
  "status": "success",
  "transaction_id": "TXN-20241201-0026",
  "platform": "BetPlay",
  "user_id": "USR-789012",
  "amount": 50000,
  "new_balance": 75000,
  "timestamp": "2024-12-01T14:40:00Z"
}`,
      },
    ],
    payments: [
      {
        id: "servicios",
        name: "Pago de servicios",
        method: "POST",
        path: "/v2/bill-payments",
        description:
          "Pago de servicios públicos (energía, agua, gas, teléfono) y servicios privados (seguros, créditos, internet) a través de convenios activos.",
        useCase:
          "Agentes de recaudo, billeteras y apps que permiten pagar facturas a usuarios finales.",
        params: [
          {
            name: "biller_id",
            type: "string",
            required: true,
            description:
              "ID del convenio/empresa facturadora",
          },
          {
            name: "reference",
            type: "string",
            required: true,
            description:
              "Número de referencia de la factura",
          },
          {
            name: "amount",
            type: "integer",
            required: true,
            description:
              "Monto exacto de la factura en moneda local",
          },
          {
            name: "country",
            type: "string",
            required: true,
            description:
              "Código de país ISO 3166-1 alpha-2",
          },
          {
            name: "customer_name",
            type: "string",
            required: false,
            description:
              "Nombre del titular de la cuenta",
          },
        ],
        snippets: {
          curl: `curl -X POST https://api.puntored.co/v2/bill-payments \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "biller_id": "EPM-CO",
    "reference": "1234567890",
    "amount": 150000,
    "country": "CO"
  }'`,
          javascript: `const result = await fetch(
  "https://api.puntored.co/v2/bill-payments",
  {
    method: "POST",
    headers: { Authorization: \`Bearer \${token}\` },
    body: JSON.stringify({
      biller_id: "EPM-CO",
      reference: "1234567890",
      amount: 150000,
      country: "CO",
    }),
  }
).then(r => r.json());`,
          python: `result = requests.post(
    "https://api.puntored.co/v2/bill-payments",
    headers={"Authorization": f"Bearer {token}"},
    json={
        "biller_id": "EPM-CO",
        "reference": "1234567890",
        "amount": 150000,
        "country": "CO",
    }
).json()`,
        },
        response: `{
  "status": "success",
  "transaction_id": "TXN-20241201-0030",
  "biller": "EPM (Empresas Públicas de Medellín)",
  "reference": "1234567890",
  "amount": 150000,
  "approval_code": "APR-456789",
  "timestamp": "2024-12-01T15:00:00Z",
  "receipt_url": "https://receipts.puntored.co/TXN-20241201-0030"
}`,
      },
      {
        id: "cash-in",
        name: "Cash-in bancario",
        method: "POST",
        path: "/v2/cash-in",
        description:
          "Depósito de efectivo hacia cuentas bancarias o billeteras digitales de entidades habilitadas (Nequi, Daviplata, Bancolombia, etc.).",
        useCase:
          "Agentes bancarios corresponsales que reciben efectivo y depositan a cuentas digitales.",
        params: [
          {
            name: "entity_id",
            type: "string",
            required: true,
            description:
              "ID de la entidad bancaria o billetera destino",
          },
          {
            name: "account",
            type: "string",
            required: true,
            description:
              "Número de cuenta, teléfono o documento del destinatario",
          },
          {
            name: "amount",
            type: "integer",
            required: true,
            description:
              "Monto en moneda local a depositar",
          },
          {
            name: "country",
            type: "string",
            required: true,
            description:
              "Código de país ISO 3166-1 alpha-2",
          },
        ],
        snippets: {
          curl: `curl -X POST https://api.puntored.co/v2/cash-in \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "entity_id": "NEQUI-CO",
    "account": "3009876543",
    "amount": 200000,
    "country": "CO"
  }'`,
          javascript: `const result = await fetch(
  "https://api.puntored.co/v2/cash-in",
  {
    method: "POST",
    headers: { Authorization: \`Bearer \${token}\` },
    body: JSON.stringify({
      entity_id: "NEQUI-CO",
      account: "3009876543",
      amount: 200000,
      country: "CO",
    }),
  }
).then(r => r.json());`,
          python: `result = requests.post(
    "https://api.puntored.co/v2/cash-in",
    headers={"Authorization": f"Bearer {token}"},
    json={
        "entity_id": "NEQUI-CO",
        "account": "3009876543",
        "amount": 200000,
        "country": "CO",
    }
).json()`,
        },
        response: `{
  "status": "success",
  "transaction_id": "TXN-20241201-0031",
  "entity": "Nequi",
  "account": "3009876543",
  "amount": 200000,
  "fee": 1200,
  "net_amount": 198800,
  "approval_code": "NQI-789012",
  "timestamp": "2024-12-01T15:05:00Z"
}`,
      },
      {
        id: "cash-out",
        name: "Cash-out bancario",
        method: "POST",
        path: "/v2/cash-out",
        description:
          "Retiro de efectivo desde cuentas bancarias o billeteras digitales. El agente entrega el efectivo y el sistema debita la cuenta del cliente.",
        useCase:
          "Corresponsales bancarios que actúan como cajeros de retiro para billeteras y cuentas digitales.",
        params: [
          {
            name: "entity_id",
            type: "string",
            required: true,
            description:
              "ID de la entidad bancaria o billetera origen",
          },
          {
            name: "account",
            type: "string",
            required: true,
            description:
              "Cuenta, teléfono o documento del titular",
          },
          {
            name: "amount",
            type: "integer",
            required: true,
            description: "Monto a retirar en moneda local",
          },
          {
            name: "otp",
            type: "string",
            required: true,
            description:
              "Código OTP enviado al cliente por la entidad",
          },
          {
            name: "country",
            type: "string",
            required: true,
            description:
              "Código de país ISO 3166-1 alpha-2",
          },
        ],
        snippets: {
          curl: `curl -X POST https://api.puntored.co/v2/cash-out \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "entity_id": "DAVIPLATA-CO",
    "account": "3101234567",
    "amount": 100000,
    "otp": "567890",
    "country": "CO"
  }'`,
          javascript: `const result = await fetch(
  "https://api.puntored.co/v2/cash-out",
  {
    method: "POST",
    headers: { Authorization: \`Bearer \${token}\` },
    body: JSON.stringify({
      entity_id: "DAVIPLATA-CO",
      account: "3101234567",
      amount: 100000,
      otp: "567890",
      country: "CO",
    }),
  }
).then(r => r.json());`,
          python: `result = requests.post(
    "https://api.puntored.co/v2/cash-out",
    headers={"Authorization": f"Bearer {token}"},
    json={
        "entity_id": "DAVIPLATA-CO",
        "account": "3101234567",
        "amount": 100000,
        "otp": "567890",
        "country": "CO",
    }
).json()`,
        },
        response: `{
  "status": "success",
  "transaction_id": "TXN-20241201-0032",
  "entity": "Daviplata",
  "account": "3101234567",
  "amount": 100000,
  "approval_code": "DVP-345678",
  "timestamp": "2024-12-01T15:10:00Z"
}`,
      },
      {
        id: "consulta",
        name: "Consulta de cuenta",
        method: "GET",
        path: "/v2/accounts/balance",
        description:
          "Consulta del saldo y estado de una cuenta bancaria o billetera digital para validar antes de procesar un retiro.",
        useCase:
          "Verificación previa antes de autorizar transacciones de cash-out o pagos.",
        params: [
          {
            name: "entity_id",
            type: "string",
            required: true,
            description: "ID de la entidad bancaria",
          },
          {
            name: "account",
            type: "string",
            required: true,
            description: "Número de cuenta o teléfono",
          },
          {
            name: "country",
            type: "string",
            required: true,
            description:
              "Código de país ISO 3166-1 alpha-2",
          },
        ],
        snippets: {
          curl: `curl -G https://api.puntored.co/v2/accounts/balance \\
  -H "Authorization: Bearer {token}" \\
  --data-urlencode "entity_id=NEQUI-CO" \\
  --data-urlencode "account=3009876543" \\
  --data-urlencode "country=CO"`,
          javascript: `const params = new URLSearchParams({
  entity_id: "NEQUI-CO",
  account: "3009876543",
  country: "CO",
});
const result = await fetch(
  \`https://api.puntored.co/v2/accounts/balance?\${params}\`,
  { headers: { Authorization: \`Bearer \${token}\` } }
).then(r => r.json());`,
          python: `result = requests.get(
    "https://api.puntored.co/v2/accounts/balance",
    headers={"Authorization": f"Bearer {token}"},
    params={
        "entity_id": "NEQUI-CO",
        "account": "3009876543",
        "country": "CO",
    }
).json()`,
        },
        response: `{
  "status": "success",
  "entity": "Nequi",
  "account": "3009876543",
  "balance": 450000,
  "currency": "COP",
  "account_status": "active",
  "holder_name": "Juan García",
  "timestamp": "2024-12-01T15:15:00Z"
}`,
      },
    ],
    data: [
      {
        id: "data-basic",
        name: "Data Basic",
        method: "GET",
        path: "/v2/data/basic",
        description:
          "Resumen transaccional del agente: totales por categoría, volumen del período y KPIs básicos de rendimiento.",
        useCase:
          "Dashboards de gestión para supervisores y administradores de redes de agentes.",
        params: [
          {
            name: "agent_id",
            type: "string",
            required: true,
            description:
              "ID del agente o punto de venta",
          },
          {
            name: "from_date",
            type: "string",
            required: true,
            description:
              "Fecha de inicio en formato YYYY-MM-DD",
          },
          {
            name: "to_date",
            type: "string",
            required: true,
            description:
              "Fecha de fin en formato YYYY-MM-DD",
          },
          {
            name: "country",
            type: "string",
            required: true,
            description:
              "Código de país ISO 3166-1 alpha-2",
          },
        ],
        snippets: {
          curl: `curl -G https://api.puntored.co/v2/data/basic \\
  -H "Authorization: Bearer {token}" \\
  --data-urlencode "agent_id=AGT-001" \\
  --data-urlencode "from_date=2024-11-01" \\
  --data-urlencode "to_date=2024-11-30" \\
  --data-urlencode "country=CO"`,
          javascript: `const params = new URLSearchParams({
  agent_id: "AGT-001",
  from_date: "2024-11-01",
  to_date: "2024-11-30",
  country: "CO",
});
const result = await fetch(
  \`https://api.puntored.co/v2/data/basic?\${params}\`,
  { headers: { Authorization: \`Bearer \${token}\` } }
).then(r => r.json());`,
          python: `result = requests.get(
    "https://api.puntored.co/v2/data/basic",
    headers={"Authorization": f"Bearer {token}"},
    params={
        "agent_id": "AGT-001",
        "from_date": "2024-11-01",
        "to_date": "2024-11-30",
        "country": "CO",
    }
).json()`,
        },
        response: `{
  "agent_id": "AGT-001",
  "period": { "from": "2024-11-01", "to": "2024-11-30" },
  "summary": {
    "total_transactions": 1240,
    "total_amount": 45820000,
    "currency": "COP",
    "by_category": {
      "recharges": { "count": 650, "amount": 18500000 },
      "bill_payments": { "count": 380, "amount": 19800000 },
      "cash_in": { "count": 120, "amount": 4800000 },
      "pins": { "count": 90, "amount": 2720000 }
    }
  }
}`,
      },
      {
        id: "data-advanced",
        name: "Data Advanced",
        method: "GET",
        path: "/v2/data/advanced",
        description:
          "Historial transaccional detallado con filtros avanzados por categoría, operador, estado y monto. Ideal para análisis de comportamiento y conciliación.",
        useCase:
          "Equipos de analytics, conciliación contable y modelos de scoring de agentes.",
        params: [
          {
            name: "agent_id",
            type: "string",
            required: true,
            description:
              "ID del agente o punto de venta",
          },
          {
            name: "from_date",
            type: "string",
            required: true,
            description:
              "Fecha de inicio en formato YYYY-MM-DD",
          },
          {
            name: "to_date",
            type: "string",
            required: true,
            description:
              "Fecha de fin en formato YYYY-MM-DD",
          },
          {
            name: "category",
            type: "string",
            required: false,
            description:
              "Filtro: recharges | bill_payments | cash_in | cash_out | pins",
          },
          {
            name: "status",
            type: "string",
            required: false,
            description:
              "Filtro: success | failed | pending",
          },
          {
            name: "page",
            type: "integer",
            required: false,
            description:
              "Página de resultados (default: 1)",
          },
          {
            name: "limit",
            type: "integer",
            required: false,
            description:
              "Resultados por página (max: 100, default: 20)",
          },
        ],
        snippets: {
          curl: `curl -G https://api.puntored.co/v2/data/advanced \\
  -H "Authorization: Bearer {token}" \\
  --data-urlencode "agent_id=AGT-001" \\
  --data-urlencode "from_date=2024-11-01" \\
  --data-urlencode "to_date=2024-11-30" \\
  --data-urlencode "category=recharges" \\
  --data-urlencode "status=success" \\
  --data-urlencode "limit=20"`,
          javascript: `const params = new URLSearchParams({
  agent_id: "AGT-001",
  from_date: "2024-11-01",
  to_date: "2024-11-30",
  category: "recharges",
  status: "success",
  limit: "20",
});
const result = await fetch(
  \`https://api.puntored.co/v2/data/advanced?\${params}\`,
  { headers: { Authorization: \`Bearer \${token}\` } }
).then(r => r.json());`,
          python: `result = requests.get(
    "https://api.puntored.co/v2/data/advanced",
    headers={"Authorization": f"Bearer {token}"},
    params={
        "agent_id": "AGT-001",
        "from_date": "2024-11-01",
        "to_date": "2024-11-30",
        "category": "recharges",
        "status": "success",
        "limit": 20,
    }
).json()`,
        },
        response: `{
  "data": [
    {
      "transaction_id": "TXN-20241115-0150",
      "category": "recharges",
      "product": "Recarga Claro",
      "amount": 10000,
      "status": "success",
      "msisdn": "300XXXXXXX",
      "timestamp": "2024-11-15T10:23:00Z"
    },
    {
      "transaction_id": "TXN-20241115-0151",
      "category": "recharges",
      "product": "Recarga Movistar",
      "amount": 5000,
      "status": "success",
      "msisdn": "310XXXXXXX",
      "timestamp": "2024-11-15T10:45:00Z"
    }
  ],
  "pagination": {
    "page": 1, "limit": 20,
    "total": 650, "pages": 33
  }
}`,
      },
      {
        id: "actividad",
        name: "Actividad de usuario",
        method: "GET",
        path: "/v2/data/activity",
        description:
          "Métricas de actividad del agente o canal: frecuencia de uso, horarios pico, días más activos y tendencias de volumen.",
        useCase:
          "Gestión de flotas de agentes, incentivos y análisis de productividad.",
        params: [
          {
            name: "agent_id",
            type: "string",
            required: true,
            description:
              "ID del agente o canal",
          },
          {
            name: "period",
            type: "string",
            required: true,
            description:
              "Período: last_7d | last_30d | last_90d | custom",
          },
          {
            name: "country",
            type: "string",
            required: true,
            description:
              "Código de país ISO 3166-1 alpha-2",
          },
        ],
        snippets: {
          curl: `curl -G https://api.puntored.co/v2/data/activity \\
  -H "Authorization: Bearer {token}" \\
  --data-urlencode "agent_id=AGT-001" \\
  --data-urlencode "period=last_30d" \\
  --data-urlencode "country=CO"`,
          javascript: `const params = new URLSearchParams({
  agent_id: "AGT-001",
  period: "last_30d",
  country: "CO",
});
const result = await fetch(
  \`https://api.puntored.co/v2/data/activity?\${params}\`,
  { headers: { Authorization: \`Bearer \${token}\` } }
).then(r => r.json());`,
          python: `result = requests.get(
    "https://api.puntored.co/v2/data/activity",
    headers={"Authorization": f"Bearer {token}"},
    params={"agent_id": "AGT-001", "period": "last_30d", "country": "CO"}
).json()`,
        },
        response: `{
  "agent_id": "AGT-001",
  "period": "last_30d",
  "activity": {
    "active_days": 22,
    "avg_daily_transactions": 41,
    "peak_hour": "12:00-13:00",
    "peak_day": "Friday",
    "trend": "+8.5%",
    "by_hour": {
      "08": 45, "09": 78, "10": 120,
      "11": 145, "12": 198, "13": 176
    }
  }
}`,
      },
      {
        id: "perfil",
        name: "Perfil de consumidor",
        method: "GET",
        path: "/v2/data/profile",
        description:
          "Perfil de consumo del usuario final: preferencias de productos, operadores más usados, rangos de gasto y segmentación.",
        useCase:
          "Personalización de ofertas, campañas de marketing y modelos de retención.",
        params: [
          {
            name: "msisdn",
            type: "string",
            required: true,
            description:
              "Número de teléfono del usuario final",
          },
          {
            name: "country",
            type: "string",
            required: true,
            description:
              "Código de país ISO 3166-1 alpha-2",
          },
        ],
        snippets: {
          curl: `curl -G https://api.puntored.co/v2/data/profile \\
  -H "Authorization: Bearer {token}" \\
  --data-urlencode "msisdn=3001234567" \\
  --data-urlencode "country=CO"`,
          javascript: `const params = new URLSearchParams({
  msisdn: "3001234567",
  country: "CO",
});
const result = await fetch(
  \`https://api.puntored.co/v2/data/profile?\${params}\`,
  { headers: { Authorization: \`Bearer \${token}\` } }
).then(r => r.json());`,
          python: `result = requests.get(
    "https://api.puntored.co/v2/data/profile",
    headers={"Authorization": f"Bearer {token}"},
    params={"msisdn": "3001234567", "country": "CO"}
).json()`,
        },
        response: `{
  "msisdn": "300XXXXXXX",
  "country": "CO",
  "profile": {
    "preferred_operator": "CLARO",
    "avg_recharge_amount": 12500,
    "recharge_frequency": "weekly",
    "preferred_products": ["recharges", "data_packages"],
    "top_bill_billers": ["EPM", "ETB"],
    "segment": "high_value",
    "last_activity": "2024-12-01"
  }
}`,
      },
    ],
  },
};

