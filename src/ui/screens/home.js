// Pantalla de INICIO: el refri con sus dos notas y los dos botones de intención.
// Estructura aprobada en wireframes (ARTE.md: «El inicio muestra el refri»).
import { el, svg } from '../dom.js';
import { ICONS } from '../icons.js';
import { go, setState } from '../../state.js';
import { categoryColor } from '../../data/categories.js';
import { originColor } from '../../data/origins.js';

export function renderHome(state) {
  const screen = el('div', { class: 'screen' });

  // Saludo con el círculo-avatar de Nana
  screen.append(el('div', { class: 'screen-head', style: 'padding:26px 20px 16px;gap:14px' },
    el('div', {
      style: `width:58px;height:58px;border-radius:50%;background:var(--postit-yellow);border:var(--stroke);display:flex;align-items:center;justify-content:center;font-family:var(--font-nana);font-size:16px;font-weight:700;flex:none`
    }, 'Nana'),
    el('div', { style: 'font-family:var(--font-nana);font-size:26px;font-weight:700;line-height:1.15' }, 'Hola — ¿qué hacemos?')
  ));

  const body = el('div', { class: 'screen-body' });

  // Aviso verde de Nana (toast), si hay
  if (state.toast) {
    body.append(el('div', {
      class: 'postit',
      style: 'background:var(--nana);align-self:stretch;box-shadow:var(--shadow-note);font-size:14.5px'
    }, state.toast));
  }

  // Nota «Cocinando ahora» para volver a la sesión activa
  if (state.session) {
    body.append(el('button', {
      class: 'note',
      style: 'background:var(--nana);border-radius:12px;text-align:left;font-size:15px;cursor:pointer;padding:13px 15px',
      onClick: () => setState({ screen: 'cooking' })
    },
      el('span', { style: 'font-family:var(--font-nana);font-weight:700' }, 'Cocinando ahora: '),
      `${shortTitle(state.session.title)} — toca para volver`
    ));
  }

  // Botones de intención
  body.append(intentButton(ICONS.pot, 'var(--nana)', 'Cocinar hoy',
    'Nana sugiere con lo que hay — el antojo también va aquí', () => go('cook')));
  body.append(intentButton(ICONS.plus, 'var(--postit-yellow)', 'Añadir a la despensa',
    'Escribe o dicta lo que compraste', () => go('capture')));

  // Nota del refri: En tu despensa (cinta amarilla)
  const pantryNote = el('button', { class: 'note', style: 'text-align:left;cursor:pointer;width:100%', onClick: () => go('pantry') },
    el('span', { class: 'tape', style: 'background:var(--postit-yellow);transform:rotate(-2deg)' }),
    el('span', { style: 'display:flex;align-items:baseline;gap:8px;margin:2px 0 9px' },
      el('span', { style: 'font-family:var(--font-nana);font-size:19px;font-weight:700' }, 'En tu despensa'),
      el('span', { style: 'margin-left:auto;font-size:13px;color:var(--ink-soft)' }, `${state.pantry.length} cosas →`)
    ),
    el('span', { style: 'display:flex;flex-direction:column;gap:7px;font-size:15.5px' },
      state.pantry.slice(0, 5).map(it =>
        el('span', { style: 'display:flex;align-items:center;gap:8px' },
          // Punto de color de categoría: dice qué es de un vistazo
          el('span', { style: `width:11px;height:11px;border-radius:3px;background:${categoryColor(it.category)};border:1px solid rgba(0,0,0,.25);flex:none` }),
          it.name,
          el('span', { style: 'margin-left:auto;color:var(--ink-soft);font-size:14px' }, it.qty)
        )
      )
    )
  );
  body.append(pantryNote);

  // Nota del refri: Por comprar (cinta azul)
  const pending = state.shop.filter(i => !i.checked);
  body.append(el('button', { class: 'note', style: 'text-align:left;cursor:pointer;width:100%', onClick: () => go('list') },
    el('span', { class: 'tape', style: 'background:var(--origin-manual);transform:rotate(2deg)' }),
    el('span', { style: 'display:flex;align-items:baseline;gap:8px;margin:2px 0 9px' },
      el('span', { style: 'font-family:var(--font-nana);font-size:19px;font-weight:700' }, 'Por comprar'),
      el('span', { style: 'margin-left:auto;font-size:13px;color:var(--ink-soft)' }, `${pending.length} →`)
    ),
    el('span', { style: 'display:flex;flex-wrap:wrap;gap:7px;font-size:14px' },
      pending.slice(0, 4).map(it =>
        el('span', { style: `background:${originColor(it.origin)};border:1px solid rgba(0,0,0,.2);padding:4px 10px` }, it.name)
      )
    )
  ));

  screen.append(body);
  return screen;
}

function intentButton(icon, iconBg, title, sub, onClick) {
  return el('button', { class: 'btn-intent', onClick },
    el('span', { class: 'intent-icon', style: `background:${iconBg}` }, svg(icon)),
    el('span', {},
      el('span', { class: 'intent-title' }, title),
      el('span', { class: 'intent-sub' }, sub)
    )
  );
}

// «Tacos de pollo con salsa…» → «tacos de pollo» para la nota corta
function shortTitle(title) {
  return title.toLowerCase().split(' con ')[0];
}
