export type ChangelogTab = "prepaid" | "payments" | "data";
export type VersionTag = "latest" | "stable" | "deprecated";

export interface VersionEntry {
  version: string;
  date: string;
  summary: string;
  improvements: string[];
  bugFixes: string[];
  breakingChanges?: string[];
  tag: VersionTag;
}

export interface CategoryEntry {
  id: ChangelogTab;
  name: string;
  versions: VersionEntry[];
}

export interface ChangelogData {
  categories: CategoryEntry[];
}

export const CHANGELOG_MOCK_ES: ChangelogData = {
  categories: [
    {
      id: "prepaid",
      name: "Prepaid & Content",
      versions: [
        {
          version: "v2.1.0",
          date: "2024-12-15",
          summary:
            "Mejoras en recargas y soporte para nuevos operadores de contenido digital.",
          improvements: [
            "Mejora en tiempos de respuesta del endpoint /v2/recharges (–40%)",
            "Soporte para nuevos pines de gaming en Colombia y México",
            "Nuevos operadores de streaming disponibles en 5 países",
          ],
          bugFixes: [
            "Corrección en validación de MSISDN para números de Guatemala",
            "Fix en consulta de paquetes de datos para Movistar PE",
          ],
          tag: "latest",
        },
        {
          version: "v2.0.3",
          date: "2024-11-20",
          summary:
            "Correcciones de estabilidad para recargas en México.",
          improvements: [
            "Validación mejorada de números de teléfono para operadores mexicanos",
          ],
          bugFixes: [
            "Corrección de error 500 intermitente en /v2/packages para Movistar MX",
            "Fix en consulta de saldo para pines de contenido en Chile",
          ],
          tag: "stable",
        },
        {
          version: "v2.0.0",
          date: "2024-10-01",
          summary:
            "Reestructuración de endpoints de recargas y pines de contenido.",
          improvements: [
            "Endpoint unificado /v2/recharges para todos los países",
            "Nuevo catálogo de pines de contenido con filtros por categoría",
            "Soporte para consulta de operadores disponibles por país",
          ],
          bugFixes: [],
          breakingChanges: [
            "Migración de /v1/recharges a /v2/recharges con nuevo formato de request",
            "Campo operator ahora es obligatorio en todas las recargas",
          ],
          tag: "stable",
        },
      ],
    },
    {
      id: "payments",
      name: "Payments & Banking",
      versions: [
        {
          version: "v2.1.0",
          date: "2024-12-15",
          summary:
            "Soporte para pagos en tiempo real y webhooks de notificación.",
          improvements: [
            "Nuevo endpoint POST /payments/realtime para procesamiento instantáneo",
            "Soporte de webhooks para notificaciones de estado de transacciones",
            "Nuevos convenios de recaudo en Ecuador y Panamá",
          ],
          bugFixes: [
            "Fix en el cálculo de fees para cash-out en Ecuador",
          ],
          breakingChanges: [
            "El campo response.fee ahora es obligatorio en las respuestas de cash-in",
          ],
          tag: "latest",
        },
        {
          version: "v2.0.3",
          date: "2024-11-20",
          summary:
            "Nuevos códigos de error y correcciones en pagos de servicios.",
          improvements: [
            "Nuevos códigos de error descriptivos en respuestas de /v2/bill-payments",
          ],
          bugFixes: [
            "Fix en el formato de timestamps para zona horaria de Panamá",
            "Corrección en consulta de estado para cash-in bancario en Argentina",
          ],
          tag: "stable",
        },
        {
          version: "v2.0.0",
          date: "2024-10-01",
          summary:
            "Lanzamiento de API v2 para pagos y corresponsalía bancaria.",
          improvements: [
            "Endpoints unificados para cash-in y cash-out en 35+ países",
            "Consulta de convenios de recaudo por país y categoría",
            "Ambiente sandbox para pruebas de pagos sin cargos reales",
          ],
          bugFixes: [],
          breakingChanges: [
            "Nuevo sistema de autenticación OAuth 2.0 reemplaza API keys",
            "Formato de respuesta estandarizado con campos status y transaction_id obligatorios",
          ],
          tag: "stable",
        },
      ],
    },
    {
      id: "data",
      name: "Data Intelligence",
      versions: [
        {
          version: "v2.1.0",
          date: "2024-12-15",
          summary:
            "Nuevos reportes de perfil de consumidor y análisis avanzado.",
          improvements: [
            "Nuevo endpoint /v2/data/consumer-profile con segmentación demográfica",
            "Mejora en granularidad de reportes de actividad de usuario",
            "Exportación de datos en formato CSV y JSON",
          ],
          bugFixes: [
            "Corrección en la paginación de /v2/data/advanced cuando limit > 50",
          ],
          tag: "latest",
        },
        {
          version: "v2.0.0",
          date: "2024-10-01",
          summary:
            "Lanzamiento de endpoints de análisis transaccional e inteligencia de datos.",
          improvements: [
            "Análisis transaccional básico y avanzado por categoría",
            "Historial de actividad de usuario con filtros por rango de fecha",
            "Documentación task-based con ejemplos en curl, JavaScript, Python y PHP",
          ],
          bugFixes: [],
          breakingChanges: [
            "Todos los endpoints de datos migrados al prefijo /v2/data/",
          ],
          tag: "stable",
        },
      ],
    },
  ],
};

export const CHANGELOG_MOCK_EN: ChangelogData = {
  categories: [
    {
      id: "prepaid",
      name: "Prepaid & Content",
      versions: [
        {
          version: "v2.1.0",
          date: "2024-12-15",
          summary:
            "Improvements in top-ups and support for new digital content providers.",
          improvements: [
            "Improved response times for the /v2/recharges endpoint (–40%)",
            "Support for new gaming PINs in Colombia and Mexico",
            "New streaming providers available in 5 countries",
          ],
          bugFixes: [
            "Fixed MSISDN validation for Guatemala numbers",
            "Fixed data packages query for Movistar PE",
          ],
          tag: "latest",
        },
        {
          version: "v2.0.3",
          date: "2024-11-20",
          summary:
            "Stability fixes for top-ups in Mexico.",
          improvements: [
            "Improved phone number validation for Mexican operators",
          ],
          bugFixes: [
            "Fixed intermittent 500 error in /v2/packages for Movistar MX",
            "Fixed balance inquiry for content PINs in Chile",
          ],
          tag: "stable",
        },
        {
          version: "v2.0.0",
          date: "2024-10-01",
          summary:
            "Restructuring of top-up and content PIN endpoints.",
          improvements: [
            "Unified /v2/recharges endpoint for all countries",
            "New content PIN catalog with category filters",
            "Support for querying available operators per country",
          ],
          bugFixes: [],
          breakingChanges: [
            "Migration from /v1/recharges to /v2/recharges with a new request format",
            "The operator field is now mandatory for all top-ups",
          ],
          tag: "stable",
        },
      ],
    },
    {
      id: "payments",
      name: "Payments & Banking",
      versions: [
        {
          version: "v2.1.0",
          date: "2024-12-15",
          summary:
            "Support for real-time payments and notification webhooks.",
          improvements: [
            "New POST /payments/realtime endpoint for instant processing",
            "Webhook support for transaction status notifications",
            "New collection agreements in Ecuador and Panama",
          ],
          bugFixes: [
            "Fixed fee calculation for cash-out in Ecuador",
          ],
          breakingChanges: [
            "The response.fee field is now mandatory in cash-in responses",
          ],
          tag: "latest",
        },
        {
          version: "v2.0.3",
          date: "2024-11-20",
          summary:
            "New error codes and fixes for bill payments.",
          improvements: [
            "New descriptive error codes in /v2/bill-payments responses",
          ],
          bugFixes: [
            "Fixed timestamp format for the Panama time zone",
            "Fixed status inquiry for bank cash-in in Argentina",
          ],
          tag: "stable",
        },
        {
          version: "v2.0.0",
          date: "2024-10-01",
          summary:
            "Launch of API v2 for payments and banking correspondent services.",
          improvements: [
            "Unified endpoints for cash-in and cash-out in 35+ countries",
            "Collection agreement lookup by country and category",
            "Sandbox environment for payment tests with no real charges",
          ],
          bugFixes: [],
          breakingChanges: [
            "New OAuth 2.0 authentication system replaces API keys",
            "Standardized response format with mandatory status and transaction_id fields",
          ],
          tag: "stable",
        },
      ],
    },
    {
      id: "data",
      name: "Data Intelligence",
      versions: [
        {
          version: "v2.1.0",
          date: "2024-12-15",
          summary:
            "New consumer profile reports and advanced analytics.",
          improvements: [
            "New /v2/data/consumer-profile endpoint with demographic segmentation",
            "Improved granularity for user activity reports",
            "Data export in CSV and JSON formats",
          ],
          bugFixes: [
            "Fixed pagination in /v2/data/advanced when limit > 50",
          ],
          tag: "latest",
        },
        {
          version: "v2.0.0",
          date: "2024-10-01",
          summary:
            "Launch of transactional analysis and data intelligence endpoints.",
          improvements: [
            "Basic and advanced transactional analysis by category",
            "User activity history with date-range filters",
            "Task-based documentation with examples in curl, JavaScript, Python, and PHP",
          ],
          bugFixes: [],
          breakingChanges: [
            "All data endpoints migrated to the /v2/data/ prefix",
          ],
          tag: "stable",
        },
      ],
    },
  ],
};

