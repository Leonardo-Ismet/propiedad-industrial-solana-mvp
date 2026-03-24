import * as fs from 'node:fs/promises'
import * as path from 'node:path'

export interface SearchReplaceOptions {
  pattern: string | RegExp
  recursive?: boolean
  replacement: string
}

/**
 * Search and replace text in files
 * @param filePath Path to file or directory
 * @param options Search and replace options
 */
export async function searchAndReplace(filePath: string, options: SearchReplaceOptions): Promise<number> {
  const stats = await fs.stat(filePath)
  let filesModified = 0

  if (stats.isDirectory() && options.recursive) {
    const entries = await fs.readdir(filePath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(filePath, entry.name)

      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        filesModified += await searchAndReplace(fullPath, options)
      } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
        filesModified += await searchAndReplaceInFile(fullPath, options)
      }
    }
  } else if (stats.isFile()) {
    filesModified = await searchAndReplaceInFile(filePath, options)
  }

  return filesModified
}

async function searchAndReplaceInFile(filePath: string, options: SearchReplaceOptions): Promise<number> {
  const content = await fs.readFile(filePath, 'utf8')
  const regex = typeof options.pattern === 'string' ? new RegExp(options.pattern, 'g') : options.pattern

  if (!regex.test(content)) {
    return 0
  }

  const newContent = content.replace(regex, options.replacement)

  await fs.writeFile(filePath, newContent, 'utf8')

  return 1
}
