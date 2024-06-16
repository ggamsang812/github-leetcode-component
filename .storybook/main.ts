import type { StorybookConfig } from "@storybook/react-vite";
import { createProxyMiddleware } from "http-proxy-middleware";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.server = config.server || {};
    config.server.proxy = {
      "/api": {
        target: "https://github.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    };
    return config;
  },
};

export default config;
