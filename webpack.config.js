var path = require("path");
var webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: ["babel-polyfill", "./src/main.js"],
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: 'build.js',
  },
  resolveLoader: {
    // 因为 html-loader 是开源 npm 包，所以这里要添加 'node_modules' 目录
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CopyWebpackPlugin([{
        from: __dirname + '/src/template',
        to: __dirname + '/dist/template'
    }])
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    port: 8088,
    proxy: [
      {
        changeOrigin: true,
        context: ["/hb_incoming_web/**"],
        target: "http://uat.xiaoshou.in.houbank.net"
      },
      {
        context: ["/hb_signatory_web/**"],
        target: "http://192.168.13.51:8083"
      }
    ]
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),

    new UglifyJSPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CopyWebpackPlugin([{
        from: __dirname + '/src/template',
        to: __dirname + '/dist/template'
    },{
      from: __dirname + '/src/assets/mini-logo.ico',
      to: __dirname + '/dist/'
    }]),
    new htmlWebpackPlugin({
      filename: "./index.html",
      template: "./index.tmpl.html"
    })
  ]);
  module.exports.output = {
    path: path.resolve(__dirname, "./dist"),
    filename: "build_[hash:8].js"
  };
}
