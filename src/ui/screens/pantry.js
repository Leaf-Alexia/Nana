// DESPENSA: lo que hay, agrupado por categoría.
// El color de categoría aparece en la cinta del grupo Y en el borde de cada
// renglón — el color dice QUÉ es cada cosa (pedido del usuario, 2026-07-21).
import { el } from '../dom.js';
import { screenHead } from './common.js';
import { go, startEdit, updatePantryItem, deletePantryItem } from '../../state.js';
import { CATEGORIES, categoryColor } from '../../data/categories.js';

export function renderPantry(state) {
  const screen = el('div', { class: 'screen' });

  const head = screenHead('Despensa');
  head.append(el('span', {
    class: 'chip chip--tilt-l',
    style: 'margin-left:auto;background:var(--postit-yellow)'
  }, `${state.pantry.length} cosas`));
  screen.append(head);

  const body = el('div', { class: 'screen-body', style: 'gap:10px' });

  // Leyenda de categorías: cada color con su palabra (nunca color solo)
  body.append(el('div', { style: 'display:flex;flex-wrap:wrap;gap:6px;font-size:12px' },
    CATEGORIES.filter(c => state.pantry.some(it => it.category === c.key)).map(c =>
      el('span', { class: 'chip', style: `background:${categoryColor(c.key)}` }, c.label)
    )
  ));

  // Despensa vacía (primer uso): Nana invita a registrar la compra.
  if (!state.pantry.length) {
    body.append(el('div', {
      class: 'postit',
      style: 'background:var(--nana);box-shadow:var(--shadow-note);font-family:var(--font-nana)'
    }, 'Tu despensa está vacía. Cuéntame qué compraste y yo lo acomodo.'));
  }

  // Grupos en el orden del catálogo
  for (const cat of CATEGORIES) {
    const items = state.pantry.filter(it => it.category === cat.key);
    if (!items.length) continue;

    body.append(el('div', { class: 'group-head' },
      el('span', { class: 'tape-swatch', style: `background:${categoryColor(cat.key)}` }),
      el('div', { class: 'group-name' }, cat.label)
    ));

    for (const it of items) {
      const border = `min-height:54px;border-left-color:${categoryColor(cat.key)}`;

      // Modo edición: dos campos + guardar / «ya no tengo esto»
      if (state.editingId === it.id) {
        const nameIn = el('input', { class: 'field', value: it.name, 'aria-label': 'Nombre', style: 'min-height:44px;flex:2' });
        const qtyIn = el('input', { class: 'field', value: it.qty, 'aria-label': 'Cantidad', style: 'min-height:44px;flex:1' });
        body.append(el('div', { class: 'item-row', style: `${border};flex-wrap:wrap;gap:8px` },
          nameIn, qtyIn,
          el('div', { style: 'display:flex;gap:8px;width:100%' },
            el('button', { class: 'btn-secondary', style: 'flex:1',
              onClick: () => updatePantryItem(it.id, { name: nameIn.value, qty: qtyIn.value }) }, 'Guardar'),
            el('button', { class: 'btn-ghost', style: 'flex:1',
              onClick: () => deletePantryItem(it.id) }, 'Ya no tengo esto')
          )
        ));
        continue;
      }

      // Renglón normal: tocarlo abre la edición
      body.append(el('button', {
        class: 'item-row', style: `${border};width:100%;text-align:left;cursor:pointer`,
        'aria-label': `Editar ${it.name}`, onClick: () => startEdit(it.id)
      },
        el('span', { class: 'item-name' }, it.name),
        el('span', { class: 'qty' }, it.qty)
      ));
    }
  }

  body.append(el('button', { class: 'btn-ghost', style: 'margin-top:8px', onClick: () => go('capture') },
    '＋ Agregar algo'));

  screen.append(body);
  return screen;
}
