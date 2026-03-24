/**
 * Solana blockchain utilities
 */

import { Connection, Keypair, PublicKey } from '@solana/web3.js'

export interface SolanaConfig {
  network: 'devnet' | 'mainnet-beta' | 'testnet'
  rpcUrl?: string
}

/**
 * Get Solana RPC URL by network
 */
export function getRpcUrl(network: 'devnet' | 'mainnet-beta' | 'testnet'): string {
  const urls: Record<string, string> = {
    devnet: 'https://api.devnet.solana.com',
    'mainnet-beta': 'https://api.mainnet-beta.solana.com',
    testnet: 'https://api.testnet.solana.com',
  }

  return urls[network] || urls.devnet
}

/**
 * Create a Solana connection
 */
export function createConnection(config: SolanaConfig): Connection {
  const rpcUrl = config.rpcUrl || getRpcUrl(config.network)

  return new Connection(rpcUrl, 'confirmed')
}

/**
 * Validate Solana public key
 */
export function validatePublicKey(key: string): boolean {
  try {
    new PublicKey(key)
    return true
  } catch {
    return false
  }
}

/**
 * Generate a random keypair (for testing only)
 */
export function generateTestKeypair(): Keypair {
  return Keypair.generate()
}

/**
 * Get account balance in SOL
 */
export async function getAccountBalance(connection: Connection, publicKey: string): Promise<number> {
  try {
    const key = new PublicKey(publicKey)
    const lamports = await connection.getBalance(key)

    return lamports / 1e9 // Convert lamports to SOL
  } catch (error) {
    throw new Error(`Failed to get balance: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Request airdrop (devnet/testnet only)
 */
export async function requestAirdrop(connection: Connection, publicKey: string, amount: number = 1): Promise<string> {
  try {
    const key = new PublicKey(publicKey)
    const signature = await connection.requestAirdrop(key, amount * 1e9) // amount in SOL

    await connection.confirmTransaction(signature)

    return signature
  } catch (error) {
    throw new Error(`Airdrop failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
