// DESPENSA: lo que hay, agrupado por categoría.
// El color de categoría aparece en la cinta del grupo Y en el borde de cada
// renglón — el color dice QUÉ es cada cosa (pedido del usuario, 2026-07-21).
import { el } from '../dom.js';
import { screenHead } from './common.js';
import { go } from '../../state.js';
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

  // Grupos en el orden del catálogo
  for (const cat of CATEGORIES) {
    const items = state.pantry.filter(it => it.category === cat.key);
    if (!items.length) continue;

    const groupHead = el('div', { class: 'group-head' },
      el('span', { class: 'tape tape--small', style: `background:${categoryColor(cat.key)};top:-9px;left:12px;transform:rotate(-2deg)` }),
      el('div', { class: 'group-name' }, cat.label)
    );
    body.append(groupHead);

    for (const it of items) {
      body.append(el('div', { class: 'item-row', style: `min-height:54px;border-left-color:${categoryColor(cat.key)}` },
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
