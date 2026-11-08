// BASE DE DATOS LOCAL (paso 2 del TDD) — Dexie sobre IndexedDB.
//
// Cómo funciona, en corto:
//   1. IndexedDB es la base de datos que Chrome trae para cada sitio; lo que
//      se guarda aquí sobrevive a cerrar la app o apagar el celular.
//   2. Dexie la hace fácil de usar: se declaran "tablas" y sus índices.
//   3. Solo se declaran los campos por los que se busca (índices); el resto
//      de campos de cada registro se guarda igual, sin declararlo.
//
// Multi-hogar desde el día 1 (SPEC, modelo de datos): todo registro lleva
// household_id. En el MVP existe un solo hogar: 'home'.
//
// Nombres de campo usados en el código (equivalencia con SPEC):
//   qty = quantity · origin = source · checked = done
import Dexie from 'dexie';

export const HOUSEHOLD = 'home';

export const db = new Dexie('nana');

// Versión 1 del esquema. Si algún día cambia, se agrega db.version(2)
// con su migración — nunca se edita esta línea (rompería datos guardados).
db.version(1).stores({
  pantry: '++id, household_id, name, category',
  shop: '++id, household_id, name, checked'
});

// Pide a Chrome que no borre estos datos aunque el celular ande sin espacio.
// Si el navegador dice que no, no pasa nada: igual se guardan.
export async function requestPersistence() {
  try { await navigator.storage?.persist?.(); } catch { /* sin soporte */ }
}
