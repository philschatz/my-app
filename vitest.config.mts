import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: "happy-dom",
        include: ["src/**/*.(test).{js,jsx,ts,tsx}"],
        coverage: {
            enabled: true,
            // skipFull: true,
            thresholds: { 100: true },
        },
    },
});
