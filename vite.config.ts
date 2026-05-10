import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  publicDir: false,
  build: {
    outDir: "public",
    emptyOutDir: false,
    minify: false,
    sourcemap: false,
    rollupOptions: {
      input: "src/main.tsx",
      output: {
        entryFileNames: "app.js",
        inlineDynamicImports: true,
      },
    },
  },
});
