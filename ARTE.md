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

## Dirección visual — PENDIENTE

Paleta, tipografías, pilares y referencias se definen en la **sesión de wireframes** (siguiente paso del proyecto, paso 0 del TDD). Los wireframes se guardan en `docs/diseno/` con puntero aquí.

| Decisión | Estado |
|---|---|
| Pilares visuales (máx. 3) | ⬜ pendiente sesión wireframes |
| Paleta con ratios de contraste | ⬜ pendiente |
| Tipografías y escala | ⬜ pendiente |
| Wireframes de las 4 pantallas del MVP (despensa, hoy-cocino, lista, ajustes) | ⬜ pendiente |
| Ícono de la app (bloqueado también por nombre, pregunta #1 de SPEC) | ⬜ pendiente |
