# Investigación — ¿Qué tan personalizable es el cálculo calórico?

**Fecha:** 2026-07-20 · **Pregunta que la originó:** la crítica del usuario a que las fórmulas nutricionales estén hechas "para un hombre blanco promedio", y si conviene ajustar por etnia, sexo, ciclo menstrual, región, alergias, enfermedades, humores o somatotipos.

**Método:** 5 frentes de búsqueda en paralelo, 21 fuentes primarias, 102 afirmaciones extraídas, 25 verificadas con votación adversarial (3 jueces intentando refutar cada una). 14 confirmadas, 11 refutadas.

**Nivel de confianza de este documento:** los factores 1 y 2 pasaron verificación adversarial completa. Los factores 3–8 provienen de extracción con cita textual de fuentes primarias, pero no alcanzaron la fase de verificación por límite de presupuesto — se marcan como *(sin verificación adversarial)*.

---

## Veredicto por factor

| # | Factor | Veredicto | Magnitud real | ¿Va en la app? |
|---|--------|-----------|---------------|----------------|
| 1 | Etnia / población | Crítica **válida**, corrección **no existe** | Sesgo de ~136 kcal/día (10.7%) en mujeres hispanas | No como factor numérico |
| 2 | Sexo más allá del coeficiente | **Refutado** (0-3) | Diferencia desaparece al ajustar composición corporal | Ya cubierto por Mifflin |
| 3 | Ciclo menstrual | **Real pero pequeño** | 30–120 kcal/día en fase lútea (3–5%) | Sí, cualitativo |
| 4 | Clima / altitud | Real solo en **exposición aguda** | +17–27% al subir, se aclimata | No (ya vives aclimatado) |
| 5 | Alergias / intolerancias | **Sólido** | No aplica a calorías | **Sí — el más valioso** |
| 6 | Diabetes / hipotiroidismo | **Real, terreno médico** | +7.7% si mal controlada; ~15% por tiroides | Sí, como filtro; no como cálculo |
| 7 | Cuatro humores | **Pseudociencia** | Ninguna | No |
| 8 | Somatotipos | **Desacreditado** | Ninguna sobre gasto energético | No |

---

## El hallazgo transversal (lo más importante)

Antes de discutir factores, hay un techo estructural que los limita a todos:

1. **Mifflin-St Jeor acierta dentro del ±10% en solo ~82% de las personas** (~87% en delgados, ~75% en personas con obesidad). Una de cada cinco queda fuera. *(Frankenfield 2013, n=337, calorimetría indirecta; voto 3-0)*
2. **Peso, estatura, edad y sexo explican solo 63–70% de la varianza** del metabolismo en reposo. Queda ~30% que ninguna corrección demográfica alcanza. El propio paper original de Mifflin (1990) ya probó que añadir % de grasa, IMC y cintura **no mejoraba** la predicción. *(Mifflin 1990 R²=0.71; Gepner 2023 n=3001, R² 0.63–0.70; voto 2-1)*
3. Lo único que sí sube la varianza explicada (a 73.5%) es la **masa libre de grasa**, y requiere DXA — un estudio de rayos X que no cabe en una app doméstica. Una báscula de bioimpedancia casera mete su propio error, que puede anular la ganancia. *(Gepner 2023; voto 2-1)*

**Conclusión:** el margen de error individual de cualquier fórmula estática es de ±10–20%. Añadir campos de perfil no lo cierra.

---

## 1. Etnia — la crítica es correcta, pero no hay arreglo disponible

**Lo que sí está demostrado:**
- En 38 mujeres hispanas de 20–40 años, Mifflin **sobreestimó 136 kcal/día (10.7%)** y acertó dentro del margen aceptable en solo **55.3%** de los casos. Las seis ecuaciones probadas sobreestimaron, cinco de forma significativa (p<.001). *(PMC3779143; voto 3-0)*
- **Ninguna ecuación estándar se derivó sobre una muestra grande de hispanos.** Harris-Benedict usó población estadounidense de principios del siglo XX; la base FAO/WHO/UNU incluyó solo 3 estudios pequeños con hispanos, con mujeres en uno solo. *(voto 3-0)*
- La preocupación está reconocida en literatura clínica seria: investigadores del **Instituto Nacional de Ciencias Médicas y Nutrición Salvador Zubirán** desarrollaron una ecuación mexicana argumentando exactamente esto. *(Nutr Hosp 2014; voto 3-0)*

**Por qué aun así no se implementa:**
- La ecuación mexicana propia **explica solo 52% de la varianza** y tiene un error individual de **±384 kcal (±19%)** sobre un gasto medio de ~2001 kcal. Una fórmula "local" no compra precisión individual. *(voto 3-0)*
- En **esas mismas mujeres hispanas**, la ecuación de Owen —derivada en población estadounidense— acertó en **84.2%** de los casos. Es un problema de *especificación de la ecuación*, no un "metabolismo hispano" distinto. *(voto 2-1)*
- El sesgo está **confundido con adiposidad**: la muestra tenía IMC medio 28.9 y 42% de grasa. Ningún estudio aísla un efecto étnico puro.
- Heymsfield et al. concluyen que considerar la etnia "no parece mejorar marcadamente la exactitud".
- Varias afirmaciones fuertes en esta línea **fueron refutadas** por los jueces: que Mifflin sobreestime ~138 kcal/día en afroamericanos como prueba de fallo sistemático (0-3), y que la raza afroamericana prediga independientemente −144 kcal/día (1-2).

**Veredicto:** la crítica al sesgo de la base empírica es **cierta y está documentada**. La conclusión "por lo tanto existe un factor de corrección étnico que debemos aplicar" **no se sigue**. Codificar un multiplicador por etnia sería inventar precisión.

## 2. Sexo más allá del coeficiente — refutado

La afirmación de que el coeficiente "sexo" de Mifflin no corrige del todo las diferencias sexuales fue **refutada por voto unánime 0-3**. Dato que lo explica: en atletas universitarios la diferencia bruta entre hombres y mujeres es enorme (~886 kcal/día), pero **desaparece estadísticamente al ajustar por masa libre de grasa** — el sexo funciona como proxy de composición corporal, y Mifflin ya lo incluye.

## 3. Ciclo menstrual — real, pequeño, por debajo del ruido de la fórmula

*(sin verificación adversarial)* Meta-análisis de 26 estudios y 318 mujeres: el gasto en reposo **es mayor en fase lútea** que en folicular, con efecto pequeño pero significativo (ES=0.33; IC95% 0.17–0.49; p<0.001). Magnitud: **30–120 kcal/día, ~3–5% del RMR** (5 de 6 estudios recientes coinciden). *(PLoS One 2020)*

**Veredicto:** el efecto es real, pero **más pequeño que el error de la propia fórmula** (±10–20%). Corregir numéricamente por fase del ciclo sería falsa precisión. Lo honesto y útil es cualitativo: reconocer el aumento de hambre y antojos en esa fase y no leerlo como "fallé mi meta".

## 4. Clima y altitud — irrelevante para uso doméstico

*(sin verificación adversarial)* La altitud **sí** eleva el metabolismo basal: +27% al día 2, ~+17% tras 2–3 semanas. Pero la literatura discrepa en la magnitud (rangos de 5% a 27%) y las National Academies **se niegan explícitamente a fijar una cifra**.

**Veredicto:** esto aplica a **exposición aguda** (subir de nivel del mar a la montaña). Alguien que *vive* a cierta altitud ya está aclimatado y ese es su estado basal, capturado implícitamente al medirse. No es un campo de perfil útil.

## 5. Alergias e intolerancias — sólido, y lo más valioso para la app

*(sin verificación adversarial)* No es un tema de calorías, es de **qué alimentos evitar** — y ahí no hay debate científico. Dato que sí matiza la implementación: **la intolerancia a la lactosa es dosis-dependiente, no binaria**. Incluso quienes se consideran muy intolerantes toleran 12–24 g de lactosa al día (1–2 vasos de leche) sin síntomas; el manejo correcto es *restricción*, no *evitación total*.

**Veredicto:** implementar como **filtro duro de recetas e ingredientes**, no como corrección calórica. Es el factor de personalización con mejor relación evidencia/costo de todo el estudio.

## 6. Diabetes e hipotiroidismo — reales, pero es terreno médico

*(sin verificación adversarial)*
- **Diabetes tipo 2 controlada:** el gasto energético total **no difiere** del de personas sin diabetes (3 estudios con controles). Sin corrección calórica.
- **Diabetes mal controlada (HbA1c ≥ 8%):** gasto basal **7.7% mayor**. El efecto depende del *control glucémico*, no del diagnóstico.
- **Hipotiroidismo:** variación de ~**15%** en el gasto en reposo según el nivel de TSH (rango 0.1–10 μIU/mL).

**Veredicto:** relevante, pero una app doméstica **no debe ajustar calorías por una condición médica** — eso es supervisión clínica. Lo apropiado: registrar la condición para **filtrar y priorizar recetas** (p. ej. carga glucémica) y remitir al médico para los números.

## 7. Cuatro humores — pseudociencia

No sobrevivió ninguna evidencia. La teoría de los humores es medicina medieval sin base fisiológica moderna; la idea de que un "tipo de persona" procese mejor o peor las carnes o las grasas no tiene respaldo en la literatura revisada. Tampoco emergió evidencia utilizable de nutrigenómica: el campo existe, pero no está listo para guiar decisiones sin pruebas genéticas.

## 8. Somatotipos — desacreditado en su origen

*(sin verificación adversarial)* William Sheldon construyó ecto/meso/endomorfo en los años 40 sobre **observación subjetiva, fotografías y muestras pequeñas**, ligando forma corporal a personalidad. Sus afirmaciones **fueron descartadas por la comunidad científica como "charlatanería"** (*quackery*), no como teoría contestada. Una revisión de alcance de 2025 documenta que el somatotipo (método Heath-Carter) se usa hoy **solo como herramienta descriptiva y de selección deportiva**, y **no establece ninguna relación entre somatotipo y gasto energético**.

**Veredicto:** no implementar. La intuición popular detrás ("hay gente que engorda más fácil") es real, pero su causa es composición corporal y conducta, no una tipología.

---

## Implicación de diseño para Nana

La conclusión no es "conformarse con la fórmula del hombre blanco promedio". Es que **la vía para acercarse a la realidad no son más campos de perfil, sino la calibración empírica**:

> Si el usuario registra su peso periódicamente y lo que come, la app puede **corregir su gasto estimado contra la tendencia real de peso**. Alguien que come 2000 kcal y no baja tiene un gasto real de ~2000 kcal, sin importar lo que diga la fórmula.

Eso es el metabolismo del usuario **medido**, no estimado — y captura de golpe la etnia, la genética, el somatotipo, la eficiencia digestiva y todo el ~30% de varianza que las ecuaciones no explican. Es más honesto, más preciso y más barato de programar que cualquier tabla de correcciones.

**Campos de perfil que sí se piden:** sexo, edad, peso, estatura, nivel de actividad (Mifflin-St Jeor), alergias/intolerancias con severidad, condiciones médicas (solo como filtro), objetivo.

**Lo que NO se pide:** etnia con factor numérico, somatotipo, humor, fase del ciclo como corrección de kcal.

**Cómo se comunica:** rango, no número único ("necesitas ~1900–2100 kcal"), y el recordatorio de que la estimación se afina sola con las semanas.

---

## Fuentes principales

- Frankenfield et al., *Clinical Nutrition* 2013 — https://pubmed.ncbi.nlm.nih.gov/23631843/
- Gepner et al., *Nutrients* 2023 (n=3001) — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9960966/
- Mujeres hispanas, *Topics in Clinical Nutrition* 2013 — https://pmc.ncbi.nlm.nih.gov/articles/PMC3779143/
- Ecuación mexicana, *Nutrición Hospitalaria* 2014 — https://scielo.isciii.es/scielo.php?script=sci_arttext&pid=S0212-16112014001100004
- ¿Ecuaciones específicas por raza?, *Nutrition & Diabetes* 2019 — https://pmc.ncbi.nlm.nih.gov/articles/PMC6662665/
- Ciclo menstrual, *PLoS One* 2020 — https://pubmed.ncbi.nlm.nih.gov/32658929/
- Gasto energético en diabetes, *Frontiers in Nutrition* 2016 — https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2016.00056/full
- Somatotipos, revisión de alcance 2025 — https://pmc.ncbi.nlm.nih.gov/articles/PMC11860359/
