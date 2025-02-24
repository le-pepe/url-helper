import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
        index: "src/index.ts", // Entry point for the package
    },
  },
  lib: [
    {
        format: "esm", // ESM format
        output: {
            distPath: {
                root: 'dist',
            }
        },
        dts: true
    },
    {
        format: "cjs", // CommonJS format
        output: {
            distPath: {
                root: 'dist',
            }
        },
        dts: true
    }
  ],
  output: {
    distPath: {
        root: 'dist',
    },
    cleanDistPath: true,
    minify: true,
  }
});
