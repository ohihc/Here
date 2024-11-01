import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    outDir: "../chrome-extension/scripts/phishing-protector",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'phishing-protector': 'src/main.tsx'
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: `[name].[ext]`
      }
    }
  },
});
