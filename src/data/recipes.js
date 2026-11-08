// TABLA DE RECETAS DEL CEREBRO INTEGRADO (paso 3a, decisión cerrada #11).
//
// De dónde sale (2026-11-07):
//   1. Los básicos de la casa que dio el usuario: hot dog, hamburguesa,
//      huevo con jamón / salchicha, frijoles, pollo, con tortilla o pan.
//   2. Los 24 productos de la canasta básica PACIC (Profeco): aceite, arroz,
//      atún, azúcar, bistec de res, carne molida, cebolla, chile jalapeño,
//      chuleta de cerdo, frijol, huevo, leche, limón, manzana, naranja,
//      pan de caja, papa, pasta para sopa, pollo, sardina, jitomate, zanahoria
//      (más jabón y papel higiénico, que no se cocinan).
//
// Cómo la usa Nana sin LLM: cruza `required` contra la despensa. Si están
// todos, la receta se puede hacer hoy; si falta uno o dos, la puede proponer
// avisando qué falta. `optional` suma puntos pero no bloquea.
// Los nombres de ingredientes son claves de ingredient_names.js (español,
// minúsculas, sin acentos) para que el mismo diccionario sirva en todo.
//
// `side`: acompañamiento sugerido. `minutes`: tiempo aproximado (a validar
// en la cocina del usuario). `steps`: pasos cortos para la guía de cocina.

export const RECIPES = [
  // ---- Básicos de la casa (dichos por el usuario) ----
  {
    id: 'hot_dogs', name: 'Hot dogs', minutes: 15, side: ['pan'],
    required: ['salchicha', 'pan'],
    optional: ['jitomate', 'cebolla', 'chile jalapeno', 'mostaza', 'catsup', 'mayonesa'],
    steps: ['Pica jitomate, cebolla y chile', 'Asa o hierve las salchichas', 'Calienta el pan', 'Arma con tus aderezos']
  },
  {
    id: 'hamburgers', name: 'Hamburguesas', minutes: 25, side: ['pan'],
    required: ['carne molida', 'pan'],
    optional: ['queso', 'jitomate', 'cebolla', 'lechuga', 'aguacate', 'catsup', 'mostaza'],
    steps: ['Sazona la carne con sal y pimienta y forma tortitas', 'Cocina 4 min por lado', 'Pon el queso al final para que se derrita', 'Tuesta el pan y arma']
  },
  {
    id: 'eggs_ham', name: 'Huevo con jamón', minutes: 10, side: ['tortilla', 'pan'],
    required: ['huevo', 'jamon'],
    optional: ['cebolla', 'frijoles'],
    steps: ['Pica el jamón y dóralo un poco', 'Agrega los huevos batidos con sal', 'Mueve hasta que cuajen']
  },
  {
    id: 'eggs_sausage', name: 'Huevo con salchicha', minutes: 10, side: ['tortilla', 'pan'],
    required: ['huevo', 'salchicha'],
    optional: ['cebolla', 'jitomate', 'frijoles'],
    steps: ['Rebana la salchicha y dórala', 'Agrega los huevos batidos con sal', 'Mueve hasta que cuajen']
  },
  {
    id: 'pot_beans', name: 'Frijoles de la olla', minutes: 120, side: ['tortilla'],
    required: ['frijol'],
    optional: ['cebolla', 'ajo', 'epazote'],
    steps: ['Limpia y remoja los frijoles (idealmente desde la noche)', 'Cuécelos en agua con cebolla y ajo', 'Sala al final, cuando ya estén suaves']
  },
  {
    id: 'refried_beans', name: 'Frijoles refritos', minutes: 15, side: ['tortilla', 'pan'],
    required: ['frijoles', 'aceite'],
    optional: ['cebolla', 'queso'],
    steps: ['Acitrona cebolla en aceite', 'Agrega frijoles cocidos con un poco de caldo', 'Machaca hasta la textura que te guste']
  },
  {
    id: 'molletes', name: 'Molletes', minutes: 15, side: [],
    required: ['pan', 'frijoles', 'queso'],
    optional: ['jitomate', 'cebolla', 'chile jalapeno', 'jamon'],
    steps: ['Unta frijoles en el pan', 'Pon queso encima', 'Gratina en horno o sartén tapado', 'Sirve con pico de gallo']
  },

  // ---- Huevo (canasta básica) ----
  {
    id: 'mexican_eggs', name: 'Huevos a la mexicana', minutes: 12, side: ['tortilla'],
    required: ['huevo', 'jitomate', 'cebolla'],
    optional: ['chile jalapeno', 'frijoles'],
    steps: ['Pica jitomate, cebolla y chile', 'Sofríe en aceite', 'Agrega los huevos y mueve hasta cuajar']
  },
  {
    id: 'eggs_potato', name: 'Huevo con papa', minutes: 20, side: ['tortilla'],
    required: ['huevo', 'papa'],
    optional: ['cebolla', 'chorizo'],
    steps: ['Corta la papa en cubitos y fríela hasta dorar', 'Agrega los huevos batidos', 'Mueve hasta cuajar']
  },
  {
    id: 'chilaquiles', name: 'Chilaquiles', minutes: 25, side: [],
    required: ['tortilla', 'jitomate'],
    optional: ['chile', 'cebolla', 'huevo', 'pollo', 'queso', 'crema'],
    steps: ['Corta tortillas en triángulos y fríelas', 'Licúa jitomate, chile, cebolla y ajo; sazona la salsa', 'Baña los totopos en la salsa caliente', 'Sirve con queso, crema y huevo o pollo']
  },

  // ---- Pollo ----
  {
    id: 'shredded_chicken', name: 'Pollo deshebrado (base)', minutes: 40, side: ['tortilla'],
    required: ['pollo'],
    optional: ['cebolla', 'ajo'],
    steps: ['Cuece el pollo en agua con cebolla, ajo y sal', 'Guarda el caldo', 'Deshebra: sirve para tacos, tostadas o sopa']
  },
  {
    id: 'chicken_soup', name: 'Caldo de pollo', minutes: 60, side: ['tortilla', 'arroz'],
    required: ['pollo', 'zanahoria', 'papa'],
    optional: ['cebolla', 'ajo', 'calabaza', 'arroz', 'limon', 'cilantro'],
    steps: ['Cuece el pollo con cebolla y ajo', 'Agrega zanahoria y papa en trozos', 'Cocina hasta que estén suaves', 'Sirve con limón y cilantro']
  },
  {
    id: 'chicken_tinga', name: 'Tinga de pollo', minutes: 45, side: ['tortilla'],
    required: ['pollo', 'jitomate', 'cebolla'],
    optional: ['chipotle', 'crema', 'lechuga'],
    steps: ['Cuece y deshebra el pollo', 'Acitrona cebolla en rodajas', 'Licúa jitomate con chipotle y agrégalo', 'Mezcla el pollo y deja que se impregne']
  },
  {
    id: 'grilled_chicken', name: 'Pechuga asada', minutes: 20, side: ['tortilla', 'arroz'],
    required: ['pollo'],
    optional: ['limon', 'ajo', 'cebolla'],
    steps: ['Sazona con sal, pimienta, ajo y limón', 'Asa a fuego medio-alto, 5–6 min por lado', 'Deja reposar 3 min antes de cortar']
  },

  // ---- Res y cerdo (canasta básica) ----
  {
    id: 'steak_mexican', name: 'Bistec a la mexicana', minutes: 30, side: ['tortilla', 'arroz'],
    required: ['bistec', 'jitomate', 'cebolla'],
    optional: ['chile jalapeno', 'papa'],
    steps: ['Corta el bistec en tiras y dóralo', 'Agrega cebolla, jitomate y chile picados', 'Cocina hasta que se haga salsita']
  },
  {
    id: 'picadillo', name: 'Picadillo', minutes: 30, side: ['tortilla', 'arroz'],
    required: ['carne molida', 'papa', 'zanahoria'],
    optional: ['jitomate', 'cebolla', 'chicharos'],
    steps: ['Dora la carne molida', 'Agrega papa y zanahoria en cubitos', 'Añade jitomate licuado y cocina hasta que la papa esté suave']
  },
  {
    id: 'pork_chops', name: 'Chuletas de cerdo', minutes: 20, side: ['arroz', 'tortilla'],
    required: ['chuleta'],
    optional: ['cebolla', 'manzana', 'papa'],
    steps: ['Sazona con sal y pimienta', 'Dóralas en sartén caliente, 4–5 min por lado', 'Opcional: carameliza cebolla y manzana en la misma grasa']
  },
  {
    id: 'meat_tacos', name: 'Tacos de bistec', minutes: 20, side: ['tortilla'],
    required: ['bistec', 'tortilla'],
    optional: ['cebolla', 'cilantro', 'limon', 'salsa'],
    steps: ['Pica el bistec y dóralo a fuego alto', 'Calienta las tortillas', 'Sirve con cebolla, cilantro y limón']
  },

  // ---- Pescado en lata (canasta básica) ----
  {
    id: 'tuna_salad', name: 'Ensalada de atún', minutes: 10, side: ['pan', 'tostadas'],
    required: ['atun'],
    optional: ['mayonesa', 'jitomate', 'cebolla', 'chile jalapeno', 'limon', 'zanahoria'],
    steps: ['Escurre el atún', 'Pica las verduras', 'Mezcla con mayonesa o limón', 'Sirve en tostadas o pan']
  },
  {
    id: 'sardine_tostadas', name: 'Tostadas de sardina', minutes: 10, side: ['tostadas'],
    required: ['sardina'],
    optional: ['cebolla', 'lechuga', 'limon', 'chile jalapeno'],
    steps: ['Desmenuza la sardina con su salsa', 'Agrega cebolla picada y limón', 'Sirve sobre tostadas con lechuga']
  },

  // ---- Guarniciones y sopas ----
  {
    id: 'red_rice', name: 'Arroz rojo', minutes: 30, side: [],
    required: ['arroz', 'jitomate'],
    optional: ['cebolla', 'ajo', 'zanahoria', 'chicharos'],
    steps: ['Fríe el arroz en aceite hasta que se ponga opaco', 'Licúa jitomate, cebolla y ajo y agrégalo', 'Añade agua o caldo (2 por 1 de arroz)', 'Tapa a fuego bajo 20 min sin destapar']
  },
  {
    id: 'pasta_soup', name: 'Sopa de pasta', minutes: 20, side: [],
    required: ['pasta', 'jitomate'],
    optional: ['cebolla', 'ajo', 'caldo de pollo'],
    steps: ['Dora la pasta en aceite', 'Agrega jitomate licuado con cebolla y ajo', 'Añade agua o caldo y cuece hasta que la pasta esté suave']
  },
  {
    id: 'potato_tacos', name: 'Tacos de papa', minutes: 30, side: ['tortilla'],
    required: ['papa', 'tortilla'],
    optional: ['queso', 'lechuga', 'salsa'],
    steps: ['Cuece y machaca la papa con sal', 'Rellena tortillas y dóblalas', 'Dóralas en aceite', 'Sirve con lechuga y salsa']
  },
  {
    id: 'quesadillas', name: 'Quesadillas', minutes: 10, side: [],
    required: ['tortilla', 'queso'],
    optional: ['jamon', 'pollo', 'frijoles', 'salsa'],
    steps: ['Pon queso en la tortilla y dóblala', 'Calienta en comal hasta que derrita', 'Agrega relleno extra si hay']
  },
  {
    id: 'ham_sandwich', name: 'Sándwich de jamón', minutes: 5, side: [],
    required: ['pan', 'jamon'],
    optional: ['queso', 'jitomate', 'lechuga', 'mayonesa', 'aguacate'],
    steps: ['Unta el pan', 'Arma con jamón, queso y verduras', 'Opcional: tuéstalo en sartén']
  },
  {
    id: 'pico_de_gallo', name: 'Pico de gallo', minutes: 10, side: [],
    required: ['jitomate', 'cebolla'],
    optional: ['chile jalapeno', 'cilantro', 'limon'],
    steps: ['Pica todo finito', 'Mezcla con sal y limón']
  },

  // ---- Desayuno dulce / frutas (canasta básica) ----
  {
    id: 'rice_pudding', name: 'Arroz con leche', minutes: 40, side: [],
    required: ['arroz', 'leche', 'azucar'],
    optional: ['canela'],
    steps: ['Cuece el arroz en agua con canela', 'Agrega leche y azúcar', 'Cocina a fuego bajo moviendo hasta que espese']
  },
  {
    id: 'fruit_bowl', name: 'Fruta picada', minutes: 5, side: [],
    required: ['manzana'],
    optional: ['platano', 'naranja', 'limon', 'chile en polvo'],
    steps: ['Pica la fruta', 'Agrega limón y chile si te gusta']
  }
];
