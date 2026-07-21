// COCINAR HOY: el antojo se dice aquí mismo y las sugerencias salen como
// notas con cinta (rosa si es antojo o falta algo; verde si no falta nada).
// Los ingredientes de «Usas:» llevan su color de categoría (pedido 2026-07-21).
import { el } from '../dom.js';
import { screenHead } from './common.js';
import { submitAntojo, toggleRecipe, sendMissing, startCooking, askMoreIdeas } from '../../state.js';
import { guessCategory, categoryColor } from '../../data/categories.js';

export function renderCook(state) {
  const screen = el('div', { class: 'screen' });
  screen.append(screenHead('Cocinar hoy'));
  const body = el('div', { class: 'screen-body' });

  // Caja del antojo
  const antojoInput = el('input', {
    type: 'text', class: 'field',
    style: 'flex:1;font-family:var(--font-nana)',
    placeholder: '«Se me antoja…»',
    onKeydown: e => { if (e.key === 'Enter') { submitAntojo(e.target.value); e.target.value = ''; } }
  });
  body.append(el('div', { style: 'display:flex;gap:8px' },
    antojoInput,
    el('button', {
      class: 'btn-secondary',
      style: 'min-height:52px;padding:0 16px;background:var(--origin-antojo);font-size:15px;flex:none',
      onClick: () => { submitAntojo(antojoInput.value); antojoInput.value = ''; }
    }, 'Díselo')
  ));

  // Tarjetas de sugerencia
  for (const r of state.recipes) {
    const tapeColor = (r.antojo || (r.missing && !r.sent)) ? 'var(--origin-antojo)' : 'var(--nana)';
    const card = el('div', { class: 'note note--round', style: 'display:flex;flex-direction:column;gap:8px' },
      el('span', { class: 'tape tape--small', style: `background:${tapeColor};transform:rotate(-3deg)` }),
      el('div', { style: 'font-family:var(--font-nana);font-size:20px;font-weight:700;margin-top:2px' }, r.title)
    );

    // «Usas:» con cada ingrediente en chip de su categoría
    if (r.uses.length) {
      card.append(el('div', { style: 'display:flex;flex-wrap:wrap;gap:5px;align-items:center;font-size:14.5px;color:var(--ink-soft)' },
        'Usas:',
        r.uses.map(name => el('span', {
          style: `background:${categoryColor(guessCategory(name))};border:1px solid rgba(0,0,0,.15);border-radius:5px;padding:2px 8px;font-size:13px;color:var(--ink)`
        }, name))
      ));
    } else {
      card.append(el('div', { style: 'font-size:14.5px;color:var(--ink-soft)' }, 'Usas: lo que ya tienes en tu despensa'));
    }

    // Estado de faltantes
    if (r.missing && !r.sent) {
      card.append(el('button', {
        style: 'font-size:14px;background:var(--origin-antojo);align-self:flex-start;padding:5px 12px;border-radius:6px;border:1.5px solid rgba(0,0,0,.25);cursor:pointer;text-align:left',
        onClick: () => sendMissing(r.id)
      }, `Te faltan: ${r.missing} — toca y va a la lista`));
    } else if (r.missing && r.sent) {
      card.append(el('div', {
        style: 'font-size:14px;background:var(--origin-manual);align-self:flex-start;padding:5px 12px;border-radius:6px;border:1px solid rgba(0,0,0,.2)'
      }, `✓ ${r.missing} ya está en tu lista`));
    } else {
      card.append(el('div', {
        style: 'font-size:14px;background:var(--nana);align-self:flex-start;padding:5px 12px;border-radius:6px;border:1px solid rgba(0,0,0,.2)'
      }, '✓ No te falta nada'));
    }

    // Pasos (abiertos o botón «Ver pasos»)
    if (r.open) {
      const steps = el('div', { style: 'display:flex;flex-direction:column;gap:7px;margin-top:2px' },
        r.steps.map(s => el('div', {
          style: 'background:var(--paper);border:1.5px solid var(--ink-soft);border-radius:8px;padding:9px 12px;font-size:14.5px'
        }, s)),
        el('button', { class: 'btn-primary', style: 'min-height:54px;font-size:17px;margin-top:4px', onClick: () => startCooking(r.id) },
          'Voy a cocinar esto')
      );
      card.append(steps);
    } else {
      card.append(el('button', {
        class: 'btn-secondary', style: 'min-height:48px;background:var(--paper)',
        onClick: () => toggleRecipe(r.id)
      }, 'Ver pasos'));
    }

    body.append(card);
  }

  // Respuesta de Nana al pedir más ideas (post-it verde = su voz)
  if (state.moreIdeasNote) {
    body.append(el('div', {
      class: 'postit',
      style: 'background:var(--nana);align-self:stretch;box-shadow:var(--shadow-note);font-family:var(--font-nana);font-size:14.5px'
    }, state.moreIdeasNote));
  }

  body.append(el('button', { class: 'btn-primary', onClick: askMoreIdeas },
    'Recomiéndame otras cosas, Nana'));

  screen.append(body);
  return screen;
}
