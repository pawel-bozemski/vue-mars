const path = require("path");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  pluginOptions: {
    compression: {
      brotli: {
        filename: "[file].br[query]",
        algorithm: "brotliCompress",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        minRatio: 0.8,
      },
      gzip: {
        filename: "[file].gz[query]",
        algorithm: "gzip",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      },
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@i": path.resolve(__dirname, "./src/assets"),
      },
    },
    plugins: [
        new BundleAnalyzerPlugin(),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // The following is the configuration of the downloaded plug-in
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100,
      }),
    ],
  },
};

module.exports = {};
