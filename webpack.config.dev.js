const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const packageJson = require('./package.json');
const { dependencies } = require('./polyfill');

const { BFF_URL, GA_ID, NODE_ENV, PORT } = process.env;

module.exports = {
  name: 'app',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  devServer: {
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: true,
    port: PORT,
    overlay: true
  },
  entry: {
    app: [
      ...dependencies,
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, 'src', 'set-public-path.ts'),
      path.resolve(__dirname, 'src', 'index.ts')
    ]
  },
  output: {
    filename: 'debt-consult.bundle.js',
    libraryTarget: 'system',
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  externals: ['react', 'react-dom'],
  module: {
    rules: [
      {
        parser: { system: false }
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'node_modules', 'single-spa'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: '.babel-cache',
          extends: './babel.config.js'
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: '.babel-cache',
          extends: './babel.config.js'
        }
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              },
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /(Font|Fonts|font|fonts)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          esModule: false
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        include: /(Font|Fonts|font|fonts)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: '../fonts/',
          esModule: false
        }
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx|ts|tsx)$/,
          /\.json$/,
          /\.(s[ac]ss|css)$/,
          /\.(png|jpg|gif|svg)$/,
          /\.(woff|woff2|eot|ttf|otf|svg)$/
        ],
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          limit: 10000
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('debt-consult'),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      BFF_URL: JSON.stringify(BFF_URL),
      GA_ID: JSON.stringify(GA_ID),
      VERSION: JSON.stringify(packageJson.version)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'index.html'),
      inject: false,
      minify: false
    })
  ]
};
