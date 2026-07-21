# SPEC — NANA

Fuente de la verdad del diseño del producto. Las decisiones cerradas llevan ✅ con su porqué; lo pendiente vive en el inbox numerado del final.

## Identidad

- **Qué es:** app personal local-first para celular/tableta Android (PWA) que registra la despensa, sugiere qué cocinar con lo que hay y arma la lista de compras.
- **Nombre y personalidad:** **Nana** — no es solo el nombre de la app sino un asistente al que se le habla, al estilo Jarvis: «Nana, ¿qué cocino hoy?». La nana es quien sabe qué hay en la cocina y qué se come en la casa. El tono de voz de la interfaz se define en ARTE.md.
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
- **Metas nutricionales y balance energético:** el usuario fija su meta calórica semanal y un objetivo (mantener / bajar / subir de peso / ganar músculo); Nana ajusta las sugerencias diarias y el plan semanal para acercarse a la meta, y da consejos prácticos breves generados por el LLM ("para ganar músculo prioriza X que ya tienes"). Diseño para que la brújula no se desvíe (sin APIs de pago):
  - **Cuánto necesitas:** fórmula estándar Mifflin-St Jeor (sexo, edad, peso, estatura, nivel de actividad) calculada en código local, sin LLM. Se muestra como **rango, no como número único** ("~1900–2100 kcal"): el error individual de cualquier fórmula es de ±10–20% y fingir precisión sería mentir.
  - **Calibración empírica (la pieza que de verdad acerca la estimación):** si el usuario registra su peso periódicamente, Nana corrige su gasto estimado contra la tendencia real de peso. Quien come 2000 kcal y no baja tiene un gasto real de ~2000 kcal, diga lo que diga la fórmula. Esto mide el metabolismo del usuario en vez de estimarlo, y captura de golpe etnia, genética, composición corporal y todo el ~30% de varianza que las ecuaciones no explican. ✅ Elegido sobre añadir más campos de perfil (investigación 2026-07-20).
  - **Perfil personal:** sexo, edad, peso, estatura, actividad, **alergias/intolerancias** (filtro duro de recetas; la severidad importa — la intolerancia a la lactosa es dosis-dependiente, no binaria), **condiciones médicas** (solo como filtro de recetas, nunca para ajustar calorías: eso es terreno clínico) y objetivo. ❌ NO se piden: etnia como factor numérico, somatotipo (ecto/meso/endomorfo), tipología de humores, ni fase del ciclo menstrual como corrección de kcal — ver investigación.
  - **Cuánto consumes:** tabla estática de calorías por ingrediente (datos tipo USDA/SMAE, módulo `src/data/`); el LLM solo mapea ingredientes y estima porciones, los números salen de la tabla. Misma jugada que la tabla de caducidades.
  - **Cuánto quemas:** el usuario registra un aproximado de su gasto ("gimnasio ~400 kcal") y Nana lleva el balance consumido vs quemado vs meta.
  - ⚠️ Sigue siendo aproximado: brújula de tendencia útil, no herramienta clínica ni sustituto de nutriólogo. Links a artículos externos: descartado (2026-07-20). Si la precisión resultara insuficiente en la práctica, se revisa la elección de LLM/costos de tokens como pregunta nueva.
  - 📄 Base de evidencia de todo lo anterior: `docs/investigaciones/personalizacion-calorica.md` (21 fuentes primarias, verificación adversarial, 2026-07-20).
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
7. ✅ **Nombre: Nana** (2026-07-20): reemplaza al provisional "Healty". Elegido por ser corto, cálido y con personalidad de asistente al que se le habla (efecto Jarvis casero). Descartados: Lupe (nombre de persona real), Coco (asociación Pixar/Chanel), Sazón (no funciona como persona). Trade-off aceptado: no es buscable en internet — irrelevante para una app personal.
8. ✅ **Calibración empírica sobre correcciones demográficas** (2026-07-20): ante la crítica válida de que las fórmulas nutricionales se derivaron sobre poblaciones no representativas, se investigó la evidencia (21 fuentes primarias, verificación adversarial). Hallazgo: el sesgo poblacional es real y está documentado (Mifflin sobreestima ~10.7% en mujeres hispanas), pero **no existe corrección étnica validada** — hasta la ecuación mexicana propia conserva ±19% de error individual, y en las mismas mujeres hispanas otra ecuación genérica (Owen) acertó en 84%. El techo estructural: las variables demográficas explican solo 63–70% de la varianza del metabolismo. Por eso Nana corrige contra la **tendencia real de peso** del usuario en vez de aplicar factores por etnia o somatotipo. Descartados por falta de evidencia: somatotipos (desacreditados como charlatanería en su origen) y teoría de los humores (pseudociencia). Detalle en `docs/investigaciones/personalizacion-calorica.md`.

9. ✅ **El conocimiento culinario entra como datos destilados, nunca como texto fuente** (2026-07-21): los libros de cocina se leen una vez en la máquina local y se reducen a tablas en `src/data/`; los PDF no viven en el repo (`.gitignore`). Porqué: un libro como *On Food and Cooking* son ~500k tokens y la capa 5 corre LLMs locales con ventanas de 8k–128k, así que no cabe; aunque cupiera, se pagaría su relectura en cada consulta; y son obras con copyright. La razón de fondo es de diseño: para decidir "brócoli al vapor, no hervido" no hace falta el capítulo sobre glucosinolatos, hace falta una fila en una tabla — el mismo patrón ya elegido para la tabla de caducidades (#5). Descartado: meter los libros al contexto del LLM. Fuentes destiladas: The Flavor Bible, Salt Fat Acid Heat, On Food and Cooking, USDA Retention Factors R6. Detalle en BITACORA.md (2026-07-21).
   - Corolario operativo: **las claves canónicas de las tablas quedan en inglés** (como vienen de los libros) y el puente desde el español vive en `src/data/ingredient_names.js`. Traducir 22 mil maridajes sería frágil; traducir los ~300 ingredientes de una despensa mexicana es acotado.

## Inbox — preguntas abiertas

1. ~~**Nombre definitivo.**~~ ✅ Resuelta (2026-07-20): la app se llama **Nana** (decisión cerrada #7). Pendiente menor derivado: renombrar la carpeta del proyecto `HEALTY/` → `nana/` (lo hace el usuario cuando cierre la sesión de Claude, para no romper rutas activas).
2. **LLM por defecto del MVP.** Opciones: (a) **Gemini free tier — recomendada**: gratis, cuota generosa, funciona fuera de casa; (b) Ollama en la PC del usuario: 100% local pero solo sirve con la PC prendida y en la misma red; (c) OpenRouter free (Kimi K2 u otros): gratis con límites variables. La capa adaptadora hace reversible la elección. Nota: (b) se vuelve la opción natural en capa 5 con la Pi.
3. **¿El planeador semanal sube al MVP o queda en capa 2?** Recomendación: capa 2 — el MVP ya da valor diario y el planeador necesita el ciclo básico probado.
4. **Distribución a terceros (capa 4):** ¿PWA por URL o APK (TWA)? No urge.
5. **Etiquetas de nutrientes del USDA (capa 2).** `src/data/nutrient_retention.js` tiene las 270 combinaciones alimento×método con sus 26 factores, pero **sin saber cuál columna es cuál nutriente**: el PDF dibuja los nombres en vertical entrelazado y no los declara en ningún lado legible por máquina; etiquetarlos a ojo sería inventar datos nutricionales. Hoy la tabla sirve para lo que Nana necesita ahora (comparar qué tan agresivo es un método: hervir y tirar el agua conserva 55% del peor nutriente, al vapor 85%). Opciones si algún día hace falta el detalle por nutriente: (a) **recomendada** — bajar el release ASCII del USDA, que trae `Nutr_No` por fila y resuelve el problema de raíz y gratis; (b) dejarlo así, que cubre el caso de uso actual; (c) etiquetar por inferencia — **descartada**, riesgo de dar números de vitamina C que en realidad son de calcio. No urge: no bloquea nada hasta que la capa 2 muestre nutrientes por nutriente.
6. **¿Vale la pena una tabla de "mapas de sabor" por cocina?** Al destilar *Salt Fat Acid Heat* quedó fuera su pieza más práctica para improvisar: qué grasa, qué ácido y qué especias definen cada cocina (mexicana, tailandesa, marroquí…), más las bases aromáticas (mirepoix, sofrito). Es lo que permitiría a Nana decir "con lo que tienes, esto se va para el lado tailandés". No cabe en el esquema `{rule, why, when}` actual; sería un archivo nuevo tipo `cuisine → {fat, acid, spices, aromaticBase}`. Recomendación: sí, pero **después** de que exista la app y se vea si las sugerencias salen genéricas — construirlo ahora es adelantar capa 3 sin evidencia de que haga falta.
