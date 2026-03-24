import { describe, expect, it } from 'vitest'
import { getArgs } from '../utils/get-args'

describe('getArgs', () => {
  it('should return default values', () => {
    const args = getArgs()

    expect(args).toBeDefined()
    expect(typeof args).toBe('object')
  })

  it('should parse command line arguments', () => {
    process.argv = ['node', 'index.ts', '--template', 'nextjs']

    const args = getArgs()

    expect(args.template).toBe('nextjs')
  })
})
