import pc from 'picocolors'
import { createApp } from './utils/create-app.js'
import { getArgs } from './utils/get-args.js'

export async function main() {
  try {
    const args = getArgs()

    if (args.help) {
      console.info(`
${pc.bold('create-industrial-dapp')} - Create Solana dApps for industrial IP protection

${pc.bold('Usage:')}
  $ npx create-industrial-dapp [options]

${pc.bold('Options:')}
  --help          Show this help message
  --version       Show version
  --template      Specify template name (starter, nextjs, turborepo)

${pc.bold('Example:')}
  $ npx create-industrial-dapp --template nextjs
      `)
      process.exit(0)
    }

    if (args.version) {
      const pkg = JSON.parse(await import('node:fs').then((m) => m.promises.readFile('./package.json', 'utf8')))
      console.info(pkg.version)
      process.exit(0)
    }

    await createApp(args)
  } catch (error) {
    console.error(pc.red('Error:'), error instanceof Error ? error.message : error)
    process.exit(1)
  }
}
