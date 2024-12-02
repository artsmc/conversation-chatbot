// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('Proxy middleware loaded');
  app.use(
    '/api/v1',
    createProxyMiddleware({
      target: 'http://localhost:8080/api/v1',
      changeOrigin: true,
      secure: false,
    })
  );
};
