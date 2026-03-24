# Developer Guide

Guía para desarrolladores que deseen trabajar con **Taller Industrial MVP**.

## 📋 Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Configuración Local](#configuración-local)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Commands](#commands)
5. [Debugging](#debugging)
6. [Testing](#testing)
7. [Build & Deploy](#build--deploy)
8. [Troubleshooting](#troubleshooting)

## Requisitos

- **Node.js** 18.0.0 o superior
- **pnpm** 10.0.0 o superior
- **Git**
- **TypeScript** 5.6.2+
- Editor recomendado: **VS Code**

### Verificar Versions

```bash
node --version     # v18.0.0 o superior
pnpm --version     # 10.0.0 o superior
git --version      # 2.30.0 o superior
```

## Configuración Local

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Leonardo-Ismet/taller-industrial-mvp.git
cd taller-industrial-mvp
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Copiar Archivo de Configuración

```bash
cp .env.example .env.local
# Editar .env.local con tus valores
```

### 4. Verificar Setup

```bash
pnpm build
pnpm test
pnpm lint
```

## Estructura del Proyecto

```
src/
├── bin/
│   └── index.ts              # CLI entry point executable
├── utils/
│   ├── create-app.ts         # Main orchestrator logic
│   ├── get-args.ts           # Parse CLI arguments
│   ├── template-schema.ts    # Zod validation schemas
│   ├── fetch-template-data.ts
│   ├── search-and-replace.ts # File manipulation utilities
│   ├── package-manager.ts    # Package manager detection
│   ├── ip-protection.ts      # IP registration utilities
│   └── solana-utils.ts       # Blockchain utilities
├── constants.ts              # Application constants
├── types.ts                  # Global type definitions
└── index.ts                  # Main export

test/
├── get-args.test.ts
├── template-schema.test.ts
└── ip-protection.test.ts

.github/workflows/
└── ci.yml                    # GitHub Actions CI/CD

build artifacts/
├── dist/                     # Built files (generated)
├── coverage/                 # Test coverage (generated)
└── node_modules/             # Dependencies
```

## Commands

### Development

```bash
# Build in watch mode
pnpm build:watch

# Run tests in watch mode
pnpm dev

# Type check
pnpm typecheck

# Lint and format
pnpm lint
```

### Production

```bash
# Build for production
pnpm build

# Run full test suite
pnpm test

# Test with coverage
pnpm test -- --coverage
```

### Docker

```bash
# Build Docker image
docker build -t industrial-mvp:latest .

# Run container
docker run -it industrial-mvp:latest
```

## Debugging

### VS Code Debug Configuration

Crear `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run", "--inspect-brk"],
      "console": "integratedTerminal"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug CLI",
      "program": "${workspaceFolder}/dist/bin/index.cjs",
      "console": "integratedTerminal"
    }
  ]
}
```

### Debug Output

```bash
# Verbose logging
DEBUG=* pnpm dev

# TypeScript debug
node --inspect-brk ./node_modules/.bin/tsx src/index.ts
```

## Testing

### Ejecutar Tests

```bash
# Una sola ejecución
pnpm test

# Watch mode
pnpm dev

# Specific test file
pnpm test -- get-args.test.ts

# With coverage
pnpm test -- --coverage
```

### Escribir Tests

Ubicación: `test/` con extensión `.test.ts`

```typescript
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { myFunction } from "../src/my-module";

describe("myModule", () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it("should do something", () => {
    const result = myFunction("input");
    expect(result).toBe("expected");
  });

  it("should handle errors", () => {
    expect(() => myFunction()).toThrow();
  });
});
```

## Build & Deploy

### Build Process

```bash
# Build TypeScript to JavaScript
pnpm build

# Output files in dist/
# - dist/index.js (ESM)
# - dist/index.cjs (CommonJS)
# - dist/index.d.ts (Type definitions)
```

### Pre-release Checklist

- [ ] All tests pass: `pnpm test`
- [ ] Linting passes: `pnpm lint`
- [ ] Coverage >= 80%
- [ ] Build succeeds: `pnpm build`
- [ ] README updated
- [ ] CHANGELOG updated
- [ ] Versions updated in package.json

### Release Steps

```bash
# Create changeset
pnpm changeset

# Update versions
pnpm changeset version

# Publish
pnpm changeset publish

# Push to git
git push origin main --follow-tags
```

## Troubleshooting

### pnpm issues

```bash
# Clear cache
pnpm store prune

# Reinstall dependencies
pnpm install --force

# Update pnpm
pnpm add -g pnpm@latest
```

### Build issues

```bash
# Clean build
pnpm clean
pnpm install
pnpm build

# Check for TypeScript errors
pnpm typecheck
```

### Test failures

```bash
# Run tests with verbose output
pnpm test -- --reporter=verbose

# Debug specific test
pnpm test -- --inspect-brk get-args.test.ts
```

### Git issues

```bash
# Reset to clean state
git clean -fd
git reset --hard origin/main

# Reinstall
pnpm install
```

## Performance Tips

1. **Use pnpm**: Es más rápido que npm/yarn
2. **Incremental Builds**: `pnpm build:watch`
3. **Fast Tests**: Watch mode `pnpm dev`
4. **Parallel Testing**: Vitest ejecuta tests en paralelo por defecto
5. **Code Coverage**: Agrega pequeño overhead, usa solo cuando sea necesario

## Editor Setup

### VS Code Extensions

```json
{
  "recommendations": [
    "denoland.vscode-deno",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "firsttris.vscode-jest-runner",
    "GraphQL.vscode-graphql"
  ]
}
```

### EditorConfig (.editorconfig)

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{ts,tsx,js,jsx}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vitest Documentation](https://vitest.dev)
- [Solana Documentation](https://docs.solana.com)
- [ESLint Configuration](https://eslint.org)
- [pnpm Documentation](https://pnpm.io)

## Getting Help

- Check [GitHub Issues](https://github.com/Leonardo-Ismet/taller-industrial-mvp/issues)
- Read [CONTRIBUTING.md](CONTRIBUTING.md)
- Ask in [GitHub Discussions](https://github.com/Leonardo-Ismet/taller-industrial-mvp/discussions)

---

¡Happy coding! 🚀
