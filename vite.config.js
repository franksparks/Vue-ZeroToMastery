import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
//import visualizer from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Music App",
        theme_color: "#ff5e3a",
        icons: [
          {
            src: "assets/img/guitar.png",
            sizes: "200x200",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js, css, html, png, jpg}"],
      },
    }),
    //visualizer({ open: true }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
