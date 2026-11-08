// Punto de entrada: carga los estilos (tokens primero) y monta la app.
import './ui/tokens.css';
import './ui/base.css';
import { mountApp } from './ui/app.js';
import { loadData } from './state.js';

// Pinta la app de inmediato y luego trae lo guardado en el celular.
mountApp(document.getElementById('app'));
loadData();
