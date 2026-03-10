// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true, // This enables network access
//     port: 5173,
//     proxy: {
//       "/api": {
//         target: "http://localhost:4000",
//         changeOrigin: true,
//         secure: false,
//       },
//       "/uploads": {
//         target: "http://localhost:4000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });

// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { StrictMode } from "react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        // Change this to your live server's URL
        target: "https://osvschool.in",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        // Change this as well to see live images
        target: "https://osvschool.in",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
