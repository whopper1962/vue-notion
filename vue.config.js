module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "Notion",
    }
  },
  devServer: {
    port: 8081,
    disableHostCheck: true,
    host: 'localhost'
  }
};