# PROCESO — Caso de estudio de NANA (portafolio)

Documento hacia afuera: el reto, las decisiones y el método, curados para mostrar. **No se escribe en vivo**: se destila de BITACORA.md al cerrar cada hito.

## El proyecto en una frase

App personal local-first que convierte "compré pollo y jitomate" en *qué cocinar hoy* y *qué comprar el domingo* — con una Raspberry Pi como futura pantalla y cerebro de la cocina.

---

## Hito 0 — Arranque (2026-07-20)

**El reto:** convertir una idea difusa ("una app que sepa qué hay en mi despensa") en un proyecto construible por una persona no especialista, usable lo antes posible, y con un mapa honesto de crecimiento.

**Decisiones clave:**
- *Local-first sin cuentas*: los datos viven en el dispositivo. Se eliminó de tajo backend, hosting, autenticación y sus costos — el 80% de la complejidad típica de "una app" no aplicaba al objetivo real.
- *PWA en vez de app nativa*: un solo código corre en celular, tableta y la futura Raspberry Pi.
- *Solo LLMs gratuitos, tras una capa adaptadora*: la inteligencia (parsear compras, sugerir recetas, inferir antojos) es intercambiable por configuración; el proyecto no depende de ningún proveedor.
- *La Raspberry Pi como cerebro*: lo que empezó como "quiero una pantalla en la cocina" se rediseñó como fase final donde la Pi es servidor local + LLM local (Ollama) + pantalla táctil — resolviendo de paso la sincronización multi-dispositivo.

**Lo descartado (y por qué eso también es diseño):** app nativa Kotlin (no corre en la Pi), Flutter (maquinaria desproporcionada), integración con WhatsApp (API de pago) y con Google Notes (fricción sin beneficio), rastreo exacto de caducidades (costo alto, valor marginal frente a una tabla estática de duraciones).

**Método:** entrevista socrática por rondas → propuesta con alcance en 5 capas y estimado realista (18–25 h de MVP) → documentación mínima con canon cerrado. El hardware se cotizó el día 1 (tiendas mexicanas, precios verificados) pero la compra se difirió a la capa 5: primero el software útil, luego el fierro.

**Problemas que NO ocurrieron gracias a decisiones previsoras:** (se llenará en hitos siguientes — ej. el modelo de datos nació con `household_id` para que multi-hogar no exija reconstruir la base).

---

*(Hitos siguientes se agregan al cerrar cada uno.)*
