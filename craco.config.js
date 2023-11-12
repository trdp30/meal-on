const path = require("path");

module.exports = {
  webpack: {
    alias: {
      components: path.join(path.resolve(__dirname, "./src/components/")),
      contexts: path.join(path.resolve(__dirname, "./src/contexts/")),
      containers: path.join(path.resolve(__dirname, "./src/containers/")),
      utils: path.join(path.resolve(__dirname, "./src/utils/")),
    },
  },
};
