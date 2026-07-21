// Piezas compartidas entre pantallas.
import { el } from '../dom.js';
import { go } from '../../state.js';

// Encabezado con botón de regreso y título
export function screenHead(title, backTo = 'home') {
  return el('div', { class: 'screen-head' },
    el('button', { class: 'btn-back', onClick: () => go(backTo), 'aria-label': 'Regresar' }, '←'),
    el('div', { class: 'screen-title' }, title)
  );
}
