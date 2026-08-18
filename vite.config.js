// Configuración de Vite + PWA (paso 1 del TDD).
// vite-plugin-pwa genera el service worker y el manifest: con esto la app
// se puede instalar con ícono en el celular y abrir sin conexión.
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Ruta base: en GitHub Pages la app vive en usuario.github.io/Nana/,
  // así que todos los assets deben resolverse bajo /Nana/. En desarrollo
  // (npm run dev) Vite la ignora y sirve desde la raíz.
  base: '/Nana/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fonts/*.woff2', 'icons/*.png'],
      manifest: {
        name: 'Nana',
        short_name: 'Nana',
        description: 'Tu despensa: qué cocinar hoy y qué comprar el domingo',
        lang: 'es',
        start_url: '/Nana/',
        scope: '/Nana/',
        display: 'standalone',
        background_color: '#F6EFDF',
        theme_color: '#F6EFDF',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      }
    })
  ]
});
