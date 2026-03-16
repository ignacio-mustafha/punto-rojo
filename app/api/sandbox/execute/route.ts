import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { withErrorHandler } from "@/lib/withErrorHandler";

type SandboxPayload = {
  productId?: string;
  method: string;
  endpoint: string;
  bodyRaw?: string | null;
  bodyFormat?: string | null;
};

export const POST = withErrorHandler(async (req: NextRequest) => {
  let body: SandboxPayload;
  try {
    body = (await req.json()) as SandboxPayload;
  } catch {
    throw new AppError(
      "INVALID_PARAMS",
      "Invalid JSON body for sandbox execute",
      undefined,
      400,
    );
  }

  const { method, endpoint, productId, bodyRaw, bodyFormat } = body;

  if (!method || !endpoint) {
    throw new AppError(
      "INVALID_PARAMS",
      "Missing method or endpoint for sandbox execute",
      { method, endpoint },
      400,
    );
  }

  logger.info("Sandbox request executed", {
    method,
    endpoint,
    productId,
    bodyRaw,
    bodyFormat,
  });

  // Pequeño delay artificial para simular latencia real de red
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simple mock response – en el futuro se puede nutrir desde el backend real.
  const mockResponse = {
    status: "success",
    executedAt: new Date().toISOString(),
    method,
    endpoint,
    productId: productId ?? null,
    bodyRaw: bodyRaw ?? null,
    bodyFormat: bodyFormat ?? null,
    requestId: `SBX-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
  };

  return NextResponse.json({
    ok: true,
    mockResponse,
  });
});

