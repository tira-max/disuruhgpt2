// Log levels
export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

// Logger class
export class Logger {
  private static readonly LOG_LEVELS = {
    [LogLevel.DEBUG]: 0,
    [LogLevel.INFO]: 1,
    [LogLevel.WARN]: 2,
    [LogLevel.ERROR]: 3,
  }

  private static readonly LOG_COLORS = {
    [LogLevel.DEBUG]: "\x1b[36m", // Cyan
    [LogLevel.INFO]: "\x1b[32m", // Green
    [LogLevel.WARN]: "\x1b[33m", // Yellow
    [LogLevel.ERROR]: "\x1b[31m", // Red
    RESET: "\x1b[0m", // Reset
  }

  private static readonly MIN_LOG_LEVEL = process.env.LOG_LEVEL
    ? (process.env.LOG_LEVEL.toUpperCase() as LogLevel)
    : LogLevel.DEBUG

  private static shouldLog(level: LogLevel): boolean {
    return this.LOG_LEVELS[level] >= this.LOG_LEVELS[this.MIN_LOG_LEVEL]
  }

  private static formatMessage(level: LogLevel, message: string, context?: string): string {
    const timestamp = new Date().toISOString()
    const contextStr = context ? `[${context}] ` : ""
    return `[${timestamp}] ${level} ${contextStr}${message}`
  }

  private static log(level: LogLevel, message: string, context?: string, data?: any): void {
    if (!this.shouldLog(level)) return

    const formattedMessage = this.formatMessage(level, message, context)

    if (process.env.NODE_ENV === "development") {
      // Colorized output in development
      console.log(`${this.LOG_COLORS[level]}${formattedMessage}${this.LOG_COLORS.RESET}`)
    } else {
      // Plain output in production
      console.log(formattedMessage)
    }

    if (data) {
      console.log(data)
    }

    // In a real application, you might want to send logs to a service like Sentry, Loggly, etc.
  }

  static debug(message: string, context?: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, context, data)
  }

  static info(message: string, context?: string, data?: any): void {
    this.log(LogLevel.INFO, message, context, data)
  }

  static warn(message: string, context?: string, data?: any): void {
    this.log(LogLevel.WARN, message, context, data)
  }

  static error(message: string, context?: string, error?: Error, data?: any): void {
    this.log(LogLevel.ERROR, message, context, {
      error: error ? { message: error.message, stack: error.stack } : undefined,
      data,
    })
  }
}
