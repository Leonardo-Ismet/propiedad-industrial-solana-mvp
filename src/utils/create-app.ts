import { confirm, intro, outro, select } from '@clack/prompts'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import pc from 'picocolors'
import { type ProjectConfig, ProjectConfigSchema } from './template-schema.js'

export interface CreateAppOptions {
  projectName?: string
  template?: string
  [key: string]: string | boolean | undefined
}

export async function createApp(options: CreateAppOptions) {
  intro(pc.bgCyan(pc.black(' Create Industrial dApp ')))

  try {
    // Get project name
    let projectName = options.projectName || 'industrial-dapp'
    if (projectName === 'industrial-dapp') {
      projectName = (await select({
        message: 'Choose a project name or press Enter for default (industrial-dapp):',
        options: [
          { label: 'industrial-dapp (default)', value: 'industrial-dapp' },
          { label: 'Enter custom name', value: 'custom' },
        ],
      })) as string

      if (projectName === 'custom') {
        projectName = await new Promise((resolve) => {
          process.stdout.write('Enter project name: ')
          let input = ''
          process.stdin.setRawMode(true)
          process.stdin.on('data', (char: Buffer) => {
            if (char.toString() === '\n') {
              process.stdin.setRawMode(false)
              resolve(input)
            } else {
              input += char
              process.stdout.write(char)
            }
          })
        })
      }
    }

    // Select template
    const selectedTemplate = options.template || (await selectTemplate())

    // Get Solana network
    const solanaNetwork = (await select({
      message: 'Select Solana network:',
      options: [
        { label: 'devnet (development)', value: 'devnet' },
        { label: 'testnet (testing)', value: 'testnet' },
        { label: 'mainnet-beta (production)', value: 'mainnet-beta' },
      ],
    })) as 'devnet' | 'mainnet-beta' | 'testnet'

    // Ask about Supabase integration
    const supabaseEnabled = (await confirm({
      initialValue: false,
      message: 'Enable Supabase integration for IP metadata storage?',
    })) as boolean

    // Create project config
    const config: ProjectConfig = {
      name: projectName,
      solanaNetwork,
      supabaseEnabled,
      template: selectedTemplate,
    }

    // Validate config
    const validatedConfig = ProjectConfigSchema.parse(config)

    // Create project directory
    const projectDir = path.resolve(process.cwd(), validatedConfig.name)

    try {
      await fs.stat(projectDir)
      const exists = await confirm({
        message: `Directory "${validatedConfig.name}" already exists. Overwrite?`,
      })

      if (!exists) {
        outro(pc.red('❌ Cancelled'))
        process.exit(0)
      }

      await fs.rm(projectDir, { recursive: true })
    } catch {
      // Directory doesn't exist, continue
    }

    await fs.mkdir(projectDir, { recursive: true })

    // Create basic project structure
    await createProjectStructure(projectDir, validatedConfig)

    outro(pc.green(`✅ Project created successfully at ${pc.bold(projectDir)}`))
  } catch (error) {
    outro(pc.red(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`))
    throw error
  }
}

async function selectTemplate(): Promise<string> {
  return (await select({
    message: 'Select a template:',
    options: [
      { label: 'Starter - Basic Solana dApp', value: 'starter' },
      { label: 'Next.js - Full-stack dApp with UI', value: 'nextjs' },
      { label: 'Turborepo - Monorepo structure', value: 'turborepo' },
    ],
  })) as string
}

async function createProjectStructure(projectDir: string, config: ProjectConfig) {
  // Create directories
  const dirs = ['src', 'public', 'tests']
  for (const dir of dirs) {
    await fs.mkdir(path.join(projectDir, dir), { recursive: true })
  }

  // Create package.json
  const packageJson: {
    dependencies: Record<string, string>
    description: string
    devDependencies: Record<string, string>
    name: string
    scripts: Record<string, string>
    type: string
    version: string
  } = {
    dependencies: {
      '@solana/spl-token': '^0.3.0',
      '@solana/web3.js': '^1.95.0',
    },
    description: 'Industrial dApp for IP protection on Solana',
    devDependencies: {
      eslint: '^9.12.0',
      typescript: '^5.6.2',
      vite: '^5.4.0',
      vitest: '^2.0.5',
    },
    name: config.name,
    scripts: {
      build: 'vite build',
      dev: 'vite',
      lint: 'eslint src',
      preview: 'vite preview',
      test: 'vitest',
    },
    type: 'module',
    version: '0.1.0',
  }

  if (config.supabaseEnabled) {
    packageJson.dependencies['@supabase/supabase-js'] = '^2.48.0'
  }

  await fs.writeFile(path.join(projectDir, 'package.json'), JSON.stringify(packageJson, undefined, 2))

  // Create README
  const readme = `# ${config.name}

Industrial IP Protection dApp on Solana

## Network
${config.solanaNetwork}

## Templates
Starter template for Solana dApps with IP protection features.

## Development

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## Building

\`\`\`bash
pnpm build
\`\`\`
`

  await fs.writeFile(path.join(projectDir, 'README.md'), readme)

  // Create main source file
  await fs.writeFile(
    path.join(projectDir, 'src', 'main.ts'),
    `// Main entry point for ${config.name}
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.${config.solanaNetwork}.solana.com", "confirmed");

console.log("Connected to Solana ${config.solanaNetwork}");
`,
  )
}
