module.exports = function override(config, env) {
  // Modify the Webpack configuration here...
  config.devServer = {
    ...config.devServer,
    historyApiFallback: true,
  };
  return config;
};
