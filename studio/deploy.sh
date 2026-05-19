#!/usr/bin/env bash
# Despliegue del Studio de Sanity en pilarbernabe-platform.sanity.studio
# (hosting gratuito gestionado por Sanity — alternativa a montarlo en Dokploy bajo admin.pilarbernabe.es).
#
# Uso:
#   cd studio && bash deploy.sh
#
# Idempotente: si ya hay una versión desplegada, sobreescribe respetando el hostname.

set -euo pipefail

HOSTNAME="pilarbernabe-platform"
PROJECT_ID="6hy8kz7f"
DATASET="production"
STUDIO_URL="https://${HOSTNAME}.sanity.studio"
MANAGE_URL="https://www.sanity.io/manage/project/${PROJECT_ID}"

if [[ ! -f sanity.config.js ]]; then
  echo "❌ Ejecuta este script desde dentro del directorio studio/." >&2
  exit 1
fi

echo "── 1/5  Pre-flight ───────────────────────────────────────────"
node --version
[[ -d node_modules/sanity ]] || { echo "Instalando dependencias…"; npm install; }
[[ -f .env ]] || { echo "❌ Falta studio/.env con SANITY_STUDIO_PROJECT_ID y SANITY_STUDIO_DATASET." >&2; exit 1; }
grep -q "SANITY_STUDIO_PROJECT_ID=${PROJECT_ID}" .env || {
  echo "❌ studio/.env no apunta a project ${PROJECT_ID}." >&2; exit 1;
}

echo "── 2/5  Login Sanity (abre navegador si no hay sesión) ──────"
npx --no-install sanity login

echo "── 3/5  Build del Studio ────────────────────────────────────"
npx --no-install sanity build --yes

echo "── 4/5  Deploy a ${STUDIO_URL} ──────────────────────────────"
# --no-build porque ya hicimos build; --studio-host fija el subdominio.
npx --no-install sanity deploy --no-build --studio-host "${HOSTNAME}"

echo "── 5/5  Done ─────────────────────────────────────────────────"
cat <<EOF

✅ Studio publicado en: ${STUDIO_URL}

Acciones manuales pendientes (≈5 min):
  • CORS Origins → ${MANAGE_URL}/api
      añadir, con credentials desactivado, estos orígenes:
        https://pilarbernabe.es
        https://www.pilarbernabe.es
        https://staging.pilarbernabe.es  (si existe)
        http://localhost:5173
        http://localhost:4173
  • Members → ${MANAGE_URL}/members
      invitar al equipo editor (rol "Editor" basta; "Administrator" solo para Javi).
  • Dataset visibility → ${MANAGE_URL}/datasets
      confirmar que "${DATASET}" está en "Private" si todavía no se ha cambiado
      (contexto político: drafts no deben filtrarse vía GROQ público).

Tras invitar miembros, ellos reciben mail y acceden directo a ${STUDIO_URL}.

EOF
