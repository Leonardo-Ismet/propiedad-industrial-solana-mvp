/**
 * Application constants
 */

// Package info
export const APP_NAME = 'Taller Industrial MVP'
export const APP_VERSION = '1.0.0'
export const APP_AUTHOR = 'Leonardo Ismét'

// Solana networks
export const SOLANA_NETWORKS = ['devnet', 'testnet', 'mainnet-beta'] as const
export const DEFAULT_SOLANA_NETWORK = 'devnet'

// RPC endpoints
export const RPC_ENDPOINTS = {
  devnet: 'https://api.devnet.solana.com',
  'mainnet-beta': 'https://api.mainnet-beta.solana.com',
  testnet: 'https://api.testnet.solana.com',
} as const

// IP types
export const IP_TYPES = {
  COPYRIGHT: 'copyright',
  DESIGN: 'design',
  PATENT: 'patent',
  TRADE_SECRET: 'trade_secret',
  TRADEMARK: 'trademark',
} as const

// File size limits
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const MAX_METADATA_SIZE = 1 * 1024 * 1024 // 1MB

// Timeout values (ms)
export const TIMEOUT_SHORT = 5000 // 5 seconds
export const TIMEOUT_MEDIUM = 30_000 // 30 seconds
export const TIMEOUT_LONG = 120_000 // 2 minutes

// Pagination defaults
export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 20
export const MAX_LIMIT = 100

// Cache TTL (seconds)
export const CACHE_TTL_SHORT = 60 // 1 minute
export const CACHE_TTL_MEDIUM = 300 // 5 minutes
export const CACHE_TTL_LONG = 3600 // 1 hour

// Templates
export const TEMPLATES = ['starter', 'nextjs', 'turborepo'] as const
export const DEFAULT_TEMPLATE = 'starter'

// Messages
export const MESSAGES = {
  ERROR: 'An error occurred',
  INVALID_INPUT: 'Invalid input provided',
  NOT_IMPLEMENTED: 'This feature is not yet implemented',
  RESOURCE_NOT_FOUND: 'Resource not found',
  SUCCESS: 'Operation completed successfully',
  UNAUTHORIZED: 'You are not authorized to perform this action',
} as const
