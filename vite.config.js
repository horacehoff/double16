import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
import nodeResolve from "@rollup/plugin-node-resolve";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(),],
    optimizeDeps: {
        force: true
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
                // manualChunks: {
                //     main: ["react", 'react-dom', 'react-router-dom'],
                //     xt: ["short-number"],
                //     db: ["firebase/app", "firebase/firestore", "firebase/analytics"]
                // },
                chunkFileNames: '[hash].js',
                experimentalMinChunkSize: 10_000,
            },
            plugins: [nodeResolve()]
        }
    },
    // css: {
    //     transformer: 'lightningcss',
    //     lightningcss: {
    //         targets: browserslistToTargets(browserslist('>= 0.25%'))
    //     }
    // }
})
