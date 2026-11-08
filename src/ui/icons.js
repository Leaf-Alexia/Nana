// Iconos de línea de la app (trazo 2px, esquinas suaves — mismo lápiz que la tinta).
// Son strings estáticos; se montan con svg() de dom.js.

const stroke = (paths, extra = '') =>
  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${paths}</svg>`;

export const ICONS = {
  home: stroke('<path d="M3 11l9-8 9 8v10H3z"/>'),
  pantry: stroke('<path d="M4 8h16v12H4zM4 8l2-4h12l2 4M12 8v4"/>'),
  list: stroke('<path d="M5 6l1.5 1.5L9 5M5 12l1.5 1.5L9 11M5 18l1.5 1.5L9 17M12 6.5h8M12 12.5h8M12 18.5h8"/>'),
  settings: stroke('<circle cx="12" cy="12" r="3.2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>'),
  pot: stroke('<path d="M4 15h13M4 15a6.5 5 0 0113 0M10.5 9V7M20 15h1M17 18l1.5 2"/>'),
  plus: stroke('<path d="M12 5v14M5 12h14"/>'),
  camera: stroke('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
  mic: stroke('<path d="M12 3a4 4 0 014 4v5a4 4 0 01-8 0V7a4 4 0 014-4zM6 12a6 6 0 0012 0M12 18v3"/>')
};
