const paths = require("./paths");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { BundleStatsWebpackPlugin } = require("bundle-stats-webpack-plugin");
const webpack = require('webpack');

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    // Stats bundle
    new BundleStatsWebpackPlugin(),
    // API backend ONLINE
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("https://fairplay.boriscouderc.fr"),
      "process.env.POSITIONSTACK_API_KEY": JSON.stringify("45f5b9f8087988986ded9ce0f437c8a1"),
      "process.env.MAPBOX_API_KEY": JSON.stringify("pk.eyJ1IjoiYm9yaXNjb3VkZXJjIiwiYSI6ImNrbzBxbXd0MzAxOGIydm8zZ2Fydnhla3IifQ.cocyKytOUzSpdyZi_UNqmQ"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(s?css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "../" },
          },
          {
            loader: "css-loader",
            options: { importLoaders: 3 },
          },
          "postcss-loader",
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
  stats: {
    assets: true,
    entrypoints: true,
    chunks: true,
    modules: true,
    builtAt: true,
    hash: true,
  },

  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
