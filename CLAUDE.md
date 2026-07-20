# HEALTY — instrucciones para Claude

App personal local-first de despensa: registra lo que compras, sugiere qué cocinar con lo que tienes y arma la lista de compras. "Healty" es nombre provisional (pregunta abierta #1 en SPEC.md).

## 🔒 Núcleo (solo cambia por decisión explícita del usuario)

**Objetivo:** que el usuario le diga a la app lo que compra y lo que se le antoja, y ella resuelva el resto: qué cocinar hoy con lo que hay, y qué comprar el domingo.

**Qué NO es:**
- No es producto comercial: sin cuentas, sin backend en la nube, sin telemetría. Los datos viven en el dispositivo del usuario.
- No usa APIs de pago. La inteligencia viene de LLMs gratuitos u open-source (decisión del usuario, 2026-07-20).
- No rastrea caducidades exactas por producto: solo duraciones aproximadas desde una tabla estática (capa 2).

**Reglas de decisión (pensamiento crítico obligatorio):**
- Nunca estar de acuerdo por complacencia. Si una idea tiene un problema de diseño, técnico o de alcance, decirlo con claridad y explicar el porqué.
- Ante cada decisión: 2–3 opciones con sus trade-offs Y una recomendación firme. Nunca dejar la decisión "en el aire".
- Señalar riesgos, supuestos ocultos y deuda técnica antes de que se vuelvan problemas.
- Filtro para toda petición: ¿vale el costo (tokens/tiempo)?, ¿lo pedido es el objetivo real o hay un problema X-Y?, ¿hay desconocimiento que cubrir?
- "Lo mejor" = el objetivo declarado del proyecto. El usuario desempata siempre.

**Regla de idioma:** todo el código, variables, funciones y nombres de archivo en inglés. Todos los comentarios, la documentación y la conversación en español. Así el usuario distingue a simple vista qué es programación y qué es explicación.

**Regla de scope:** el mapa son las capas 1–5 de SPEC.md. No se construye nada de una capa superior antes de cerrar la actual, salvo decisión explícita del usuario.

**No proliferación de documentos:** el canon (CLAUDE.md, SPEC.md, BITACORA.md, TDD.md, ARTE.md, PROCESO.md) quedó cerrado en el arranque (2026-07-20). Crear un doc canónico nuevo requiere decisión explícita del usuario, nunca iniciativa propia. Antes de crear cualquier archivo: ¿cabe como sección de un doc existente? Los artefactos de trabajo (investigaciones, wireframes, referencias) van a `docs/investigaciones/` o `docs/diseno/` Y dejan un puntero de una línea en el doc canónico que los usa. Si no está apuntado desde un doc canónico, no existe.

## Perfil del usuario

Conoce HTML, CSS y Python a nivel básico-medio; no domina JavaScript ni arquitectura de apps. Claude carga el peso técnico. Explicaciones de código: pasos cortos, numerados y sin jerga no explicada. En cocina y uso doméstico el experto es el usuario.

## Definición de terminado (DoD)

Una pieza está ✅ solo si: funciona, fue probada en dispositivo real (celular o tableta Android), su código está comentado en español, y quedó registrada en BITACORA.md + commit. Los criterios específicos de cada pieza viven en SPEC.md / TDD.md junto a la pieza.

## Flujo de trabajo

- Cambio con sentido = entrada en BITACORA.md + commit, sin preguntar.
- Decisiones pendientes: inbox numerado al final de SPEC.md; el usuario puede responder por número.
- La prueba real en dispositivo es la compuerta: los números marcados "a validar" se validan en la primera prueba, no se acumulan.

## Punteros

- `SPEC.md` — fuente de la verdad: identidad, capas 1–5, modelo de datos, flujos, inbox de preguntas abiertas.
- `TDD.md` — arquitectura, stack y orden de construcción verificable.
- `ARTE.md` — dirección visual y reglas de UI de cocina.
- `BITACORA.md` — estado actual e historial de decisiones con su porqué.
- `PROCESO.md` — caso de estudio para portafolio; se destila de la bitácora al cerrar cada hito.
- `docs/investigaciones/cotizacion-raspberry-pi.md` — hardware de capa 5; NO comprar hasta cerrar capa 4.
