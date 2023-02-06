const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api/login", {
      target: "https://api.wishx.me",
      changeOrigin: true,
    })
  );
};
//
