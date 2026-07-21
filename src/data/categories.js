// Categorías de despensa: qué es cada ingrediente y con qué color se señala.
// Regla de ARTE.md: el color de categoría va en bordes/cintas, nunca como
// chip sin texto — así no se confunde con los post-its de origen de la lista.
// El color vive como token CSS (tokens.css); aquí solo se referencia.

export const CATEGORIES = [
  { key: 'proteins',   label: 'Proteínas',               cssVar: '--cat-proteins' },
  { key: 'vegetables', label: 'Verduras',                cssVar: '--cat-vegetables' },
  { key: 'fruits',     label: 'Frutas',                  cssVar: '--cat-fruits' },
  { key: 'dairy',      label: 'Lácteos',                 cssVar: '--cat-dairy' },
  { key: 'staples',    label: 'Básicos',                 cssVar: '--cat-staples' },
  { key: 'spices',     label: 'Condimentos y especias',  cssVar: '--cat-spices' },
  { key: 'household',  label: 'Hogar',                   cssVar: '--cat-household' }
];

// Mapa mínimo nombre→categoría para la demo del paso 1.
// En el paso 3 esto lo resuelve el LLM (con ingredient_names.js como puente);
// este mapa queda como respaldo sin conexión.
const NAME_TO_CATEGORY = {
  'pollo': 'proteins', 'huevos': 'proteins', 'huevo': 'proteins', 'carne': 'proteins',
  'jitomate': 'vegetables', 'jitomates': 'vegetables', 'cebolla': 'vegetables',
  'cilantro': 'vegetables', 'chile': 'vegetables', 'papa': 'vegetables', 'papas': 'vegetables',
  'plátano': 'fruits', 'platano': 'fruits', 'manzana': 'fruits', 'limón': 'fruits', 'limon': 'fruits',
  'leche': 'dairy', 'queso': 'dairy', 'queso oaxaca': 'dairy', 'crema': 'dairy', 'mantequilla': 'dairy',
  'arroz': 'staples', 'aceite': 'staples', 'tortillas': 'staples', 'tortilla': 'staples',
  'pan': 'staples', 'pan de caja': 'staples', 'frijol': 'staples', 'frijoles': 'staples',
  'sal': 'spices', 'comino': 'spices', 'pimienta': 'spices', 'orégano': 'spices', 'oregano': 'spices',
  'jabón': 'household', 'jabon': 'household', 'jabón de trastes': 'household',
  'servilletas': 'household', 'papel': 'household'
};

// Adivina la categoría por nombre; si no la conoce, cae en «básicos».
export function guessCategory(name) {
  const n = name.trim().toLowerCase();
  if (NAME_TO_CATEGORY[n]) return NAME_TO_CATEGORY[n];
  // Búsqueda por palabra contenida («queso oaxaca» → queso)
  for (const word of Object.keys(NAME_TO_CATEGORY)) {
    if (n.includes(word)) return NAME_TO_CATEGORY[word];
  }
  return 'staples';
}

// Color CSS listo para usar en estilos: var(--cat-…)
export function categoryColor(key) {
  const cat = CATEGORIES.find(c => c.key === key);
  return `var(${cat ? cat.cssVar : '--cat-staples'})`;
}

export function categoryLabel(key) {
  const cat = CATEGORIES.find(c => c.key === key);
  return cat ? cat.label : 'Básicos';
}
