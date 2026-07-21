// Orígenes de un item en la lista de compras: POR QUÉ está ahí.
// Es el otro código de color de la app (los post-its). No confundir con
// las categorías (QUÉ es): origen = chip con texto, categoría = borde.

export const ORIGINS = {
  antojo: { label: 'antojo', shortLabel: 'antojo', cssVar: '--origin-antojo' },
  receta: { label: 'receta — Nana avisa', shortLabel: 'receta', cssVar: '--origin-receta' },
  manual: { label: 'tú lo apuntaste', shortLabel: 'tú', cssVar: '--origin-manual' }
};

export function originColor(key) {
  const o = ORIGINS[key] || ORIGINS.manual;
  return `var(${o.cssVar})`;
}
