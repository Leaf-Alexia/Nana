// Cascarón de la app: enruta pantallas y pinta la navegación inferior.
import { el, svg } from './dom.js';
import { ICONS } from './icons.js';
import { getState, subscribe, go, setState } from '../state.js';
import { renderHome } from './screens/home.js';
import { renderCapture } from './screens/capture.js';
import { renderPantry } from './screens/pantry.js';
import { renderCook } from './screens/cook.js';
import { renderCooking } from './screens/cooking.js';
import { renderList } from './screens/list.js';
import { renderSettings } from './screens/settings.js';

const SCREENS = {
  home: renderHome,
  capture: renderCapture,
  pantry: renderPantry,
  cook: renderCook,
  cooking: renderCooking,
  list: renderList,
  settings: renderSettings
};

// Pestañas de la barra inferior; «capture» cuenta como Despensa
// y «cook»/«cooking» no marcan pestaña (se llega desde Inicio).
const NAV_TABS = [
  { key: 'home', label: 'Inicio', icon: ICONS.home, matches: ['home', 'cook', 'cooking'] },
  { key: 'pantry', label: 'Despensa', icon: ICONS.pantry, matches: ['pantry', 'capture'] },
  { key: 'list', label: 'Lista', icon: ICONS.list, matches: ['list'] },
  { key: 'settings', label: 'Ajustes', icon: ICONS.settings, matches: ['settings'] }
];

export function mountApp(root) {
  function render(state) {
    root.replaceChildren();

    const renderScreen = SCREENS[state.screen] || renderHome;
    root.append(renderScreen(state));

    const nav = el('nav', { class: 'nav' });
    for (const tab of NAV_TABS) {
      nav.append(el('button', {
        class: tab.matches.includes(state.screen) ? 'active' : '',
        onClick: () => go(tab.key)
      }, svg(tab.icon), tab.label));
    }
    root.append(nav);
  }

  subscribe(render);
  render(getState());
}
