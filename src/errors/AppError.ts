/**
 * Classes de erro customizadas
 */

export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super('VALIDATION_ERROR', message, 400, details);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class ParseError extends AppError {
  constructor(message: string, details?: unknown) {
    super('PARSE_ERROR', message, 400, details);
    Object.setPrototypeOf(this, ParseError.prototype);
  }
}

export class FileError extends AppError {
  constructor(message: string, details?: unknown) {
    super('FILE_ERROR', message, 400, details);
    Object.setPrototypeOf(this, FileError.prototype);
  }
}

export class ExportError extends AppError {
  constructor(message: string, details?: unknown) {
    super('EXPORT_ERROR', message, 500, details);
    Object.setPrototypeOf(this, ExportError.prototype);
  }
}

export class ConfigError extends AppError {
  constructor(message: string, details?: unknown) {
    super('CONFIG_ERROR', message, 400, details);
    Object.setPrototypeOf(this, ConfigError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, details?: unknown) {
    super('NOT_FOUND', message, 404, details);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
