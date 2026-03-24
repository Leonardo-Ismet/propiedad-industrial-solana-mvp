import { execSync } from 'node:child_process'

export function parseVersion(command: string, regex: RegExp): string {
  const output = execSync(command, { stdio: ['ignore', 'pipe', 'ignore'] }).toString()
  const match = regex.exec(output)
  if (!match?.[1]) {
    throw new Error(`Unable to parse version: ${output.trim()}`)
  }
  return match[1]
}
