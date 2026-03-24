# Sistema Automatizado de Validación

Este documento describe cómo se valida y corrige automáticamente el proyecto.

## Scripts Disponibles

### Validación Manual

```bash
# Ejecutar validación completa
npm run validate

# Ejecutar validación y correcciones automáticas
npm run validate:fix

# Validaciones individuales
npm run typecheck    # TypeScript type checking
npm run lint         # ESLint linting y auto-fix
npm run test         # Ejecutar tests
npm run build        # Compilar proyecto
```

## Validación Automática con Git Hooks

El proyecto utiliza **Lefthook** para ejecutar validaciones automáticamente antes de commits y pushes.

### Pre-commit Hooks
Se ejecutan ANTES de cada `git commit`:
- ✓ TypeScript type checking
- ✓ ESLint linting (con auto-fix)

### Pre-push Hooks
Se ejecutan ANTES de cada `git push`:
- ✓ Todos los tests deben pasar
- ✓ Build debe completarse exitosamente

### Configurar Git Hooks

```bash
# Instalar hooks (automático con npm prepare)
npm run prepare

# O manualmente
npx lefthook install
```

## Problemas Resueltos

### 1. **TypeScript Configuration**
- ✓ Cambiado `"module": "ESNext"` a `"module": "NodeNext"` en `tsconfig.json`
- ✓ Configurado `"moduleResolution": "nodenext"` para resolver módulos Node.js correctamente

### 2. **Type Casting en create-app.ts**
- ✓ Añadido type casting `as string` para resultados de `select()`
- ✓ Añadido type casting `as boolean` para resultados de `confirm()`

### 3. **Dependencias**
- ✓ Todas las dependencias necesarias instaladas (zod, vitest, @solana/web3.js, etc.)

## CI/CD Integration

Los errores de validación previenen:
- 🚫 Commits con code no validado
- 🚫 Pushes con tests fallando
- 🚫 Builds con errores de tipado

## Workflow Recomendado

```bash
# 1. Hacer cambios
# ... editar archivos ...

# 2. Validar cambios (opcional - se ejecuta automáticamente en commit)
npm run validate:fix

# 3. Commit
git add .
git commit -m "feat: descripción del cambio"  # Pre-commit hooks se ejecutan aquí

# 4. Push
git push  # Pre-push hooks se ejecutan aquí
```

## Troubleshooting

### Si los hooks no se ejecutan:
```bash
# Reinstalar hooks
npx lefthook install

# Verificar status
npx lefthook status
```

### Si necesitas saltarte los hooks (no recomendado):
```bash
# Commit sin hooks
git commit --no-verify

# Push sin hooks
git push --no-verify
```

### Para ver logs detallados:
```bash
# Habilitar debug
DEBUG=* npm run validate
```
