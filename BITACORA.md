# BITÁCORA — NANA

Registro cronológico del qué y el porqué. El estado actual vive en la entrada más reciente y en SPEC.md.

---

## 2026-07-20 — Arranque socrático (hito 0)

**Qué pasó:** entrevista de arranque completa (skill arranque-socratico), propuesta aprobada por el usuario, canon de documentos creado, primer commit.

**Decisiones y porqués:**
- App personal local-first (sin cuentas ni nube): barata, privada, y suficiente para un usuario. Trade-off aceptado: sin sync entre dispositivos hasta capa 5.
- PWA (HTML/CSS/JS + Vite + Dexie) sobre app nativa o Flutter: un código para celular, tableta y futura Raspberry; aprovecha lo que el usuario ya conoce.
- LLM solo gratuito (decisión firme del usuario; se le precisó que Claude API costaría ~$1–3 USD/mes, mantuvo la decisión). Se construye capa adaptadora para cambiar de proveedor por config. Default del MVP pendiente (SPEC #2, recomendación: Gemini free tier).
- Telegram sí / WhatsApp no (API de pago). Capa 3.
- Caducidades aproximadas con tabla estática (capa 2); descartado rastreo exacto por costo/beneficio.
- Lista de compras interna; Google Notes queda solo como referencia personal del usuario.
- Raspberry Pi = capa 5 como **cerebro de la casa** (servidor + Ollama + pantalla de cocina). Idea celebrada por el usuario. Hardware cotizado (~$7,000 MXN opción recomendada) en `docs/investigaciones/cotizacion-raspberry-pi.md` — NO comprar aún.
- Regla de idioma: código en inglés, comentarios/docs en español (petición explícita del usuario para distinguir programación de explicación).
- Multi-hogar se diseña desde el día 1 en el modelo de datos (`household_id`), se construye en capa 4.

**Estado:** documentación fundacional lista. Sin código aún.

**Próximo paso:** sesión de wireframes + dirección visual (paso 0 del TDD, tabla pendiente en ARTE.md).

---

## 2026-07-20 — La app se llama Nana (pregunta #1 cerrada)

**Qué pasó:** el usuario pidió reemplazar el provisional "Healty" por un nombre corto, amigable y con personalidad de asistente al estilo Jarvis. Se evaluaron cuatro candidatos (Nana, Lupe, Coco, Sazón) con sus trade-offs; el usuario eligió **Nana**, que era la recomendación.

**Porqué:** la nana es la figura casera que sabe qué hay en la cocina y qué se come hoy — el equivalente doméstico del mayordomo Jarvis. Es corta, cálida, fácil de dictar por voz y funciona como persona a la que se le habla («Nana, ¿qué cocino?»). Descartados: Lupe (nombre de persona real cercana potencial), Coco (asociación Pixar/Chanel, suena a mascota), Sazón (buen nombre de app pero no de asistente). Trade-off aceptado: no es buscable en internet, irrelevante para una app personal local-first.

**Cambios:** título y menciones actualizadas en los 6 docs canónicos; decisión cerrada #7 en SPEC.md; pregunta #1 del inbox marcada resuelta.

**Pendiente menor:** renombrar la carpeta `HEALTY/` → `nana/` lo hará el usuario con la sesión de Claude cerrada, para no romper rutas activas.

---

## 2026-07-20 — Metas nutricionales se suman a la capa 2

**Qué pasó:** el usuario propuso que Nana permita fijar una meta calórica semanal y un objetivo (mantener/bajar/subir de peso, ganar músculo), ajustando sugerencias y dando recomendaciones.

**Decisión:** se agrega a la capa 2 (no al MVP): es la evolución natural de "calorías por receta/día" que la capa ya contemplaba, y reutiliza su misma maquinaria. No altera el mapa de capas.

**Alcances acotados (porqués):**
- Números aproximados: un LLM gratuito estima calorías con ±20–30% de error. Nana marca tendencia ("vas alto esta semana"), no sustituye a un nutriólogo. El usuario lo aceptó al conocer la limitación.
- "Recomendaciones" = consejos prácticos breves generados por el LLM con lo que hay en despensa, NO links a artículos externos (requeriría búsqueda web y curaduría; se sale del objetivo local-first). Si el usuario quisiera links reales, se discute como pregunta nueva.

**Refinamiento (mismo día):** el usuario confirmó — links externos descartados definitivamente, y pidió que la brújula "no se aleje tanto": noción real de cuánto consume, cuánto quema y cuánto necesita. Diseño acordado para lograrlo sin APIs de pago:
- Necesidad calórica con fórmula Mifflin-St Jeor en código local (exacta, sin LLM).
- Consumo anclado a tabla estática de calorías por ingrediente (tipo USDA/SMAE); el LLM solo mapea ingredientes y porciones. Reduce el error de ±30% a rango útil.
- Gasto: registro manual aproximado ("gimnasio ~400 kcal") → balance consumido vs quemado vs meta.
- Si la precisión no bastara en la práctica, se abre pregunta nueva para revisar LLM/costos de tokens.

---

## 2026-07-20 — Investigación: ¿qué tan personalizable es el cálculo calórico?

**Qué pasó:** el usuario cuestionó que las fórmulas nutricionales estén hechas "para un hombre blanco promedio" y pidió investigar antes de decidir, listando ocho factores candidatos (etnia, sexo, ciclo menstrual, región/clima, alergias, enfermedades metabólicas, teoría de los cuatro humores, somatotipos). Se corrió una investigación con 21 fuentes primarias, 102 afirmaciones extraídas y verificación adversarial de 25 (14 confirmadas, 11 refutadas). Resultado completo en `docs/investigaciones/personalizacion-calorica.md`.

**Qué se encontró:**
- La crítica del usuario es **correcta y está documentada**: ninguna ecuación estándar se derivó sobre muestras grandes de población hispana, y Mifflin sobreestima ~136 kcal/día (10.7%) en mujeres hispanas.
- Pero **no existe corrección étnica validada**. La ecuación mexicana del Instituto Nacional de Ciencias Médicas y Nutrición conserva ±19% de error individual, y en las mismas mujeres hispanas la ecuación genérica de Owen acertó en 84% — es problema de especificación de ecuación, no de "metabolismo hispano". El sesgo además está confundido con adiposidad.
- Techo estructural: peso, estatura, edad y sexo explican solo 63–70% de la varianza del metabolismo. Más campos demográficos no cierran la brecha.
- Somatotipos: descartados por la comunidad científica como charlatanería en su origen (Sheldon, observación subjetiva y fotos); ninguna relación establecida con gasto energético. Cuatro humores: pseudociencia, sin base fisiológica.
- Ciclo menstrual: efecto real pero pequeño (30–120 kcal/día en fase lútea), por debajo del error de la propia fórmula.
- Alergias/intolerancias: el factor con mejor evidencia y mayor valor práctico — pero como filtro de recetas, no como corrección calórica.

**Decisión de diseño (SPEC #8):** en vez de añadir factores demográficos, Nana usa **calibración empírica**: corrige el gasto estimado contra la tendencia real de peso del usuario. Eso mide su metabolismo en vez de estimarlo y captura de golpe el ~30% de varianza que ninguna ecuación explica. Más honesto, más preciso y más barato de programar que una tabla de correcciones inventada. Se muestra rango de kcal, no número único.

**Nota de método:** la investigación dejó los factores 3–8 sin verificación adversarial (se agotó el presupuesto en el factor 1). Sus datos vienen de extracción con cita textual de fuentes primarias y están marcados como tal en el documento. Ninguno cambiaría la decisión de diseño.

---

## 2026-07-20 — Sesión de wireframes, pasada 1 (paso 0 del TDD)

**Qué pasó:** primera sesión visual. El usuario dio su intención (hogareño no genérico, papel de refri, letra a mano legible, nada técnico) y Claude la formalizó en ARTE.md. Se construyeron los wireframes de estructura en `docs/diseno/wireframes-v1.html`.

**Decisiones y porqués:**
- **Método:** wireframes en HTML gris abiertos en el celular real (no papel ni Figma) — valida targets de 48px y legibilidad en la pantalla donde vivirá la app, y el usuario lee HTML. Dos pasadas separadas: estructura en gris primero, color/tipografía después, para no discutir el verde cuando el botón está en el lugar equivocado.
- **Pilares cerrados:** (1) hogareño no genérico, (2) papel de refri, (3) vistazo de 3 segundos. Los dio el usuario; el tercero formaliza la restricción de cocina como estética.
- **Entrada principal = menú de intenciones**, pedido del usuario por comodidad. Los botones se frasean como frases dichas a Nana («¿Qué cocino hoy?») para conservar la personalidad sin obligar a un chat.
- **Paleta candidata:** papel+tinta (crema/casi negro) con acentos post-it funcionales — fusiona dos de las tres opciones del usuario (uniforme B/N + post-its). Lavanda descartada por Claude: la menos "papel" y la más cercana al look template prohibido. Pendiente ratificación del usuario en pasada 2.
- **Tipografía de dos voces:** manuscrita no cursiva para la voz de Nana + hiperlegible para listas. Candidatas en ARTE.md; se eligen viéndolas en el celular.
- Las pantallas del MVP pasan de 4 a **6**: se suman inicio (menú) y captura de compra, que estaban implícitas en los flujos pero no en la lista de pantallas.

**Estado:** pasada 1 lista. **Compuerta abierta:** el usuario debe ver `wireframes-v1.html` en su celular y aprobar o corregir la estructura antes de la pasada 2 (dirección visual aplicada).

---

## 2026-07-21 — Piel elegida: paleta y tipografía cerradas ✅

**Qué pasó:** el usuario eligió mezclando las tres exploraciones — exactamente el caso previsto. **Papel ahuesado y gris lápiz de C** (`#F3EEE3` / `#3A362E`), **post-its pastel de A** (amarillo `#FFE082`, rosa `#F8BBD0`, verde `#C5E1A5`, azul `#B3E5FC`) y **Shantell Sans de B** como voz de Nana, con Atkinson Hyperlegible de voz de trabajo.

**Verificación:** se recalculó la matriz de contraste de la mezcla (la tinta de C sobre los post-its de A no se había medido): peor caso 7.45:1 (tinta/rosa), todo arriba del AA 4.5:1. La piel quedó como pestaña «★ Elegida» en `exploraciones-pasada2.html` y los tokens definitivos en tabla en ARTE.md.

**Estado:** paleta ✅ y tipografía ✅. Pendientes del paso 0: ícono de la app (siguiente pieza, ya con paleta) y ratificación de todo en la primera prueba de la app real en el celular. Después: TDD paso 1 (esqueleto de la PWA consumiendo `tokens.css`).

---

## 2026-07-21 — Pasada 2 arranca: 3 exploraciones visuales

**Qué pasó:** con la estructura aprobada, se construyeron las 3 exploraciones de dirección visual en `docs/diseno/exploraciones-pasada2.html` (apuntadas desde ARTE.md).

**Método y porqués:**
- Las tres pieles visten **exactamente el mismo contenido** (inicio, lista con post-its, chat de cocinando) — así la comparación es de piel, no de contenido. El contenido se inyecta una vez con JS para que no pueda divergir.
- **A · Cuaderno cálido:** crema profunda #F8F1E5 + tinta café #2B2620 + Patrick Hand. **B · Nota fresca:** papel casi blanco #FBFAF6 + tinta azul-grafito #22303A + Shantell Sans. **C · Lápiz y libreta:** papel ahuesado #F3EEE3 + gris lápiz #3A362E + Architects Daughter. Las tres con Atkinson Hyperlegible como voz de trabajo y 4 post-its funcionales.
- **Ratios WCAG calculados con script, no a ojo** (regla de ARTE: número o no cuenta): tinta/papel 10.4–13.4:1; el peor caso de toda la matriz es tinta sobre post-it rosa de B con 6.1:1 — todo arriba del AA 4.5:1.
- Mapa color→significado propuesto en las tres: amarillo=receta, rosa=antojo, azul=manual, verde=voz de Nana.
- Fuentes por CDN de Google **solo en la exploración**; en la app serán locales (regla local-first).

**Estado:** compuerta abierta — el usuario abre el archivo en su celular bajo la luz de la cocina y elige piel (o mezcla: puede elegir paleta de una y letra de otra).

---

## 2026-07-21 — Tercera ronda: sesión de cocina, grupos de despensa y rumbo a pasada 2

**Qué pasó:** el usuario revisó pantalla por pantalla y refinó el flujo de cocinar; la estructura queda aprobada para pasar al diseño (pasada 2).

**Decisiones y porqués:**
- **Cocinar en dos momentos (diseño del usuario):** en «Cocinar hoy», «Ver pasos» abre la receta debajo y permite preguntas rápidas SUELTAS para decidir; «Voy a cocinar esto» abre la pantalla nueva **«Cocinando» (3b)**: guía + chat con Nana con **historial temporal** («cocinando ahora»), del que se puede salir y volver (tira 🍳 en el inicio). «Ya terminé» descuenta lo usado (decisión #10) y borra la sesión. Nuevo modelo de datos: `CookingSession` (temporal, 0 o 1 activa). Porqué temporal: el historial vale mientras cocinas; las recetas ya quedan cacheadas aparte.
- **Second pass de grupos de despensa:** Proteínas, Verduras, Frutas, Lácteos, Básicos, Condimentos y especias, Hogar — siete máximo para no romper el vistazo de 3 segundos. En condimentos la cantidad puede ser solo «hay / se acaba».
- **No comestibles resueltos:** «jabón de trastes» y similares entran a despensa bajo «Hogar» y el motor de recetas los ignora — la lista los acepta sin fricción y no contaminan sugerencias (duda del usuario, confirmada: no afectan).
- **Moodboard del usuario apuntado:** `docs/diseno/HEALTYREF.pur` queda en ARTE.md como insumo de la pasada 2.
- **Práctica de separación diseño/código (pedido del usuario):** el diseño vive en su propio documento (tokens CSS) y la app solo lo consume. Registrada en ARTE.md.

**Estado:** estructura aprobada por el usuario. **Siguiente paso: pasada 2 (dirección visual)** — paleta con hex y ratios, tipografías vistas en el celular, colores post-it con su mapa color→significado.

---

## 2026-07-21 — Segunda ronda de feedback: familia, guía interactiva y cierre de la #5

**Qué pasó:** el usuario aprobó la corrección de la pasada 1 y añadió dos piezas de diseño; también cerró la pregunta #5.

**Decisiones y porqués:**
- **Público de la casa (nueva sección en ARTE.md):** la app debe entenderse sin manual por cualquiera de la casa — la mamá con todo el contexto de cocina, el papá del vistazo, los hijos. La metáfora del papel de refri carga el peso: todos saben leer una nota pegada al refri. Compuerta añadida: en la prueba real, alguien sin contexto navega inicio → cocinar → lista sin explicación.
- **La receta abierta es una guía interactiva** (flujo 2 y capa 1 del SPEC, estado 2 del wireframe cocinar-hoy): campo «Pregúntale a Nana» para dudas sobre la marcha — accidentes («se me pasó el arroz»), sustituciones y cantidades («pide 3 jitomates y tengo 2») — con el contexto de receta + despensa. Acotación MVP: pregunta-respuesta simple, sin historial de chat persistente (mantiene el costo de LLM y de código bajo; si en uso real se extraña el hilo, se abre pregunta).
- **Pregunta #5 cerrada → decisión #10:** «Ya lo cociné» que descuenta + «ya no tengo esto» de un toque, ambas en MVP; captura de gasto en texto libre a backlog (capa 2), como decidió el usuario.
- **Renumeración del inbox:** dos sesiones paralelas crearon cada una su «#5»; quedó 5 = despensa (resuelta), 6 = etiquetas USDA, 7 = mapas de sabor.

**Estado:** estructura de pasada 1 estable con dos rondas de feedback. Compuerta: verla en el celular antes de la pasada 2.

---

## 2026-07-21 — Feedback del usuario sobre la pasada 1 (inicio, antojo, colores)

**Qué pasó:** el usuario revisó la estructura del inicio y pidió cuatro cambios; se aplicaron en `wireframes-v1.html`, ARTE.md y SPEC.md.

**Decisiones y porqués:**
- **Inicio = refri con dos notas:** cuadro «En tu despensa» (scrolleable por dentro si hay mucho texto) y debajo «Por comprar». Sustituye a la tira de estado de una línea. Tocar una nota abre su pantalla completa.
- **Botones en modo acción:** «Cocinar hoy» y «Añadir a la despensa» en vez de frases dichas a Nana; la voz de Nana se muda a los subtítulos. Pedido del usuario: el botón debe decir lo que haces.
- **Antojo fusionado en «Cocinar hoy»:** razonamiento del usuario (correcto): un antojo ES una pregunta de qué cocinar; Nana lo sugiere y avisa si falta comprar algo. El flujo 3 del SPEC quedó absorbido por el flujo 2; la lista de compras ya no captura antojos, solo recibe faltantes.
- **Nomenclatura:** desaparece «lista del domingo» de la UI («Por comprar» / «Lista de compras»).
- **Colores post-it confirmados** como código funcional (un color = un significado); el mapa exacto se fija en la pasada 2.

**Pregunta nueva (SPEC #5):** despensa desactualizada cuando se cocina sin avisar. Recomendación registrada: «Ya lo cociné» que descuenta + corrección de un toque «ya no tengo esto» en el MVP; captura de gasto en texto libre a capa 2. El usuario decide.

**Estado:** pasada 1 corregida. Compuerta sigue abierta: verla en el celular antes de la pasada 2.

---

## 2026-07-21 — Mantenimiento del canon

**Qué pasó:** se revisaron dos cabos sueltos detectados en la sesión de wireframes.

- **Decisión SPEC #8 (calibración empírica):** la aparente inconsistencia era falsa alarma — una sesión paralela ya la había registrado en SPEC.md (commit `cd30f90`) después de que esta sesión leyó el archivo. No hubo cambio que hacer; se eliminó un duplicado creado por el cruce de sesiones. Lección operativa: releer SPEC.md antes de editarlo cuando hay sesiones paralelas.
- **`docs/investigaciones/Cocinología.htm`:** el usuario confirmó que está ahí a propósito — es el libro *Cocinología* (la ciencia de cocinar) como referencia de cocina. Quedó apuntado desde CLAUDE.md (regla de no proliferación: si no está apuntado desde un doc canónico, no existe).

---

## 2026-07-21 — Conocimiento culinario destilado de libros (4 fuentes → 6 módulos de datos)

**Qué pasó:** el usuario propuso "nutrir el contexto" con libros de cocina para que Nana no dependa de internet. Se rechazó el mecanismo, se aceptó el objetivo, y se destilaron cuatro libros a datos que la app carga siempre.

**Corrección al registro anterior:** la entrada del 2026-07-21 daba por bueno `Cocinología.htm`. Al abrirlo resultó ser la **página del visor de Scribd, no el libro**: 488 KB de JavaScript con 23 caracteres de texto útil (`"Scribd View on Scribd"`). Nunca tuvo contenido. Se eliminó del repo. Lección: verificar el contenido de un archivo antes de apuntarlo desde un doc canónico; que exista y tenga nombre no significa que traiga lo que promete.

**Decisiones y porqués:**
- **Los libros NO se meten al contexto; se destilan a datos** (decisión cerrada SPEC #9). Tres razones: (1) no caben — McGee solo son ~500k tokens y la capa 5 corre LLMs locales con ventanas de 8k–128k; (2) pagarías la relectura en cada consulta; (3) copyright. La razón de diseño de fondo: Nana no necesita *leer* el libro, necesita *el resultado* del libro. Es el mismo patrón que ya se había elegido para la tabla de caducidades.
- **Los PDF quedan fuera del repo** (`.gitignore`): 58 MB con copyright. Se leen una vez en la máquina local; lo que se versiona es el destilado, que es inspeccionable y cabe en un celular.
- **Las claves canónicas quedan en inglés**, con un puente español aparte (`ingredient_names.js`). Traducir 22 mil maridajes sería enorme y frágil; traducir los ~300 ingredientes que una despensa mexicana puede contener es acotado y verificable.
- **Lo que no se pudo verificar, no se escribió.** Dos casos concretos, ambos preferibles a rellenar:
  - Puntos de humo: solo **4**, no los 12–15 pedidos. McGee no publica esa tabla; da dos cifras genéricas. Cualquier tabla larga de puntos de humo que ande por internet no sale de este libro.
  - Nutrientes del USDA: los 26 factores se extrajeron completos, pero **sin etiqueta de cuál es cuál**. El PDF dibuja los nombres de columna en vertical entrelazado y no los declara en ningún lado legible. Etiquetarlos de memoria sería inventar datos nutricionales. Queda como pregunta abierta SPEC #6 (renumerada: dos sesiones paralelas habían creado cada una su «#5»).

**Qué se construyó** (`src/data/`, 580 KB en total):

| Módulo | Contenido | Fuente |
|---|---|---|
| `flavor_pairings.js` | 548 ingredientes, 22,185 maridajes, 1,390 afinidades | The Flavor Bible |
| `ingredient_names.js` | 304 sinónimos español→inglés, con plurales y frases | escrito a mano |
| `cooking_rules.js` | 73 reglas en 4 ejes + 20 diagnósticos síntoma→arreglo | Salt Fat Acid Heat |
| `cooking_techniques.js` | 48 temperaturas, 4 puntos de humo, 48 técnicas | On Food and Cooking |
| `food_science_rules.js` | 80 reglas de ciencia accionables | On Food and Cooking |
| `nutrient_retention.js` | 270 combinaciones alimento×método | USDA Release 6 |

**Notas técnicas del parseo** (por si hay que rehacerlo): el texto del Flavor Bible se extrae con `pdftotext -layout -enc UTF-8`, pero la indentación **no** sirve como señal — el reflujo de columnas la destruye. La señal fiable es que un encabezado va seguido de una etiqueta (`Taste:`, `Weight:`…). Tres bugs costaron la mitad de la cobertura y valen recordarse: (1) el PDF pega encabezados al final de líneas de prosa (`…(Washington, Virginia) APPLES`); (2) muchos traen paréntesis en minúsculas que rompen la prueba de mayúsculas (`SHRIMP (See also Shellfish)`); (3) algunas entradas arrancan sin metadatos y se recuperan por orden alfabético. De 400 entradas iniciales se pasó a 548. La tabla del USDA exige extracción por **coordenadas** (`pdfplumber`): con `-layout` las descripciones salen desfasadas dos filas respecto de sus números.

**Validación:** los 6 módulos pasan `node --check`; el puente resuelve 15/15 pruebas con despensa real en español ("jitomates", "chiles serranos", "pechuga de pollo asada"); 0 destinos rotos. La tabla del USDA se validó contra el ejemplo que el propio documento da en su prosa (verduras hervidas, 85%) y es internamente coherente: hervir y tirar el agua conserva 55% del peor nutriente, hervir y aprovechar el caldo 70%, al vapor 85%.

**Estado:** datos listos y probados en Node. **No probados en dispositivo real** — eso ocurre cuando exista app que los consuma (paso 1 del TDD). La compuerta del DoD sigue abierta para estos módulos.

**Próximo paso:** sin cambios — sigue pendiente la compuerta de wireframes (el usuario debe abrir `wireframes-v1.html` en su celular). Estos datos son insumo de capas 2–3, no adelantan capa 1.

---

## 2026-07-21 — Diseño hi-fi aprobado e implementado: nace la app (paso 1 del TDD)

**Qué pasó:** el usuario revisó la exploración hi-fi hecha con Claude Design (`docs/diseno/Post-it exploracion/`: `Nana Hi-Fi.dc.html` con variantes 1a/1b/1c y `Nana Prototipo.dc.html` navegable), aprobó el diseño y pidió implementarlo, con un ajuste: que el color también diga **qué es** cada ingrediente. Se construyó el esqueleto Vite + PWA con las 7 pantallas del prototipo.

**Decisiones y porqués:**
- **Paleta v2 = variante afinada 1c** (papel `#F6EFDF`, tinta `#33302A`, post-its re-entonados). Sustituye a los tokens v1 de la pasada 2; tabla completa con ratios en ARTE.md (peor caso 6.6:1, arriba de AA).
- **El mapa de origen cambió:** receta ya no es amarillo — se fusionó con la voz de Nana en verde (es Nana quien avisa el faltante); el amarillo quedó para despensa/tips. Un color = un significado se conserva.
- **Dos códigos de color por canales separados** (el ajuste pedido): categoría del ingrediente (qué es) va en bordes izquierdos, cintas y puntos; origen (por qué está en la lista) va en chips post-it siempre con su palabra. Riesgo vigilado: rosa-frutas vs rosa-antojo se parecen; si en el celular confunden, se re-entona la categoría.
- **El diseño vive aparte del código** (decisión previa, ahora ejecutada): tokens en `src/ui/tokens.css`, catálogo de categorías en `src/data/categories.js`; las pantallas solo consumen variables.
- **Fuentes locales** (`public/fonts/`, woff2 latino, ~130 KB): Shantell Sans variable + Atkinson Hyperlegible. Sin CDN, como manda local-first.
- **Ícono placeholder** (post-it amarillo con «N», generado por script) para que la PWA sea instalable ya; el definitivo sigue pendiente en ARTE.md.

**Qué se construyó:** `index.html` + `vite.config.js` (vite-plugin-pwa, manifest es-MX) + `src/` con estado en memoria (`state.js`), datos demo (`data/demo_data.js`), categorías (`data/categories.js`), orígenes (`data/origins.js`) y 7 pantallas (`ui/screens/`): inicio, añadir, despensa, cocinar hoy, cocinando (chat temporal), lista y ajustes. El parseo de compras y el chat son placeholders enlatados — el LLM real es el paso 3.

**Validación:** `npm run build` limpio; probada en Chrome de escritorio (build de producción con service worker): navegación completa, fuentes cargan, dos códigos de color visibles, sin errores de consola. **Compuerta del DoD abierta:** falta instalarla en el celular del usuario (`npm run dev -- --host` o `npm run preview` en la misma red) y ratificar paleta bajo luz de cocina.

**Próximo paso:** el usuario la instala en su celular (compuerta del paso 1); luego paso 2 del TDD (Dexie + CRUD real de despensa).

---

## 2026-07-21 — Ajustes de la primera revisión del usuario (despensa y cocinar hoy)

**Qué pasó:** el usuario revisó la app implementada y pidió tres arreglos; se aplicaron y verificaron en Chrome.

- **Tags de la despensa desalineados:** los encabezados de grupo usaban una cinta posicionada en absoluto que flotaba lejos del nombre. Ahora cinta y nombre van en línea (`.group-head` flex) y los chips tienen altura consistente (`inline-flex` + `nowrap`). Se corrigió en despensa, lista y chat de cocina, que compartían el componente.
- **La despensa no scrolleaba:** bug clásico de flexbox — a `.screen` le faltaba `min-height: 0`; sin él, el contenido empuja el layout en vez de scrollear dentro. Una línea de CSS.
- **Botón «Recomiéndame otras cosas, Nana»** al final de Cocinar hoy (estaba en el hi-fi como «Otras ideas, Nana» y se perdió en el porteo). En el paso 1 responde con un post-it honesto: sin LLM conectado no hay ideas nuevas; la respuesta real llega en el paso 3.

**Estado:** compuerta del paso 1 sigue abierta (instalarla en el celular).

---

## 2026-08-17 — Despliegue en GitHub Pages para probar en el celular

**Qué pasó:** el usuario propuso subir la app a GitHub Pages para instalarla desde ahí. Se aceptó: una PWA solo se instala con ícono en Android si viene por HTTPS, y Pages lo da gratis sin romper el núcleo local-first (Pages sirve archivos estáticos; los datos siguen en el dispositivo). Repo público `nana` — coherente con el caso de estudio de portafolio; no hay secretos en el repo (`.env` ignorado, PDFs de libros nunca subidos).

**Cambios:**
- `vite.config.js`: `base: '/nana/'` y `start_url`/`scope` del manifest bajo `/nana/`, porque Pages sirve en `leaf-alexia.github.io/Nana/`. Verificado en `dist/`: assets, fuentes y manifest resuelven bajo la ruta.
- `.github/workflows/deploy.yml`: en cada push a `master` construye y publica `dist/`. Requiere *Settings → Pages → Source: GitHub Actions*.

**Consecuencia para el paso 3 (LLM):** al ser sitio público, la API key del LLM no puede ir en el código; se guardará en el dispositivo (pantalla de ajustes). Condiciona la pregunta #2 del inbox.

**Estado:** compuerta del paso 1 sigue abierta hasta probar la instalación en el celular desde Pages.

---

## 2026-11-07 — El usuario abrió la app en el celular; preguntas sobre Dexie, LLM local y escaneo

**Qué pasó:** el usuario abrió la app desde GitHub Pages en su celular y le gusta cómo se ve: la paleta v2 queda ratificada en dispositivo real. Falta confirmar que se haya **instalado con ícono** (la compuerta literal del paso 1).

**Preguntas respondidas:** cómo funciona Dexie (paso 2); si existe un LLM que corra dentro de la app gratis (sí: WebLLM/WebGPU, pero descarga 1–2 GB y es lento y flojo en español en un celular; se mantiene la recomendación de Gemini free tier para el MVP y el modelo local queda como plan B / capa 5); y escaneo de imagen para la lista de compras → pregunta #8 del inbox.
