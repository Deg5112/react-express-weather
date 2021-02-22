const path = require("path");
module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, "src/components"),
      '@serviceProvider': path.resolve(__dirname, "src/services/ServiceProvider"),
      '@pages': path.resolve(__dirname, "src/pages"),
      '@store': path.resolve(__dirname, "src/store"),
      '@styles': path.resolve(__dirname, "src/styles/shared"),
      '@images': path.resolve(__dirname, "src/images"),
    }
  }
}
