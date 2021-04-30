const paths = require("./paths");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const port = 8080;

module.exports = merge(common, {
  mode: "development",
  plugins: [
    // API backend LOCALHOST
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:4000"),
      "process.env.POSITIONSTACK_API_KEY": JSON.stringify("45f5b9f8087988986ded9ce0f437c8a1"),
      "process.env.MAPBOX_API_KEY": JSON.stringify("pk.eyJ1IjoiYm9yaXNjb3VkZXJjIiwiYSI6ImNrbzBxbXd0MzAxOGIydm8zZ2Fydnhla3IifQ.cocyKytOUzSpdyZi_UNqmQ"),
    }),
  ],
  devtool: "inline-source-map",
  module: {
    rules: [
      // Styles
      {
        test: /\.(s?css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    clientLogLevel: "warn",
    overlay: true,
    stats: "minimal",
    open: true,
    compress: true,
    hot: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    port,
  },
});
