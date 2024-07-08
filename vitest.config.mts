import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        coverage: {
            enabled: true,
            skipFull: true,
            thresholds: { 100: true },
        },
        environment: "jsdom",
    },
});
