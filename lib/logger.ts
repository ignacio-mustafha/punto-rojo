type LogLevel = "info" | "warn" | "error" | "fatal";

type LogPayload = {
  level: LogLevel;
  message: string;
  code?: string;
  context?: Record<string, unknown>;
};

const log = ({ level, message, code, context }: LogPayload) => {
  // Single-line JSON log for easy ingestion by log aggregators
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    code,
    message,
    context,
  };

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(entry));
};

export const logger = {
  info(message: string, context?: Record<string, unknown>) {
    log({ level: "info", message, context });
  },
  warn(message: string, context?: Record<string, unknown>) {
    log({ level: "warn", message, context });
  },
  error(message: string, code?: string, context?: Record<string, unknown>) {
    log({ level: "error", message, code, context });
  },
  fatal(message: string, code?: string, context?: Record<string, unknown>) {
    log({ level: "fatal", message, code, context });
  },
};

