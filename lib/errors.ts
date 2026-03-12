export type ErrorCode =
  | "INVALID_PARAMS"
  | "COUNTRY_NOT_FOUND"
  | "CONTENT_NOT_FOUND"
  | "CONTENT_PARSE_ERROR"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly context: Record<string, unknown> | undefined = undefined,
    public readonly statusCode: number = 500,
  ) {
    super(message);
    this.name = "AppError";
  }
}

