// Ayudantes mínimos para construir la interfaz sin framework.
// Todo texto dinámico entra como nodo de texto (nunca innerHTML con datos
// del usuario o del LLM — regla dura de seguridad del TDD).

// el('button', { class: 'x', onClick: fn }, 'texto', otroNodo)
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null) continue;
    if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === 'style') {
      node.style.cssText = value;
    } else if (key === 'checked') {
      node.checked = !!value;
    } else if (key === 'value') {
      node.value = value;
    } else {
      node.setAttribute(key, value);
    }
  }
  for (const child of children.flat()) {
    if (child == null) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

// Convierte un string SVG ESTÁTICO (de icons.js) en elemento.
// Solo se usa con strings escritos en el código, jamás con datos externos.
export function svg(markup) {
  const tpl = document.createElement('template');
  tpl.innerHTML = markup.trim();
  return tpl.content.firstChild;
}
