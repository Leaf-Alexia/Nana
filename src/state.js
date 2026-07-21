// Estado en memoria de la app (paso 1).
// Patrón mínimo: un objeto de estado + suscriptores que redibujan.
// En el paso 2 la despensa/lista se respaldan en IndexedDB (Dexie).
import { DEMO_PANTRY, DEMO_RECIPES, DEMO_SHOP, CANNED_REPLIES } from './data/demo_data.js';
import { guessCategory } from './data/categories.js';

const state = {
  screen: 'home',      // pantalla visible: home|capture|pantry|cook|cooking|list|settings
  toast: '',           // aviso verde de Nana en el inicio
  pantry: [...DEMO_PANTRY],
  recipes: DEMO_RECIPES.map(r => ({ ...r, sent: false, open: false, antojo: false })),
  shop: [...DEMO_SHOP],
  parsed: null,        // items entendidos al capturar compra (null = aún no)
  session: null,       // receta que se está cocinando ahora
  chat: [],
  replyIdx: 0,
  moreIdeasNote: ''    // respuesta de Nana al pedir más ideas en Cocinar hoy
};

const listeners = new Set();

export function getState() { return state; }

export function subscribe(fn) { listeners.add(fn); }

// Mezcla cambios y redibuja. Es el único camino para mutar el estado.
export function setState(patch) {
  Object.assign(state, patch);
  listeners.forEach(fn => fn(state));
}

export function go(screen) { setState({ screen, toast: '', moreIdeasNote: '' }); }

// Botón «Recomiéndame otras cosas» — placeholder honesto del paso 1:
// las ideas nuevas de verdad llegan cuando se conecte el LLM (paso 3).
export function askMoreIdeas() {
  setState({
    moreIdeasNote: 'Con lo de hoy, esas son mis mejores ideas. Cuando conectes mi cerebro (Ajustes) voy a poder inventarte más.'
  });
}

/* ---- Acciones de la app (portadas del prototipo aprobado) ---- */

// Entiende el texto de compra: separa por comas/«y» y saca cantidades.
// Placeholder del paso 1 — en el paso 3 esto lo hace el LLM (parseGroceries).
export function parseCapture(text) {
  const src = text.trim() || 'pollo, 6 jitomates y un kilo de arroz';
  const parts = src.replace(/^compr[eé]\s*/i, '').split(/,| y /i).map(s => s.trim()).filter(Boolean);
  const items = parts.map(p => {
    const m = p.match(/(\d+|un kilo|medio|media|un|una)\s*(kg|kilo|kilos|litro|l|piezas|pzas)?/i);
    const qty = m && m[0].trim() !== '' ? m[0].trim() : '1';
    let name = p.replace(m ? m[0] : '', '').replace(/\s*de\s*/i, ' ').trim() || p;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return { name, qty: qty === 'un kilo' ? '1 kg' : qty, category: guessCategory(name) };
  });
  setState({ parsed: items });
}

export function saveParsed() {
  setState({
    pantry: [...state.pantry, ...(state.parsed || [])],
    parsed: null,
    screen: 'pantry',
    toast: ''
  });
}

// Manda el faltante de una receta a la lista de compras (origen: receta).
export function sendMissing(id) {
  const recipe = state.recipes.find(r => r.id === id);
  if (!recipe || !recipe.missing) return;
  const name = recipe.missing.charAt(0).toUpperCase() + recipe.missing.slice(1);
  const already = state.shop.some(i => i.name.toLowerCase() === name.toLowerCase());
  setState({
    recipes: state.recipes.map(r => r.id === id ? { ...r, sent: true } : r),
    shop: already ? state.shop : [...state.shop, { name, origin: 'receta', category: guessCategory(name), checked: false }]
  });
}

// El antojo entra como sugerencia nueva arriba de la lista (rosa).
export function submitAntojo(text) {
  const t = text.trim();
  if (!t) return;
  const title = t.charAt(0).toUpperCase() + t.slice(1);
  setState({
    recipes: [{
      id: Date.now(), title, uses: [], missing: null, sent: false, open: false, antojo: true,
      steps: [
        '1. Nana arma la receta con tu despensa',
        '2. Si falta algo, te lo manda a la lista',
        '3. Toca «Voy a cocinar esto» cuando decidas'
      ]
    }, ...state.recipes]
  });
}

export function toggleRecipe(id) {
  setState({ recipes: state.recipes.map(r => r.id === id ? { ...r, open: !r.open } : r) });
}

export function startCooking(id) {
  const recipe = state.recipes.find(r => r.id === id);
  setState({
    session: recipe,
    screen: 'cooking',
    chat: [
      { who: 'tu', text: 'solo tengo 2 jitomates y pide 3' },
      { who: 'nana', text: 'Sale con 2: media taza de agua al licuar y una pizca más de sal.' }
    ]
  });
}

export function sendChat(text) {
  const t = text.trim();
  if (!t) return;
  const i = state.replyIdx;
  setState({
    replyIdx: i + 1,
    chat: [...state.chat, { who: 'tu', text: t }, { who: 'nana', text: CANNED_REPLIES[i % CANNED_REPLIES.length] }]
  });
}

export function finishCooking() {
  // Placeholder: marca dos ingredientes como por acabarse.
  // El descuento real de cantidades llega con el LLM (paso 3).
  const used = ['Jitomate', 'Cilantro'];
  setState({
    pantry: state.pantry.map(it => used.includes(it.name) ? { ...it, qty: 'se está acabando' } : it),
    session: null,
    chat: [],
    screen: 'home',
    toast: 'Listo — desconté lo usado de tu despensa.'
  });
}

export function toggleShopItem(item) {
  setState({ shop: state.shop.map(x => x === item ? { ...x, checked: !x.checked } : x) });
}

export function buyDone() {
  const bought = state.shop.filter(i => i.checked);
  if (!bought.length) {
    setState({ screen: 'home', toast: 'No palomeaste nada todavía.' });
    return;
  }
  setState({
    pantry: [...state.pantry, ...bought.map(b => ({ name: b.name, qty: '1', category: b.category }))],
    shop: state.shop.filter(i => !i.checked),
    screen: 'home',
    toast: 'Compras guardadas en tu despensa.'
  });
}
