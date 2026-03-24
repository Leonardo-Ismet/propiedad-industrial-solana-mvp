import { type Template, TemplateSchema } from './template-schema.js'

const TEMPLATES_REGISTRY = {
  nextjs: {
    description: 'Full-stack dApp with Next.js frontend',
    features: [
      { description: 'React framework for production', name: 'Next.js' },
      { description: 'Type-safe development', name: 'TypeScript' },
      { description: 'Phantom, Magic Eden support', name: 'Wallet Integration' },
      { description: 'Backend and database', name: 'Supabase' },
    ],
    name: 'nextjs',
    repo: 'https://github.com/Leonardo-Ismet/create-solana-dapp',
  },
  starter: {
    description: 'Basic Solana dApp starter template',
    features: [
      { description: 'Rust smart contract framework', name: 'Anchor Framework' },
      { description: 'JavaScript SDK for Solana', name: 'Solana Web3.js' },
      { description: 'Basic IP registration on-chain', name: 'IP Registration' },
    ],
    name: 'starter',
    repo: 'https://github.com/Leonardo-Ismet/create-solana-dapp',
  },
  turborepo: {
    description: 'Monorepo structure with Turborepo',
    features: [
      { description: 'Monorepo management', name: 'Turborepo' },
      { description: 'UI, contracts, shared utilities', name: 'Multiple Packages' },
      { description: 'Caching and incremental builds', name: 'Optimized Builds' },
    ],
    name: 'turborepo',
    repo: 'https://github.com/Leonardo-Ismet/create-solana-dapp',
  },
}

/**
 * Fetch template data from registry
 * @param templateName Name of the template
 * @returns Template data
 */
export async function fetchTemplateData(templateName: string): Promise<Template> {
  const templateData = TEMPLATES_REGISTRY[templateName as keyof typeof TEMPLATES_REGISTRY]

  if (!templateData) {
    throw new Error(`Template "${templateName}" not found. Available: ${Object.keys(TEMPLATES_REGISTRY).join(', ')}`)
  }

  // Validate against schema
  return TemplateSchema.parse(templateData)
}

/**
 * Get all available templates
 */
export async function getAllTemplates(): Promise<Template[]> {
  const templates = await Promise.all(Object.keys(TEMPLATES_REGISTRY).map((name) => fetchTemplateData(name)))

  return templates
}
