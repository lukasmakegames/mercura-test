import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all';

const CONFIGPANEL = {
  target: "https://floorpanel.config.mercura.dk",
  changeOrigin: true,
  ws: true,
  secure: false,
  configure: (proxy, _options) => {
    proxy.on('error', (err, _req, _res) => {
      console.log('proxy error', err);
    });
    proxy.on('proxyReq', (proxyReq, req, _res) => {
      console.log('Sending Request to the Target:', req.method, req.url);
    });
    proxy.on('proxyRes', (proxyRes, req, _res) => {
      console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
    });
  },
}

export default defineConfig(() => {
  return {
    plugins: [react(), pluginRewriteAll()],
    build: {
      outDir: "./build",
    },
    server: {
      proxy: {
        "/api": CONFIGPANEL,
        "/storage/uploads": CONFIGPANEL,
        "/dashboard": CONFIGPANEL,
        "/packages": CONFIGPANEL,
      },
    },
  };
});
