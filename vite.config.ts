
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mdxDataPlugin } from "./src/plugins/mdx-loader";

export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    strictPort: true,
    host: true
  },
  plugins: [
    react(),
    mdxDataPlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      external: ['zwitch'] // Add zwitch as an external dependency
    },
  },
  optimizeDeps: {
    include: ['zwitch'] // Explicitly include zwitch for optimization
  },
  base: '',
}));
