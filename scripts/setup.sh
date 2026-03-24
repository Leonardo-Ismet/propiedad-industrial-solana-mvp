#!/bin/bash

# Script para setup y validación completa del proyecto
# Este script instala dependencias y ejecuta validaciones

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║       Taller Industrial MVP - Setup & Validation          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Detectar package manager
if command -v pnpm &> /dev/null; then
    PM="pnpm"
    INSTALL_CMD="pnpm install"
elif command -v yarn &> /dev/null; then
    PM="yarn"
    INSTALL_CMD="yarn install"
else
    PM="npm"
    INSTALL_CMD="npm install"
fi

echo "📦 Package manager detectado: $PM"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. Install dependencies
echo "${BLUE}▶ Instalando dependencias...${NC}"
$INSTALL_CMD
echo "${GREEN}✓ Dependencias instaladas${NC}"
echo ""

# 2. Type checking
echo "${BLUE}▶ Verificando tipos TypeScript...${NC}"
if $PM run typecheck; then
  echo "${GREEN}✓ Type checking passed${NC}"
else
  echo "${RED}✗ Type checking failed${NC}"
  exit 1
fi
echo ""

# 3. Linting
echo "${BLUE}▶ Ejecutando ESLint...${NC}"
if $PM run lint; then
  echo "${GREEN}✓ Linting passed${NC}"
else
  echo "${RED}✗ Linting failed${NC}"
  exit 1
fi
echo ""

# 4. Tests
echo "${BLUE}▶ Ejecutando tests...${NC}"
if $PM run test; then
  echo "${GREEN}✓ Tests passed${NC}"
else
  echo "${RED}✗ Tests failed${NC}"
  exit 1
fi
echo ""

# 5. Build
echo "${BLUE}▶ Compilando proyecto...${NC}"
if $PM run build; then
  echo "${GREEN}✓ Build successful${NC}"
else
  echo "${RED}✗ Build failed${NC}"
  exit 1
fi
echo ""

# 6. Setup git hooks
echo "${BLUE}▶ Configurando git hooks con lefthook...${NC}"
if npx lefthook install > /dev/null 2>&1; then
    echo "${GREEN}✓ Git hooks configurados${NC}"
else
    echo "${YELLOW}⚠ No se pudo configurar lefthook, puede configurarse manualmente con: npx lefthook install${NC}"
fi
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "${GREEN}✓ Setup y validación completados correctamente!${NC}"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Próximos pasos:"
echo "  • Desarrollar: $PM run dev"
echo "  • Compilar: $PM run build"
echo "  • Tests: $PM run test"
echo "  • Validar: $PM run validate"
echo ""
