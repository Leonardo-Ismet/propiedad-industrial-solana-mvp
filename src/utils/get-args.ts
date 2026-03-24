import process from 'node:process'

export interface Args {
  template?: string
  [key: string]: string | undefined
}

export function getArgs(): Args {
  const args: Args = {}
  const argv = process.argv.slice(2)

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true'
      args[key] = value
    }
  }

  return args
}
