
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
      // Define a comprehensive list of external dependencies that might cause issues
      external: [
        'zwitch',
        'hast-util-to-estree',
        'unified',
        'remark-parse',
        'remark-rehype',
        'rehype-stringify'
      ]
    },
  },
  optimizeDeps: {
    // Include key MDX dependencies for optimization
    include: [
      '@mdx-js/react',
      '@mdx-js/mdx'
    ],
    // Exclude problematic packages from optimization
    exclude: ['zwitch', 'hast-util-to-estree']
  },
  base: '',
}));
