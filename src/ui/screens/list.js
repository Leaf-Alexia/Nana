// LISTA DE COMPRAS: dos códigos de color a la vez, cada uno por su canal.
//   · Borde izquierdo = CATEGORÍA (qué es) — pedido del usuario 2026-07-21.
//   · Chip post-it   = ORIGEN (por qué está aquí), siempre con su palabra.
import { el, svg } from '../dom.js';
import { ICONS } from '../icons.js';
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

  // ESCANEAR LISTA (pregunta #8, 2026-11-07): botón de cámara en el encabezado.
  // Sin el atributo `capture`, Android ofrece elegir entre tomar foto o subir
  // una de la galería — justo el comportamiento pedido por el usuario.
  // Por ahora solo recibe la foto: leerla requiere el LLM (paso 3/4).
  const photoInput = el('input', {
    type: 'file', accept: 'image/*', style: 'display:none',
    onChange: (e) => {
      if (!e.target.files?.length) return;
      body.querySelector('.photo-note')?.remove();
      body.prepend(el('div', {
        class: 'postit photo-note',
        style: 'background:var(--nana);box-shadow:var(--shadow-note);font-family:var(--font-nana)'
      }, 'Ya tengo tu foto. Leerla y pasarla a la lista llega cuando me conectes un cerebro con vista (clave de Gemini).'));
      e.target.value = '';
    }
  });
  head.append(photoInput, el('button', {
    class: 'btn-back', 'aria-label': 'Escanear lista con foto',
    onClick: () => photoInput.click()
  }, svg(ICONS.camera)));

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
