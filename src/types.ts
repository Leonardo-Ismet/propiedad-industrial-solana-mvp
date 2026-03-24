/**
 * Global type definitions
 */

/**
 * Standard API response format
 */
export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
  timestamp: string
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  limit: number
  offset?: number
  page: number
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  hasMore: boolean
  items: T[]
  limit: number
  page: number
  total: number
}

/**
 * Application error
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public statusCode: number = 500,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

/**
 * Validation error
 */
export class ValidationError extends AppError {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message, 'VALIDATION_ERROR', 400)
    this.name = 'ValidationError'
  }
}

/**
 * Not found error
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}

/**
 * Unauthorized error
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401)
    this.name = 'UnauthorizedError'
  }
}
