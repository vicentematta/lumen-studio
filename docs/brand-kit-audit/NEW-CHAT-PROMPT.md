# Prompt para retomar en nuevo chat de Claude Code

## Instrucciones de uso

1. **En el terminal**, posicionarse en el proyecto:
   ```bash
   cd ~/Desktop/RIVERHAUS/Studio/lumen-studio
   ```

2. **Levantar servicios** (en otro terminal o background):
   ```bash
   npm run dev &
   ```
   Verificar: abrir `http://localhost:3000` y ver la home Riverhaus.

3. **Abrir Claude Code** desde el directorio del proyecto:
   ```bash
   claude
   ```

4. **Pegar el siguiente prompt como primer mensaje** (copy-paste todo lo que está entre las líneas):

---

```
Hola. Vengo continuando el proyecto Riverhaus (codename Lumen Studio).
Estado completo y contexto está en estos archivos del proyecto:

DEBES LEER PRIMERO, en este orden:
1. docs/brand-kit-audit/SESSION-HANDOFF.md  ← estado completo + cómo seguir
2. docs/brand-kit-audit/01-BRAND-KIT.md      ← decisiones de brand · paleta · tipografía
3. docs/brand-kit-audit/05-IMPLEMENTATION-PLAN.md ← plan original 12 fases

También consultar mi memoria personal:
- ~/.claude/projects/-Users-matiascruzat/memory/MEMORY.md

Estamos a mitad de una migración Vite SPA → Next.js 16.
Acabamos de cerrar M2d (services + dynamic routes funcionando).
Siguiente: M2e · /work + /work/[slug] dynamic routes (case studies).

NO ejecutes nada todavía. Lee primero esos archivos y dame:
1. Un resumen en 5 bullets del estado actual del proyecto.
2. El plan exacto para M2e (qué archivos crear, qué patrón seguir).
3. Cualquier duda o conflicto que veas en los docs antes de empezar.

Después de tu OK explícito, arrancas con M2e siguiendo el patrón M2d
(server fetchers en src/lib/queries/ → views en src/views/ →
app routes en app/(site)/work/...).

Gotchas críticos (también en SESSION-HANDOFF.md):
- NUNCA next build mientras next dev está activo (causa 500)
- Vite legacy ya está roto · es esperado · muere en M6
- Para letter-spacing override usar !tracking-[Xem] (! important)
- Sin AI attribution en commits · conventional commit format
```

---

## Variantes del prompt según situación

### Si querés cambiar de scope a otra cosa (no continuar M2e)

Reemplazar las últimas 2 frases con tu nuevo objetivo. Por ejemplo:

> "En lugar de seguir M2e, quiero arreglar primero [X]. Lee los archivos y propón cómo abordarlo."

### Si solo querés revisar / hablar (no codear)

Reemplazar con:

> "No vamos a codear todavía. Lee los archivos y vamos a conversar sobre [tema]. Sin tools de escritura por ahora."

### Si querés que arranque con tools delegation

Para tareas grandes que requieran múltiples agentes:

> "Para M2e usa el agent maestro · spawneá subagentes (explore, implementer, reviewer) si es necesario."

---

## Qué NO hacer en el nuevo chat

- ❌ No empezar a codear inmediato sin leer los handoff docs
- ❌ No correr `next build` si `next dev` está corriendo
- ❌ No tocar las nav cards de ServiceDetail sin checkear preferencias del usuario
- ❌ No modificar `src/legacy-pages/`, `src/hooks/`, `src/router.tsx`, `src/main.tsx` (son código moribundo)
- ❌ No agregar AI attribution a commits (`Co-Authored-By: Claude` etc.)

## Qué SÍ hacer en el nuevo chat

- ✓ Verificar git status antes de tocar nada
- ✓ Leer los 3 docs prioritarios primero
- ✓ Confirmar entendimiento antes de arrancar M2e
- ✓ Commitear cada sub-fase como commit separado
- ✓ Atender el feedback visual del usuario (él tiene la última palabra en UI/UX)
- ✓ Preguntar antes de cambios estructurales (mover archivos, agregar deps, etc.)

---

## Test rápido para confirmar que todo está OK al arrancar

Después de levantar servicios, en el navegador:

| URL | Debe mostrar |
|---|---|
| `http://localhost:3000/` | Hero "Conquista tu categoría." + 7 secciones |
| `http://localhost:3000/services` | 3 cards · "ESTRATEGIA COMERCIAL" / "IDENTIDAD DIGITAL" / "NEGOCIO + DISEÑO" en UPPER Sans |
| `http://localhost:3000/services/estrategia-comercial` | Hero gigante "ESTRATEGIA COMERCIAL" + 4 process cards + 4 deliverables + nav cards |
| `http://localhost:3000/about` | "Equipo ligero. Trabajo serio." + values grid |
| `http://localhost:3000/non-existent` | 404 sin Navbar/Footer · "Página no encontrada" |

Si alguna URL falla:
1. `pkill -9 -f next && rm -rf .next` (limpia)
2. `npm run dev` (relanza)
3. Verificar `.env.local` tiene `NEXT_PUBLIC_SANITY_PROJECT_ID=v9k35bzt`

---

**Fin.** Pegá el prompt y arranca.
