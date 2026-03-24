# 📋 Registro de Problemas Encontrados y Soluciones

## Problemas Identificados

### 1. **Errores de YAML en Workflows** 🔴

#### Problema
Los archivos de workflow tenían sintaxis YAML inválida:
- `.github/workflows/ci.yml` - Error en línea 2
- `.github/workflows/codeql.yml` - Error en línea 2
- `.github/workflows/release.yml` - Error en línea 2

**Mensaje de Error**: "Expected a scalar value, a sequence, or a mapping"

#### Causa
Uso incorrecto de sintaxis inline arrays:
```yaml
# ❌ INCORRECTO
branches: [main, develop]
```

#### Solución
```yaml
# ✅ CORRECTO
branches:
  - main
  - develop
```

#### Archivos Modificados
- `ci.yml` - Línea 2: Convertidos arrays inline a sintaxis de lista
- `codeql.yml` - Línea 2: Convertidos arrays inline a sintaxis de lista
- `release.yml` - Línea 2: Convertido array inline a sintaxis de lista

---

### 2. **Configuración Incorrecta de TypeScript** 🔴

#### Problema
```
La opción "module" debe establecerse en "NodeNext" cuando "moduleResolution" está establecido en "NodeNext".
No se puede especificar la opción "--resolveJsonModule" cuando "moduleResolution" está establecido en "classic".
```

#### Causa
Incompatibilidad entre opciones del compilador de TypeScript.

#### Solución
En `tsconfig.json`:
```json
{
  "compilerOptions": {
    "module": "NodeNext",        // ✅ Cambio de "ESNext"
    "moduleResolution": "nodenext"
  }
}
```

---

### 3. **Resolución de Módulos Node.js** 🔴

#### Problema
No se encontraban módulos nativos de Node.js:
- "fs/promises"
- "path"
- "zod"
- "vitest"
- "@solana/web3.js"

```
No se encuentra el módulo "fs/promises". ¿Pretendía establecer la opción 
"moduleResolution" en "nodenext" o agregar alias a la opción "paths"?
```

#### Causa
`moduleResolution` no estaba configurado correctamente

#### Solución
Configuración de `tsconfig.json`:
```json
{
  "compilerOptions": {
    "moduleResolution": "nodenext"  // ✅ Permite resolver módulos Node.js
  }
}
```

---

### 4. **Type Casting Incorrecto en create-app.ts** 🔴

#### Problema
Las funciones `select()` y `confirm()` de `@clack/prompts` retornan tipos union:

```typescript
// ❌ Tipos retornados
await select(...) // Returns: string | symbol
await confirm(...) // Returns: boolean | symbol
```

**Error**:
```
El tipo 'string | symbol' no se puede asignar al tipo 'string'
El tipo 'boolean | symbol' no se puede asignar al tipo 'boolean'
```

#### Causa
Las funciones de prompts pueden retornar `symbol` para casos especiales (cancelacion, etc)

#### Solución
Necesario hacer type casting explícito:
```typescript
// ✅ Con type casting
const projectName = (await select(...)) as string;
const supabaseEnabled = (await confirm(...)) as boolean;
```

**Archivos Modificados**: `create-app.ts`

---

### 5. **Type Inference para Buffer** 🔴

#### Problema
```
El parámetro 'char' tiene un tipo 'any' implícitamente.
```

#### Causa
Event listener sin tipado explícito

#### Solución
```typescript
// ❌ Antes
process.stdin.on("data", (char) => { ... })

// ✅ Después
process.stdin.on("data", (char: Buffer) => { ... })
```

---

### 6. **Tipado de Objetos Dinámicos** 🔴

#### Problema
```typescript
const packageJson = { ... };
if (config.supabaseEnabled) {
    packageJson.dependencies["@supabase/supabase-js"] = "^2.48.0";
    // ❌ Error: Property doesn't exist
}
```

**Error**:
```
El elemento tiene un tipo "any" de forma implícita porque la expresión 
de tipo "@supabase/supabase-js" no se puede usar para indexar el tipo
```

#### Causa
El objeto no estaba tipado para permitir propiedades dinámicas

#### Solución
Tipado explícito con `Record`:
```typescript
const packageJson: {
  name: string;
  version: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
} = { ... };
```

---

### 7. **Manejo de fs.stat() Asincrónico** 🟡

#### Problema
```typescript
// ❌ Incorrecto: fs.stat no es una función sincrónica
if (fs.stat(projectDir)) {
    // Nunca funciona correctamente
}
```

#### Causa
`fs.stat()` es asincrónica y retorna una Promise, no un booleano

#### Solución
```typescript
// ✅ Correcto: usar await con try-catch
try {
  await fs.stat(projectDir);
  const exists = await confirm({...});
  // El directorio existe
} catch {
  // El directorio no existe, continuar
}
```

---

## Resumen de Cambios

| Archivo | Cambios | Severidad |
|---------|---------|-----------|
| `tsconfig.json` | Cambio de "module" a "NodeNext" | 🔴 Crítico |
| `.github/workflows/ci.yml` | Sintaxis YAML | 🔴 Crítico |
| `.github/workflows/codeql.yml` | Sintaxis YAML | 🔴 Crítico |
| `.github/workflows/release.yml` | Sintaxis YAML | 🔴 Crítico |
| `src/utils/create-app.ts` | 5 correcciones de tipos | 🔴 Crítico |
| `src/utils/ip-protection.ts` | Necesita instalación de deps | 🟡 Advertencia |
| `test/ip-protection.test.ts` | Necesita instalación de deps | 🟡 Advertencia |

---

## Validación

Todos los problemas son ahora detectados automáticamente por:
1. **TypeScript Compiler** (`npm run typecheck`)
2. **ESLint** (`npm run lint`)
3. **Git Hooks** (pre-commit, pre-push)
4. **CI/CD Pipelines** (GitHub Actions)

Para verificar:
```bash
npm run typecheck  # Detecta errores de TypeScript
npm run lint       # Detecta y corrige errores de linting
npm run test       # Ejecuta tests
npm run build      # Compila el proyecto
```

---

## Futura Prevención 🛡️

El sistema de validación automatizado previene que estos problemas se repitan:

✅ **Pre-commit hooks** validan tipos y linting antes de commits
✅ **Pre-push hooks** validan tests y build antes de pushes
✅ **GitHub Actions** ejecuta validación en cada PR y push
✅ **Type checking** continuo en el IDE

---

*Última actualización: 2026-03-22*
*Sistema de validación automatizado implementado*
