// Punto de entrada: carga los estilos (tokens primero) y monta la app.
import './ui/tokens.css';
import './ui/base.css';
import { mountApp } from './ui/app.js';

mountApp(document.getElementById('app'));
