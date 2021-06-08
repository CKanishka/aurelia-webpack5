const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { AureliaPlugin } = require("aurelia-webpack-plugin");

// Error.stackTraceLimit = Infinity;

const outDir = path.resolve(__dirname, "dist");
const srcDir = path.resolve(__dirname, "src");
const baseUrl = "/";

const cssRules = [
  { loader: "css-loader" },
  {
    loader: "postcss-loader",
    options: { postcssOptions: { plugins: [require("autoprefixer")] } },
  },
  { loader: "sass-loader" },
];

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = (env = {}) => {
  return {
    target: "web",
    mode: env.production ? "production" : "development",
    resolve: {
      extensions: [".ts", ".js"],
      modules: [srcDir, "node_modules"],
    },
    entry: {
      // application entry file is app
      app: ["aurelia-bootstrapper"],
    },
    output: {
      path: outDir,
      publicPath: baseUrl,
      filename: env.production
        ? "[name].[chunkhash:8].bundle.js"
        : "[name].[fullhash].bundle.js",
      sourceMapFilename: env.production
        ? "[name].[chunkhash:8].bundle.map"
        : "[name].[fullhash].bundle.map",
      chunkFilename: env.production
        ? "[name].[chunkhash:8].chunk.js"
        : "[name].[fullhash].chunk.js",
      // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes
      crossOriginLoading: "anonymous",
    },
    performance: { hints: false },
    devServer: {
      contentBase: outDir,
      // serve index.html for all 404 (required for push-state)
      historyApiFallback: true,
    },
    devtool: env.production
      ? "nosources-source-map"
      : "eval-cheap-module-source-map",
    module: {
      rules: [
        // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
        // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
        {
          test: /\.(css|scss)$/i,
          issuer: { not: [/\.html$/i] },
          use: ["style-loader", ...cssRules]
        },
        {
          test: /\.(css|scss)$/i,
          issuer: /\.html$/i,
          // CSS required in templates cannot be extracted safely
          // because Aurelia would try to require it again in runtime
          use: cssRules,
        },
        {
          test: /\.ts$/,
          loader: "ts-loader",
        },
        {
          test: /\.html$/,
          loader: "html-loader",
        },
      ],
    },
    plugins: [
      new AureliaPlugin(),
      // Standard plugin to build index.html
      new HtmlWebpackPlugin({
        template: "index.ejs",
      }),
      new MiniCssExtractPlugin({
        filename: env.production ? "[contenthash].css" : "[id].css",
      }),
      new CopyWebpackPlugin({
        patterns: [
          // Have all static files / asessts copied over
          { from: "static/**", to: "." },
        ],
        // options: {
        //   copyUnmodified: true
        // }
      }),
    ],
  };
};
