// cors 피하려고 만든 우회
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URL || 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    }),
  );
};
