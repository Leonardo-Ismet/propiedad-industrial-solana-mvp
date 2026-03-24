import { z } from 'zod'

export const TemplateSchema = z.object({
  author: z.string().optional(),
  description: z.string().optional(),
  name: z.string(),
})

export const ProjectConfigSchema = z.object({
  name: z.string().regex(/^[a-z0-9-]+$/, 'Project name must be lowercase, no spaces'),
  solanaNetwork: z.enum(['mainnet-beta', 'testnet', 'devnet', 'localnet']).optional(),
  supabaseEnabled: z.boolean().optional(),
  template: z.string(),
})

export type Template = z.infer<typeof TemplateSchema>
export type ProjectConfig = z.infer<typeof ProjectConfigSchema>
