# Cotización: Estación de cocina Raspberry Pi + pantalla táctil

**Fecha de investigación:** 2026-07-20 · Tipo de cambio de referencia: ~19 MXN/USD.
**Estado:** hardware NO comprado — la Raspberry es fase de expansión, se compra cuando la app ya funcione en celular/tableta.

## Datos clave para wireframes (independientes de la compra)

| Pantalla | Resolución | Orientación nativa | Notas |
|---|---|---|---|
| Touch Display 2 (Pi 5, recomendada) | **720×1280** (7", HD) | Vertical nativa; se rota a 1280×720 horizontal | Táctil capacitivo 5 puntos |
| Touch Display 7" original (Pi 4) | **800×480** (7") | Horizontal | Resolución baja: UI debe funcionar con poco espacio vertical |

Implicación de diseño: la UI de cocina debe funcionar en **7" con dedos mojados/ocupados** — botones grandes, poca densidad, modo "manos libres" deseable. Diseñar mobile-first cubre ambos casos.

---

## Opción 1 — Económica: Raspberry Pi 4 (4GB) + pantalla oficial 7"

| Componente | Modelo | Precio (MXN) | Tienda | URL |
|---|---|---|---|---|
| Computadora | Raspberry Pi 4 Model B, 4GB RAM | $1,889 (MercadoLibre/UNIT) – $1,990 (330ohms) | MercadoLibre MX / 330ohms | <https://listado.mercadolibre.com.mx/raspberry-pi-4-4gb> · <https://www.330ohms.com/collections/raspberry-pi-4/products/raspberry-pi-4-modelo-b> |
| Pantalla táctil | Raspberry Pi 7" Touch Display oficial (800×480, DSI) | $1,669 | AG Electrónica | <https://agelectronica.com/detalle?busca=RASPBERRYPI-DISPLAY> |
| Fuente | Oficial Raspberry Pi 15W USB-C (5.1V/3A) | $255 | Microbot México | <https://microbot.com.mx/products/fuente-oficial-raspberry-pi-4-usb-c-5v-3a-ksa-15e-051300hu> |
| microSD | Kingston Canvas Select Plus 64GB (A1, U1) | $144 | MercadoLibre MX | <https://www.mercadolibre.com.mx/tarjeta-de-memoria-micro-sd-kingston-canvas-select-plus-64gb/p/MLM53385826> |
| Case/soporte | SmartiPi Touch 2 (case todo-en-uno, soporte y ventilador) | $1,938 (Amazon MX) / $1,219 (Cyberpuerta, **agotado**) | Amazon MX / Cyberpuerta | <https://www.amazon.com.mx/SmartiPi-Touch-visualizaci%C3%B3n-Ventilador-refrigeraci%C3%B3n/dp/B07WXK38YM> · <https://www.cyberpuerta.mx/Promociones/330Ohms-Carcasa-y-Soporte-Smartipi-Touch-2-para-Pantalla-7-Raspberry-Pi.html> |

**Total: ≈ $5,900 – $6,000 MXN** (baja a ≈ $5,200 si Cyberpuerta repone el case).
Referencia comprando en EE.UU.: ≈ $165 USD (~$3,100 MXN sin envío/importación).

Notas:
- Pantalla 7" original agotada en Geek Factory ($2,309); AG Electrónica la tiene a $1,669 con stock CDMX/GDL/MTY.
- SmartiPi Touch 2 solo soporta hasta Pi 4. Verificar precio en Microbot: <https://microbot.com.mx/products/carcasa-smartipi-touch-2-cspit2>

## Opción 2 — RECOMENDADA: Raspberry Pi 5 (8GB) + Touch Display 2

| Componente | Modelo | Precio (MXN) | Tienda | URL |
|---|---|---|---|---|
| Computadora | Raspberry Pi 5, 8GB RAM (128 pzas en stock) | $4,259 | AG Electrónica | <https://agelectronica.com/detalle?busca=RASPBERRYPI-5%2F8GB> |
| Pantalla táctil | Raspberry Pi Touch Display 2, 7" (720×1280, DSI) | ≈ $1,900 – $2,100 (**estimado**, MSRP $60 USD) | Microbot MX / Amazon MX | <https://microbot.com.mx/products/raspberry-pi-touch-display-2-pantalla-oficial-7-hd> · <https://www.amazon.com.mx/Pantalla-Raspberry-Pi-SC1635-pulgadas/dp/B0DM24QFCF> |
| Fuente | Oficial Raspberry Pi 27W USB-C (5.1V/5A) | $291 | AG Electrónica | <https://agelectronica.com/detalle?busca=RASPBERRYPI-27W-USB-C-PSU> |
| Disipador | Raspberry Pi Active Cooler (oficial) | $145 | AG Electrónica | <https://agelectronica.com/detalle?busca=RASPBERRYPI-ACTIVE-COOLER> |
| microSD | Kingston Canvas Select Plus 64GB | $144 | MercadoLibre MX | <https://www.mercadolibre.com.mx/tarjeta-de-memoria-micro-sd-kingston-sdcs264gb-canvas-select-plus-con-adaptador-sd-64gb/p/MLM15703578> |
| Case/soporte | SmartiPi Touch Pro 2 ($44.99 USD, **importado — sin distribuidor MX**) | ≈ $1,100 – $1,400 (**estimado**) | SmartiCase / Amazon US | <https://smarticase.com/products/smartipi-touch-pro> · <https://www.amazon.com/SmartiPi-Touch-Pro-Raspberry-Touchscreen/dp/B08VSFZDDT> |

**Total: ≈ $7,900 – $8,300 MXN.**
Referencia comprando en EE.UU.: ≈ $209 USD (~$3,950 MXN).

**Variante recomendada para bajar costo (≈ $7,000 MXN):** el Touch Display 2 permite atornillar la Pi 5 directo a su parte trasera; en lugar del case importado basta un soporte de tablet genérico (~$150–300 MXN en MercadoLibre) o un stand impreso en 3D.

Atajo posible: Kit Raspberry Pi 5 oficial en Microbot (fuente 27W + case + Active Cooler juntos): <https://microbot.com.mx/products/raspberry-pi-5-official-starter-kit/>

## Notas prácticas generales

1. **Compatibilidad DSI:** la Pi 5 usa conector DSI de 22 pines; el Touch Display 2 incluye ambos cables. Si se usa la pantalla 7" *original* con Pi 5 se necesita el cable adaptador "DSI Display Cable" (~$30–60 MXN). El SmartiPi Touch 2 NO sirve para Pi 5 (usar Touch Pro/Pro 2).
2. **Fuente oficial obligatoria:** Pi 5 con pantalla exige la de 27W (5A); Pi 4 la de 15W. Cargadores de celular genéricos causan throttling y corrupción de la microSD.
3. **Evitar pantallas táctiles HDMI genéricas** de MercadoLibre: táctil resistivo malo, drivers problemáticos, y ocupan HDMI+USB. Para cocina, DSI oficial.
4. **Dónde comprar:** AG Electrónica fue lo más barato con stock verificable (envío mismo día, sucursales CDMX/GDL/MTY). Microbot y 330ohms son distribuidores oficiales confiables. En MercadoLibre, verificar que el vendedor sea UNIT Electronics o 330ohms oficial.
5. Precios verificados el 2026-07-20 salvo los marcados como estimados; fluctúan con el tipo de cambio. **Re-verificar antes de comprar.**
