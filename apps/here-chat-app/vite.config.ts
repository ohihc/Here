import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/apps/chat',
  plugins: [react()],
  build: {
    // target: "esnext",
    outDir: "../chrome-extension/apps/chat",
    emptyOutDir: true,
    // rollupOptions: {
    //   input: {
    //     "here-chat-app": "src/main.tsx",
    //   },
    //   output: {
    //     entryFileNames: "[name].js",
    //     assetFileNames: `[name].[ext]`,
    //   },
    // },
  },
});
