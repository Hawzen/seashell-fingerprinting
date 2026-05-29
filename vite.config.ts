import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  base: "./",
  plugins: [solid()],
  publicDir: false,
  build: {
    outDir: "public",
    emptyOutDir: false,
    minify: true,
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
