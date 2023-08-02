import * as path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        src: path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets"),
        theme: path.resolve(__dirname, "./src/theme"),
        contexts: path.resolve(__dirname, "./src/contexts"),
        routes: path.resolve(__dirname, "./src/routes"),
        hooks: path.resolve(__dirname, "./src/hooks"),
        guards: path.resolve(__dirname, "./src/guards"),
        pages: path.resolve(__dirname, "./src/pages"),
        layouts: path.resolve(__dirname, "./src/layouts"),
        components: path.resolve(__dirname, "./src/components"),
        utils: path.resolve(__dirname, "./src/utils"),
        consts: path.resolve(__dirname, "./src/consts"),
        types: path.resolve(__dirname, "./src/@types")
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3003,
    hmr: {
        host: "rent.car.test",
        clientPort: 443,
        protocol: "wss",
    },
  },
})