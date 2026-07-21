// COCINANDO: la receta como guía interactiva + chat temporal con Nana.
// El chat vive solo mientras dura la sesión (decisión de la sesión de cocina).
import { el } from '../dom.js';
import { go, sendChat, finishCooking } from '../../state.js';

export function renderCooking(state) {
  const screen = el('div', { class: 'screen' });

  screen.append(el('div', { class: 'screen-head' },
    el('button', { class: 'btn-back', onClick: () => go('cook'), 'aria-label': 'Regresar' }, '←'),
    el('div', { class: 'screen-title', style: 'font-size:21px;line-height:1.2' },
      `Cocinando: ${state.session ? state.session.title.toLowerCase().split(' con ')[0] : ''}`)
  ));

  const body = el('div', { class: 'screen-body', style: 'gap:10px' });

  // Pasos de la receta con borde verde (voz de Nana)
  for (const s of (state.session ? state.session.steps : [])) {
    body.append(el('div', {
      class: 'item-row',
      style: 'min-height:0;padding:11px 14px;font-size:15.5px;border-left-color:var(--nana)'
    }, s));
  }

  // Encabezado del chat
  body.append(el('div', { class: 'group-head' },
    el('span', { class: 'tape tape--small', style: 'background:var(--nana);top:-9px;left:12px;transform:rotate(-2deg)' }),
    el('div', { class: 'group-name' }, 'Tu chat con Nana')
  ));

  for (const m of state.chat) {
    body.append(el('div', { class: `bubble ${m.who === 'nana' ? 'bubble--nana' : 'bubble--user'}` }, m.text));
  }

  body.append(el('div', { style: 'flex:1' }));

  // Entrada del chat
  const chatInput = el('input', {
    type: 'text', class: 'field', style: 'flex:1;font-size:15.5px',
    placeholder: 'Dile a Nana lo que pase…',
    onKeydown: e => { if (e.key === 'Enter') { sendChat(e.target.value); e.target.value = ''; } }
  });
  body.append(el('div', { style: 'display:flex;gap:8px' },
    chatInput,
    el('button', {
      class: 'btn-secondary', style: 'min-height:52px;padding:0 16px;background:var(--nana);font-size:15px;flex:none',
      onClick: () => { sendChat(chatInput.value); chatInput.value = ''; }
    }, 'Enviar')
  ));

  body.append(el('button', { class: 'btn-primary', onClick: finishCooking }, 'Ya terminé — descuenta lo usado'));

  screen.append(body);
  return screen;
}
