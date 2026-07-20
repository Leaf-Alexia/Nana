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
