# ARTE — Dirección visual de NANA

## Manual del especialista (órdenes permanentes de este doc)

- **(a) Rol:** director de arte / diseñador de producto senior, especialista en UI móvil y en interfaces para contextos hostiles (manos ocupadas, poca atención).
- **(b) Checklist socrática de la disciplina** (preguntar SIEMPRE antes de decidir):
  - ¿Cuáles son los pilares visuales de ESTE proyecto? (máximo 3)
  - ¿Cuál es la referencia concreta? (app, cartel, objeto real — con nombre, no "algo limpio")
  - ¿Qué número lo hace medible? (px, ratio de contraste, escala tipográfica)
  - ¿Cómo se valida con ojos humanos? (el usuario viéndolo en SU pantalla, no en teoría)
- **(c) Decisión cerrada ✅ =** porqué + referencia + número + compuerta de validación visual.
- **(d)** Aplica el pensamiento crítico obligatorio del núcleo 🔒 de CLAUDE.md.
- **(e)** El usuario NO es diseñador: Claude pone la técnica y las preguntas, él pone la intención (qué le gusta, cómo se siente su cocina) y decide.

## Regla anti-genérico (dura)

Prohibido el look "hecho con IA por default": gradientes morado-azul de template, glassmorphism gratuito, emojis como sistema de iconos, cards flotantes idénticas en todo. Cada elección visual debe poder defenderse con referencia + número. Si una pantalla podría ser de cualquier app, está mal.

## Restricciones duras (del contexto real, no negociables)

- **Contexto de uso:** cocina — dedos mojados o con masa, vistazos de 3 segundos, el celular recargado contra la licuadora.
- **Targets táctiles ≥ 48px** y acciones frecuentes alcanzables con pulgar.
- **Legible a un brazo de distancia**: tipografía base generosa, contraste alto (mínimo AA 4.5:1; verificar bajo luz cálida de cocina).
- **Mobile-first vertical** (celular del usuario). Objetivos secundarios: tableta y pantalla de cocina 7" — resoluciones documentadas en `docs/investigaciones/cotizacion-raspberry-pi.md` (720×1280 vertical nativa; 800×480 horizontal si fuera la pantalla vieja).
- Diseñar para el peor caso (800×480 horizontal = muy poca altura útil) hace que todo lo demás quepa.

## Público de la casa ✅ (2026-07-21, pedido del usuario)

La app debe entenderse **sin manual por cualquier miembro de la casa**: la mamá que tiene todo el contexto de cocina, el papá que solo le da un vistazo, y los hijos. Consecuencias de diseño:

- Nada requiere saber de apps ni de cocina para leerse: verbos simples en botones, cero jerga técnica y cero jerga culinaria sin explicar.
- Cada pantalla debe pasar la prueba del vistazo (pilar 3) con un usuario que la ve **por primera vez**, no solo con el usuario que la diseñó.
- Familiar = la metáfora del papel de refri (pilar 2) hace el trabajo: todos en una casa saben leer una nota pegada al refri y una lista de súper. Si un elemento no tiene equivalente en ese mundo, se sospecha de él.
- Compuerta de validación: en la prueba en dispositivo real, además del usuario, que alguien de su casa sin contexto navegue inicio → cocinar → lista sin que se le explique nada.

## Pilares visuales ✅ (2026-07-20, sesión de wireframes)

Intención declarada por el usuario: hogareño sin ser genérico; papel de escribir, notas pegadas al refrigerador; nada que se sienta técnico. No encontró referencia en apps ni libros de cocina (los libros le parecen "demasiado revista" — eso también es dato: NO revista, NO foto glossy).

1. **Hogareño, no genérico** — cabe en cualquier casa. Si una pantalla podría ser de cualquier app tech, está mal (refuerza la regla anti-genérico).
2. **Papel de refri** — la referencia concreta es el objeto real: la nota pegada con imán al refrigerador. La app se ve *escrita*, no *renderizada*: listas, post-its, tachones.
3. **Vistazo de 3 segundos** — una nota de refri se entiende de un golpe de vista; la app también. Este pilar vuelve estética la restricción dura (legible a un brazo, dedos con masa).

Moodboard personal del usuario: `docs/diseno/HEALTYREF.pur` — su tracking propio de referencias visuales; insumo directo de la pasada 2.

## Práctica: el diseño vive aparte del código ✅ (2026-07-21, pedido del usuario)

El diseño no se incrusta en el markup. La dirección visual se define en su propio documento (tokens CSS: colores, tipografías, tamaños, espaciados en un `design.css` / `tokens.css`) y la app solo **consume** esos tokens. Porqué: cambiar la paleta o la letra = tocar un archivo, no cazar estilos regados por toda la app; y es la misma separación estructura/vista que ya se usó en las dos pasadas de wireframes.

## Entrada principal ✅ (2026-07-20, revisada 2026-07-21 con feedback del usuario)

**Menú de intenciones, no chat** — sigue firme. Lo que cambió tras la revisión del usuario sobre la pasada 1:

- **Botones en modo acción, no frase dicha:** «Cocinar hoy» y «Añadir a la despensa». El usuario prefirió que el botón diga lo que *haces*; la personalidad de Nana (decisión #7 del SPEC) se conserva en los subtítulos de cada botón, que sí hablan como ella.
- **El antojo dejó de ser botón propio:** se fusiona dentro de «Cocinar hoy». Porqué (del usuario, y correcto): «se me antoja huevo revuelto» ES una pregunta de qué cocinar — Nana lo sugiere y, si falta algo, avisa y manda el faltante a la lista. Separarlo duplicaba el flujo.
- **El inicio muestra el refri con sus dos notas:** un cuadro «En tu despensa» (scrollea por dentro si hay mucho texto) y debajo «Por comprar». Es el vistazo de 3 segundos hecho pantalla, y literalmente el pilar 2 (notas pegadas al refri). Tocar una nota abre su pantalla completa.
- **Nomenclatura:** nada se llama «lista del domingo» en la UI; la nota del inicio dice «Por comprar» y la pantalla completa «Lista de compras».

## Paleta y tipografía ✅ (2026-07-21 v2 — el usuario eligió el hi-fi «variante afinada 1c»)

Tras la pasada hi-fi con Claude Design (`docs/diseno/Post-it exploracion/` — `Nana Hi-Fi.dc.html` con 3 variantes y `Nana Prototipo.dc.html` navegable), el usuario eligió la **variante afinada 1c**: papel un punto más cálido y post-its re-entonados a la misma luminosidad. Estos tokens **sustituyen** a los de la mezcla anterior (quedan abajo como historia) y viven en código en `src/ui/tokens.css` — la app solo consume esas variables.

**Tokens definitivos v2** (ratios calculados contra la tinta `#33302A`):

| Token | Valor | Contraste |
|---|---|---|
| Papel (fondo app) | `#F6EFDF` | 11.5:1 |
| Tarjeta / nota | `#FCF8EE` | 12.4:1 |
| Tinta (texto, botón primario) | `#33302A` — gris lápiz | — |
| Tinta suave (secundario) | `#6E6858` | 4.8:1 sobre papel (solo texto grande/meta) |
| Post-it rosa = **antojo** | `#F5AEC7` | 7.4:1 |
| Post-it verde = **receta/Nana avisa + voz de Nana** | `#C3DDA0` | 8.9:1 |
| Post-it azul = **tú lo apuntaste** | `#A8DBF2` | 8.8:1 |
| Post-it amarillo = **despensa, tips y recordatorios** | `#FFDF7E` | 10.1:1 |

Cambio respecto al mapa v1: «receta» ya no es amarillo — se fusionó con la voz de Nana en verde (es Nana quien avisa el faltante), y el amarillo quedó libre para marcar la despensa. Así cada color sigue teniendo UN significado.

### Colores de categoría ✅ (2026-07-21, pedido del usuario: «que el color diga qué es»)

Segundo código de color, ortogonal al de origen: la **categoría** del ingrediente. Para que ambos convivan sin ambigüedad, cada uno tiene su canal fijo:

- **Categoría (qué es) → bordes izquierdos gruesos, cintas de grupo y puntos de color.** Nunca como chip suelto sin palabra.
- **Origen (por qué está en la lista) → chip post-it, siempre con su palabra encima** («antojo», «receta», «tú»).

| Categoría | Valor | Contraste |
|---|---|---|
| Proteínas | `#F8B57E` | 7.5:1 |
| Verduras | `#B9D98B` | 8.4:1 |
| Frutas | `#F2A0BF` | 6.6:1 |
| Lácteos | `#9FD9D4` | 8.4:1 |
| Básicos | `#FFDF7E` | 10.1:1 |
| Condimentos y especias | `#A8BDE8` | 7.0:1 |
| Hogar | `#CFCBC0` | 8.1:1 |

- Peor contraste de toda la matriz v2: **6.6:1** (tinta sobre rosa frutas) — arriba del AA 4.5:1.
- **Riesgo vigilado:** frutas (`#F2A0BF`) y antojo (`#F5AEC7`) son rosas parecidos, igual que verduras/receta en verdes. Lo desambigua el canal (borde vs chip con palabra); si en el celular se confunden, se re-entona la categoría, no el origen.
- Catálogo en código: `src/data/categories.js` (colores solo referencian tokens CSS).
- **Voz de Nana:** Shantell Sans (títulos, botones de intención, mensajes de Nana). **Voz de trabajo:** Atkinson Hyperlegible (listas, cantidades, pasos), base ~16px.
- Fuentes servidas localmente en la PWA (`public/fonts/`, woff2 subconjunto latino); sin CDN.
- **Compuerta pendiente:** ratificación en la primera prueba de la app real en el celular, bajo luz cálida de cocina.

### Historia: tokens v1 (mezcla de las 3 exploraciones, sustituidos por v2)

Papel `#F3EEE3`, tarjeta `#FBF8F0`, tinta `#3A362E`, tinta suave `#75705F`; post-its: amarillo receta `#FFE082`, rosa antojo `#F8BBD0`, azul tú `#B3E5FC`, verde Nana `#C5E1A5`. Peor contraste 7.45:1. Se ven en la pestaña «★ Elegida» de `docs/diseno/exploraciones-pasada2.html`.

### Historia de la decisión (candidata original, 2026-07-20)

El usuario dudaba entre: (a) lavanda/índigo claro (tranquilidad), (b) blanco y negro (uniforme de nana), (c) colores post-it. Recomendación firme de Claude — **fusionar (b) y (c) bajo la metáfora del papel**:

- **Base "papel y tinta":** fondo blanco roto/crema (papel) + texto gris casi negro (tinta). Es el blanco-y-negro del uniforme pero cálido, y es literalmente el pilar 2.
- **Acentos post-it con rol funcional:** amarillo/rosa/verde/azul pastel como *notas*, no decoración — p. ej. origen de items en la lista, estados, avisos de Nana. Regla: un post-it señala algo; si no señala nada, no va. **Confirmado por el usuario (2026-07-21):** quiere el código de color estilo post-it para distinguir qué es cada cosa. Falta fijar en pasada 2 el mapa color→significado (pocos colores, significado estable en toda la app).
- **Lavanda/índigo: descartada.** Es la opción menos conectada con la metáfora del papel y la más cercana al look "template morado-azul" que la regla anti-genérico prohíbe.
- Números (hex exactos y ratios ≥ 4.5:1 sobre crema, bajo luz cálida) se fijan y validan en la pasada 2.
- **Exploraciones de pasada 2:** `docs/diseno/exploraciones-pasada2.html` — 3 pieles (A cuaderno cálido / B nota fresca / C lápiz y libreta) sobre el mismo contenido, cada color con su hex y ratio WCAG calculado (mínimo real: 6.1:1). Compuerta: elegir viéndolas en el celular bajo la luz de la cocina.

### Tipografía — estrategia original (resuelta arriba: Shantell Sans + Atkinson)

Pedido del usuario: como escrito a mano pero no cursiva, totalmente legible. Estrategia de **dos voces**:

- **Voz de Nana (títulos, mensajes, botones de intención):** manuscrita de palo, sin ligaduras. Candidatas a probar: Patrick Hand, Shantell Sans, Architects Daughter (todas gratuitas, Google Fonts, se sirven localmente en la PWA — sin CDN, local-first).
- **Voz de trabajo (listas, cantidades, recetas):** una fuente de máxima legibilidad para el vistazo de 3 segundos. Candidata: Atkinson Hyperlegible. Porqué dos y no una: la nota de refri real tiene letra a mano, pero una lista que no se lee de un vistazo traiciona el pilar 3. La manuscrita da el alma; la legible hace el trabajo.

## Estado del paso 0

| Decisión | Estado |
|---|---|
| Pilares visuales (máx. 3) | ✅ cerrados (arriba) |
| Entrada principal (menú de intenciones) | ✅ cerrada (arriba) |
| Wireframes de estructura — 6 pantallas: inicio, captura, despensa, cocinar-hoy, lista, ajustes | ✅ aprobados vía hi-fi/prototipo (`docs/diseno/Post-it exploracion/`) e implementados en la app (paso 1 TDD) — la compuerta de celular ahora es la de la app real |
| Paleta con ratios de contraste | ✅ tokens definitivos v2 (tabla arriba) en `src/ui/tokens.css`; ratificación final en la app real |
| Tipografías y escala | ✅ Shantell Sans + Atkinson Hyperlegible, servidas localmente |
| Colores de categoría (qué es cada ingrediente) | ✅ mapa cerrado (tabla arriba); vigilar rosa-frutas vs rosa-antojo en el celular |
| Ícono de la app | 🟡 placeholder generado (post-it amarillo con «N», `public/icons/`) — diseñar el definitivo |
