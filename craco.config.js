const path = require("path");
module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, "src/components"),
      '@services': path.resolve(__dirname, "src/services"),
      '@pages': path.resolve(__dirname, "src/pages"),
      '@store': path.resolve(__dirname, "src/store"),
      '@styles': path.resolve(__dirname, "src/styles"),
      '@images': path.resolve(__dirname, "src/images"),
    }
  },
  jest: {
    babel: {
      addPresets: true, /* (default value) */
      addPlugins: true  /* (default value) */
    },
    configure: (jestConfig, { env, paths, resolve, rootDir }) => { return jestConfig; }
  },
}
