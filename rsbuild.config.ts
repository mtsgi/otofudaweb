import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginVue2 } from "@rsbuild/plugin-vue2";
import { pluginSass } from "@rsbuild/plugin-sass";

const { publicVars } = loadEnv({ prefixes: ["VUE_APP_"] });

export default defineConfig({
  plugins: [pluginVue2(), pluginSass()],
  source: {
    alias: { "@": "./src" },
    entry: { index: "./src/main.js" },
    define: { publicVars }
  },
  html: { template: "./public/index.html" }
});
