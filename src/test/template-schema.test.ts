import { describe, expect, it } from 'vitest'
import { ProjectConfigSchema, TemplateSchema } from '../utils/template-schema'

describe('TemplateSchema', () => {
  it('should validate valid template data', () => {
    const template = {
      author: 'test',
      description: 'Test template',
      name: 'starter',
    }

    const result = TemplateSchema.parse(template)

    expect(result.name).toBe('starter')
  })

  it('should fail on invalid template data', () => {
    const template = {
      description: 'Test template',
    }

    expect(() => TemplateSchema.parse(template)).toThrow()
  })
})

describe('ProjectConfigSchema', () => {
  it('should validate valid project config', () => {
    const config = {
      name: 'my-project',
      solanaNetwork: 'devnet' as const,
      template: 'starter',
    }

    const result = ProjectConfigSchema.parse(config)

    expect(result.name).toBe('my-project')
    expect(result.solanaNetwork).toBe('devnet')
  })

  it('should fail on invalid project name', () => {
    const config = {
      name: 'My Project', // Invalid - has spaces and uppercase
      template: 'starter',
    }

    expect(() => ProjectConfigSchema.parse(config)).toThrow()
  })
})
