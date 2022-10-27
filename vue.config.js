const path = require("path");
module.exports = {
  // This is the "main" file which should include all other modules
  publicPath: "/",
  outputDir: "/var/www/html/TestbedManager/",
  devServer: {
    public: "localhost:8080",
    disableHostCheck: true,
    hot: true,
    watchOptions: {
      poll: 10000,
    },
  },
  configureWebpack: (config) => {
    config.externals = {
      config: JSON.stringify({
        dateFormat: "YYYY-MM-DD",
        dateTimeFormat: "YYYY-MM-DD hh:mm:ss a",
        date24hTimeFormat: "YYYY-MM-DD HH:mm:ss",
        parseDateFormat: "YYYY-MM-DD",
        parseDateTimeFormat: "YYYY-MM-DDTHH:mm:ss",
      }),
    };
    config.resolve = {
      extensions: [".js", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "src/"),
      },
    };
  },
};
