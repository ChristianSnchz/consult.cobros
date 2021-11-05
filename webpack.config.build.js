const dotenv = require('dotenv');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const packageJson = require('./package.json');

dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });

const { BFF_URL, GA_ID, NODE_ENV } = process.env;

module.exports = {
  entry: {
    app: [
      'core-js/stable',
      'core-js/modules/es.promise',
      'core-js/modules/es.array.iterator',
      'regenerator-runtime/runtime',
      'whatwg-fetch',
      path.resolve(__dirname, 'src', 'set-public-path.ts'),
      path.resolve(__dirname, 'src', 'index.ts')
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'debt-consult.bundle.js',
    crossOriginLoading: 'anonymous',
    libraryTarget: 'system',
    jsonpFunction: 'webpackJsonp_debt-consult'
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
          extends: './babel.config.js'
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          extends: './babel.config.js'
        }
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
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
    },
    minimize: NODE_ENV === 'production',
    minimizer:
      NODE_ENV === 'production'
        ? [new TerserPlugin({ parallel: true, sourceMap: true }), new CssMinimizerPlugin()]
        : undefined
  },
  plugins: [
    new webpack.DefinePlugin({
      BFF_URL: JSON.stringify(BFF_URL),
      GA_ID: JSON.stringify(GA_ID),
      VERSION: JSON.stringify(packageJson.version)
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MomentLocalesPlugin({
      localesToKeep: ['es']
    }),
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/debt-consult.bundle.css',
      chunkFilename: 'css/[id].bundle.css'
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*.{ts,tsx}'
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled' // if you want to analyze the output bundle change this to 'server', o remove this line.
    })
  ]
};
