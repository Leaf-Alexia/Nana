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

## Paleta — candidata recomendada 🟡 (se valida en pasada 2, en el celular)

El usuario dudaba entre: (a) lavanda/índigo claro (tranquilidad), (b) blanco y negro (uniforme de nana), (c) colores post-it. Recomendación firme de Claude — **fusionar (b) y (c) bajo la metáfora del papel**:

- **Base "papel y tinta":** fondo blanco roto/crema (papel) + texto gris casi negro (tinta). Es el blanco-y-negro del uniforme pero cálido, y es literalmente el pilar 2.
- **Acentos post-it con rol funcional:** amarillo/rosa/verde/azul pastel como *notas*, no decoración — p. ej. origen de items en la lista, estados, avisos de Nana. Regla: un post-it señala algo; si no señala nada, no va. **Confirmado por el usuario (2026-07-21):** quiere el código de color estilo post-it para distinguir qué es cada cosa. Falta fijar en pasada 2 el mapa color→significado (pocos colores, significado estable en toda la app).
- **Lavanda/índigo: descartada.** Es la opción menos conectada con la metáfora del papel y la más cercana al look "template morado-azul" que la regla anti-genérico prohíbe.
- Números (hex exactos y ratios ≥ 4.5:1 sobre crema, bajo luz cálida) se fijan y validan en la pasada 2.

## Tipografía — estrategia 🟡 (candidatas se prueban en el celular, pasada 2)

Pedido del usuario: como escrito a mano pero no cursiva, totalmente legible. Estrategia de **dos voces**:

- **Voz de Nana (títulos, mensajes, botones de intención):** manuscrita de palo, sin ligaduras. Candidatas a probar: Patrick Hand, Shantell Sans, Architects Daughter (todas gratuitas, Google Fonts, se sirven localmente en la PWA — sin CDN, local-first).
- **Voz de trabajo (listas, cantidades, recetas):** una fuente de máxima legibilidad para el vistazo de 3 segundos. Candidata: Atkinson Hyperlegible. Porqué dos y no una: la nota de refri real tiene letra a mano, pero una lista que no se lee de un vistazo traiciona el pilar 3. La manuscrita da el alma; la legible hace el trabajo.

## Estado del paso 0

| Decisión | Estado |
|---|---|
| Pilares visuales (máx. 3) | ✅ cerrados (arriba) |
| Entrada principal (menú de intenciones) | ✅ cerrada (arriba) |
| Wireframes de estructura — 6 pantallas: inicio, captura, despensa, cocinar-hoy, lista, ajustes | 🟡 pasada 1 corregida con el feedback del usuario (inicio con notas de despensa/por-comprar, botones de acción, antojo fusionado en cocinar-hoy) — compuerta: verla en el celular |
| Paleta con ratios de contraste | 🟡 candidata recomendada (arriba); hex y ratios en pasada 2 |
| Tipografías y escala | 🟡 estrategia definida; fuentes se eligen viéndolas en el celular |
| Ícono de la app | ⬜ pendiente (nombre ya cerrado; se diseña con la paleta de pasada 2) |
