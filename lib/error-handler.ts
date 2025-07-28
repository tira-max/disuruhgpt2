// Error types
export enum ErrorType {
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  VALIDATION = "VALIDATION",
  NOT_FOUND = "NOT_FOUND",
  DATABASE = "DATABASE",
  FILE_UPLOAD = "FILE_UPLOAD",
  EXTERNAL_SERVICE = "EXTERNAL_SERVICE",
  UNKNOWN = "UNKNOWN",
}

// Custom error class
export class AppError extends Error {
  type: ErrorType
  statusCode: number
  details?: any

  constructor(message: string, type: ErrorType, statusCode = 500, details?: any) {
    super(message)
    this.name = "AppError"
    this.type = type
    this.statusCode = statusCode
    this.details = details
  }
}

// Error handler
export class ErrorHandler {
  // Log error
  static logError(error: Error | AppError, context?: string): void {
    const timestamp = new Date().toISOString()
    const errorType = error instanceof AppError ? error.type : ErrorType.UNKNOWN
    const statusCode = error instanceof AppError ? error.statusCode : 500
    const details = error instanceof AppError ? error.details : undefined

    console.error(`[${timestamp}] ${context ? `[${context}] ` : ""}ERROR (${errorType}, ${statusCode}):`, error.message)

    if (details) {
      console.error("Details:", details)
    }

    console.error("Stack trace:", error.stack)
  }

  // Handle API error
  static handleApiError(error: Error | AppError): { statusCode: number; body: any } {
    if (error instanceof AppError) {
      return {
        statusCode: error.statusCode,
        body: {
          error: error.message,
          type: error.type,
          ...(error.details ? { details: error.details } : {}),
        },
      }
    }

    // Default error response
    return {
      statusCode: 500,
      body: {
        error: "An unexpected error occurred",
        type: ErrorType.UNKNOWN,
      },
    }
  }

  // Create authentication error
  static authenticationError(message = "Authentication required"): AppError {
    return new AppError(message, ErrorType.AUTHENTICATION, 401)
  }

  // Create authorization error
  static authorizationError(message = "You don't have permission to perform this action"): AppError {
    return new AppError(message, ErrorType.AUTHORIZATION, 403)
  }

  // Create validation error
  static validationError(message = "Validation failed", details?: any): AppError {
    return new AppError(message, ErrorType.VALIDATION, 400, details)
  }

  // Create not found error
  static notFoundError(message = "Resource not found"): AppError {
    return new AppError(message, ErrorType.NOT_FOUND, 404)
  }

  // Create database error
  static databaseError(message = "Database operation failed", details?: any): AppError {
    return new AppError(message, ErrorType.DATABASE, 500, details)
  }

  // Create file upload error
  static fileUploadError(message = "File upload failed", details?: any): AppError {
    return new AppError(message, ErrorType.FILE_UPLOAD, 500, details)
  }

  // Create external service error
  static externalServiceError(message = "External service error", details?: any): AppError {
    return new AppError(message, ErrorType.EXTERNAL_SERVICE, 502, details)
  }
}
