import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: '/SPA1test.github.io/',
    server: {
        port: 5173,
        open: true,
        strictPort: true
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    },
    resolve: {
        alias: {
            '@': '/src'
        }
    }
})
