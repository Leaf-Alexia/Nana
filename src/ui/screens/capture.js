// AÑADIR A LA DESPENSA: escribes/dictas lo comprado, Nana lo entiende
// y te muestra lo entendido para confirmar antes de guardar.
import { el } from '../dom.js';
import { screenHead } from './common.js';
import { setState, getState, parseCapture, saveParsed } from '../../state.js';
import { categoryColor, categoryLabel } from '../../data/categories.js';

export function renderCapture(state) {
  const screen = el('div', { class: 'screen' });
  screen.append(screenHead('Añadir a la despensa'));
  const body = el('div', { class: 'screen-body' });

  if (!state.parsed) {
    // Fase 1: capturar texto
    const textarea = el('textarea', {
      class: 'field',
      placeholder: 'Escribe o dicta: «compré pollo, 6 jitomates y un kilo de arroz»'
    });
    body.append(textarea);
    body.append(el('div', { class: 'postit', style: 'background:var(--postit-yellow)' },
      'Tip: el micrófono de tu teclado dicta por ti.'));
    body.append(el('button', { class: 'btn-primary', onClick: () => parseCapture(textarea.value) },
      'Apúntalo, Nana'));
  } else {
    // Fase 2: confirmar lo entendido
    body.append(el('div', { style: 'font-family:var(--font-nana);font-size:17px' }, 'Esto entendí — ¿lo guardo?'));
    state.parsed.forEach((it, i) => {
      body.append(el('div', {
        class: 'item-row',
        style: `border-left-color:${categoryColor(it.category)}`,
        title: categoryLabel(it.category)
      },
        el('span', { class: 'item-name' }, it.name),
        el('span', { class: 'qty' }, it.qty),
        el('button', {
          style: 'width:34px;height:34px;border:var(--stroke-thin);border-radius:8px;background:var(--paper);cursor:pointer;font-size:15px;flex:none',
          'aria-label': `Quitar ${it.name}`,
          onClick: () => setState({ parsed: getState().parsed.filter((_, j) => j !== i) })
        }, '✕')
      ));
    });
    body.append(el('button', { class: 'btn-primary', onClick: saveParsed }, 'Sí, guárdalo en la despensa'));
    body.append(el('button', { class: 'btn-secondary', onClick: () => setState({ parsed: null }) }, 'Corregir'));
  }

  screen.append(body);
  return screen;
}
