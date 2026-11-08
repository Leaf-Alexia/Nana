// NOMBRES DE DESPENSA DEL CEREBRO INTEGRADO (paso 3a, decisión cerrada #11).
//
// Por qué existe aparte de ingredient_names.js: aquel traduce a las claves en
// inglés de los libros, y productos de súper como la catsup o las tostadas no
// salen en ellos. Este archivo traduce cómo lo escribe el usuario a la clave
// que usa recipes.js. No inventa claves de libro.
//
// Convención: clave = como lo escribe el usuario (minúsculas, sin acentos);
// valor = clave canónica de recipes.js. Se irá llenando con el uso real.

export const PANTRY_SYNONYMS = {
  // --- Los 9 que faltaban (2026-11-07) ---
  'salchicha': 'salchicha',
  'salchichas': 'salchicha',
  'salchicha de pavo': 'salchicha',
  'pan': 'pan',
  'bolillo': 'pan',
  'bolillos': 'pan',
  'telera': 'pan',
  'teleras': 'pan',
  'pan de caja': 'pan',
  'pan blanco': 'pan',
  'pan de hot dog': 'pan',
  'pan para hot dog': 'pan',
  'pan de hamburguesa': 'pan',
  'pan para hamburguesa': 'pan',
  'catsup': 'catsup',
  'ketchup': 'catsup',
  'kétchup': 'catsup',
  'mayonesa': 'mayonesa',
  'mayo': 'mayonesa',
  'salsa': 'salsa',
  'salsa verde': 'salsa',
  'salsa roja': 'salsa',
  'salsa valentina': 'salsa',
  'salsa embotellada': 'salsa',
  'tostadas': 'tostadas',
  'tostada': 'tostadas',
  'caldo de pollo': 'caldo de pollo',
  'consome': 'caldo de pollo',
  'consome de pollo': 'caldo de pollo',
  'knorr': 'caldo de pollo',
  'leche': 'leche',
  'leche entera': 'leche',
  'leche deslactosada': 'leche',
  'leche light': 'leche',
  'chile en polvo': 'chile en polvo',
  'tajin': 'chile en polvo',
  'miguelito': 'chile en polvo'
};
