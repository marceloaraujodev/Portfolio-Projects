const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Target all requests starting with '/api'
    createProxyMiddleware({
      target: 'https://blog-rzyw.onrender.com', 
      changeOrigin: true, // Handle CORS
      pathRewrite: { '^/api': '' }, // Remove '/api' from forwarded requests
    })
  );
};