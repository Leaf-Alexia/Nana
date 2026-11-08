// Estado de la app.
// Patrón mínimo: un objeto de estado + suscriptores que redibujan.
// Paso 2: la despensa y la lista se guardan en IndexedDB (db.js). La regla:
// primero se escribe en la base y luego se actualiza la pantalla, así lo que
// ves siempre es lo que quedó guardado.
import { DEMO_RECIPES, CANNED_REPLIES } from './data/demo_data.js';
import { db, HOUSEHOLD, requestPersistence } from './db.js';
import { guessCategory } from './data/categories.js';

const state = {
  screen: 'home',      // pantalla visible: home|capture|pantry|cook|cooking|list|settings
  toast: '',           // aviso verde de Nana en el inicio
  pantry: [],          // se llena desde la base al arrancar (loadData)
  recipes: DEMO_RECIPES.map(r => ({ ...r, sent: false, open: false, antojo: false })),
  shop: [],
  editingId: null,     // renglón de la despensa que se está editando
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

export function go(screen) { setState({ screen, toast: '', moreIdeasNote: '', editingId: null }); }

/* ---- Base de datos ---- */

// Lee despensa y lista guardadas. Se llama una vez al abrir la app.
export async function loadData() {
  await requestPersistence();
  const [pantry, shop] = await Promise.all([
    db.pantry.where('household_id').equals(HOUSEHOLD).toArray(),
    db.shop.where('household_id').equals(HOUSEHOLD).toArray()
  ]);
  setState({ pantry, shop });
}

// Recarga desde la base después de escribir (fuente única de la verdad).
async function refresh() {
  const [pantry, shop] = await Promise.all([
    db.pantry.where('household_id').equals(HOUSEHOLD).toArray(),
    db.shop.where('household_id').equals(HOUSEHOLD).toArray()
  ]);
  return { pantry, shop };
}

// Agrega cosas a la despensa. Si ya existe algo con el mismo nombre,
// actualiza su cantidad en vez de duplicarlo.
async function addToPantry(items) {
  const now = new Date().toISOString();
  for (const it of items) {
    const existing = await db.pantry
      .where('household_id').equals(HOUSEHOLD)
      .filter(p => p.name.toLowerCase() === it.name.toLowerCase())
      .first();
    if (existing) {
      await db.pantry.update(existing.id, { qty: it.qty, added_at: now });
    } else {
      await db.pantry.add({ household_id: HOUSEHOLD, name: it.name, qty: it.qty, category: it.category, added_at: now });
    }
  }
}

// Editar un renglón de la despensa (nombre y cantidad).
export function startEdit(id) { setState({ editingId: id }); }

export async function updatePantryItem(id, changes) {
  const name = changes.name.trim();
  if (!name) return;
  await db.pantry.update(id, { name, qty: changes.qty.trim() || '1', category: guessCategory(name) });
  setState({ ...(await refresh()), editingId: null });
}

// «Ya no tengo esto» — corrección de un toque (decisión cerrada #10).
export async function deletePantryItem(id) {
  await db.pantry.delete(id);
  setState({ ...(await refresh()), editingId: null });
}

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

export async function saveParsed() {
  await addToPantry(state.parsed || []);
  setState({
    ...(await refresh()),
    parsed: null,
    screen: 'pantry',
    toast: ''
  });
}

// Manda el faltante de una receta a la lista de compras (origen: receta).
export async function sendMissing(id) {
  const recipe = state.recipes.find(r => r.id === id);
  if (!recipe || !recipe.missing) return;
  const name = recipe.missing.charAt(0).toUpperCase() + recipe.missing.slice(1);
  const already = state.shop.some(i => i.name.toLowerCase() === name.toLowerCase());
  if (!already) {
    await db.shop.add({ household_id: HOUSEHOLD, name, origin: 'receta', category: guessCategory(name), checked: false });
  }
  setState({
    ...(await refresh()),
    recipes: state.recipes.map(r => r.id === id ? { ...r, sent: true } : r)
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

export async function finishCooking() {
  // Placeholder: marca como «se está acabando» lo que la receta usa.
  // El descuento real de cantidades llega con el cerebro (paso 3).
  const used = (state.session?.uses || []).map(u => u.toLowerCase());
  for (const it of state.pantry) {
    if (used.includes(it.name.toLowerCase())) await db.pantry.update(it.id, { qty: 'se está acabando' });
  }
  setState({
    ...(await refresh()),
    session: null,
    chat: [],
    screen: 'home',
    toast: 'Listo — desconté lo usado de tu despensa.'
  });
}

export async function toggleShopItem(item) {
  await db.shop.update(item.id, { checked: !item.checked });
  setState(await refresh());
}

export async function buyDone() {
  const bought = state.shop.filter(i => i.checked);
  if (!bought.length) {
    setState({ screen: 'home', toast: 'No palomeaste nada todavía.' });
    return;
  }
  await addToPantry(bought.map(b => ({ name: b.name, qty: '1', category: b.category })));
  await db.shop.bulkDelete(bought.map(b => b.id));
  setState({
    ...(await refresh()),
    screen: 'home',
    toast: 'Compras guardadas en tu despensa.'
  });
}
