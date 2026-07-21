// LISTA DE COMPRAS: dos códigos de color a la vez, cada uno por su canal.
//   · Borde izquierdo = CATEGORÍA (qué es) — pedido del usuario 2026-07-21.
//   · Chip post-it   = ORIGEN (por qué está aquí), siempre con su palabra.
import { el } from '../dom.js';
import { screenHead } from './common.js';
import { toggleShopItem, buyDone } from '../../state.js';
import { categoryColor, categoryLabel } from '../../data/categories.js';
import { ORIGINS, originColor } from '../../data/origins.js';

export function renderList(state) {
  const screen = el('div', { class: 'screen' });

  const pending = state.shop.filter(i => !i.checked);
  const cart = state.shop.filter(i => i.checked);

  const head = screenHead('Lista de compras');
  head.append(el('span', {
    class: 'chip chip--tilt-r',
    style: 'margin-left:auto;background:var(--origin-manual)'
  }, `${pending.length} por comprar`));
  screen.append(head);

  const body = el('div', { class: 'screen-body', style: 'gap:11px' });

  // Leyenda de orígenes (cada color con su palabra)
  body.append(el('div', { style: 'display:flex;flex-wrap:wrap;gap:6px;font-size:12.5px' },
    Object.values(ORIGINS).map(o =>
      el('span', { class: 'chip', style: `background:var(${o.cssVar})` }, o.label)
    )
  ));

  const row = (it, done) => el('div', {
    class: `item-row${done ? ' done' : ''}`,
    style: `border-left-color:${categoryColor(it.category)}`,
    title: categoryLabel(it.category)
  },
    el('input', {
      type: 'checkbox', checked: done, 'aria-label': it.name,
      onChange: () => toggleShopItem(it)
    }),
    el('span', { class: 'item-name' }, it.name),
    el('span', {
      class: `chip ${done ? '' : 'chip--tilt-l'}`,
      style: `margin-left:auto;background:${originColor(it.origin)};font-size:12px;flex:none`
    }, ORIGINS[it.origin]?.shortLabel || it.origin)
  );

  pending.forEach(it => body.append(row(it, false)));

  if (cart.length) {
    body.append(el('div', { class: 'group-head', style: 'margin-top:10px' },
      el('span', { class: 'tape-swatch', style: 'background:var(--origin-manual);transform:rotate(2deg)' }),
      el('div', { class: 'group-name' }, 'Ya en el carrito')
    ));
    cart.forEach(it => body.append(row(it, true)));
  }

  body.append(el('div', { style: 'flex:1' }));
  body.append(el('button', { class: 'btn-primary', onClick: buyDone }, 'Ya compré — pásalo a la despensa'));

  screen.append(body);
  return screen;
}
