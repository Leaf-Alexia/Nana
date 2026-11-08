# TDD — Diseño técnico de NANA

## Manual del especialista (órdenes permanentes de este doc)

- **(a) Rol:** ingeniero de software senior full-stack, especialista en apps web offline-first y en llevar proyectos de cero a producción con equipos no técnicos.
- **(b) Checklist socrática de la disciplina** (preguntar SIEMPRE antes de construir):
  - ¿Cuál es el paso verificable más pequeño que acerca al MVP?
  - ¿Dónde vive este número/dato? (módulo de datos, nunca quemado en lógica)
  - ¿Qué pasa sin red? ¿Qué pasa si el LLM responde basura o no responde?
  - ¿Cómo lo prueba el usuario en su dispositivo real? (esa es la compuerta)
  - ¿Esta dependencia/librería vale su peso? ¿Qué costo de mantenimiento trae?
- **(c) Decisión cerrada ✅ =** porqué + alternativa descartada + criterio medible + compuerta de validación (prueba en dispositivo real).
- **(d)** Aplica el pensamiento crítico obligatorio del núcleo 🔒 de CLAUDE.md.
- **(e)** El usuario NO es especialista de esta disciplina: Claude pone la técnica y las preguntas, él pone la intención y decide.

## Arquitectura

**Local-first PWA. Todo corre en el navegador del dispositivo; en el MVP no existe servidor.**

```
[Android: navegador/PWA instalada]
  ├─ UI (HTML/CSS/JS, español al usuario)
  ├─ IndexedDB (Dexie.js) ← única memoria en MVP
  └─ src/llm/ (capa adaptadora) ──HTTP──> proveedor LLM gratuito (config)
```

### Stack ✅

| Pieza | Elección | Porqué / alternativa descartada |
|---|---|---|
| Frontend | HTML + CSS + JavaScript (módulos ES), **sin framework de UI** | El usuario conoce HTML/CSS; mínimo peso conceptual; cero lock-in. Descartados React/Vue: curva y tooling que no pagan en app de un usuario. |
| Empaquetado | Vite + vite-plugin-pwa | Estándar actual, service worker y manifest resueltos; descartado "sin build": el plugin PWA lo amerita. |
| Persistencia | IndexedDB vía **Dexie.js** | IndexedDB crudo es verboso y propenso a errores; Dexie es ligera y madura. |
| LLM | Capa adaptadora propia en `src/llm/` | Proveedor intercambiable por config (decisión de núcleo: solo gratuitos). |
| Python | **No en MVP.** Entra en capa 5 (servidor en la Pi) | Ahí el usuario aprovechará su Python; en MVP un backend sería burocracia. |

### Capa adaptadora LLM

- Interfaz única: `parseGroceries(text)`, `suggestRecipes(pantry)`, `inferIngredients(craving)`; capa 2 añade `estimateNutrition(...)`.
- Implementaciones: `gemini.js`, `ollama.js`, `openrouter.js`. Selección y modelo en config; cambiar de proveedor = una línea.
- **Prompts en `src/llm/prompts.js`** (en español, editables como datos, nunca regados en la lógica).
- **API key**: la ingresa el usuario en la pantalla de ajustes y se guarda solo en su dispositivo. NUNCA en el repo ni en el código.
- Toda respuesta del LLM se valida contra un esquema antes de usarse; si no cumple, se reintenta una vez y luego se muestra error amable. Nunca insertar respuestas del LLM con `innerHTML` (inyección) — siempre texto o construcción de nodos.

### Reglas duras de código

- Código, variables, funciones y archivos en inglés; **comentarios en español** explicando qué sucede (núcleo 🔒).
- Todos los números y catálogos en módulos de datos: `src/data/shelf_life.js`, `src/data/categories.js`, `src/data/config.js`.
- **Conocimiento culinario destilado de libros** (ya construido, decisión SPEC #9): `flavor_pairings.js` (maridajes), `cooking_rules.js` (sal/grasa/ácido/calor), `cooking_techniques.js` (temperaturas), `food_science_rules.js` (por qué funciona), `nutrient_retention.js` (USDA), y `ingredient_names.js` que traduce del español a las claves en inglés de los otros. Son ~580 KB: **cargar bajo demanda**, nunca en el bundle inicial — `flavor_pairings.js` solo pesa cuando se pide una sugerencia.
- Modelo de datos con `household_id` desde el día 1 (ver SPEC.md).

### Estructura de carpetas prevista

```
nana/
├── index.html
├── src/
│   ├── ui/          # pantallas y componentes (pantry, recipes, shopping-list, settings)
│   ├── db/          # esquema Dexie y acceso a datos
│   ├── llm/         # adaptador: provider.js, gemini.js, ollama.js, prompts.js
│   └── data/        # números y catálogos (config, categories, shelf_life)
├── public/          # ícono, manifest
└── docs/            # investigaciones y diseño (ver regla de no proliferación)
```

## Orden de construcción (cada paso con su compuerta)

| # | Paso | Compuerta de validación |
|---|---|---|
| 0 | Wireframes + dirección visual (ARTE.md) | Usuario aprueba viéndolos |
| 1 | Esqueleto Vite + PWA instalable ("hola despensa") | Se instala con ícono en el celular del usuario |
| 2 | Esquema Dexie + CRUD de despensa con texto/dictado | Registrar la compra real de la semana |
| 3a | Cerebro local sin LLM: diccionario de ingredientes + tabla de recetas + "¿qué cocino hoy?" | Entiende la compra real de la semana y da 3 sugerencias razonables sin clave |
| 3b | Adaptador Gemini opcional (clave en Ajustes) + texto libre + chat + leer fotos | Con clave, las sugerencias mejoran y una foto de lista se convierte en lista |
| 4 | Lista de compras + flujo de antojos | "Se me antoja un sándwich de queso" → faltantes correctos en la lista |
| 5 | Export/import JSON + pulido + una semana de uso real | DoD del MVP completo (CLAUDE.md) |

Estimado realista del MVP: **18–25 h efectivas** (≈ 3–4 fines de semana a ritmo hobby).

## Deuda y riesgos vigilados

- **Sync multi-dispositivo no existe en MVP** (aceptado; lo resuelve capa 5 con la Pi como servidor).
- **Cuotas de LLM gratuito**: si el free tier elegido cambia sus límites, la capa adaptadora permite migrar sin tocar la app.
- **Datos solo en el dispositivo**: mitigado con export/import JSON desde el paso 5.
