// Puente entre el espanol mexicano de la despensa y las claves en ingles de
// las tablas destiladas de los libros (flavor_pairings.js, cooking_techniques.js).
//
// Por que existe: los libros son en ingles y sus claves son la fuente canonica.
// Traducir 22 mil maridajes seria un trabajo enorme y fragil; en cambio basta
// traducir los ~380 ingredientes que la despensa puede contener. Este archivo
// es esa lista.
//
// Convencion: la clave es como lo escribe el usuario (espanol, minusculas, sin
// acentos tras normalizar); el valor es la clave exacta del libro.
// Un mismo ingrediente puede tener varios sinonimos apuntando al mismo valor:
// "jitomate" y "tomate" son la misma cosa en Mexico.

export const ES_TO_EN = {
  // --- Verduras y hortalizas ---
  'jitomate': 'tomatoes',
  'tomate': 'tomatoes',
  'tomate rojo': 'tomatoes',
  'tomate verde': 'tomatillos',
  'tomatillo': 'tomatillos',
  'miltomate': 'tomatillos',
  'cebolla': 'onions - in general',
  'cebolla morada': 'onions - in general',
  'cebolla blanca': 'onions - in general',
  'cebollin': 'chives',
  'cebolla de cambray': 'scallions',
  'cebollita': 'scallions',
  'ajo': 'garlic',
  'papa': 'potatoes',
  'papas': 'potatoes',
  'papa cambray': 'potatoes, new',
  'camote': 'sweet potatoes',
  'zanahoria': 'carrots',
  'calabaza': 'pumpkin',
  'calabacita': 'squash, summer',
  'elote': 'corn',
  'maiz': 'corn',
  'chayote': 'squash, summer',
  'jicama': 'jicama',
  'betabel': 'beets',
  'apio': 'celery',
  'pepino': 'cucumbers',
  'lechuga': 'lettuces - in general',
  'lechuga romana': 'lettuce, romaine',
  'espinaca': 'spinach',
  'acelga': 'greens, collard',
  'brocoli': 'broccoli',
  'coliflor': 'cauliflower',
  'col': 'cabbage - in general',
  'repollo': 'cabbage - in general',
  'col morada': 'cabbage, red',
  'coles de bruselas': 'brussels sprouts',
  'ejote': 'beans, green',
  'ejotes': 'beans, green',
  'chicharo': 'peas - in general',
  'chicharos': 'peas - in general',
  'berenjena': 'eggplant',
  'champinon': 'mushrooms - cremini',
  'champinones': 'mushrooms - cremini',
  'hongo': 'mushrooms - cremini',
  'setas': 'mushrooms - portobello',
  'portobello': 'mushrooms - portobello',
  'espárrago': 'asparagus',
  'esparrago': 'asparagus',
  'esparragos': 'asparagus',
  'alcachofa': 'artichokes',
  'poro': 'leeks',
  'puerro': 'leeks',
  'rabano': 'radishes',
  'nabo': 'rutabagas',
  'berro': 'watercress',
  'aguacate': 'avocados',
  'platano macho': 'plantains, green',
  'platano verde': 'plantains, green',
  'quelites': 'greens, mustard',
  'verdolaga': 'purslane',
  'verdolagas': 'purslane',
  'endivia': 'endive',
  'hinojo': 'fennel',
  'okra': 'okra',
  'colinabo': 'rutabagas',
  'chirivia': 'parsnips',

  // --- Chiles (clave para cocina mexicana) ---
  'chile': 'chile peppers - in general',
  'chiles': 'chile peppers - in general',
  'chile jalapeno': 'chile peppers, jalapeño',
  'jalapeno': 'chile peppers, jalapeño',
  'chile serrano': 'chile peppers, serrano',
  'serrano': 'chile peppers, serrano',
  'chile poblano': 'chile peppers, poblano',
  'poblano': 'chile peppers, poblano',
  'chile guajillo': 'chile peppers, guajillo',
  'guajillo': 'chile peppers, guajillo',
  'chile habanero': 'chile peppers, habanero',
  'habanero': 'chile peppers, habanero',
  'chile de arbol': 'chile peppers - in general',
  'chile ancho': 'chile peppers - in general',
  'chile chipotle': 'chile peppers - in general',
  'chipotle': 'chile peppers - in general',
  'chile morita': 'chile peppers - in general',
  'chile pasilla': 'chile peppers - in general',
  'pimiento': 'bell peppers',
  'pimiento morron': 'bell peppers',
  'morron': 'bell peppers',

  // --- Carnes, aves y visceras ---
  'pollo': 'chicken',
  'pechuga': 'chicken',
  'pechuga de pollo': 'chicken',
  'muslo de pollo': 'chicken',
  'pierna de pollo': 'chicken',
  'higado de pollo': "liver, chicken",
  'pavo': 'turkey',
  'guajolote': 'turkey',
  'res': 'beef - in general',
  'carne de res': 'beef - in general',
  'bistec': 'beef - steak: in general',
  'arrachera': 'beef - steak: skirt',
  'falda': 'beef - steak: flank',
  'rib eye': 'beef - steak: rib eye',
  'carne molida': 'beef - in general',
  'chambarete': 'beef - shank',
  'cola de res': 'beef - oxtails',
  'costilla': 'beef - ribs',
  'pecho': 'beef - brisket',
  'cachete': 'beef - cheeks',
  'higado': "liver, calf's",
  'cerdo': 'pork - in general',
  'puerco': 'pork - in general',
  'lomo de cerdo': 'pork - loin',
  'chuleta': 'pork - chops',
  'costilla de cerdo': 'pork - ribs',
  'panza de cerdo': 'pork - belly',
  'espaldilla': 'pork - shoulder',
  'filete de cerdo': 'pork - tenderloin',
  'tocino': 'bacon',
  'jamon': 'ham',
  'jamon serrano': 'prosciutto',
  'chorizo': 'pork - in general',
  'ternera': 'veal - in general',
  'cordero': 'lamb - in general',
  'borrego': 'lamb - in general',
  'pato': 'duck',
  'codorniz': 'quail',

  // --- Pescados y mariscos ---
  'pescado': 'fish - in general',
  'salmon': 'salmon',
  'atun': 'tuna',
  'bacalao': 'cod',
  'huachinango': 'bass, sea',
  'robalo': 'bass, sea',
  'mojarra': 'bass, black',
  'trucha': 'trout',
  'tilapia': 'flounder',
  'lenguado': 'sole',
  'sardina': 'sardines',
  'anchoa': 'anchovies',
  'camaron': 'shrimp',
  'camarones': 'shrimp',
  'pulpo': 'octopus',
  'calamar': 'squid',
  'cangrejo': 'crab',
  'jaiba': 'crab',
  'langosta': 'lobster',
  'almeja': 'clams',
  'mejillon': 'mussels',
  'ostion': 'oysters',
  'callo de hacha': 'scallops',

  // --- Granos, leguminosas y pasta ---
  'arroz': 'rice, white - in general',
  'arroz integral': 'rice, white - in general',
  'frijol': 'beans, pinto',
  'frijoles': 'beans, pinto',
  'frijol negro': 'beans, black',
  'frijol bayo': 'beans, pinto',
  'frijol pinto': 'beans, pinto',
  'alubia': 'beans, navy',
  'haba': 'beans, lima',
  'lenteja': 'lentils',
  'lentejas': 'lentils',
  'garbanzo': 'chickpeas',
  'garbanzos': 'chickpeas',
  'pasta': 'pasta',
  'espagueti': 'pasta',
  'fideo': 'pasta',
  'avena': 'oatmeal / oats',
  'cebada': 'barley',
  'cuscus': 'couscous',
  'polenta': 'polenta',
  'tortilla': 'corn',
  'masa': 'corn',

  // --- Lacteos y huevo ---
  'huevo': 'eggs and egg-based dishes - in general',
  'huevos': 'eggs and egg-based dishes - in general',
  'huevo cocido': 'eggs, hard-boiled',
  'crema': 'cream and ice cream',
  'crema acida': 'sour cream',
  'queso': 'cheese - in general',
  'queso crema': 'cream cheese',
  'queso fresco': 'cheese - in general',
  'queso panela': 'cheese - in general',
  'queso oaxaca': 'cheese - in general',
  'queso manchego': 'cheese - in general',
  'requeson': 'cheese - in general',
  'mascarpone': 'mascarpone',
  'yogur': 'yogurt',
  'yogurt': 'yogurt',
  'suero de leche': 'buttermilk',

  // --- Hierbas y especias ---
  'cilantro': 'cilantro',
  'perejil': 'parsley',
  'epazote': 'epazote',
  'hierbabuena': 'mint - in general',
  'menta': 'mint - in general',
  'albahaca': 'basil',
  'oregano': 'oregano',
  'tomillo': 'thyme',
  'romero': 'rosemary',
  'laurel': 'bay leaf',
  'salvia': 'sage',
  'estragon': 'tarragon',
  'eneldo': 'dill',
  'mejorana': 'marjoram',
  'cebollin fresco': 'chives',
  'canela': 'cinnamon',
  'comino': 'cumin',
  'clavo': 'cloves',
  'pimienta': 'pepper, black',
  'pimienta negra': 'pepper, black',
  'pimienta blanca': 'pepper, white',
  'pimienta gorda': 'allspice',
  'nuez moscada': 'nutmeg',
  'azafran': 'saffron',
  'curcuma': 'turmeric',
  'jengibre': 'ginger',
  'anis': 'anise, star',
  'anis estrella': 'anise, star',
  'cardamomo': 'cardamom',
  'paprika': 'paprika - in general',
  'pimenton': 'paprika - in general',
  'curry': 'curry powder and sauces',
  'ajonjoli': 'sesame seeds, white',
  'amapola': 'poppy seeds',
  'enebro': 'juniper berries',
  'alcaparra': 'capers',
  'alcaparras': 'capers',
  'rabano picante': 'horseradish',
  'wasabi': 'wasabi',
  'mostaza': 'mustard',
  'sal': 'salt, kosher',
  'azucar': 'sugar',
  'vainilla': 'vanilla',

  // --- Frutas ---
  'limon': 'limes',
  'lima': 'limes',
  'limon amarillo': 'lemons',
  'naranja': 'oranges - in general',
  'toronja': 'grapefruit',
  'mandarina': 'oranges - in general',
  'manzana': 'apples',
  'pera': 'pears',
  'platano': 'bananas',
  'mango': 'mangoes',
  'papaya': 'papayas',
  'piña': 'pineapples',
  'pina': 'pineapples',
  'sandia': 'watermelon',
  'melon': 'cantaloupe',
  'uva': 'grapes',
  'fresa': 'strawberries',
  'frambuesa': 'raspberries',
  'zarzamora': 'blackberries',
  'arandano': 'blueberries',
  'durazno': 'peaches',
  'chabacano': 'apricots - in general',
  'ciruela': 'plums',
  'cereza': 'cherries - in general',
  'higo': 'figs, fresh',
  'guayaba': 'guavas',
  'granada': 'pomegranates',
  'tamarindo': 'tamarind',
  'coco': 'coconut and coconut milk',
  'kiwi': 'kiwi fruit',
  'maracuya': 'passion fruit',
  'membrillo': 'quince',
  'datil': 'dates',
  'pasa': 'raisins',
  'pasas': 'raisins',
  'ruibarbo': 'rhubarb',
  'caqui': 'persimmons',
  'litchi': 'lychees',

  // --- Nueces y semillas ---
  'almendra': 'almonds',
  'almendras': 'almonds',
  'pistache': 'pistachios',
  'avellana': 'hazelnuts',
  'castana': 'chestnuts',
  'pepita': 'pumpkin seeds',
  'pepitas': 'pumpkin seeds',
  'nuez de la india': 'cashews',
  'pinon': 'pine nuts',

  // --- Grasas, liquidos y condimentos ---
  'aceite': 'olive oil',
  'aceite de oliva': 'olive oil',
  'aceite de ajonjoli': 'oil, sesame',
  'aceite de canola': 'oil, canola',
  'aceite de cacahuate': 'oil, peanut',
  'aceite de aguacate': 'oil, avocado',
  'vinagre': 'vinegar, white wine',
  'vinagre de manzana': 'vinegar, cider',
  'vinagre balsamico': 'vinegar, balsamic',
  'vinagre de arroz': 'vinegar, rice wine',
  'salsa de soya': 'soy sauce',
  'salsa de pescado': 'fish sauce',
  'miel': 'honey',
  'piloncillo': 'sugar',
  'melaza': 'molasses',
  'jarabe de maple': 'maple syrup',
  'chocolate': 'chocolate / cocoa - in general',
  'cacao': 'chocolate / cocoa - in general',
  'cafe': 'coffee and espresso',
  'aceituna': 'olives',
  'aceitunas': 'olives',
  'miso': 'miso and miso soup',
  'cerveza': 'beer',
  'tequila': 'tequila',
  'ron': 'rum',
  'vino tinto': 'pinot noir',
  'vino blanco': 'sauvignon blanc',
};

// Normaliza como escribe la gente: minusculas, sin acentos, sin plural obvio.
// "Jitomates" y "JITOMATE" deben llegar los dos a "jitomate".
function normalize(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')   // quita acentos
    .replace(/\s+/g, ' ');
}

// Candidatos de singular para una palabra en plural, del mas probable al menos.
function singulars(word) {
  const out = [];
  if (word.endsWith('es')) out.push(word.slice(0, -2));  // frijoles -> frijol
  if (word.endsWith('s')) out.push(word.slice(0, -1));   // jitomates -> jitomate
  return out;
}

// Indice normalizado, construido una sola vez al cargar el modulo.
const INDEX = new Map();
for (const [es, en] of Object.entries(ES_TO_EN)) {
  INDEX.set(normalize(es), en);
}

/**
 * Traduce un ingrediente escrito en espanol a la clave del libro.
 * Intenta, en orden: coincidencia exacta, sin plural, y primera palabra
 * (para que "pechuga de pollo asada" caiga en "pechuga de pollo" o "pollo").
 * Devuelve null si no lo reconoce: quien llama decide que hacer entonces.
 */
export function toBookKey(spanishName) {
  if (!spanishName) return null;
  const n = normalize(spanishName);

  if (INDEX.has(n)) return INDEX.get(n);

  // Plural del espanol. Hay que probar las dos formas: quitar solo la "s"
  // ("jitomates" -> "jitomate") y quitar "es" ("frijoles" -> "frijol").
  for (const s of singulars(n)) {
    if (INDEX.has(s)) return INDEX.get(s);
  }

  // Frase larga: probamos prefijos cada vez mas cortos.
  const words = n.split(' ');
  for (let len = words.length - 1; len >= 1; len--) {
    const prefix = words.slice(0, len).join(' ');
    if (INDEX.has(prefix)) return INDEX.get(prefix);
  }
  // Ultimo recurso: alguna palabra suelta que si conozcamos.
  for (const w of words) {
    if (INDEX.has(w)) return INDEX.get(w);
    for (const s of singulars(w)) {
      if (INDEX.has(s)) return INDEX.get(s);
    }
  }
  return null;
}
