const path = require("path");
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'


const config = {
  target: "web",
  entry: path.join(__dirname, "src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      // {
      //   test: /\.styl/,
      //   use: ["style-loader", "css-loader", "stylus-loader", {
      //     loader: 'postcss-loader',
      //     options: {
      //       sourceMap: true,
      //     }
      //   }]
      // },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 1024,
            name: "[name].[ext]"
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      //根据系统环境打包
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
};

if (isDev) {
  config.module.rules.push({
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  //方便调试代码
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      //定位错误
      errors: true,
    },
    //不用刷新页面改变数据
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config