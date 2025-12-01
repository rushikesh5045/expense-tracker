import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // For any request starting with /api,
      // forward to http://localhost:5004 or  https://expense-tracker-backend-n33e.onrender.com
      "/api": {
        target: "https://expense-tracker-backend-n33e.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
