import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/login": {
        target: "http://localhost:8080/api/user",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
