# SPEC — HEALTY (nombre provisional)

Fuente de la verdad del diseño del producto. Las decisiones cerradas llevan ✅ con su porqué; lo pendiente vive en el inbox numerado del final.

## Identidad

- **Qué es:** app personal local-first para celular/tableta Android (PWA) que registra la despensa, sugiere qué cocinar con lo que hay y arma la lista de compras.
- **Para quién:** el usuario y su casa. Futuro (capa 4): dos hogares — su casa con su pareja y la casa de sus papás.
- **Éxito:** *"Le digo a la app lo que compro y lo que se me antoja, y ella me resuelve el resto: qué cocinar hoy con lo que tengo, y qué comprar el domingo."*
- **Qué NO es:** ver núcleo 🔒 de CLAUDE.md (sin cuentas, sin nube, sin APIs de pago, sin caducidades exactas).

## Capas de construcción

### Capa 1 — MVP: "la app vive en mi celular"
1. Registrar despensa escribiendo o dictando ("compré pollo, jitomate, arroz") — el dictado lo da el teclado de Android, no se programa.
2. Ver y editar el inventario.
3. "¿Qué cocino hoy?" → sugerencias de recetas usando solo lo que hay (vía LLM).
4. Lista de compras: manual + "se me antoja X" → el LLM infiere ingredientes, detecta faltantes contra la despensa y los agrega.
5. Instalable como PWA en Android con su ícono.
6. Exportar/importar datos en JSON (respaldo manual — en local-first, perder el dispositivo no debe ser perder la despensa).

### Capa 2 — Planeación y nutrición
- Planeador de comidas de la semana (usa despensa + antojos + lista de compras del domingo).
- Calorías y nutrición aproximada por receta/día.
- Prioridad por caducidad aproximada: tabla estática de duraciones típicas ("cebolla ≈ 3 semanas, cilantro ≈ 5 días") que empuja recetas con lo que está por vencerse. Sin fechas exactas por producto.

### Capa 3 — Entradas cómodas
- Escaneo de ticket del súper con la cámara (OCR/LLM con visión).
- Bot de Telegram: mandar "compré pollo y jitomate" desde cualquier lado. ✅ Telegram y no WhatsApp: la API de WhatsApp es de pago y burocrática; la de Telegram es gratuita y simple.

### Capa 4 — Multi-hogar y distribución
- Sincronización entre dispositivos y dos casas (usuario+pareja / papás).
- Distribución a terceros (pregunta abierta #4: PWA por URL vs APK).

### Capa 5 — Raspberry Pi: cerebro y pantalla de la casa
- La Pi corre el servidor local (memoria central de la casa, Ollama para LLM 100% local) Y es la pantalla táctil de cocina.
- Aquí se compra el hardware: `docs/investigaciones/cotizacion-raspberry-pi.md` (cotizado 2026-07-20, ~$7,000 MXN opción recomendada; re-verificar precios al comprar).

## Modelo de datos conceptual

Diseñado para multi-hogar desde el día 1 aunque el MVP sea un solo usuario (agregar `household` después obligaría a reconstruir la base; hoy cuesta casi nada).

- **Household** — id, name. En MVP existe uno solo, creado por default.
- **PantryItem** — id, household_id, name, quantity aproximada (texto libre: "2", "medio kilo", "poquito"), category, added_at.
- **ShoppingListItem** — id, household_id, name, source (`manual` | `craving` | `recipe`), done.
- **RecipeSuggestion** — id, household_id, title, ingredients_used, missing_ingredients, steps, created_at (caché de sugerencias del LLM para no re-consultar).
- **ShelfLifeTable** (capa 2) — tabla estática en módulo de datos, no en base de datos.

## Flujos clave

1. **Registrar compra:** usuario escribe/dicta texto libre → LLM lo parsea a items → confirma → entra a despensa.
2. **¿Qué cocino hoy?:** despensa actual → LLM → 3 sugerencias con lo que hay (marca si falta algo menor).
3. **Antojo:** "se me antoja un sándwich de queso" → LLM infiere ingredientes → compara contra despensa → faltantes a lista de compras.
4. **Domingo de compras:** abrir lista, palomear en el súper, lo comprado pasa a la despensa.

## Decisiones cerradas

1. ✅ **Local-first sin cuentas** (2026-07-20): datos en el dispositivo (IndexedDB). Trade-off aceptado: en MVP no hay sync entre celular y tableta; lo resuelve la capa 5 (la Pi como memoria central).
2. ✅ **PWA, no app nativa ni Flutter**: un solo código corre en celular, tableta y la futura Pi; aprovecha el HTML/CSS que el usuario conoce; descartados Kotlin (mundo nuevo, no corre en Pi) y Flutter/React Native (maquinaria pesada para uso personal).
3. ✅ **LLM gratuito vía capa adaptadora** (2026-07-20): cambiar de proveedor = cambiar config. Default del MVP pendiente (#2).
4. ✅ **Lista de compras interna**: Google Notes queda como referencia personal, no se integra (API limitada, fricción sin beneficio).
5. ✅ **Caducidades aproximadas, no exactas**: tabla estática, capa 2. Costo bajo, valor alto.
6. ✅ **Código en inglés, comentarios en español** (núcleo 🔒).

## Inbox — preguntas abiertas

1. **Nombre definitivo.** "Healty" es provisional (y es una errata de "healthy"). ¿Se queda por cariño, o buscamos nombre? Sin prisa: bloquea solo el ícono/manifest final.
2. **LLM por defecto del MVP.** Opciones: (a) **Gemini free tier — recomendada**: gratis, cuota generosa, funciona fuera de casa; (b) Ollama en la PC del usuario: 100% local pero solo sirve con la PC prendida y en la misma red; (c) OpenRouter free (Kimi K2 u otros): gratis con límites variables. La capa adaptadora hace reversible la elección. Nota: (b) se vuelve la opción natural en capa 5 con la Pi.
3. **¿El planeador semanal sube al MVP o queda en capa 2?** Recomendación: capa 2 — el MVP ya da valor diario y el planeador necesita el ciclo básico probado.
4. **Distribución a terceros (capa 4):** ¿PWA por URL o APK (TWA)? No urge.
