#!/usr/bin/env bash
# Script de setup inicial del Studio.
# Ejecutar UNA VEZ desde el directorio studio/.
# Requiere node 18+ y npm.

set -e

echo "── 1. Instalar dependencias del Studio ─────────────────────"
npm install

echo "── 2. Autenticación Sanity (abre el navegador) ─────────────"
npx sanity login

echo "── 3. Cargar datos iniciales en el dataset 'production' ────"
echo "    (categorías, vídeos, episodios, testimonios, singletons)"
npx sanity dataset import seed.ndjson production --replace

echo "── 4. Desplegar el Studio a un subdominio sanity.studio ────"
echo "    Cuando pregunte el hostname, propón: pilarbernabe-platform"
npx sanity deploy

echo ""
echo "✅ Setup completado."
echo "El Studio queda accesible en https://pilarbernabe-platform.sanity.studio"
echo ""
echo "Próximos pasos manuales:"
echo "  • Sanity Manage > API > CORS Origins: añadir los 4 dominios + localhost"
echo "  • Sanity Manage > Members: invitar a los 3 editores"
echo "  • Dokploy > app plataforma > Environment: añadir VITE_SANITY_PROJECT_ID y VITE_SANITY_DATASET"
