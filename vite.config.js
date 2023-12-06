import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
  build: {
    cssMinify: "lightningcss",
    sourcemap: false,
    minify: "tesrer",
    rollupOptions: {
      output: {
        compact: true,
        minifyInternalExports: true,
        sourcemap: false,
      }
    }
  }
})
