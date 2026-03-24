import { Keypair } from '@solana/web3.js'
import { describe, expect, it } from 'vitest'
import { formatIPMetadata, generateContentHash, IPType, validateIPRegistration } from '../utils/ip-protection'

describe('IP Protection Utils', () => {
  it('should generate consistent content hash', async () => {
    const content = 'Test patent document'
    const hash1 = await generateContentHash(content)
    const hash2 = await generateContentHash(content)

    expect(hash1).toBe(hash2)
    expect(hash1.length).toBe(64) // SHA-256 hex length
  })

  it('should format IP metadata correctly', () => {
    const keypair = Keypair.generate()
    const registration = {
      createdAt: new Date('2025-03-22'),
      creator: keypair.publicKey.toString(),
      description: 'A novel approach to contract verification',
      title: 'Smart Contract Security',
      type: IPType.PATENT as const,
    }

    const formatted = formatIPMetadata(registration)
    const parsed = JSON.parse(formatted)

    expect(parsed.title).toBe('Smart Contract Security')
    expect(parsed.type).toBe('patent')
    expect(parsed.creator).toBe(keypair.publicKey.toString())
  })

  it('should validate IP registration data', () => {
    const keypair = Keypair.generate()
    const validData = {
      creator: keypair.publicKey.toString(),
      title: 'AI-Powered IP Detection',
      type: IPType.TRADEMARK,
    }

    const result = validateIPRegistration(validData)

    expect(result.title).toBe('AI-Powered IP Detection')
    expect(result.type).toBe(IPType.TRADEMARK)
  })

  it('should throw on invalid IP registration data', () => {
    const invalidData = {
      // Missing required fields
      type: 'unknown',
    }

    expect(() => validateIPRegistration(invalidData)).toThrow()
  })
})
