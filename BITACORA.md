# BITÁCORA — HEALTY

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
