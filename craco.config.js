const path = require("path");
module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, "src/components/"),
      '@images': path.resolve(__dirname, "src/assets/images/"),
      '@serviceProvider': path.resolve(__dirname, "src/services/ServiceProvider"),
    }
  }
}
