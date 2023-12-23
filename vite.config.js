import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    optimizeDeps: {
        force: true
    },
    build: {
        cssMinify: "lightningcss",
        sourcemap: false,
        minify: "terser",
        cssCodeSplit: true,
        terserOptions: {
            compress: {
                drop_debugger: true,
                drop_console: ['log', 'debug', 'count', 'error', 'table', 'time', 'trace', 'warn'],
                keep_fargs: false,
                passes: 1000,
                toplevel: true,
            },
            mangle: {
                toplevel: true,
            }
        },
        rollupOptions: {
            output: {
                compact: true,
                minifyInternalExports: true,
                sourcemap: false,
                manualChunks: {
                    main: ["react", 'react-dom', 'react-router-dom'],
                    xt: ["short-number"]
                }
            }
        }
    }
})
