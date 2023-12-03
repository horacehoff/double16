import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
