/**
 * Utility functions for package manager detection and execution
 */

export type PackageManager = 'bun' | 'npm' | 'pnpm' | 'yarn'

/**
 * Detect which package manager is available
 */
export function detectPackageManager(): PackageManager {
  try {
    if (require.resolve('pnpm')) return 'pnpm'
  } catch {
    // Continue
  }

  try {
    if (require.resolve('yarn')) return 'yarn'
  } catch {
    // Continue
  }

  try {
    if (require.resolve('bun')) return 'bun'
  } catch {
    // Continue
  }

  return 'npm'
}

/**
 * Get the install command for a package manager
 */
export function getInstallCommand(pm: PackageManager): string {
  const commands: Record<PackageManager, string> = {
    bun: 'bun install',
    npm: 'npm install',
    pnpm: 'pnpm install',
    yarn: 'yarn install',
  }

  return commands[pm]
}

/**
 * Get the add package command
 */
export function getAddPackageCommand(pm: PackageManager, packages: string[]): string {
  const commands: Record<PackageManager, string> = {
    bun: `bun add ${packages.join(' ')}`,
    npm: `npm install ${packages.join(' ')}`,
    pnpm: `pnpm add ${packages.join(' ')}`,
    yarn: `yarn add ${packages.join(' ')}`,
  }

  return commands[pm]
}

/**
 * Get the dev dependency command
 */
export function getAddDevCommand(pm: PackageManager, packages: string[]): string {
  const commands: Record<PackageManager, string> = {
    bun: `bun add -d ${packages.join(' ')}`,
    npm: `npm install --save-dev ${packages.join(' ')}`,
    pnpm: `pnpm add -D ${packages.join(' ')}`,
    yarn: `yarn add --dev ${packages.join(' ')}`,
  }

  return commands[pm]
}
