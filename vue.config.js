module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "NOTE APP",
    }
  },
  devServer: {
    port: 8081,
    disableHostCheck: true,
    host: 'localhost'
  }
};