import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // For any request starting with /api,
      // forward to http://localhost:5004
      "/api": {
        target: "http://localhost:5004",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
