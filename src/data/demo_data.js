// Datos de demostración del paso 1 (esqueleto).
// En el paso 2 esto se sustituye por IndexedDB (Dexie): la despensa real.
// Mantenerlos aparte de la lógica es la regla dura del TDD («¿dónde vive este dato?»).

export const DEMO_PANTRY = [
  { name: 'Pollo', qty: '1 kg', category: 'proteins' },
  { name: 'Huevos', qty: 'como 8', category: 'proteins' },
  { name: 'Jitomate', qty: '6 piezas', category: 'vegetables' },
  { name: 'Cebolla', qty: '2', category: 'vegetables' },
  { name: 'Cilantro', qty: 'poquito', category: 'vegetables' },
  { name: 'Plátano', qty: '4', category: 'fruits' },
  { name: 'Leche', qty: '1 L', category: 'dairy' },
  { name: 'Queso Oaxaca', qty: 'un trozo', category: 'dairy' },
  { name: 'Arroz', qty: '1 kg', category: 'staples' },
  { name: 'Aceite', qty: 'media botella', category: 'staples' },
  { name: 'Sal', qty: 'hay', category: 'spices' },
  { name: 'Comino', qty: 'hay', category: 'spices' },
  { name: 'Jabón de trastes', qty: '1', category: 'household' }
];

export const DEMO_RECIPES = [
  {
    id: 1,
    title: 'Arroz con pollo a la jardinera',
    uses: ['pollo', 'arroz', 'jitomate', 'cebolla'],
    missing: null,
    steps: [
      '1. Dora el pollo en trozos',
      '2. Sofríe el arroz con cebolla y jitomate',
      '3. Agrega agua caliente y tapa 18 min a fuego bajo'
    ]
  },
  {
    id: 2,
    title: 'Tacos de pollo con salsa de jitomate',
    uses: ['pollo', 'jitomate', 'cebolla', 'cilantro'],
    missing: 'tortillas',
    steps: [
      '1. Asa los jitomates y la cebolla',
      '2. Licúa con sal — salsa lista',
      '3. Deshebra el pollo y mézclalo'
    ]
  },
  {
    id: 3,
    title: 'Huevos ahogados en salsa',
    uses: ['huevos', 'jitomate', 'cebolla'],
    missing: null,
    steps: [
      '1. Asa jitomate y cebolla, licúa con sal',
      '2. Hierve la salsa 5 min',
      '3. Casca los huevos dentro y tapa 4 min'
    ]
  }
];

export const DEMO_SHOP = [
  { name: 'Tortillas', origin: 'receta', category: 'staples', checked: false },
  { name: 'Queso Oaxaca', origin: 'antojo', category: 'dairy', checked: false },
  { name: 'Pan de caja', origin: 'antojo', category: 'staples', checked: false },
  { name: 'Jabón de trastes', origin: 'manual', category: 'household', checked: true }
];

// Respuestas enlatadas del chat de cocina — placeholder del paso 1.
// En el paso 3 responde el LLM de verdad.
export const CANNED_REPLIES = [
  'Media a la salsa; la otra media pícala cruda para servir.',
  'Va bien — pruébalo de sal antes de servir.',
  'Eso se arregla: fuego bajo, tapa y 5 minutos más.',
  'Sí, ya está: si el cuchillo entra fácil, apaga.'
];
