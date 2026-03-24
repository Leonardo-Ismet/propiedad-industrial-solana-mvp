#!/bin/bash

# Script de validación automática del proyecto
# Ejecuta type checking, linting y tests

set -e

echo "🔍 Iniciando validación del proyecto..."
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de errores
ERRORS=0

# 1. Type checking
echo "${YELLOW}▶ TypeScript Type Checking...${NC}"
if npm run typecheck > /dev/null 2>&1; then
  echo "${GREEN}✓ Type checking passed${NC}"
else
  echo "${RED}✗ Type checking failed${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 2. Linting
echo "${YELLOW}▶ ESLint Checking...${NC}"
if npm run lint > /dev/null 2>&1; then
  echo "${GREEN}✓ Linting passed${NC}"
else
  echo "${RED}✗ Linting failed${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Tests
echo "${YELLOW}▶ Running Tests...${NC}"
if npm run test > /dev/null 2>&1; then
  echo "${GREEN}✓ Tests passed${NC}"
else
  echo "${RED}✗ Tests failed${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 4. Build
echo "${YELLOW}▶ Building Project...${NC}"
if npm run build > /dev/null 2>&1; then
  echo "${GREEN}✓ Build passed${NC}"
else
  echo "${RED}✗ Build failed${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# Summary
echo "═════════════════════════════════════"
if [ $ERRORS -eq 0 ]; then
  echo "${GREEN}✓ All validations passed!${NC}"
  exit 0
else
  echo "${RED}✗ $ERRORS validation(s) failed${NC}"
  exit 1
fi
