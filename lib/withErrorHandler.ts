import { NextRequest, NextResponse } from "next/server";

import { AppError } from "./errors";
import { logger } from "./logger";

type Handler = (req: NextRequest) => Promise<NextResponse> | NextResponse;

export function withErrorHandler(handler: Handler): Handler {
  return async (req: NextRequest) => {
    try {
      const res = await handler(req);

      return res;
    } catch (error) {
      if (error instanceof AppError) {
        logger.error(error.message, error.code, error.context);

        return NextResponse.json(
          { error: { code: error.code, message: error.message } },
          { status: error.statusCode },
        );
      }

      logger.fatal("Unexpected error in route handler", "INTERNAL_ERROR", {
        error:
          error instanceof Error
            ? { name: error.name, message: error.message, stack: error.stack }
            : { value: String(error) },
      });

      return NextResponse.json(
        {
          error: {
            code: "INTERNAL_ERROR",
            message: "Unexpected error. Please try again later.",
          },
        },
        { status: 500 },
      );
    }
  };
}

