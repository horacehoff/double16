import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
import nodeResolve from "@rollup/plugin-node-resolve";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    optimizeDeps: {
        force: true
    },
    css: {
        transformer: "postcss"
    },
    build: {
        cssMinify: "lightningcss",
        sourcemap: false,
        minify: "terser",
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
                chunkFileNames: '[hash].js',
                experimentalMinChunkSize: 10_000,
            },
            treeshake: "recommended",
            plugins: [nodeResolve()]
        }
    }
})
