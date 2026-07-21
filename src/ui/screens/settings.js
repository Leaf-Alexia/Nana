// AJUSTES: cerebro de Nana (proveedor LLM) y respaldo de datos.
// En el paso 1 es solo la pantalla; conectar el LLM es el paso 3
// y el export/import real es el paso 5 del TDD.
import { el } from '../dom.js';
import { screenHead } from './common.js';

export function renderSettings() {
  const screen = el('div', { class: 'screen' });
  screen.append(screenHead('Ajustes'));
  const body = el('div', { class: 'screen-body', style: 'gap:11px' });

  body.append(sectionTitle('Cerebro de Nana (LLM)'));
  body.append(el('select', { class: 'field', style: 'padding:0 12px' },
    el('option', {}, 'Gemini (gratuito)'),
    el('option', {}, 'Ollama (mi PC)'),
    el('option', {}, 'OpenRouter')
  ));
  body.append(el('input', {
    type: 'password', class: 'field', style: 'font-size:15px',
    placeholder: 'API key (se guarda solo en este dispositivo)'
  }));
  body.append(el('button', { class: 'btn-secondary' }, 'Probar conexión'));

  body.append(sectionTitle('Mis datos'));
  body.append(el('button', { class: 'btn-secondary' }, 'Exportar respaldo (JSON)'));
  body.append(el('button', { class: 'btn-secondary' }, 'Importar respaldo'));

  body.append(el('div', { class: 'postit', style: 'background:var(--postit-yellow);font-size:13.5px;margin-top:6px' },
    'Tu API key nunca sale de tu teléfono.'));

  screen.append(body);
  return screen;
}

function sectionTitle(text) {
  return el('div', {
    style: 'font-family:var(--font-nana);font-size:16px;font-weight:700;color:var(--ink-soft);margin-top:6px'
  }, text);
}
