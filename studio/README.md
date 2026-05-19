# Sanity Studio — Pilar Bernabé Plataforma

Panel de administración de contenidos de la plataforma. Aquí el equipo edita los vídeos y categorías que se ven en `pilarbernabe.es`.

## Primera vez (Javi)

```bash
cd studio
cp .env.example .env
# Editar .env y poner el SANITY_STUDIO_PROJECT_ID real
npm install
npx sanity login        # OAuth con la cuenta dueña del proyecto
npx sanity deploy       # Pregunta subdominio: pilarbernabe-platform
```

Tras `deploy`, el Studio queda accesible en:
**https://pilarbernabe-platform.sanity.studio**

## Dev local

```bash
npm run dev    # http://localhost:3333
```

## Schemas

- `video` — Vídeos del catálogo (título, póster, duración, categoría, descripción, URL externa opcional).
- `categoria` — Categorías para clasificar vídeos (Barrio, Movilidad, etc.).

## Añadir un editor nuevo

1. https://www.sanity.io/manage > proyecto > Members > Invite.
2. Plan free permite **hasta 3 usuarios** incluyendo el dueño.
3. Si superas 3, se sube a plan Team ($99/mes).

## Despliegues posteriores del Studio

Solo si cambias los schemas o la config:

```bash
npx sanity deploy
```

Los cambios de **contenido** (vídeos, categorías) no requieren redeploy del Studio — son ediciones en vivo.
