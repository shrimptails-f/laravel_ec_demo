import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'), // `@` を `resources/js` にマッピング
        },
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
        strictPort: true, // ポートが使用中ならエラーを出す
        hmr: {
            protocol: 'ws', // WebSocket を使用
            host: '127.0.0.1',
            port: 5173, // クライアント側の HMR ポート
            clientPort: 5173, // HMR の WebSocket 用ポート
        },
    },
});
