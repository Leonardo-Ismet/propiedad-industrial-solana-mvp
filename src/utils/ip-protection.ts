/**
 * Utilities for intellectual property protection
 */

import { z } from 'zod'

export enum IPType {
  COPYRIGHT = 'copyright',
  DESIGN = 'design',
  PATENT = 'patent',
  TRADE_SECRET = 'trade_secret',
  TRADEMARK = 'trademark',
}

export const IPRegistrationSchema = z.object({
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  creator: z.string().min(32).max(44), // Solana public key format
  description: z.string().optional(),
  expiresAt: z.date().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  tags: z.string().array().optional(),
  title: z.string().min(1, 'Title is required'),
  type: z.nativeEnum(IPType),
})

export type IPRegistration = z.infer<typeof IPRegistrationSchema>

/**
 * Generate a hash for IP content (before blockchain registration)
 */
export async function generateContentHash(content: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(content)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = [...new Uint8Array(hashBuffer)]
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Format IP metadata for blockchain storage
 */
export function formatIPMetadata(registration: IPRegistration): string {
  return JSON.stringify({
    createdAt: registration.createdAt.toISOString(),
    creator: registration.creator,
    description: registration.description,
    expiresAt: registration.expiresAt?.toISOString(),
    metadata: registration.metadata || {},
    tags: registration.tags || [],
    title: registration.title,
    type: registration.type,
  })
}

/**
 * Validate IP registration data
 */
export function validateIPRegistration(data: unknown): IPRegistration {
  return IPRegistrationSchema.parse(data)
}
